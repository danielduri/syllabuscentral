import {Button, Form, Modal} from "react-bootstrap";
import './Modal.css'
import {useEffect, useState} from "react";
import {tokenFetch} from "../Common/functions/tokenFetch";

export function ChangePassword(props) {
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);
    const [wrongNewPassword, setWrongNewPassword] = useState(false);
    const [wrongOldPassword, setWrongOldPassword] = useState(false);

    const handleSubmit = (event) => {
        setWrongNewPassword(false);
        setWrongOldPassword(false);
        handlePasswordChange();
        event.preventDefault();
        event.stopPropagation();
    };

    useEffect(() => {
        if((!wrongNewPassword) && (!wrongOldPassword) && (!passwordsNotMatch) && (validated)){
            setValidated(false);
            props.onHide();
        }
    }, [wrongNewPassword, wrongOldPassword, passwordsNotMatch, validated, props])

    useEffect(() => {
        if(newPassword!==newPassword2){
            setPasswordsNotMatch(true);
        }else {
            setPasswordsNotMatch(false)
        }
    }, [newPassword, newPassword2])

    const handlePasswordChange = () => {
        if(!passwordsNotMatch){
            tokenFetch("changePassword", {
                method: 'put',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    newPassword: newPassword,
                    oldPassword: oldPassword
                })
            }).then(resp => {
                if(resp!==undefined){
                    if(resp==="OK"){
                        setValidated(true);
                    }else{
                        if(resp==="wrong password"){
                            setWrongOldPassword(true);
                        }
                        if(resp==="invalid new password"){
                            setWrongNewPassword(true);
                        }
                    }
                }
            })
                .catch(error => {throw new Error(error)});
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className={"h-auto"}>
                <Modal.Title id="contained-modal-title-vcenter" className={"h-auto"}>
                    <h3 className={"h-auto"}> Cambiar contraseña </h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="oldPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" onChange={event => setOldPassword(event.target.value)} required isInvalid={wrongOldPassword}/>
                        <Form.Control.Feedback type="invalid">
                            Contraseña incorrecta
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="newPassword1">
                        <Form.Label>Nueva contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Nueva contraseña" onChange={event => setNewPassword(event.target.value)} required isInvalid={wrongNewPassword}/>
                        <Form.Control.Feedback type="invalid">
                            La contraseña debe contener al menos 6 caracteres, entre ellos al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="newPassword2">
                        <Form.Label>Repita la nueva contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Nueva contraseña" onChange={event => setNewPassword2(event.target.value)} required isInvalid={passwordsNotMatch}/>
                        <Form.Control.Feedback type="invalid">
                            Ambas contraseñas deben coincidir
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Cambiar
                    </Button>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>

        </Modal>
    );
}