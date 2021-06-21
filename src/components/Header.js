import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Ejemplo React</Navbar.Brand>
            <NavDropdown title="Personas" id="basic-nav-dropdown">
                <Link to="/personas/create" className="dropdown-item">Crear persona</Link>
                <Link to="/personas" className="dropdown-item">Lista de Personas</Link>
            </NavDropdown>
        </Navbar>
    );
}

export default Header;