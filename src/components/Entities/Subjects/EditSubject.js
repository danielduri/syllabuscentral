import {Button, Form, Modal, OverlayTrigger, Popover} from "react-bootstrap";
import '../../Modal.css'
import React, {useEffect, useState} from "react";
import {tokenFetch} from "../../Common/functions/tokenFetch";
import Select from "react-select";
import {generateOption, generateOptionWithValue} from "../../Common/functions/misc";

export function EditSubject(props) {
    const [newName, setNewName] = useState("");
    const [wrongName, setWrongName] = useState(false);

    const [degree, setDegree] = useState(generateOption(""));
    const [emptyDegree, setEmptyDegree] = useState(false)
    const [degreeOptions, setDegreeOptions] = useState([])

    const [feedback, setFeedback] = useState("");

    const handleSubjectEdit = () => {

        if(newName!==""){
            tokenFetch("editSubject", {
                method: 'put',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    subjectID: props.subject.subjectID,
                    degreeID: props.subject.subjectDegreeID,
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

    const handleSubjectUpload = () => {
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
            tokenFetch("newSubject", {
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

    const handleSubjectDelete = () => {
        tokenFetch('deleteSubject', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                subjectID: props.subject.subjectID
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

            if(!props.subject) {
                tokenFetch("getDegreeNames", {
                    method: 'get',
                    headers: {"Content-type": "application/json"}
                }).then(resp => populateDegreeOptions(resp))
            }else{
                setDegree(generateOptionWithValue(props.subject.subjectDegree, props.subject.subjectDegreeID))
            }

        }
    }, [props.subject, props.show])

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
                Esta acción es irreversible. ¿Seguro que desea eliminar esta materia?
                <p></p>
                <p><strong>Se eliminarán todas las asignaturas de la misma.</strong></p>
                <h3> </h3>
                <Button className={"w-100"} variant={"danger"} onClick={handleSubjectDelete}>Sí, seguro</Button>
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
                    <h3 className={"h-auto"}> {props.subject ? `Editar materia (${props.subject.subjectName})` : "Nueva materia"} </h3>
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
                            isDisabled={props.subject}
                        />
                    </>

                    <p className={"red pv3"}>{feedback}</p>
                </Form>
            </Modal.Body>

            <Modal.Footer>

                {props.subject ?
                    <OverlayTrigger rootClose={true} trigger="click" placement="top" overlay={confirmEliminatePopover}>
                        <Button variant="danger" className={"mr-auto"} key={"delete"}>Eliminar</Button>
                    </OverlayTrigger> :
                    <></>
                }

                <Button variant="success" onClick={props.subject ? handleSubjectEdit : handleSubjectUpload}>
                    Aceptar
                </Button>
                <Button onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>

        </Modal>
    );
}