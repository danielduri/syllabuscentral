import {Button, Form, Modal, OverlayTrigger, Popover} from "react-bootstrap";
import '../../Modal.css'
import React, {useEffect, useState} from "react";
import {tokenFetch} from "../../Common/functions/tokenFetch";
import Select from "react-select";
import {generateOption, generateOptionWithValue} from "../../Common/functions/misc";

export function EditModule(props) {
    const [newName, setNewName] = useState("");
    const [wrongName, setWrongName] = useState(false);

    const [degree, setDegree] = useState(generateOption(""));
    const [emptyDegree, setEmptyDegree] = useState(false)
    const [degreeOptions, setDegreeOptions] = useState([])

    const [feedback, setFeedback] = useState("");

    const handleModuleEdit = () => {

        if(newName!==""){
            tokenFetch("editModule", {
                method: 'put',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    moduleID: props.module.moduleID,
                    degreeID: props.module.moduleDegreeID,
                    newName: newName
                })
            }).then(resp => {
                if(resp!==undefined){
                    if(resp==="OK"){
                        props.onHide();
                        window.location.reload()
                    }else if(resp==="used name"){
                        setFeedback("Nombre ya utilizado")
                    }else{
                        setFeedback(resp)
                    }
                }
            }).catch(error => {throw new Error(error)});
        }else{
            props.onHide();
        }

    }

    const handleModuleUpload = () => {
        let upload=(!wrongName && degree.value!=="")

        if(newName===""){
            setFeedback("Nombre vacío")
            upload=false
        }else{
            setWrongName(false)
            setFeedback("")
        }

        if(degree.value===""){
            setEmptyDegree(true)
            setFeedback("Grado vacío")
            upload=false
        }

        if(upload){
            tokenFetch("newModule", {
                method: 'post',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    name: newName,
                    degree: degree.value
                })
            }).then(resp => {
                if(resp!==undefined){
                    if(resp==="OK"){
                        props.onHide();
                        window.location.reload()
                    }if(resp==="used name"){
                        setWrongName(true)
                    }else{
                        setFeedback(resp)
                    }
                }
            }).catch(error => {throw new Error(error)});
        }
    }

    const handleModuleDelete = () => {
        tokenFetch('deleteModule', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                moduleID: props.module.moduleID
            })
        }).then(res => {
            if(res==="OK"){
                props.onHide()
                window.location.reload()
            }
        }, (res => console.log(res)))
    }

    const populateDegreeOptions = (json) => {
        let degOp = []
        for (const jsonElement of json) {
            degOp.push(generateOptionWithValue(jsonElement.degreeDisplayName, jsonElement.degreeID))
        }
        setDegreeOptions(degOp)
    }

    useEffect( () => {
        if (props.show) {
            setNewName("")
            setWrongName(false)
            setEmptyDegree(false)
            setFeedback("")
            setDegree(generateOption(""))

            if(!props.module) {
                tokenFetch("getDegreeNames", {
                    method: 'get',
                    headers: {"Content-type": "application/json"}
                }).then(resp => populateDegreeOptions(resp))
            }else{
                setDegree(generateOptionWithValue(props.module.moduleDegree, props.module.moduleDegreeID))
            }

        }
    }, [props.module, props.show])

    useEffect( () => {
        setWrongName(false)
        setFeedback("")
    }, [newName, degree])

    useEffect( () => {
        setEmptyDegree(false)
        setFeedback("")
    }, [degree])

    const confirmEliminatePopover = (
        <Popover id="confirmEliminatePopover">
            <Popover.Header as="h3">Confirmación</Popover.Header>
            <Popover.Body>
                Esta acción es irreversible. ¿Seguro que desea eliminar este módulo?
                <p></p>
                <p><strong>Se eliminarán todas las asignaturas del mismo.</strong></p>
                <h3> </h3>
                <Button className={"w-100"} variant={"danger"} onClick={handleModuleDelete}>Sí, seguro</Button>
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
                    <h3 className={"h-auto"}> {props.module ? `Editar módulo (${props.module.moduleName})` : "Nuevo módulo"} </h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className={"w-100 mb-3"}>
                        <Form.Label className={feedback==="Nombre vacío" ? "red" : ""}>Nombre</Form.Label>
                        <Form.Control onChange={event => setNewName(event.target.value)} required isInvalid={wrongName} />
                        <Form.Control.Feedback type="invalid">
                            {wrongName ? "Este nombre ya ha sido utilizado" : ""}
                        </Form.Control.Feedback>
                    </div>

                    <>
                        <Form.Label className={emptyDegree ? "red" : ""}>Grado</Form.Label>
                        <Select
                            options={degreeOptions}
                            value={degree}
                            onChange={setDegree}
                            isDisabled={props.module}
                        />
                    </>

                    <p className={"red pv3"}>{feedback}</p>
                </Form>
            </Modal.Body>

            <Modal.Footer>

                {props.module ?
                    <OverlayTrigger rootClose={true} trigger="click" placement="top" overlay={confirmEliminatePopover}>
                        <Button variant="danger" className={"mr-auto"} key={"delete"}>Eliminar</Button>
                    </OverlayTrigger> :
                    <></>
                }

                <Button variant="success" onClick={props.module ? handleModuleEdit : handleModuleUpload}>
                    Aceptar
                </Button>
                <Button onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>

        </Modal>
    );
}