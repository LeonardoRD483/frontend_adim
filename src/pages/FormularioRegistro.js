import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Label from "../components/Label";
import { Card, Col, NavItem, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
const MateriaRegistro = () => {
  const history = useHistory();

  let i = 0;
  const handleChange = (event, value) => {
    i++;
    console.log(i);
    if (i > 6) {
      alert(
        "llegaste a lo maximo"
      );
      console.log("llego a  6");
    } else {
      const confirmar = window.confirm('¿Insertar Uno Nuevo?');
      if(confirmar){
        let obj = {
          user_id: 1,
          materia_id: event.target.value,
        };
        const url = "http://127.0.0.1:8000/api/administrador";
        axios
          .post(url, obj)
          .then((result) => {
            console.log("result", result.data.data);
            //       history.push("/materias");
          })
          .catch((error) => {
            console.log("error", error);
            alert(
              "Hubo un error al insertar persona, por favor intente nuevamente."
            );
          });
      }
      
    }
    console.log(event.target.value);
  };

  const [listamateria, setListamaterias] = useState([]);
  useEffect(() => {
    if (!sessionStorage.getItem("key")) {
      history.push("/login");
    }
    fetchlista();
  }, []);

  const fetchlista = () => {
    const url = "http://127.0.0.1:8000/api/materias";
    axios
      .get(url)
      .then((result) => {
        console.log(result.data);
        setListamaterias(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const clickBoton = () => {
    sessionStorage.clear()
    history.push("/login");
  }
  return (
    <div>
      <button className="btn btn-primary" onClick={clickBoton}>
        Cerrar Sesion
      </button>
      <div>
        <label>
          Selecionar Materia:
          <select onChange={handleChange}>
            {listamateria.map((item) => (
              <option key={"item" + item.id} value={item.id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </label>
        <Link className="btn btn-primary" to={"/registro/"}>Volver a lista de tus registros</Link>
      </div>
    </div>

  );
};
export default MateriaRegistro;
