import React, { useState, Fragment } from 'react';

const ListaToDo = (props) => {

    const HOST_API = "http://localhost:8080/api";
    const [tarea, setTarea] = useState({
        "completed": false,
        "groudName": props.idLista.name,
        "tarea": "",

    });
    const [tareas, setTareas] = useState([]);

    const handleInputChange = (event) => {
        setTarea({
            ...tarea,
            [event.target.name]: event.target.value
        })

    }


    // const agregarTodo = (event) => {
    //     event.preventDefault();
    //     console.log(tarea[0])
    //     if (tarea[0] !== undefined) {   
    //         if (tarea[0].length > 0) {
    //             setTareas([
    //                 ...tareas, tarea[0]
    //             ])
    //         }
    //     }
    // }

    const borrar = (dato) => {
        const auxList = tareas.filter(tarea => {
            return tarea !== dato
        });
        console.log(auxList.length)
        setTareas([
            auxList
        ])

    }

    const agregarTodo = (event) => {
        event.preventDefault();
        event.target.value = "";

        console.log(tarea);

        fetch(HOST_API + "/TodoList", {
            method: "POST",
            body: JSON.stringify(tarea),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                console.log(todo)
                mostrarTodo();
            }).catch(err => console.log(err))

    }

    const mostrarTodo = () => {
        fetch(HOST_API + "/TodoLists", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                console.log(todo);
                setTareas(todo);
            })
    }

    return (
      <h1>asdasd</h1>
    );

    // return (
    //     <div>

    //         <h4>Lista Todo {props.idLista.name}</h4>
    //         <form>
    //             <input
    //                 type="text"
    //                 placeholder="Ingrese una tarea"
    //                 name="tarea"
    //                 onChange={handleInputChange}
    //             />
    //             <button className="btn btn-success col-auto" onClick={agregarTodo}>Agregar</button>
    //         </form>

    //         <div className="row align-items-end">
    //             {
    //                 tareas.map((item, index) => {
    //                     return (
    //                         <div className="row mt-2">
    //                             <p key={index} className="col-3">{item.tarea}</p>

    //                             <div class="form-check form-switch col-3">
    //                                 <input 
    //                                 class="form-check-input" 
    //                                 type="checkbox" 
    //                                 role="switch" 
    //                                 name="completed"
    //                                 />
    //                                 <label class="form-check-label" for="flexSwitchCheckChecked">Completado</label>
    //                             </div>

    //                             <button key={index}
    //                                 className="btn btn-outline-danger col-1 me-md-3" onClick={() => borrar(item)}>Eliminar</button>

    //                             <button key={index}
    //                                 className="btn btn-outline-info col-1">Editar</button>

    //                         </div>
    //                     )
    //                 })
    //             }

    //         </div>
    //     </div>
    // );
}

export default ListaToDo;