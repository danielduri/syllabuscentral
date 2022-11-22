import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import tokenFetch from "./tokenFetch";

const navbarText = (user, logout) => {
    if(user.auth){
        return <>
            <Nav.Link className="nav-item nav-link dib" href="/dash" title="Dash">Panel</Nav.Link>
            <Nav.Link className="nav-item nav-link dib" href="/preferences" title="Preferences">Preferencias</Nav.Link>
            <Nav.Link className="nav-item nav-link dib" href="/test" title="Test">Test</Nav.Link>
            <Nav.Link className="nav-item nav-link dib" href="/" onClick={logout} title="Logout">Cerrar sesión</Nav.Link>
        </>
    }else{
        return <>
            <Nav.Link className="nav-item nav-link dib" href="/" title="Logout">Iniciar sesión</Nav.Link>
        </>
    }
}

function MainNavbar ({user, setUser}) {

    function logout (){
        tokenFetch('http://192.168.1.45:3001/signOut', {
            method: "post",
            headers: {"Content-type": "application/json"}
        }).then(res => {
                localStorage.removeItem("jwtToken")
                localStorage.removeItem("userInfo")
                setUser({auth: false, user: {}})
            }
        ).catch(err=>console.log(err))
    }

    return (
        <Navbar bg={"moon-gray"} expand={"lg"} sticky={"top"} className={"min-h-25"}>
            <Container>
                <Navbar.Brand className={"fw6 f4 pointer"}>📚 · Syllabus Central</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto f4">
                        {navbarText(user, logout)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        /*


        */
    )

    /*
    <nav className="navbar navbar-sticky-top navbar-light bg-moon-gray">
            <h1 className="navbar-brand fw5 pointer dim">📚 Syllabus Central</h1>
            {navbarText(user)}
        </nav>
    <nav className="db dt-l w-100 border-box pa4 ph5-l bg-moon-gray">
            <h2 className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" >
                📚 Syllabus Central
            </h2>
            {navbarText(user)}
        </nav>
     */

}

export default MainNavbar;