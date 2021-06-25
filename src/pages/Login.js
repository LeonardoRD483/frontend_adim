import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import Label from "../components/Label";

const Login = (props) => {
  const history = useHistory();

  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");

  const clickBoton = () => {
    const parametros = {
      codigo,
      password,
    };

    logincito(parametros);
  };
  const logincito = (parametros) => {
    const url = "http://127.0.0.1:8000/api/login";
    console.log(parametros);
    axios
      .post(url, parametros)
      .then((result) => {
        console.log("result", result.data.data[0].tipo);
        if (result.data.data[0].tipo == 1) {
          sessionStorage.setItem("key", "accesso");
          history.push("/alumnos");
          console.log("entro aqui");
        } else {
          sessionStorage.setItem("key", "accesso");
          history.push("/registro");
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert("Hubo un error al insertar datos, por favor intente nuevamente.");
      });
  };

  return (
    <div className="row mt-3">
      <div className="col-6 offset-3">
        <Card>
          <Card.Body>
            <Card.Title>L O G I N</Card.Title>

            <div>
              <Label texto="Codigo:"></Label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setCodigo(e.currentTarget.value);
                }}
                value={codigo}
              />
              <Label texto="Password:"></Label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                value={password}
              />

              <div>
                <button className="btn btn-primary" onClick={clickBoton}>
                  Guardar datos
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
