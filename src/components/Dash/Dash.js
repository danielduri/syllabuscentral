import React from "react";
import {throwError} from "../Common/devFunctions";

function Dash ({user}){
    return (
        <div>
            <div>
                <h1>User dash goes here</h1>
                <h2>Hello, {user.userInfo.userName}</h2>
            </div>
        </div>
    )
}

export default Dash;