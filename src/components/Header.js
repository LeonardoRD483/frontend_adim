import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";

const Header = () => {
    const history = useHistory();

    const clickBoton = () => {
        sessionStorage.clear()
        history.push("login")
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Ejemplo React</Navbar.Brand>
            <NavDropdown title="Alumno" id="basic-nav-dropdown">
                <Link to="/alumnos/create" className="dropdown-item">Crear Alumno</Link>
                <Link to="/alumnos" className="dropdown-item">Lista de Alumnos</Link>
            </NavDropdown>
            <NavDropdown title="Materia" id="basic-nav-dropdown">
                <Link to="/personas/create" className="dropdown-item">Crear Materia</Link>
                <Link to="/materias" className="dropdown-item">Lista de Materias</Link>
            </NavDropdown>
            <button className="btn btn-primary" onClick={clickBoton}>
                Cerrar Sesion
            </button>
        </Navbar>
    );
}

export default Header;