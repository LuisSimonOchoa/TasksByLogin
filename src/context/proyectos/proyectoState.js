import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { formularioProyecto, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL } from '../../types';


const ProyectoState = props => {

    const proyectos = [
        { id: 1, nombre: 'Tienda Virtual' },
        { id: 2, nombre: 'Intranet' },
        { id: 3, nombre: 'Diseño de Sistio Web' },
        { id: 4, nombre: 'MERN' }
    ];

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null
    }

    // Dispatch para ejecutar las acciones
    const [state, Dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        Dispatch({
            type: formularioProyecto
        })
    }

    // Obtener los proyectos
    const obtenerProyectos = () => {
        Dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    // Agregar nuevo proyecto
    const agregarProyecto = proyecto => {
        proyecto.id = uuidv4();
        
        // Insetar el proyecto en el state
        Dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    // Valida el formulario por errores
    const mostrarError = () => {
        Dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Selecciona el Proyecto que el usuario haga click
    const proyectoActual = proyectoId => {
        Dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;