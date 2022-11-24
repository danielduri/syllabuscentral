import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {ChangeEmail} from "./ChangeEmail";
import {ChangeName} from "./ChangeName";
import {ChangePassword} from "./ChangePassword";

const userType = (userType) => {
    switch (userType){
        case 0:
            return "Usuario profesor";
        case 1:
            return "Usuario administrador de facultad";
        case 2:
            return "Usuario superadministrador";
        default:
            return "Usuario inválido";
    }
}

function Preferences({user, setuser}){

    //TODO: figure out userSession
    const [ emailChange, setEmailChange ] = useState(false);
    const [ nameChange, setNameChange ] = useState(false);
    const [ passwordChange, setPasswordChange ] = useState(false);

    return(
        <div className="">
            <article className="br4 ba b--black-10 mv4 w-100 w-50-m mw6 shadow-5 center bg-white">
                <main className="pa4 black-80">
                    <div className="measure">
                        <h2>Preferencias de usuario</h2>

                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">

                            {
                                /*
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Foto de perfil</label>
                                    <img src={`http://192.168.1.45:3001/img/profilePics/${token.userID}.png`} className={"w4 pv2"} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src="http://192.168.1.45:3001/img/profilePics/default.png";
                                    }} alt={"Imagen del usuario"}/>
                                    <div className="">
                                        <Button variant={"primary"}>Cambiar foto de perfil</Button>
                                    </div>
                                </div>
                                 */
                            }

                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Correo electrónico</label>
                                <h3>{user.userInfo.email}</h3>
                                <div className="">
                                    <Button variant={"primary"} onClick={() => setEmailChange(true)}>Cambiar correo electrónico</Button>
                                    <ChangeEmail show={emailChange} user={user} setuser={setuser} onHide={() => setEmailChange(false)}/>
                                </div>
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Nombre</label>
                                <h3>{user.userInfo.userName}</h3>
                                <div className="">
                                    <Button variant={"primary"} onClick={() => setNameChange(true)}>Cambiar nombre</Button>
                                    <ChangeName show={nameChange} user={user} setuser={setuser} onHide={() => setNameChange(false)}></ChangeName>
                                </div>
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Tipo de usuario</label>
                                <h3>{userType(user.userInfo.userType)}</h3>
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Contraseña</label>
                                <div className="">
                                    <Button variant={"primary mv2"} onClick={() => setPasswordChange(true)}>Cambiar contraseña</Button>
                                    <ChangePassword show={passwordChange} user={user} onHide={() => setPasswordChange(false)}></ChangePassword>
                                </div>
                            </div>

                        </fieldset>
                    </div>
                </main>
            </article>
        </div>
    );
}

export default Preferences;