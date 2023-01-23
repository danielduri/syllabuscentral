import {Button, Modal} from "react-bootstrap";
import './Modal.css'
import {useEffect, useState} from "react";
import {tokenFetch} from "../Common/functions/tokenFetch";


export function ModelUpload(props)
 {

     const [selectedFile, setSelectedFile] = useState(null);
     const [isFilePicked, setIsFilePicked] = useState(false);
     const [feedback, setFeedback] = useState("");

     useEffect(() => {
         setFeedback("")
         setSelectedFile(null)
         setIsFilePicked(false)
     }, [props.show])

     const handleSubmission = () => {
         const formData = new FormData();

         formData.append('file', selectedFile);

         tokenFetch(
             'uploadDoc',
             {
                 method: 'POST',
                 body: formData,
             }
         )
             .then((result) => {
                 if(result.toString().substring(0, 7)!=="Invalid"){
                     props.setModel(result);
                     props.onHide();
                     props.openViewer(true);
                 }else{
                     setFeedback(result)
                 }

             })
             .catch((error) => {
                 console.error('Error:', error);
             });
     };

     const changeHandler = (event) => {
         setSelectedFile(event.target.files[0]);
         setIsFilePicked(true);
         setFeedback("")
     };

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

            <Modal.Body>
                <h3 className={"red"}>{feedback}</h3>
                <Button variant={"success"}><input type="file" name="file" onChange={changeHandler} /></Button>
                <h3> </h3>
                {isFilePicked ? (
                    <div>
                        <p>Nombre de fichero: {selectedFile.name}</p>
                        <p>Tipo de fichero: {selectedFile.type}</p>
                        <p>Tamaño en bytes: {selectedFile.size}</p>
                        <p>
                            Fecha de modificación:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p></p>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button className={'mv3'} variant={'success'} onClick={handleSubmission}>Subir</Button>
                <Button onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>

        </Modal>
    );
}