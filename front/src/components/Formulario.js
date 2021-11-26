import React, { Fragment, useState, useEffect } from 'react'
import List from './Lista';

const Formulario = () => {
    const HOST_API = "http://localhost:8080/api";

    const [datos, setDatos] = useState({
        "name": ""
    });
    
    const [lista, setLista] = useState([]);
    
    
    useEffect(() => {
        console.log(lista);
        cargar();
        console.log(lista);
    }, [])

    const handleInputChange = (evento) => {
        setDatos({
            ...datos,
            [evento.target.name]: evento.target.value
        });
    };

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
            </div>
            {
                lista.map((item, index) => {

                   return (
                       <List key={index} group={item}/>
                       )
                       

                })

            }


        </Fragment>
    )

};

export default Formulario;
