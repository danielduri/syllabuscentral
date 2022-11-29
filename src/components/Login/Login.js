import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signIn, wrongPassword} from "../../features/user/userSlice";
import tokenFetch from "../Common/functions/tokenFetch";

const Login = () => {

    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const error = useSelector((state) => state.user.error)
    const dispatch = useDispatch()


    const onEmailChange = (event) => {
        setSignInEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value)
    }

    const handleLogin = () => {
        tokenFetch("signIn", {
            method: 'post',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        }).then(response => response.json())
            .then(resp => {
                if(resp.token){
                    dispatch(signIn(resp))
                    localStorage.setItem('jwtToken', resp.token)
                }else{
                    dispatch(wrongPassword());
                }
            })
            .catch(error => console.log(error))
    }

    return(
        <div className="vh-100 dt w-100 bg-moon-gray">
            <div className="dtc v-mid">
                <article className="br4 ba b--black-10 mv4 w-100 w-50-m mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f3 fw6 ph0 mh0">📚 Syllabus Central</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Correo electrónico</label>
                                    <input className="pa2 input-reset ba bg-transparent w-100"
                                           type="email" name="email-address" id="email-address"
                                           onChange={onEmailChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Contraseña</label>
                                    <input className="b pa2 input-reset ba bg-transparent w-100"
                                           type="password" name="password" id="password"
                                           onChange={onPasswordChange}
                                    />
                                </div>
                            </fieldset>

                            {
                                (error === "wrong password")
                                    ?
                                    <h4 className="red">Correo o contraseña incorrectos. Inténtelo de nuevo.</h4>
                                    :
                                    <></>
                            }
                            {
                                (error === "session expired")
                                    ?
                                    <h4 className="red">Su sesión ha expirado. Inicie sesión de nuevo.</h4>
                                    :
                                    <></>
                            }

                            <div className="">
                                <input className="black b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                       type="submit" value="Entrar" onClick={handleLogin}/>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        </div>
    );

}

export default Login;