import React from 'react';
import ListaToDo from './AgregarTodo'
const List = (props) => {



    return (
        <div>
            <h1>Lista {props.lista.nombreLista}</h1>
                <ListaToDo className="col"/>

        </div>
    );
}

export default List;