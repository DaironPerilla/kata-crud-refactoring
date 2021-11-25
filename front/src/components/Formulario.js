import React, { Fragment, useState } from 'react'
import List from './Lista';


const Formulario = () => {

    const [datos, setDatos] = useState({
        nombreLista: ''
    });

    const [lista, setLista] = useState([]);

    const handleInputChange = (evento) => {
        setDatos({
            ...datos,
            [evento.target.name]: evento.target.value
        });
    };

    const Agregar = (e) => {
        e.preventDefault();
        setLista([
            ...lista, datos
        ]
        )

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
                            name="nombreLista"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={Agregar}>CREAR</button>
                </form>
            </div>
            {
                lista.map((item, index) =>{
                    return <List key={index} lista={item}/>
                })
            
            }
        </Fragment>
    );
};

export default Formulario;