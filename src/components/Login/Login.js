import React, {Component} from "react";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            signInEmail: '',
            signInPassword: '',
            wrongCredentials: false
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch("http://192.168.1.45:3001/signIn", {
            method: 'post',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(response => response.json())
            .then(resp => {
                if(resp.userInfo){
                    localStorage.setItem('jwtToken', resp.token)
                    localStorage.setItem('userInfo', JSON.stringify(resp.userInfo))
                    this.props.setuser({ auth:true, userInfo: resp.userInfo })
                }else{
                    this.setState({wrongCredentials: true});
                }
            })
            .catch(error => {this.setState( () => {throw new Error(error)} )})
    }

    render(){
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
                                               onChange={this.onEmailChange}
                                        />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="password">Contraseña</label>
                                        <input className="b pa2 input-reset ba bg-transparent w-100"
                                               type="password" name="password" id="password"
                                               onChange={this.onPasswordChange}
                                        />
                                    </div>
                                </fieldset>

                                {
                                    (this.state.wrongCredentials) //Wrong user-pass
                                        ?
                                        <h4 className="red">Correo o contraseña incorrectos. Inténtelo de nuevo.</h4>
                                        :
                                        <></>
                                }

                                <div className="">
                                    <input className="black b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                           type="submit" value="Entrar" onClick={this.onSubmitSignIn}/>
                                </div>
                            </div>
                        </main>
                    </article>
                </div>
            </div>
        );
    }
}

export default Login;