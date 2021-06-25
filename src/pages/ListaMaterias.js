import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";


const ListaPersonas = () => {
    const history = useHistory();
    const [listaPersonas, setListaPersonas] = useState([]);
    useEffect(() => {
        if (!sessionStorage.getItem("key")) {
            history.push("/login");
          }
        fetchListaPersonas();
    }, [])

    const fetchListaPersonas = () => {
        const url = 'http://127.0.0.1:8000/api/materias';
        axios.get(url)
            .then(result => {
                console.log(result.data);
                setListaPersonas(result.data.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminarPersona = (id) => {
        const confirmation = window.confirm('¿Está seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        const url = 'http://127.0.0.1:8000/api/materias/' + id;
        axios.delete(url)
            .then(result => {
                fetchListaPersonas();
            })
            .catch(error => {
                console.log(error);
                alert('Hubo un error al eliminar personas, por favor intentelo nuevamente');
            });
    }
    const getSexoForDisplay = (sexo) => {
        switch (sexo) {
            case -1:
                return "No definido";
            case 0:
                return "Femenino";
            case 1:
                return "Masculino";
            default:
                return "";
        }
    }

    return (
        <Row className="mt-3">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Lista de Materias!</Card.Title>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Codigo</th>
                                        <th>Apellidos</th>
                                        <th>Ciudad</th>
                                        <th>Edad</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaPersonas.map(item =>
                                        <tr key={"item-" + item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.codigo}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.semestre}</td>
                                            <td>{item.costo}</td>
                                            <td><Link className="btn btn-primary" to={"/personas/edit/" + item.id}>Editar</Link></td>
                                            <td><button className="btn btn-danger" onClick={() => {
                                                eliminarPersona(item.id);
                                            }}>Eliminar</button></td>
                                           
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                        <Link className="btn btn-primary" to={"/personas/create"}>Agregar</Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default ListaPersonas;