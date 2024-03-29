import {Button, Form, Modal} from "react-bootstrap";
import './Modal.css'
import {useEffect, useState} from "react";
import {tokenFetch} from "../Common/functions/tokenFetch";
import {useDispatch, useSelector} from "react-redux";
import {changeName} from "../../features/user/userSlice";

export function ChangeName(props) {
    const [newName, setNewName] = useState("");
    const [validated, setValidated] = useState(false);
    const [wrongName, setWrongName] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        setWrongName(false);
        handleNameChange();
        event.preventDefault();
        event.stopPropagation();
    };

    useEffect(() => {
        if((!wrongName) && (validated)){
            setValidated(false);
            props.onHide();
        }
    }, [wrongName, validated, props])

    const handleNameChange = () => {
        tokenFetch("changeName", {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                newName: newName,
            })
        }).then(resp => {
            if(resp!==undefined){
                if(resp.userName){
                    setValidated(true);
                    dispatch(changeName(resp));
                }else{
                    setWrongName(true);
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
                    <h3 className={"h-auto"}> Cambiar nombre </h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>{user.userInfo.userName}</h4>
                <Form noValidate validated={validated}>
                    <Form.Group className="mb-3 pv3" controlId="formBasicEmail">
                        <Form.Label>Nuevo nombre</Form.Label>
                        <Form.Control type="text" placeholder="John Doe" onChange={event => setNewName(event.target.value)} required isInvalid={wrongName} />
                        <Form.Control.Feedback type="invalid">
                            El nombre indicado no es válido
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant={"primary"} onClick={handleSubmit}>Cambiar</Button>
                <Button variant={"danger"} onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>

        </Modal>
    );
}