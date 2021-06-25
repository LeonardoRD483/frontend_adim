import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Label from "../components/Label";
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Registro = (props) => {
    const history = useHistory();
    const [listaregistro, setListaregistro] = useState([])
    useEffect(() => {
        if (!sessionStorage.getItem("key")) {
            history.push("/login");
        }
        fetchlista()
    }, [])

    const fetchlista = () => {
        const url = 'http://127.0.0.1:8000/api/administrador';
        axios.get(url)
            .then(result => {
                console.log(result.data);
                setListaregistro(result.data.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const clickBoton = () =>{
        sessionStorage.clear()
        history.push("login")
    }
    return (
        <Row className="mt-3">
            <button className="btn btn-primary" onClick={clickBoton}>
                Cerrar Sesion
            </button>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Lista de Registro</Card.Title>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>user_id</th>
                                        <th>materia_id</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {listaregistro.map(item =>
                                        <tr key={"item-" + item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.user_id}</td>
                                            <td>{item.materia_id}</td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                        <Link className="btn btn-primary" to={"/create/"}>Agregar</Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Registro;
