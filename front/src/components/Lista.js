import React from 'react';
import ListaToDo from './AgregarTodo'
const List = (props) => {

    const HOST_API = "http://localhost:8080/api";

    /**
     * Elimina la lista indicada de la pagina y la 
     * base de datos con sus tareas incluidas
     */
    const eliminar = () => {
        fetch(HOST_API + "/todo/" + props.group.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(err => console.error(err));

        filtrarTodo();
    }


    /**
     * Filtra las tareas de lista actual
     */
    const filtrarTodo = () => {
        let lista;
        fetch(HOST_API + "/TodoLists", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                lista = todo.filter(to => to.groudName === props.group.name);
                eliminarTodos(lista);
            })
            .catch(err => console.error(err))
    }

    /**
     * Recibe la lista de las tareas de la 
     * lista actual y las elimina, al finalizar recarga la pagina
     */
    const eliminarTodos = (lista) => {
        for (let i of lista) {
            fetch(HOST_API + "/TodoList/" + i.id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.json();
            })
            
            .catch(err => console.error(err))
        }
        window.location.reload();
    }

   
    return (
        <div>
            <div className="row mt-4">
                <h1 className="col-auto">Lista {props.group.name}</h1>
                <button
                    className="col-auto btn btn-outline-danger eliminar"
                    onClick={eliminar}>Eliminar</button>
            </div>
            <ListaToDo group={props.group} />

        </div>
    );
}

export default List;