import {Button, Form, Modal, OverlayTrigger, Popover, Tooltip} from "react-bootstrap";
import '../Modal.css'
import React, {useEffect, useState} from "react";
import {tokenFetch} from "../Common/functions/tokenFetch";
import Select from "react-select";
import {
    generateOption,
    generateOptionWithValue,
    validateEmail,
    validateName,
    validatePassword
} from "../Common/functions/misc";
import {displayUserType} from "../Preferences/Preferences";
import {useSelector} from "react-redux";

export function EditUser(props) {
    const [newName, setNewName] = useState("");
    const [wrongName, setWrongName] = useState("");

    const [newEmail, setNewEmail] = useState("");
    const [wrongEmail, setWrongEmail] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);

    const [wrongNewPassword, setWrongNewPassword] = useState(false);

    const [newDepartment, setNewDepartment] = useState(generateOption(""));
    const [departmentOptions, setDepartmentOptions] = useState("");
    const [emptyDepartment, setEmptyDepartment] = useState(false);

    const [isEditable, setIsEditable] = useState(true);

    const currentUser = useSelector ((state) => state.user)


    const handleUserEdit = () => {
        let data = {userID: props.user.userID};

        if(newName!==""){
            data.name=newName;
        }

        if(newPassword!==""){
            if(newPassword===newPassword2) {
                setPasswordsNotMatch(false)
                data.password = newPassword
            }else {
                setPasswordsNotMatch(true)
            }
        }

        if(newEmail!=="") {
            data.email = newEmail
        }

        if(newDepartment.value!==props.user.departmentID) {
            data.department = newDepartment.value
        }

        if(!passwordsNotMatch && !wrongNewPassword && !emptyDepartment && !wrongName && !wrongEmail){
            tokenFetch("editUser", {
                method: 'put',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            }).then(resp => {
                if(resp!==undefined){
                    if(resp==="OK"){
                        props.onHide();
                        window.location.reload()
                    }else{
                        setFeedback(resp)
                    }
                }
            }).catch(error => {throw new Error(error)});
        }

    }

    const handleUserUpload = () => {
        let upload=(!passwordsNotMatch && !wrongNewPassword && !emptyDepartment && !wrongName && !wrongEmail)

        if(newName===""){
            setWrongName("empty")
            upload=false
        }else{
            setWrongName("")
        }

        if(newEmail===""){
            setWrongEmail("empty")
            upload=false
        }else {
            setWrongEmail("")
        }

        if(newPassword===""){
            setWrongNewPassword(true)
            upload=false
        }else{
            setWrongNewPassword(false)
            if(newPassword!==newPassword2) {
                setPasswordsNotMatch(true)
                upload=false
            }else {
                setPasswordsNotMatch(false)
            }
        }

        if(newDepartment.value===""){
            setEmptyDepartment(true)
            upload=false
        }else {
            setEmptyDepartment(false)
        }

        if(upload){
            tokenFetch("newUser", {
                method: 'post',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    name: newName,
                    password: newPassword,
                    email: newEmail,
                    department: Number.parseInt(newDepartment.value),
                })
            }).then(resp => {
                if(resp!==undefined){
                    if(Number.isInteger(resp)){
                        props.onHide();
                        window.location.reload()
                    }else{
                        setFeedback(resp)
                    }
                }
            }).catch(error => {throw new Error(error)});
        }
    }

    const handleUserDelete = () => {
        tokenFetch('deleteUser', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                userID: props.user.userID
            })
        }).then(res => {
            if(res==="OK"){
                props.onHide()
                window.location.reload()
            }
        }, (res => console.log(res)))
    }

    const handleUserPromote = () => {
        let newUserType = 0
        if (props.user.userType === 0) {
            newUserType = 1
        }
        tokenFetch('promoteUser', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                userID: props.user.userID,
                newUserType: newUserType
            })
        }).then(res => {
            if(res==="OK"){
                props.onHide()
                window.location.reload()
            }
        }, (res => console.log(res)))
    }

    const populateDepartmentOptions = (json) => {
        let depOp = []
        for (const jsonElement of json) {
            depOp.push(generateOptionWithValue(jsonElement.departmentName, jsonElement.departmentID))
        }
        setDepartmentOptions(depOp)
    }

    useEffect(() => {
        if(props.show){
            setNewName("")
            setWrongName("")
            setNewEmail("")
            setWrongEmail("")
            setNewPassword("")
            setNewPassword2("")
            setPasswordsNotMatch(false)
            setWrongNewPassword(false)
            setEmptyDepartment(false)

            tokenFetch("getDepartmentNames", {
                method: 'get',
                headers: {"Content-type": "application/json"}
            }).then(resp => populateDepartmentOptions(resp))

            if(props.user){
                setIsEditable(!disableFields(props.user.isEditable))
                setNewDepartment(generateOptionWithValue(props.user.departmentName, props.user.departmentID))
            }
        }
    }, [props.show, props.user])

    useEffect(() => {
        if(!validateName(newName) && newName!==""){
            setWrongName("invalid")
        }else{
            setWrongName("")
        }
    }, [newName])

    useEffect(() => {
        if(!validatePassword(newPassword) && newPassword!=="") {
            setWrongNewPassword(true)
        }else{
            setWrongNewPassword(false)
        }
    }, [newPassword])

    useEffect(() => {
        if(!validateEmail(newEmail) && newEmail!=="") {
            setWrongEmail("invalid")
        }else{
            setWrongEmail("")
        }
    }, [newEmail])


    useEffect(() => {
        if(newPassword!==newPassword2) {
            setPasswordsNotMatch(true)
        }else{
            setPasswordsNotMatch(false)
        }
    }, [newPassword, newPassword2])

    const setFeedback = (hint) => {
        switch (hint) {
            case "Invalid name":
                setWrongName("invalid")
                break;
            case "Invalid email":
                setWrongEmail("invalid")
                break;
            case "Invalid password":
                setWrongNewPassword(true)
                break;
            case "Used name":
                setWrongName("used")
                break;
            case "Used email":
                setWrongEmail("used")
                break;
            default:
                setWrongName("invalid")
                setWrongEmail("invalid")
                setWrongNewPassword(true)
                break;
        }
    }

    const eliminateText = (hint) => {
        switch (hint) {
            case "self":
                return "No puedes eliminarte a ti mismo."
            case "admin":
                return "No puedes eliminar al administrador."
            case "rank":
                return "No puedes eliminar a un usuario con un rango igual o superior al tuyo."
            case "degree":
                return "No puedes eliminar a un usuario que sea coordinador de uno o más grados."
            case "course":
                return "No puedes eliminar a un usuario que sea coordinador de una o más asignaturas."
            default:
                return "No puedes eliminar a este usuario."
        }
    }

    const editText = (hint) => {
        switch (hint) {
            case "admin":
                return "No puedes editar al administrador."
            case "rank":
                return "No puedes editar a un usuario con un rango igual o superior al tuyo."
            default:
                return "No puedes editar a este usuario."
        }
    }

    const disableFields = (isEditable) => {
        return !(isEditable === "yes" || isEditable === "self" || isEditable === "degree" || isEditable === "course");
    }

    const eliminateButton = () => {
        if(props.user){
            if(props.user.isEditable==="yes"){
                return <OverlayTrigger rootClose={true} trigger="click" placement="top" overlay={confirmEliminatePopover}>
                    <Button variant="danger" className={"mr-auto"} key={"delete"}>Eliminar</Button>
                </OverlayTrigger>
            }else{
                return <OverlayTrigger
                    key={"no-eliminate"}
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-no-eliminate`}>
                            {eliminateText(props.user.isEditable)}
                        </Tooltip>
                    }>
                    <Button variant="danger" disabled={false} className={"mr-auto"} key={"delete"}>Eliminar</Button>

                </OverlayTrigger>
            }
        }else{
            return <></>
        }
    }

    const editButton = () => {
        if(props.user){
            if(props.user.isEditable==="yes" || props.user.isEditable==="self" || props.user.isEditable==="degree" || props.user.isEditable==="course"){
                return <Button variant="success" onClick={handleUserEdit}>
                            Aceptar
                </Button>
            }else{
                return <OverlayTrigger
                    key={"no-eliminate"}
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-no-eliminate`}>
                            {editText(props.user.isEditable)}
                        </Tooltip>
                    }>
                    <Button variant="success" disabled={false} key={"delete"}>Editar</Button>

                </OverlayTrigger>
            }
        }else{
            return <Button variant="success" onClick={handleUserUpload}>
                Aceptar
            </Button>
        }
    }

    const userType = () => {
        if(props.user && props.user.userType!==2){
            let button = <></>
            if(currentUser.userInfo.userType>=2){
                let buttonVariant = "primary"
                let buttonText = "Hacer administrador"
                if(props.user.userType===1){
                    buttonVariant = "danger"
                    buttonText = "Quitar administrador"
                }
                button = <Button variant={buttonVariant} onClick={handleUserPromote}>{buttonText}</Button>
                if(props.user.isEditable==="degree"){
                    button =
                        <OverlayTrigger
                        key={"no-promote"}
                        placement={"top"}
                        overlay={
                            <Tooltip id={`tooltip-no-promote`}>
                                No puedes quitar el rol de administrador a un usuario que sea coordinador de uno o más grados.
                            </Tooltip>
                        }>
                        <Button variant={buttonVariant} disabled={false}>{buttonText}</Button>
                    </OverlayTrigger>
                }
            }

            return <Form.Group className="mb-3">
                <Form.Label>Tipo de usuario</Form.Label>
                <div><h4>{displayUserType(props.user.userType)}</h4>{button}</div>

            </Form.Group>
        }else{
            return <></>
        }
    }

    const confirmEliminatePopover = (
        <Popover id="confirmEliminatePopover">
            <Popover.Header as="h3">Confirmación</Popover.Header>
            <Popover.Body>
                Esta acción es irreversible. ¿Seguro que desea eliminar este usuario?
                <p></p>
                <h3> </h3>
                <Button className={"w-100"} variant={"danger"} onClick={handleUserDelete}>Sí, seguro</Button>
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
                    <h3 className={"h-auto"}> {props.user ? "Editar usuario" : "Nuevo usuario"} </h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form autoComplete="none">
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control autoComplete="new-password" disabled={!isEditable} placeholder={props.user ? props.user.userName : ""} onChange={event => setNewName(event.target.value)} required isInvalid={wrongName!==""} />
                        <Form.Control.Feedback type="invalid">
                            {wrongName==="used" ?  "Nombre ya usado" : wrongName==="empty" ? "Nombre vacío" : "Nombre inválido"}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control autoComplete="new-password" type="email" disabled={!isEditable} placeholder={props.user ? props.user.email : ""} onChange={event => setNewEmail(event.target.value)} isInvalid={wrongEmail!==""} />
                        <Form.Control.Feedback type="invalid">
                            {wrongEmail==="used" ?  "Correo electrónico ya usado" : wrongEmail==="empty" ? "Correo electrónico vacío" : "Correo electrónico inválido"}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="newPassword1">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control autoComplete="new-password" type="password" disabled={!isEditable} placeholder={props.user ? "[No cambiar]" : ""} onChange={event => setNewPassword(event.target.value)} isInvalid={wrongNewPassword}/>
                        <Form.Control.Feedback type="invalid">
                            La contraseña debe contener al menos 6 caracteres, entre ellos al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="newPassword2">
                        <Form.Label>Repita la contraseña</Form.Label>
                        <Form.Control autoComplete="on" type="password" onChange={event => setNewPassword2(event.target.value)} disabled={newPassword===""} isInvalid={passwordsNotMatch}/>
                        <Form.Control.Feedback type="invalid">
                            Ambas contraseñas deben coincidir
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className={emptyDepartment ? "red" : ""}>Departamento</Form.Label>
                        <Select
                            isDisabled={!isEditable}
                            options={departmentOptions}
                            className={"tl pa2"}
                            onChange={event => setNewDepartment(event)}
                            value={newDepartment}
                        />
                    </Form.Group>

                    {
                        userType()
                    }

                </form>
            </Modal.Body>

            <Modal.Footer>

                {props.user
                    ? eliminateButton()
                    : <></>
                }

                {editButton()}
                <Button onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>

        </Modal>
    );
}