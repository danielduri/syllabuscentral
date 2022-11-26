import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../features/user/userSlice";
import {NavLink} from "react-router-dom";


const navbarText = (user, logout) => {
    if(user.auth){
        return <>
            <NavLink className="nav-item nav-link dib" to="/dash" title="Dash">Panel</NavLink>
            <NavLink className="nav-item nav-link dib" to="/preferences" title="Preferences">Preferencias</NavLink>
            <NavLink className="nav-item nav-link dib" to="/sources" title="Sources">Modelos</NavLink>
            <NavLink className="nav-item nav-link dib" to="/" onClick={logout} title="Logout">Cerrar sesión</NavLink>
        </>
    }else{
        return <>
            <NavLink className="nav-item nav-link dib" to="/" title="Logout">Iniciar sesión</NavLink>
        </>
    }
}

function MainNavbar () {

    const user = useSelector ((state) => state.user)
    const dispatch = useDispatch()

    function logout (){
        localStorage.removeItem("jwtToken")
        dispatch(signOut())
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
    )

}

export default MainNavbar;