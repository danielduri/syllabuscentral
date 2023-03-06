import React, {useEffect, useState} from "react";
import {Button, Form, Table} from "react-bootstrap";
import {CourseViewer} from "./CourseViewer";
import {CourseUpload} from "./CourseUpload";
import {tokenFetch} from "../Common/functions/tokenFetch";

function getModel(courseID) {
    return tokenFetch(`getModel?courseid=${courseID}`, {
        method: 'get',
        headers: {"Content-type": "application/json"},
    }).then(res => {
        return res;
    })
}

function Courses (){

    const [searchText, setSearchText] = useState("");
    const [ newModel, setNewModel ] = useState(false);
    const [ view, setView ] = useState(false);
    const [ copy, setCopy ] = useState(false);
    const [ upload, setUpload ] = useState(false);
    const [ validate, setValidate ] = useState(false);
    const [ model, setModel ] = useState(undefined);

    const [ list, setList ] = useState([]);

    const getCourseForView = (courseID) => {
        getModel(courseID).then(response => {
            setModel(response);
            setView(true);
        })
    }

    const getList = (search) => {
        tokenFetch('getModels', {
            method: 'put',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                search: search
            })
        }).then(data =>{
            if(data!==undefined && data.length>0){
                let itemList = [];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if(i>0){
                        if(item.degree!==data[i-1].degree){
                            itemList.push(<tr key={item.degree}><td colSpan={100}><h4 className={"pv2"}>{item.degree}</h4></td></tr>)
                        }
                    }else{
                        itemList.push(<tr key={item.degree}><td colSpan={100}><h4 className={"pv2"}>{item.degree}</h4></td></tr>)
                    }
                    itemList.push( <tr key={item.courseid}>
                        <td className={"pointer"} onClick={()=>getCourseForView(item.courseid)}>{item.courseid}</td>
                        <td className={"pointer"} onClick={()=>getCourseForView(item.courseid)}>{item.shorthand}</td>
                        <td className={"pointer"} onClick={()=>getCourseForView(item.courseid)}>{item.name}</td>
                        <td className={"pointer"} onClick={()=>getCourseForView(item.courseid)}>{item.ECTS}</td>
                        <td className={"pointer"} onClick={()=>getCourseForView(item.courseid)}>{item.coordinator}</td>
                        <td className={"pointer"} onClick={()=>getCourseForView(item.courseid)}>{item.department}</td>
                        <td className={"pointer"} onClick={()=>getCourseForView(item.courseid)}>{item.type}</td>
                        <td>
                            <div>
                                <Button variant={"success"} key={item.courseid + "copy"} className={"ma1"} onClick={() => {
                                    getModel(item.courseid).then(response => {
                                        setModel(response);
                                        setCopy(true);
                                    })
                                }}>Copiar</Button>
                        </div>
                        </td>
                    </tr>)
                }
                setList(itemList)
            }else{
                setList([]);
            }
        })
    }

    useEffect(() => {
        getList(searchText)
    }, [searchText])



    return (
        <div className={"center"}>
            <Form className="d-flex w-50 center">
                <Form.Control
                    type="search"
                    placeholder="Buscar..."
                    className="me-2"
                    aria-label="Search"
                    onChange={event => setSearchText(event.target.value)}
                    value={searchText}
                />
                {//searchText==="" ? <></> : <Button variant="outline-danger" onClick={() => setSearchText("")}>Borrar</Button>
                }
            </Form>

            <div className={"center tc pa3"}>
                <Button variant={"success"} className={"w-20 ma1"} onClick={() => setNewModel(true)}>
                    Nuevo modelo</Button>
                <CourseViewer show={newModel} mode={"create"} onHide={() => setNewModel(false)}></CourseViewer>

                <CourseViewer show={view} mode={"view"} model={model} onHide={() => setView(false)}></CourseViewer>

                <CourseViewer show={copy} mode={"copy"} model={model} onHide={() => setCopy(false)}></CourseViewer>

                <CourseViewer show={validate} mode={"validate"} model={model} onHide={() => setValidate(false)}></CourseViewer>

                <Button variant={"success"} className={"w-20 ma1"} onClick={() => setUpload(true)}>
                    Subir modelo</Button>
                <CourseUpload show={upload} onHide={() => setUpload(false)} setModel={setModel} openViewer={setValidate}></CourseUpload>

            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Abrev.</th>
                    <th>Asignatura</th>
                    <th>ECTS</th>
                    <th>Coordinador</th>
                    <th>Departamento</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {list.length > 0 ? list : <tr><td colSpan={100}><p className={"fw6 pv4"}>No hay resultados. Busca por nombre, abreviatura o código. </p></td></tr>}
                </tbody>
            </Table>

        </div>
    )

}

export default Courses;