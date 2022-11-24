import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../features/user/userSlice";


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