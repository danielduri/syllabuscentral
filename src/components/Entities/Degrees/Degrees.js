import React, {useEffect, useState} from "react";
import {tokenFetch} from "../../Common/functions/tokenFetch";
import {Button, Table} from "react-bootstrap";
import Unauthorized from "../../Common/Unauthorized";
import {useSelector} from "react-redux";
import {EditDegree} from "./EditDegree";

function Degrees (){

    const [ edit, setEdit ] = useState(false);
    const [ newDegree, setNewDegree ] = useState(false);

    const [ degree, setDegree ] = useState(undefined);
    const [ list, setList ] = useState([]);

    const user = useSelector((state) => state.user);

    const getList = () => {
        tokenFetch('getDegrees', {
            method: 'get',
            headers: {"Content-type": "application/json"},
        }).then(data =>{
            if(data && data.length>0){
                let itemList = [];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    itemList.push( <tr key={item.degreeID} className={"pointer"} onClick={() => {
                        setDegree({
                            name: item.name,
                            duration: item.duration,
                            degreeID: item.degreeID,
                            coordinator: item.coordinator,
                            coordinatorID: item.coordinatorID
                        })
                        setEdit(true);
                    }} >
                        <td>{item.name}</td>
                        <td>
                            {item.courses} asignatura(s) <br/>
                            {item.modules} módulo(s) <br/>
                            {item.subjects} materia(s) <br/>
                            {item.ECTS} ECTS <br/>
                        </td>
                        <td>{item.duration} años</td>
                        <td>{item.coordinator}</td>
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

                    <EditDegree show={newDegree} onHide={()=>setNewDegree(false)}></EditDegree>
                    <EditDegree show={edit} onHide={()=>setEdit(false)} degree={degree}></EditDegree>

                    <div className={"center tc pa3"}>
                        <Button variant={"info"} className={"w-20 ma1"} onClick={() => {
                            setNewDegree(true)
                        }}>
                            Nuevo grado</Button>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estadísticas</th>
                            <th>Duración</th>
                            <th>Coordinador</th>
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

export default Degrees;