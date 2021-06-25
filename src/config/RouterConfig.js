import React from 'react';
import { Route, Switch } from 'react-router';
import FormularioPersona from '../pages/FormularioMateria';
import ListaPersonas from '../pages/ListaMaterias';
import ListaAlumnos from '../pages/ListaAlumnos';
import FormularioAlumno from '../pages/FormularioAlumno';
import logincito from '../pages/Login';
import Registro from '../pages/registro';
import MateriaRegistro from '../pages/FormularioRegistro';
const RouterConfig = () => {
    return (
        <Switch>
            <Route exact path="/materias">
                <ListaPersonas></ListaPersonas>
            </Route>
            <Route path="/personas/create">
                <FormularioPersona></FormularioPersona>
            </Route>
            <Route path="/alumnos/create"><FormularioAlumno></FormularioAlumno></Route>
            <Route path="/personas/edit/:id" component={FormularioPersona}></Route>
            <Route path="/alumnos/edit/:id" component={FormularioAlumno}></Route>
            <Route path="/login" component={logincito}></Route>
            <Route path="/registro" component={Registro}></Route>
            <Route path="/create/" component={MateriaRegistro}></Route>

            <Route path="/alumnos">
                <ListaAlumnos></ListaAlumnos>
            </Route>
        </Switch>
    );
}

export default RouterConfig;