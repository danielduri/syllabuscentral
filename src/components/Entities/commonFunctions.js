import {tokenFetch} from "../Common/functions/tokenFetch";
import React from "react";

export const listCourses = (courseList, setCourse, setCourseViewer) => {

    let courses = []

    for (const course of courseList) {

        let year=""

        if(course.year!==0){
            year=`${course.year}º`
        }

        courses.push(
            <div key={course.courseid+"course"}>
                <li
                    className={"blue underline pointer"} onClick={()=>{
                    tokenFetch(`getModel?courseid=${course.courseid}`, {
                        method: 'get',
                        headers: {"Content-type": "application/json"},
                    }).then(res => {
                        setCourse(res);
                        setCourseViewer(true)
                    })
                }}><strong> {`${course.courseid}: ${course.name}`}</strong></li> <p>{`${year} ${course.degree}`}</p>
            </div>

        )
    }

    return courses
}

export const listUsers = (userList, setUser, setEditUser) => {
    let users = []

    for (const user of userList) {
        users.push(
            <li className={"blue underline pointer bold"} key={user.userID+"member"}
            onClick={() => {
                setUser(user);
                setEditUser(true);
            }}>{user.userName}</li>
        )
    }

    return users
}