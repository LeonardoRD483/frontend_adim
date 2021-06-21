import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Label from "../components/Label";
import { Card, Col, NavItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MateriaRegistro = () => {

    const handleChange = (event, value) => {
        console.log(event.target.value)
    };


    const [listamateria, setListamaterias] = useState([])
    useEffect(() => {
        fetchlista()
    }, [])

    const fetchlista = () => {
        const url = 'http://127.0.0.1:8000/api/materias';
        axios.get(url)
            .then(result => {
                console.log(result.data);
                setListamaterias(result.data.data);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <label>
                Selecionar Materia:
                <select onChange={handleChange}>
                    {listamateria.map(item =>
                        <option key = {"item" + item.id} value={item.id}>{item.nombre}</option>
                    )}
                </select>
            </label>

        </div>
    );
}
export default MateriaRegistro;