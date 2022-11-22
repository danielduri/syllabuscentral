import './App.css';
import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from "../Login/Login";
import Dash from "../Dash/Dash";
import Preferences from "../Preferences/Preferences";
import ErrorBoundary from "../Common/ErrorBoundary"
import MainNavbar from "../Common/MainNavbar";
import Test from "../Test/test";

function App(){

    const [user, setUser] = useState({ auth:false, userInfo: {}})

    //TODO fetch user info on refresh
    useEffect(() => {
        if(localStorage.jwtToken && localStorage.userInfo){
            setUser({auth: true, userInfo: JSON.parse(localStorage.userInfo)});
        }
    },[])

  if(!user.auth){
    return (
        <ErrorBoundary>
            <Login setuser={setUser} />
        </ErrorBoundary>
    );
  }

  return (
      <div className="wrapper">
          <ErrorBoundary>
          <MainNavbar user={user} setuser={setUser}/>
              <div className={"content pa4"}>
                  <BrowserRouter>
                      <Routes>
                          <Route path="/" element={<Navigate replace to={"/dash"}/>} />
                          <Route path="*" element={<Navigate replace to={"/dash"}/>} />
                          <Route path="/dash" element={<Dash user={user}/>} />
                          <Route path="/test" element={<Test user={user}/>} />
                          <Route path="/preferences" element={<Preferences user={user} setuser={setUser}/>} />
                      </Routes>
                  </BrowserRouter>
              </div>
          </ErrorBoundary>
      </div>
  )
}

export default App;
