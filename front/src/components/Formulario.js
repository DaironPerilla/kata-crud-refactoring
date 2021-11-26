import React, { Fragment, useState, useEffect } from 'react'
import List from './Lista';

const Formulario = () => {
    const HOST_API = "http://localhost:8080/api";

    const [datos, setDatos] = useState({
        "name": ""
    });

    const [lista, setLista] = useState([]);
    const [error, setError] = useState(false);

    /**
     * Carga los datos de la base de datos al 
     * iniciar la aplicacion
     */
    useEffect(() => {
        cargar();
    }, [])

    /**
     * Esta pendiente de los cambios en el input y 
     * los guarda en el estado datos.name
     */
    const handleInputChange = (evento) => {
        setDatos({
            ...datos,
            [evento.target.name]: evento.target.value
        });
    };


    /**
     * Agrega una nueva lista a la base de datos y a la pagina
     */
    const Agregar = (e) => {
        e.preventDefault();
        document.getElementById("nombreLista").value = "";


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


    /**
     * Actualiza los datos de la pagina con los de la base de datos
     */
    const cargar = () => {
        fetch(HOST_API + "/todos", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                setLista(todo);
            })
            .catch(err => {
                setError(true);
            })

    }




    return (

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
                            id="nombreLista"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="btn btn-primary me-md-3" onClick={Agregar}>CREAR</button>
                </form>
                {error &&
                    <div className="alert alert-danger mt-3" role="alert">
                        Error al cargar la base de datos
                    </div>
                }
            </div>
            {
                lista.map((item, index) => {

                    return (
                        <Fragment>
                            <List key={index} group={item} />


                        </Fragment>
                    )


                })
            }


        </Fragment>
    )

};

export default Formulario;
