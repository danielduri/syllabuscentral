import './App.css';
import React, {useEffect} from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from "../Login/Login";
import Dash from "../Dash/Dash";
import Preferences from "../Preferences/Preferences";
import ErrorBoundary from "../Common/ErrorBoundary"
import MainNavbar from "../Common/MainNavbar";
import {useDispatch, useSelector} from "react-redux";
import {tokenFetch} from "../Common/functions/tokenFetch";
import {updateUserInfo} from "../../features/user/userSlice";
import Courses from "../Courses/Courses";
import Degrees from "../Entities/Degrees/Degrees";
import Departments from "../Entities/Departments/Departments";
import ModulesSubjects from "../Entities/ModulesSubjects";
import Schools from "../Entities/Schools/Schools";
import Users from "../Identities/Users";

function App(){

    const user = useSelector ((state) => state.user);
    const token = user.token;
    const dispatch = useDispatch();

    useEffect(() => {
        if (token !== null && token !== undefined) {
            tokenFetch('userInfo', {
                method: 'get',
                headers: {"Content-type": "application/json"},
            }).then(resp => {
                if (resp !== undefined){
                    dispatch(updateUserInfo(resp));
                }
            })
                .catch(error => console.log(error))
        }
    },[dispatch, token])

  if(user.auth){
      return (
          <div className="wrapper">
              <ErrorBoundary>
                  <MainNavbar/>
                  {user.userInfo.userType===2
                      ? <div className={"v-mid"}><h4 className={"mt3 tc white bg-gray pa1"}>Entorno actual: {user.userInfo.schoolName}</h4></div>
                      : <></>
                  }
                  <div className={"content pa4"}>
                          <Routes>
                              <Route path="/" element={<Navigate replace to={"/dash"}/>} />
                              <Route path="*" element={<Navigate replace to={"/dash"}/>} />
                              <Route path="/dash" element={<Dash />} />
                              <Route path="/preferences" element={<Preferences/>} />
                              <Route path="/courses" element={<Courses/>} />
                              <Route path="/degrees" element={<Degrees/>} />
                              <Route path="/departments" element={<Departments/>} />
                              <Route path="/modules-subjects" element={<ModulesSubjects/>} />
                              <Route path="/schools" element={<Schools/>} />
                              <Route path="/users" element={<Users/>} />
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
