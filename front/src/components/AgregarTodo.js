import React, { useState, useEffect } from 'react';

const ListaToDo = (props) => {

    const HOST_API = "http://localhost:8080/api";
    const [tarea, setTarea] = useState({
        "completed": false,
        "groudName": props.group.name,
        "tarea": "",

    });

    const [edit, setEdit] = useState({
        valor: false,
        id: -1
    });

    const [tareas, setTareas] = useState([]);

    const cargar = () => {
        fetch(HOST_API + "/TodoLists", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                filtro(todo);
            })

    }

    const handleSubmit = (e) => {
        setTarea({
            ...tarea,
            "tarea": e.target.value
        });
    }

    

    const agregar = (e) => {
        e.preventDefault();
        document.getElementById("todoInput").value = "";


        fetch(HOST_API + "/TodoList", {
            method: "POST",
            body: JSON.stringify(tarea),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                cargar();
            }).catch(err => console.log(err))

    }

    useEffect(() => {
        cargar();
    }, [])


    const filtro = (lista) => {
        let auxList = lista.filter((item, index) => {
            return item.groudName === props.group.name;
        });

        setTareas(auxList);
        
    }

    const cambioSwitch = (e) => {
        let text = document.getElementById(e.target.id);
        text.classList.toggle("text-decoration-line-through");
        setTarea({
            ...tarea,
            "completed": e.target.checked
        });
    }


    const editar = (e) => {
        setEdit({
            valor: true,
            id: e.target.id
        })
    }

    const confirmarEditar = (id) => {
        let update = tarea;
        update.id = id;
        fetch(HOST_API + "/TodoList", {
            method: "PUT",
            body: JSON.stringify(update),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                cargar();
            }).catch(err => console.log(err))


        setEdit({
            valor: false,
            id: -1
        })
    }


    const eliminar = (id) => {
        fetch(HOST_API + "/TodoList/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            cargar();
            return response.json()})

            .catch(err => console.log(err))
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Ingrese una tarea"
                    name="tarea"
                    id="todoInput"
                    onChange={handleSubmit}

                />
                <button
                    className="btn btn-success col-auto"
                    onClick={agregar}
                >Agregar</button>
            </form>

            {
                tareas.map((item, index) => {
                    return (
                        <div className="row align-items-end">
                            <p className="col-1" id={item.id}>{item.tarea} </p>
                            <div className="col mt-2">
                                <div class="form-check form-switch col-3">
                                    <input
                                        className={"form-check-input "+"switch"+item.id}
                                        type="checkbox"
                                        role="switch"
                                        name="completed"
                                        onChange={cambioSwitch}
                                        id={item.id}

                                    />
                                    <label class="form-check-label" for="flexSwitchCheckChecked">Completado</label>
                                </div>

                                <button
                                    className="btn btn-outline-danger col-1 me-md-3"
                                    onClick={()=>eliminar(item.id)}>Eliminar</button>

                                <button
                                    className="btn btn-outline-info col-1"
                                    id={item.id}
                                    onClick={editar}>Editar</button>

                            </div>

                            {edit.valor && edit.id == item.id ?

                                <div className="row">
                                    <input type="text"
                                        className="col form-control"
                                        placeholder="Ingrese una tarea"
                                        name="tarea"
                                        id="todoInput"
                                        onChange={handleSubmit} />
                                    <button
                                        className="btn btn-outline-info col-auto"
                                        onClick={() => confirmarEditar(edit.id)}>Confirmar</button>

                                </div>
                                : <span></span>}
                        </div>

                    );
                })

            }

        </div>
    );


}

export default ListaToDo;