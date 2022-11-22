import {createAsyncThunk} from "@reduxjs/toolkit";
import tokenFetch from "../../components/Common/tokenFetch";

export const signIn = createAsyncThunk('signIn',
    async({email, password}, {rejectWithValue}) => {

    try{
        fetch("http://192.168.1.45:3001/signIn", {
            method: 'post',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(response => response.json())
            .then(resp => {
                if(resp.userInfo){
                    localStorage.setItem('jwtToken', resp.token)
                }else{
                    rejectWithValue('wrong password')
                }
            })
            .catch(error => {this.setState( () => {throw new Error(error)} )})
    }catch (e){
        return rejectWithValue(e.message)
    }

})

//TODO: complete (Identity management)
export const createUser = createAsyncThunk('createUser',
    async ({ userName, email, password, departmentID }, { rejectWithValue }) => {

    try{
        tokenFetch('http://192.168.1.45:3001/createUser', {
                method: 'put',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    userName: userName,
                    email: email,
                    password: password,
                    departmentID: departmentID
                })
            }
        ).then(response => response.json())
                .then(resp => {
                    if(resp.email){

                    }else{
                        if(resp==="email already in use"){

                        }
                        if(resp==="invalid email"){

                        }
                        if(resp==="invalid password"){

                        }
                        if(resp==="invalid name"){

                        }
                    }
                })
    }catch (error) {

    }

})