import React, {useEffect, useState} from "react";
import {tokenFetch} from "../../Common/functions/tokenFetch";
import {Button, Table} from "react-bootstrap";
import Unauthorized from "../../Common/Unauthorized";
import {useSelector} from "react-redux";
import {EditDepartment} from "./EditDepartment";
import {CourseViewer} from "../../Courses/CourseViewer";
import {listCourses} from "../commonFunctions";

function Departments (){

    const [ editDepartment, setEditDepartment ] = useState(false);
    const [ newDepartment, setNewDepartment ] = useState(false);

    const [ department, setDepartment ] = useState(undefined);
    const [ list, setList ] = useState([]);

    const [ course, setCourse ] = useState(undefined);
    const [ courseViewer, setCourseViewer ] = useState(false);

    const user = useSelector((state) => state.user);

    const getDepartmentForEdit = (item) => {
        setDepartment({
            shorthand: item.shorthand,
            name: item.department,
            departmentID: item.departmentID,
            headcount: item.members.length
        })
        setEditDepartment(true);
    }

    const getList = () => {
        tokenFetch('getDepartments', {
            method: 'get',
            headers: {"Content-type": "application/json"},
        }).then(data =>{
            if(data.length>0){
                let itemList = [];

                for (let i = 0; i < data.length; i++) {
                    const item = data[i];

                    const courses = listCourses(item.courses, setCourse, setCourseViewer);
                    let members = [];


                    for (const member of item.members) {
                        members.push(
                            <li key={member.userID+"member"}>{member.userName}</li>
                        )
                    }

                    itemList.push( <tr key={item.departmentID}>
                        <td className={"pointer"} onClick={()=>getDepartmentForEdit(item)}>{item.shorthand}</td>
                        <td className={"pointer"} onClick={()=>getDepartmentForEdit(item)}>{item.department}</td>
                        <td key={item.departmentID+"c"}><ul key={item.departmentID+"cl"}>{courses}</ul></td>
                        <td  className={"pointer"} onClick={()=>getDepartmentForEdit(item)} key={item.departmentID+"m"}><ul key={item.departmentID+"ml"}>{members}</ul></td>
                    </tr>)
                }
                setList(itemList)
            }else{
                setList([]);
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

                    <EditDepartment show={newDepartment} onHide={()=>setNewDepartment(false)}></EditDepartment>
                    <EditDepartment show={editDepartment} onHide={()=>setEditDepartment(false)} department={department}></EditDepartment>
                    <CourseViewer show={courseViewer} mode={"view"} model={course} onHide={()=>{setCourseViewer(false)}}></CourseViewer>

                    <div className={"center tc pa3"}>
                        <Button variant={"warning"} className={"w-20 ma1"} onClick={() => {
                            setNewDepartment(true)
                        }}>
                            Nuevo departamento</Button>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Abreviatura</th>
                            <th>Departamento</th>
                            <th>Asignaturas</th>
                            <th>Miembros</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list}
                        </tbody>
                    </Table>

                </div>
        : <Unauthorized/>}
        </>

    )

}

export default Departments;