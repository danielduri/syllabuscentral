import {Button, Form, Modal} from "react-bootstrap";
import './Modal.css'
import {useEffect, useState} from "react";
import {tokenFetch} from "../Common/functions/tokenFetch";
import {useDispatch, useSelector} from "react-redux";
import {changeEmail} from "../../features/user/userSlice";

export function FileUpload(props)
 {
    const [newEmail, setNewEmail] = useState("");
    const [validated, setValidated] = useState(false);
    const [wrongEmail, setWrongEmail] = useState("");
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if((wrongEmail==="") && (validated)){
            setValidated(false);
            props.onHide()
        }
    }, [wrongEmail, validated, props])


     const [image, setImage] = useState({ preview: '', data: '' })
     const [status, setStatus] = useState('')
     const handleSubmit = async (e) => {
         e.preventDefault()
         let formData = new FormData()
         formData.append('file', image.data)
         const response = await fetch('http://localhost:5000/image', {
             method: 'POST',
             body: formData,
         })
         if (response) setStatus(response.statusText)
     }

     const handleFileChange = (e) => {
         const img = {
             preview: URL.createObjectURL(e.target.files[0]),
             data: e.target.files[0],
         }
         setImage(img)
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
                    <h3 className={"h-auto"}> Subir modelo </h3>
                </Modal.Title>
            </Modal.Header>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Modal.Body>
                {image.preview && <img src={image.preview} width='100' height='100' />}
                <input type='file' name='file' onChange={handleFileChange}></input>

                {status && <h4>{status}</h4>}
            </Modal.Body>

            <Modal.Footer>
                <Button className={'mv3'} variant={'success'} type='submit'>Subir</Button>
                <Button onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>

            </Form>

        </Modal>
    );
}