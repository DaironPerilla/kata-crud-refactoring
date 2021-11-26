import React from 'react';
import ListaToDo from './AgregarTodo'
const List = (props) => {

    return (
        <div>
            <h1>Lista {props.lista.name}</h1>
            <ListaToDo idLista={props.lista}/>

        </div>
    );
}

export default List;