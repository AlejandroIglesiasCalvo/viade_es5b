import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import auth from "solid-auth-client";

const AuthNavBar = () => {

  const logout = () =>{
    auth.logout();
    window.location = "/viade_es5b/login";
  }
  return (
    <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/viade_es5b/">Viade-Rutas</Navbar.Brand>
          <Nav>
            <Nav.Link href="/viade_es5b/ver-rutas">Mis rutas</Nav.Link>
            <Nav.Link href="/viade_es5b/add-ruta">Añadir ruta</Nav.Link>
          </Nav>

        <Nav className="ml-auto">
          <Nav.Link onClick={logout}>Log Out</Nav.Link>
        </Nav>
      </Navbar>
  );
};

export default AuthNavBar;
