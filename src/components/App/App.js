import './App.css';
import React, {useEffect, useRef} from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from "../Login/Login";
import Dash from "../Dash/Dash";
import Preferences from "../Preferences/Preferences";
import ErrorBoundary from "../Common/ErrorBoundary"
import MainNavbar from "../Common/MainNavbar";
import Test from "../Test/test";
import {useDispatch, useSelector} from "react-redux";
import tokenFetch from "../Common/tokenFetch";
import {sessionExpired, updateUserInfo} from "../../features/user/userSlice";

function App(){

    const renderLogin = useRef(!localStorage.getItem('jwtToken'));

    const user = useSelector ((state) => state.user);
    const token = user.token;
    const dispatch = useDispatch();

    useEffect(() => {
        if (token !== null && token !== undefined) {
            tokenFetch('http://192.168.1.45:3001/userInfo', {
                method: 'get',
                headers: {"Content-type": "application/json"},
            }).then(response => response.json())
                .then(resp => {
                    if(resp==='Token Expired'){
                        dispatch(sessionExpired());
                        renderLogin.current=true;
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
                      <BrowserRouter>
                          <Routes>
                              <Route path="/" element={<Navigate replace to={"/dash"}/>} />
                              <Route path="*" element={<Navigate replace to={"/dash"}/>} />
                              <Route path="/dash" element={<Dash user={user}/>} />
                              <Route path="/test" element={<Test user={user}/>} />
                              <Route path="/preferences" element={<Preferences user={user}/>} />
                          </Routes>
                      </BrowserRouter>
                  </div>
              </ErrorBoundary>
          </div>
      )
  }

  if(renderLogin.current){
      return (
          <ErrorBoundary>
              <Login/>
          </ErrorBoundary>
      );
  }
}

export default App;
