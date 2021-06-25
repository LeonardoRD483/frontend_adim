import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import Label from "../components/Label";
import Header from "../components/Header";
const FormularioPersona = (props) => {
  const history = useHistory();
  const { id } = props.match ? props.match.params : { id: 0 };
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [semestre, setSemestre] = useState("");
  const [costo, setCosto] = useState("");

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
    const url = "http://127.0.0.1:8000/api/materias/" + id;
    axios
      .get(url)
      .then((result) => {
        console.log("fetchDatosPersona", result);
        let objPersona = result.data.data;
        setCodigo(objPersona.codigo);
        setNombre(objPersona.nombre);
        setSemestre(objPersona.semestre);
        setCosto(objPersona.costo);
        console.log(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const clickBoton = () => {
    const parametros = {
      codigo,
      nombre,
      semestre,
      costo,
    };
    if (id === 0) {
      insertarPersona(parametros);
    } else {
      actualizarPersona(parametros);
    }
  };
  const actualizarPersona = (parametros) => {
    const url = "http://127.0.0.1:8000/api/materias/" + id;
    console.log(parametros);
    axios
      .put(url, parametros)
      .then((result) => {
        console.log("result", result);
        history.push("/materias");
      })
      .catch((error) => {
        console.log("error", error);
        alert(
          "Hubo un error al insertar persona, por favor intente nuevamente."
        );
      });
  };
  const insertarPersona = (parametros) => {
    const url = "http://127.0.0.1:8000/api/materias/";
    console.log(parametros);
    axios
      .post(url, parametros)
      .then((result) => {
        console.log("result", result);
        history.push("/materias");
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
      <Header>
      </Header>
      <div className="row mt-3">
      <div className="col-6 offset-3">
        <Card>
          <Card.Body>
            <Card.Title>Formulario de materias</Card.Title>

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
              <Label texto="Nombre:"></Label>
              <input
                onChange={(e) => {
                  setNombre(e.currentTarget.value);
                }}
                value={nombre}
                type="text"
                className="form-control"
              />
              <Label texto="Semestre:"></Label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setSemestre(e.currentTarget.value);
                }}
                value={semestre}
              />
              <Label texto="Costo:"></Label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setCosto(e.currentTarget.value);
                }}
                value={costo}
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

export default FormularioPersona;
