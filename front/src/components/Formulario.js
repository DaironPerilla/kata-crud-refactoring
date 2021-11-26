import React, { Fragment, useState } from 'react'
import List from './Lista';

const Formulario = () => {
    const HOST_API = "http://localhost:8080/api";

    const [datos, setDatos] = useState({
        "name": ""
    });

    const [lista, setLista] = useState([]);
    const [todos, setTodos] = useState([]);

    const handleInputChange = (evento) => {
        setDatos({
            ...datos,
            [evento.target.name]: evento.target.value
        });
    };

    const Agregar = (e) => {
        e.preventDefault();
        e.target.value = "";
        console.log("datos");
        console.log(datos);
        
        fetch(HOST_API + "/todo", {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((todo) => {
            setLista([todo]);
            cargar();
        }).catch(err => console.log(err))
    }
    
    const cargar = () => {
        // e.preventDefault();
        // e.target.value = "";
        fetch(HOST_API + "/todos", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                setLista(todo);
                cargarTodos();
            })

    }



    const cargarTodos = () => {
        fetch(HOST_API + "/TodoLists", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                console.log(todo);
                setTodos(todo);
            })
    }




return(

    <Fragment>
    <div className="container">
        <form >
            <div className="mb-3">
                <label className="form-label">Nueva lista</label>
                <input
                    placeholder="Nombre de la lista"
                    type="text"
                    className="form-control"
                    name="name"
                // onChange={handleInputChange}
                />
            </div>
            <button className="btn btn-primary me-md-3">CREAR</button>
        </form>
    </div>
    <h1>Lista</h1>

    <div>

        <h4>Lista Todo </h4>
        <form>
            <input
                type="text"
                placeholder="Ingrese una tarea"
                name="tarea"

            />
            <button className="btn btn-success col-auto" >Agregar</button>
        </form>

        <div className="row align-items-end">
            <p className="col-3">asddas</p>
            <div className="row mt-2">

                <div class="form-check form-switch col-3">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        name="completed"
                    />
                    <label class="form-check-label" for="flexSwitchCheckChecked">Completado</label>
                </div>

                <button 
                    className="btn btn-outline-danger col-1 me-md-3">Eliminar</button>

                <button 
                    className="btn btn-outline-info col-1">Editar</button>

            </div>


        </div>
    </div>

</Fragment>
)


    // return (
    //     <Fragment>
    //         <div className="container">
    //             <form >
    //                 <div className="mb-3">
    //                     <label className="form-label">Nueva lista</label>
    //                     <input
    //                         placeholder="Nombre de la lista"
    //                         type="text"
    //                         className="form-control"
    //                         name="name"
    //                         onChange={handleInputChange}
    //                     />
    //                 </div>
    //                 <button className="btn btn-primary me-md-3" onClick={Agregar}>CREAR</button>
    //             </form>
    //         </div>
    //         {
    //             lista.map((item, index) => {
    //                 let todo = todos.filter((to) => to.groudName === item.name)

    //                 return <List key={index} lista={item} tod={todo}/>
    //             })

    //         }
    //     </Fragment>
    // );
};

export default Formulario;
{/* <button className="btn btn-success me-md-3" onClick={cargar}>CARGAR</button> */}
