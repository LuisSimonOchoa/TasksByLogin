import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

    // Extraer proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // Obtener las tareas del proyecto
    const tareasContext = useContext(TareaContext);
    const { tareasproyecto } = tareasContext;

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;
    
    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;

    // Eliminar un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual.id)
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className='listado-tareas'>
                {tareasproyecto.length === 0
                    ? (<li className='tarea'><p>No hay tareas</p></li>)
                    :
                    <TransitionGroup>
                    {tareasproyecto.map(tarea => (
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea
                                key={tarea.id}
                                tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}
 
export default ListadoTareas;