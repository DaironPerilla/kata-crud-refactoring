import React, { useState } from 'react';

const ListaToDo = () => {


    const [tarea, setTarea] = useState("");
    const [tareas, setTareas] = useState([]);

    const handleInputChange = (event) => {
        setTarea([
            event.target.value
        ])

    }


    const agregarTodo = (event) => {
        event.preventDefault();
        console.log(tarea[0])
        if (tarea[0] !== undefined) {
            if (tarea[0].length > 0) {
                setTareas([
                    ...tareas, tarea[0]
                ])
            }
        }
    }

    const borrar = (dato) => {
        const auxList = tareas.filter(tarea => {
            return tarea !== dato
        });
        console.log(auxList.length)
        setTareas([
            auxList
        ])
        
    }

    return (
        <div>

            <h4>Lista Todo </h4>
            <form>
                <input
                    type="text"
                    placeholder="Ingrese una tarea"
                    name="tarea"
                    onChange={handleInputChange}
                />
                <button className="btn btn-success col-auto" onClick={agregarTodo}>Agregar</button>
            </form>

            <div className="row align-items-end">
                {   tareas[0] !== [] &&
                    tareas.map((tarea, index) => {
                        return (
                            <div className="row mt-2">
                                <p key={index} className="col-3">{tarea}</p>

                                <button key={index}
                                    className="btn btn-outline-danger col-1 me-md-3" onClick={() => borrar(tarea)}>Eliminar</button>

                                <button key={index}
                                    className="btn btn-outline-info col-1">Editar</button>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
}

export default ListaToDo;