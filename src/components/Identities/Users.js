import React, {useEffect, useState} from "react";
import {tokenFetch} from "../Common/functions/tokenFetch";
import {Button, Table} from "react-bootstrap";
import Unauthorized from "../Common/Unauthorized";
import {useSelector} from "react-redux";
import {EditUser} from "./EditUser";
import {displayUserType} from "../Preferences/Preferences";

function Users (){

    const [ edit, setEdit ] = useState(false);
    const [ newUser, setNewUser ] = useState(false);

    const [ userProp, setUserProp ] = useState(undefined);
    const [ list, setList ] = useState([]);

    const user = useSelector((state) => state.user);

    const getList = () => {
        tokenFetch('getUsers', {
            method: 'get',
            headers: {"Content-type": "application/json"},
        }).then(data =>{
            if(data.length>0){
                let itemList = [];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    itemList.push( <tr key={item.userID}>
                        <td>{item.userName}</td>
                        <td>{item.email}</td>
                        <td>{displayUserType(item.userType)}</td>
                        <td>{item.departmentName}</td>

                        <td>
                            <div className={"ml-auto mr-auto"}>
                                <Button variant={"primary"} key={item.userID}  onClick={() => {
                                    setUserProp({
                                        userID: item.userID,
                                        userName: item.userName,
                                        email: item.email,
                                        userType: item.userType,
                                        departmentName: item.departmentName,
                                        departmentID: item.departmentID,
                                        isEditable: item.isEditable
                                    })
                                    setEdit(true);
                                }}>Editar</Button>
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
        {user.userInfo.userType >= 1 ?
                <div className={"center"}>

                    <EditUser show={newUser} onHide={()=>setNewUser(false)}></EditUser>
                    <EditUser show={edit} onHide={()=>setEdit(false)} user={userProp}></EditUser>

                    <div className={"center tc pa3"}>
                        <Button variant={"primary"} className={"w-20 ma1"} onClick={() => {
                            setNewUser(true)
                        }}>
                            Nuevo usuario</Button>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Tipo</th>
                            <th>Departamento</th>
                            <th>Acciones</th>
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

export default Users;