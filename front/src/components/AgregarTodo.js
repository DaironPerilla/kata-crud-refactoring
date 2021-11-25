import React from 'react';

const ListaToDo = () => {


    const agregarTodo = (event) => {
        event.preventDefault();
    }

    return (
        <div>

            <h4>Lista Todo </h4>
            <form>
                <input
                    type="text"
                    placeholder="Ingrese una tarea"
                    name="tarea" />
                <button className="btn btn-success col-auto" onClick={agregarTodo}>Agregar</button>
            </form>

            <div className="row align-items-end">
                <p className="col-auto">Tarea</p>
                <button className="btn btn-danger col-auto me-md-3">Eliminar</button>
                <button className="btn btn-info col-auto">Editar</button>
            </div>
        </div>
    );
}

export default ListaToDo;