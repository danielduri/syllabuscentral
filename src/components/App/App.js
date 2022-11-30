import './App.css';
import React, {useEffect} from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from "../Login/Login";
import Dash from "../Dash/Dash";
import Preferences from "../Preferences/Preferences";
import ErrorBoundary from "../Common/ErrorBoundary"
import MainNavbar from "../Common/MainNavbar";
import Test from "../Test/test";
import {useDispatch, useSelector} from "react-redux";
import {tokenFetch} from "../Common/functions/tokenFetch";
import {sessionExpired, updateUserInfo} from "../../features/user/userSlice";

function App(){

    const user = useSelector ((state) => state.user);
    const token = user.token;
    const dispatch = useDispatch();

    useEffect(() => {
        if (token !== null && token !== undefined) {
            tokenFetch('userInfo', {
                method: 'get',
                headers: {"Content-type": "application/json"},
            }).then(response => response.json())
                .then(resp => {
                    if(resp==='Token Expired'){
                        dispatch(sessionExpired());
                    }else{
                        dispatch(updateUserInfo(resp));
                    }
                })
        }
    },[dispatch, token])

  if(user.auth){
      return (
          <div className="wrapper">
              <ErrorBoundary>
                  <MainNavbar/>
                  <div className={"content pa4"}>
                          <Routes>
                              <Route path="/" element={<Navigate replace to={"/dash"}/>} />
                              <Route path="*" element={<Navigate replace to={"/dash"}/>} />
                              <Route path="/dash" element={<Dash />} />
                              <Route path="/test" element={<Test />} />
                              <Route path="/preferences" element={<Preferences user={user}/>} />
                          </Routes>
                  </div>
              </ErrorBoundary>
          </div>
      )
  }else{
      return (
          <ErrorBoundary>
              <Login/>
          </ErrorBoundary>
      );
  }
}

export default App;
