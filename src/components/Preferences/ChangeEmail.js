import {Button, Form, Modal} from "react-bootstrap";
import './Modal.css'
import {useEffect, useState} from "react";
import tokenFetch from "../Common/tokenFetch";
import {useDispatch, useSelector} from "react-redux";
import {changeEmail} from "../../features/user/userSlice";

export function ChangeEmail(props) {
    const [newEmail, setNewEmail] = useState("");
    const [validated, setValidated] = useState(false);
    const [wrongEmail, setWrongEmail] = useState("");
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        setWrongEmail("");
        handleEmailChange();
        event.preventDefault();
        event.stopPropagation();
    };

    useEffect(() => {
        if((wrongEmail==="") && (validated)){
            setValidated(false);
            props.onHide()
        }
    }, [wrongEmail, validated, props])

    const handleEmailChange = () => {
        tokenFetch("changeEmail", {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                newEmail: newEmail,
            })
        }).then(response => response.json())
            .then(resp => {
                if(resp.email){
                    setValidated(true);
                    dispatch(changeEmail(resp));
                }else{
                    if(resp==="email already in use"){
                        setWrongEmail("used");
                    }
                    if(resp==="invalid email"){
                        setWrongEmail("invalid");
                    }
                }
            })
            .catch(error => {throw new Error(error)});

    }

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
                        <h3 className={"h-auto"}> Cambiar correo electrónico </h3>
                    </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>{user.userInfo.email}</h4>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 pv3" controlId="formBasicEmail">
                        <Form.Label>Nuevo correo electrónico</Form.Label>
                        <Form.Control type="email" placeholder="ejemplo@universidad.edu" onChange={event => setNewEmail(event.target.value)} required isInvalid={wrongEmail} />
                        <Form.Control.Feedback type="invalid">
                            {wrongEmail==="used" ?  "Correo electrónico ya usado" : "Correo electrónico inválido"}
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