import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import Label from "../components/Label";
import Header from "../components/Header";

const FormularioAlumno = (props) => {
  const history = useHistory();
  const { id } = props.match ? props.match.params : { id: 0 };
  const [codigo, setCodigo] = useState("");
  const [nombre_completo, setNombre_Completo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [carnet, setCarnet] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("key")) {
      history.push("/login");
    }
    if (id === 0) {
      return;
    }
    fetchDatosPersona(id);
  }, [id]);

  const fetchDatosPersona = (id) => {
    const url = "http://127.0.0.1:8000/api/alumnos/" + id;
    axios
      .get(url)
      .then((result) => {
        console.log("fetchDatosPersona", result);
        let objPersona = result.data.data;
        setCodigo(objPersona.codigo);
        setNombre_Completo(objPersona.nombre_completo);
        setDireccion(objPersona.direccion);
        setTelefono(objPersona.telefono);
        setCarnet(objPersona.carnet);
        setSexo(objPersona.sexo);
        setEdad(objPersona.edad);
        setEmail(objPersona.email);
        setPassword(objPersona.password);
        setTipo(objPersona.tipo);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const clickBoton = () => {
    const parametros = {
      codigo,
      nombre_completo,
      direccion,
      telefono,
      carnet,
      sexo,
      edad,
      email,
      password,
      tipo,
    };
    if (id == 0) {
      insertarPersona(parametros);
    } else {
      actualizarPersona(parametros);
    }
  };
  const actualizarPersona = (parametros) => {
    const url = "http://127.0.0.1:8000/api/alumnos/" + id;
    console.log(parametros);
    axios
      .put(url, parametros)
      .then((result) => {
        console.log("result", result);
        history.push("/alumnos");
      })
      .catch((error) => {
        console.log("error", error);
        alert(
          "Hubo un error al actualizar persona, por favor intente nuevamente."
        );
      });
  };
  const insertarPersona = (parametros) => {
    const url = "http://127.0.0.1:8000/api/alumnos";
    console.log(parametros);
    axios
      .post(url, parametros)
      .then((result) => {
        console.log("result", result);
        history.push("/alumnos");
      })
      .catch((error) => {
        console.log("error", error);
        alert(
          "Hubo un error al insertar persona, por favor intente nuevamente."
        );
      });
  };

  return (
    <div>
      <Header></Header>
      <div className="row mt-3">

        <div className="col-6 offset-3">
          <Card>
            <Card.Body>
              <Card.Title>Formulario de alumnos</Card.Title>

              <div>
                <Label texto="Codigo:"></Label>
                <input
                  onChange={(e) => {
                    setCodigo(e.currentTarget.value);
                  }}
                  value={codigo}
                  type="text"
                  className="form-control"
                />
                <div>{codigo}</div>
                <Label texto="Nombre_Completo:"></Label>
                <input
                  onChange={(e) => {
                    setNombre_Completo(e.currentTarget.value);
                  }}
                  value={nombre_completo}
                  type="text"
                  className="form-control"
                />
                <Label texto="Direccion:"></Label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setDireccion(e.currentTarget.value);
                  }}
                  value={direccion}
                />
                <Label texto="Telefono:"></Label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setTelefono(e.currentTarget.value);
                  }}
                  value={telefono}
                />

                <Label texto="Carnet:"></Label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setCarnet(e.currentTarget.value);
                  }}
                  value={carnet}
                />

                <Label texto="Sexo:"></Label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setSexo(e.currentTarget.value);
                  }}
                  value={sexo}
                />

                <Label texto="Edad:"></Label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setEdad(e.currentTarget.value);
                  }}
                  value={edad}
                />
                <Label texto="Email:"></Label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                  }}
                  value={email}
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
                <Label texto="Tipo:"></Label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setTipo(e.currentTarget.value);
                  }}
                  value={tipo}
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
    </div>

  );
};

export default FormularioAlumno;
