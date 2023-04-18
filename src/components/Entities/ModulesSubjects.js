import React, {useEffect, useState} from "react";
import {tokenFetch} from "../Common/functions/tokenFetch";
import {Button, Table} from "react-bootstrap";
import Unauthorized from "../Common/Unauthorized";
import {useSelector} from "react-redux";
import {listCourses} from "./commonFunctions";
import {EditModule} from "./Modules/EditModule";
import {CourseViewer} from "../Courses/CourseViewer";
import {EditSubject} from "./Subjects/EditSubject";

function ModulesSubjects (){

    const [ editModule, setEditModule ] = useState(false);
    const [ newModule, setNewModule ] = useState(false);

    const [ module, setModule ] = useState(undefined);
    const [ moduleList, setModuleList ] = useState([]);

    const [ editSubject, setEditSubject ] = useState(false);
    const [ newSubject, setNewSubject ] = useState(false);

    const [ subject, setSubject ] = useState(undefined);
    const [ subjectList, setSubjectList ] = useState([]);

    const [ course, setCourse ] = useState(undefined);
    const [ courseViewer, setCourseViewer ] = useState(false);

    const user = useSelector((state) => state.user);

    const getModuleForEdit = (item) => {
        setModule({
            moduleID: item.moduleID,
            moduleName: item.moduleName,
            moduleDegree: item.moduleDegree,
            moduleDegreeID: item.moduleDegreeID,
        })
        setEditModule(true);
    }

    const getSubjectForEdit = (item) => {
        setSubject({
            subjectID: item.subjectID,
            subjectName: item.subjectName,
            subjectDegree: item.subjectDegree,
            subjectDegreeID: item.subjectDegreeID,
        })
        setEditSubject(true);
    }

    const getList = () => {
        tokenFetch('getModules', {
            method: 'get',
            headers: {"Content-type": "application/json"},
        }).then(data =>{
            if(data.length>0){
                let itemList = [];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if(i>0){
                        if(item.moduleDegreeID!==data[i-1].moduleDegreeID){
                            itemList.push(<tr className={"bg-light-blue"} key={item.moduleDegreeID+"ModuleRow"}><td colSpan={100}><h4 className={"pv2 dark-blue"}>{item.moduleDegree} (Módulos)</h4></td></tr>)
                        }
                    }else{
                        itemList.push(<tr className={"bg-light-blue"} key={item.moduleDegreeID+"ModuleRow0"}><td colSpan={100}><h4 className={"pv2 dark-blue"}>{item.moduleDegree} (Módulos)</h4></td></tr>)
                    }

                    const courses = listCourses(item.courses, setCourse, setCourseViewer)

                    itemList.push( <tr key={item.moduleID+"m"}>
                        <td className={"pointer"} onClick={()=>getModuleForEdit(item)}><h4><strong>{item.moduleName}</strong></h4><p>{item.moduleDegree}</p></td>
                        <td>
                            {courses}
                        </td>
                    </tr>)
                }
                setModuleList(itemList)
            }else{
                setModuleList([]);
            }
        })

        tokenFetch('getSubjects', {
            method: 'get',
            headers: {"Content-type": "application/json"},
        }).then(data =>{
            if(data.length>0){
                let itemList = [];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if(i>0){
                        if(item.subjectDegreeID!==data[i-1].subjectDegreeID){
                            itemList.push(<tr className={"bg-orange"} key={item.subjectDegreeID+"SubjectRow"}><td colSpan={100}><h4 className={"pv2 dark-blue"}>{item.subjectDegree} (Materias)</h4></td></tr>)
                        }
                    }else{
                        itemList.push(<tr className={"bg-orange"} key={item.subjectDegreeID+"SubjectRow0"}><td colSpan={100}><h4 className={"pv2 dark-blue"}>{item.subjectDegree} (Materias)</h4></td></tr>)
                    }

                    const courses = listCourses(item.courses, setCourse, setCourseViewer)

                    itemList.push( <tr key={item.subjectID+"s"}>
                        <td className={"pointer"} onClick={()=>getSubjectForEdit(item)}><h4><strong>{item.subjectName}</strong></h4><p>{item.subjectDegree}</p></td>
                        <td>
                            {courses}
                        </td>
                    </tr>)
                }
                setSubjectList(itemList)
            }else{
                setSubjectList([]);
            }
        })

    }

    useEffect(() => {
        getList()
    }, [])



    return (
        <>
        {user.userInfo.userType >= 1 ?
                <div className={"center"}>

                    <EditModule show={newModule} onHide={()=>setNewModule(false)}></EditModule>
                    <EditModule show={editModule} onHide={()=>setEditModule(false)} module={module}></EditModule>
                    <EditSubject show={newSubject} onHide={()=>setNewSubject(false)}></EditSubject>
                    <EditSubject show={editSubject} onHide={()=>setEditSubject(false)} subject={subject}></EditSubject>
                    <CourseViewer show={courseViewer} mode={"view"} model={course} onHide={()=>{setCourseViewer(false)}}></CourseViewer>


                    <div className={"center tc pa3"}>
                        <Button variant={"secondary"} className={"w-20 ma1 bg-light-blue black"} onClick={() => {
                            setNewModule(true)
                        }}>
                            Nuevo módulo</Button>

                        <Button variant={"secondary"} className={"w-20 ma1 bg-orange black"} onClick={() => {
                            setNewSubject(true)
                        }}>
                            Nueva materia</Button>
                    </div>



                    <Table striped bordered hover>
                        <thead>
                        <tr key={"moduleHeader"}>
                            <th>Módulo</th>
                            <th>Asignaturas</th>
                        </tr>
                        </thead>
                        <tbody>
                        {moduleList}
                        </tbody>
                    </Table>

                    <hr/>

                    <Table striped bordered hover>
                        <thead>
                        <tr key={"subjectHeader"}>
                            <th>Materia</th>
                            <th>Asignaturas</th>
                        </tr>
                        </thead>
                        <tbody>
                        {subjectList}
                        </tbody>
                    </Table>

                </div>
        : <Unauthorized/>}
        </>

    )

}

export default ModulesSubjects;