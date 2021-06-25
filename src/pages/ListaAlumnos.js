import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Header from "../components/Header";

const ListaAlumnos = () => {
  const history = useHistory();
  const [ListaPersonas, setListaPersonas] = useState([]);
  useEffect(() => {
    if (!sessionStorage.getItem("key")) {
      history.push("/login");
    }

    fetchListaPersonas();
  }, []);
  const fetchListaPersonas = () => {
    const url = "http://127.0.0.1:8000/api/alumnos";
    axios
      .get(url)
      .then((result) => {
        console.log(result.data);
        setListaPersonas(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const eliminarPersona = (id) => {
    const confirmation = window.confirm("¿Está seguro que desea eliminar?");
    if (!confirmation) {
      return;
    }
    const url = "http://127.0.0.1:8000/api/alumnos/" + id;
    axios
      .delete(url)
      .then((result) => {
        fetchListaPersonas();
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Hubo un error al eliminar personas, por favor intentelo nuevamente"
        );
      });
  };
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
  };

  return (
    <div>
      <Header></Header>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Lista de Alumnos</Card.Title>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Codigo</th>
                      <th>Nombre Completo</th>
                      <th>Direccion</th>
                      <th>Telefono</th>
                      <th>Carnet</th>
                      <th>Sexo</th>
                      <th>Edad</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ListaPersonas.map((item) => (
                      <tr key={"item-" + item.id}>
                        <td>{item.id}</td>
                        <td>{item.codigo}</td>
                        <td>{item.nombre_completo}</td>
                        <td>{item.direccion}</td>
                        <td>{item.telefono}</td>
                        <td>{item.carnet}</td>
                        <td>{item.sexo}</td>
                        <td>{item.edad}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>{item.tipo}</td>
                        <td>
                          <Link
                            className="btn btn-primary"
                            to={"/alumnos/edit/" + item.id}
                          >
                            Editar
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              eliminarPersona(item.id);
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link className="btn btn-primary" to={"/alumnos/create"}>
                Agregar
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>

  );
};

export default ListaAlumnos;
