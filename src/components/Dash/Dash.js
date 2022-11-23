import React from "react";
import {useSelector} from "react-redux";

function Dash (){
    const user = useSelector((state) => state.user)
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