import React, {useEffect, useState} from "react";
import {tokenFetch} from "../../Common/functions/tokenFetch";
import {Button, Table} from "react-bootstrap";
import Unauthorized from "../../Common/Unauthorized";
import {useSelector} from "react-redux";
import {EditSchool} from "./EditSchool";

function Schools (){

    const [ edit, setEdit ] = useState(false);
    const [ newSchool, setNewSchool ] = useState(false);

    const [ school, setSchool ] = useState(undefined);
    const [ list, setList ] = useState([]);

    const user = useSelector((state) => state.user);

    const getList = () => {
        tokenFetch('getSchools', {
            method: 'get',
            headers: {"Content-type": "application/json"},
        }).then(data =>{
            if(data.length>0){
                let itemList = [];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    itemList.push( <tr key={item.degreeID}>
                        <td>{item.schoolName}</td>
                        <td>
                            {item.degreeCount} grado(s) <br/>
                            {item.courseCount} asignatura(s) <br/>
                            {item.departmentCount} departamento(s) <br/>
                            {item.userCount} usuario(s) <br/>
                        </td>
                        <td>
                            <div>
                                <Button variant={"dark"} key={item.degreeID+"edit"} className={"mh1"} onClick={() => {
                                    setSchool({
                                        schoolName: item.schoolName,
                                        schoolID: item.schoolID
                                    })
                                    setEdit(true);
                                }}>Editar</Button>

                                <Button variant={"primary"} key={item.degreeID+"switch"} className={"mh1"} onClick={() => {
                                    tokenFetch('switchSchool', {
                                        method: 'put',
                                        headers: {"Content-type": "application/json"},
                                        body: JSON.stringify({
                                            schoolID: item.schoolID
                                        })
                                    }).then(data => {
                                        if (data === "OK") {
                                            window.location.href = "/courses"
                                        }
                                    })
                                }}>Acceder</Button>
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
        getList()
    }, [])



    return (
        <>
            {user.userInfo.userType >= 2 ?
                <div className={"center"}>

                    <EditSchool show={edit} onHide={() => {setEdit(false)}} school={school}/>
                    <EditSchool show={newSchool} onHide={() => {setNewSchool(false)}}/>

                    <div className={"center tc pa3"}>
                        <Button variant={"dark"} className={"w-20 ma1"} onClick={() => {
                            setNewSchool(true)
                        }}>
                            Nueva facultad</Button>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr key={"schoolHeader"}>
                            <th>Nombre</th>
                            <th>Estadísticas</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody key={"schoolBody"}>
                        {list}
                        </tbody>
                    </Table>

                </div>
                : <Unauthorized/>}
        </>

    )

}

export default Schools;