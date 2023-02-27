import {Button, Form, Modal, OverlayTrigger, Popover} from "react-bootstrap";
import '../../Modal.css'
import React, {useEffect, useState} from "react";
import {tokenFetch} from "../../Common/functions/tokenFetch";
import Select from "react-select";
import {generateOption, generateOptionWithValue, validateCode} from "../../Common/functions/misc";

export function EditDegree(props) {
    const [newName, setNewName] = useState("");
    const [wrongName, setWrongName] = useState("");

    const [duration, setDuration] = useState("");
    const [wrongDuration, setWrongDuration] = useState(false);

    const [coordinator, setCoordinator] = useState(generateOption(""));
    const [coordinatorOptions, setCoordinatorOptions] = useState("");
    const [noCoordinator, setNoCoordinator] = useState(false)

    const handleDegreeEdit = () => {
        let data = {degreeID: props.degree.degreeID};
        if(newName!==""){
            data.name=newName;
        }

        if(Number.isInteger(coordinator.value)){
            data.coordinator=coordinator.value
        }

        tokenFetch("editDegree", {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data)
        }).then(resp => {
            if(resp!==undefined){
                if(resp===props.degree.degreeID){
                    props.onHide();
                    window.location.reload()
                }else{
                    setWrongName("used")
                }
            }
        }).catch(error => {throw new Error(error)});
    }

    const handleDegreeUpload = () => {
        let upload=!wrongDuration
        if(newName===""){
            setWrongName("empty")
            upload=false
        }else{
            setWrongName("")
        }

        if(duration===""){
            setWrongDuration(true)
            upload=false
        }

        if(!Number.isInteger(coordinator.value)){
            setNoCoordinator(true)
            upload=false
        }else{
            setNoCoordinator(false)
        }

        if(upload){
            tokenFetch("newDegree", {
                method: 'put',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    name: newName,
                    duration: Number.parseInt(duration),
                    coordinator: coordinator.value
                })
            }).then(resp => {
                if(resp!==undefined){
                    if(Number.isInteger(resp)){
                        props.onHide();
                        window.location.reload()
                    }else{
                        setWrongName(resp)
                    }
                }
            }).catch(error => {throw new Error(error)});
        }
    }

    const handleDegreeDelete = () => {
        tokenFetch('deleteDegree', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                degreeID: props.degree.degreeID
            })
        }).then(res => {
            if(res==="OK"){
                props.onHide()
                window.location.reload()
            }
        }, (res => console.log(res)))
    }

    const populateCoordinatorOptions = (json) => {
        let coordOp = []
        for (const jsonElement of json) {
            coordOp.push(generateOptionWithValue(jsonElement.userName, jsonElement.userID))
        }
        setCoordinatorOptions(coordOp)
    }

    useEffect(() => {
        if(props.degree){
            setCoordinator(generateOptionWithValue(props.degree.coordinator, props.degree.coordinatorID))
        }
    }, [props.degree])

    useEffect(() => {
        if(props.show){
            setNewName("")
            setDuration("")
            setWrongDuration(false)
            setWrongName("")
            setNoCoordinator(false)
            tokenFetch("getDegreeCoordinators", {
                method: 'get',
                headers: {"Content-type": "application/json"}
            }).then(resp => populateCoordinatorOptions(resp))
        }
    }, [props.show])

    useEffect(() => {
        if (validateCode(duration)){
            setWrongDuration(false)
        }else{
            setWrongDuration(true)
        }
    }, [duration])

    const confirmEliminatePopover = (
        <Popover id="confirmEliminatePopover">
            <Popover.Header as="h3">Confirmación</Popover.Header>
            <Popover.Body>
                Esta acción es irreversible. ¿Seguro que desea eliminar este grado?
                <p></p>
                <p><strong>Se eliminarán todas las asignaturas, módulos y materias del mismo.</strong></p>
                <h3> </h3>
                <Button className={"w-100"} variant={"danger"} onClick={handleDegreeDelete}>Sí, seguro</Button>
            </Popover.Body>
        </Popover>
    );

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className={"h-auto"}>
                <Modal.Title id="contained-modal-title-vcenter" className={"h-auto"}>
                    <h3 className={"h-auto"}> {props.degree ? "Editar grado" : "Nuevo grado"} </h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className={"w-100 mb-3"}>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control placeholder={props.degree ? props.degree.name : ""} onChange={event => setNewName(event.target.value)} required isInvalid={wrongName!==""} />
                        <Form.Control.Feedback type="invalid">
                            {wrongName==="used" ?  "Nombre ya usado" : "Nombre inválido"}
                        </Form.Control.Feedback>
                    </div>

                    <div className={"mb-3"}>
                    {
                        props.degree ?
                            <></> :
                            <div>
                                <Form.Label className={""}>Duración</Form.Label>
                                <div className={"flex items-end"}>
                                    <Form.Control className={"w-10"} onChange={event => setDuration(event.target.value)} required isInvalid={wrongDuration} />
                                    <p className={"ph2 flex-auto"}>años</p>
                                    <Form.Control.Feedback type="invalid">
                                        La duración debe ser numérica
                                    </Form.Control.Feedback>
                                </div>

                            </div>
                    }
                    </div>

                    <div className={"w-100 mb-3"}>
                        <Form.Label className={noCoordinator ? "red" : ""}>Coordinador</Form.Label>
                        <Select
                            options={coordinatorOptions}
                            value={coordinator}
                            onChange={setCoordinator}
                        />
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer>

                {props.degree ?
                    <OverlayTrigger rootClose={true} trigger="click" placement="top" overlay={confirmEliminatePopover}>
                        <Button variant="danger" className={"mr-auto"} key={"delete"}>Eliminar</Button>
                    </OverlayTrigger> :
                    <></>
                }

                <Button variant="success" onClick={props.degree ? handleDegreeEdit : handleDegreeUpload}>
                    Aceptar
                </Button>
                <Button onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>

        </Modal>
    );
}