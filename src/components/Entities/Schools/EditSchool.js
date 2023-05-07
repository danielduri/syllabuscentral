import {Button, Form, Modal, OverlayTrigger, Popover, Tooltip} from "react-bootstrap";
import '../../Modal.css'
import React, {useEffect, useState} from "react";
import {tokenFetch} from "../../Common/functions/tokenFetch";

export function EditSchool(props) {
    const [newName, setNewName] = useState("");
    const [wrongName, setWrongName] = useState(false);

    const handleSchoolEdit = () => {
        if(newName!==""){
            tokenFetch("editSchool", {
                method: 'put',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    schoolID: props.school.schoolID,
                    schoolName: newName
                })
            }).then(resp => {
                if(resp!==undefined){
                    if(resp==="OK"){
                        props.onHide();
                        window.location.reload()
                    }
                }
            }).catch(error => {throw new Error(error)});
        }

    }

    const handleSchoolUpload = () => {
        if(newName===""){
            setWrongName(true)
        }else{
            setWrongName(false)
            tokenFetch("newSchool", {
                method: 'post',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    schoolName: newName
                })
            }).then(resp => {
                if(resp!==undefined){
                    if(resp==="OK"){
                        props.onHide();
                        window.location.reload()
                    }else{
                        setWrongName(true)
                    }
                }
            }).catch(error => {throw new Error(error)});
        }
    }

    const handleSchoolDelete = () => {
        tokenFetch('deleteSchool', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                schoolID: props.school.schoolID
            })
        }).then(res => {
            if(res==="OK"){
                props.onHide()
                window.location.reload()
            }
        }, (res => console.log(res)))
    }

    useEffect(() => {
        if(props.show){
            setNewName("")
            setWrongName(false)
        }
    }, [props.show])

    const eliminateButton = () => {
        if(props.school){
            if(!props.school.schoolAdm){
                return <OverlayTrigger rootClose={true} trigger="click" placement="top" overlay={confirmEliminatePopover}>
                            <Button variant="danger" className={"mr-auto"} key={"delete"}>Eliminar</Button>
                        </OverlayTrigger>
            }else{
                return <OverlayTrigger
                    key={"no-eliminate"}
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-no-eliminate`}>
                            No se puede eliminar esta entidad.
                        </Tooltip>
                    }>
                    <Button variant="danger" disabled={false} className={"mr-auto"} key={"delete"}>Eliminar</Button>

                </OverlayTrigger>
            }
        }else{
            return <></>
        }
    }

    const confirmEliminatePopover = (
        <Popover id="confirmEliminatePopover">
            <Popover.Header as="h3">Confirmación</Popover.Header>
            <Popover.Body>
                Esta acción es irreversible. ¿Seguro que desea eliminar esta Facultad?
                <p></p>
                <p><strong>Se eliminarán todas las asignaturas, departamentos, usuarios, grados, módulos y materias de la misma.</strong></p>
                <h3> </h3>
                <Button className={"w-100"} variant={"danger"} onClick={handleSchoolDelete}>Sí, seguro</Button>
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
                    <h3 className={"h-auto"}> {props.school ? "Editar Facultad" : "Nueva Facultad"} </h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className={"w-100 mb-3"}>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control placeholder={props.school ? props.school.schoolName : ""} onChange={event => setNewName(event.target.value)} required isInvalid={wrongName} />
                        <Form.Control.Feedback type="invalid">
                            {wrongName ? "Nombre inválido" : ""}
                        </Form.Control.Feedback>
                    </div>

                </Form>
            </Modal.Body>

            <Modal.Footer>

                {eliminateButton()}

                <Button variant="success" onClick={props.school ? handleSchoolEdit : handleSchoolUpload}>
                    Aceptar
                </Button>
                <Button onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>

        </Modal>
    );
}