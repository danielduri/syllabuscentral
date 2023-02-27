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
            <>
                <li className={"blue underline"} onClick={()=>{
                    tokenFetch(`getModel?courseid=${course.courseid}`, {
                        method: 'get',
                        headers: {"Content-type": "application/json"},
                    }).then(res => {
                        setCourse(res);
                        setCourseViewer(true)
                    })
                }} href="#"><strong> {`${course.courseid}: ${course.name}`}</strong></li> <p>{`${year} ${course.degree}`}</p>
            </>

        )
    }

    return courses
}