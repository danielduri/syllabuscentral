import {Button, Form, Modal, OverlayTrigger, Popover, Tooltip} from "react-bootstrap";
import '../../Modal.css'
import React, {useEffect, useState} from "react";
import {tokenFetch} from "../../Common/functions/tokenFetch";
import {validateShorthand} from "../../Common/functions/misc";

export function EditDepartment(props) {
    const [newName, setNewName] = useState("");
    const [wrongName, setWrongName] = useState(false);

    const [shorthand, setShorthand] = useState("");
    const [wrongShorthand, setWrongShorthand] = useState(false);

    const [feedback, setFeedback] = useState("");

    const handleDepartmentEdit = () => {
        let data = {departmentID: props.department.departmentID};

        if(newName!==""){
            data.name=newName
        }

        if(shorthand!==""){
            data.shorthand=shorthand
        }

        if(newName!=="" || shorthand!==""){
            tokenFetch("editDepartment", {
                method: 'put',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            }).then(resp => {
                handleResp(resp)
            }).catch(error => {throw new Error(error)});
        }

    }

    const handleDepartmentUpload = () => {
        let upload=(!wrongName && !wrongShorthand)

        if(newName===""){
            setWrongName(true)
            setFeedback("Nombre vacío")
            upload=false
        }else{
            setWrongName(false)
        }

        if(shorthand===""){
            setWrongShorthand(true)
            setFeedback("Abreviatura vacía")
            upload=false
        }

        if(upload){
            tokenFetch("newDepartment", {
                method: 'post',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    name: newName,
                    shorthand: shorthand
                })
            }).then(resp => {
                handleResp(resp)
            }).catch(error => {throw new Error(error)});
        }
    }

    const handleResp = (resp)=>{
        if(resp!==undefined){
            if(resp==="OK"){
                props.onHide();
                window.location.reload()
            }else if(resp==="used name"){
                setWrongName(true)
                setFeedback("Nombre ya utilizado")
            }else if(resp==="used shorthand"){
                setWrongShorthand(true)
                setFeedback("Abreviatura ya utilizada")
            }else if(resp==="invalid name"){
                setWrongShorthand(true)
                setFeedback("Nombre inválido")
            }else{
                setFeedback(resp)
            }
        }
    }

    const handleDepartmentDelete = () => {
        tokenFetch('deleteDepartment', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                departmentID: props.department.departmentID
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
            setShorthand("")
            setWrongShorthand(false)
        }
    }, [props.show])

    useEffect(() => {
        if (validateShorthand(shorthand)){
            setWrongShorthand(false)
            setFeedback("")
        }else{
            setWrongShorthand(true)
            setFeedback("Abreviatura demasiado larga o contiene caracteres inválidos.")
        }
    }, [shorthand])

    const eliminateButton = () => {
        if(props.department){
            if(props.department.headcount===0){
                return <OverlayTrigger rootClose={true} trigger="click" placement="top" overlay={confirmEliminatePopover}>
                            <Button variant="danger" className={"mr-auto"} key={"delete"}>Eliminar</Button>
                        </OverlayTrigger>
            }else{
                return <OverlayTrigger
                    key={"no-eliminate"}
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-no-eliminate`}>
                            No es posible eliminar un departamento al que pertenezcan usuarios.
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
                Esta acción es irreversible. ¿Seguro que desea eliminar este departamento?
                <p></p>
                <p><strong>Se eliminarán todas las asignaturas del mismo.</strong></p>
                <h3> </h3>
                <Button className={"w-100"} variant={"danger"} onClick={handleDepartmentDelete}>Sí, seguro</Button>
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
                    <h3 className={"h-auto"}> {props.department ? "Editar departamento" : "Nuevo departamento"} </h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <p className={"red"}>{feedback}</p>
                    <div className={"w-100 mb-3"}>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control placeholder={props.department ? props.department.name : ""} onChange={event => setNewName(event.target.value)} required isInvalid={wrongName} />
                    </div>

                    <div className={"mb-3"}>
                    {
                            <div>
                                <Form.Label className={""}>Abreviatura</Form.Label>
                                <div className={"flex items-end w-15"}>
                                    <Form.Control placeholder={props.department ? props.department.shorthand : ""} onChange={event => setShorthand(event.target.value)} required isInvalid={wrongShorthand} />
                                </div>

                            </div>
                    }
                    </div>

                </Form>
            </Modal.Body>

            <Modal.Footer>

                {eliminateButton()}

                <Button variant="success" onClick={props.department ? handleDepartmentEdit : handleDepartmentUpload}>
                    Aceptar
                </Button>
                <Button onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>

        </Modal>
    );
}