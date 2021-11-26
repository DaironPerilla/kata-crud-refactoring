package co.com.sofka.todo.service;


import co.com.sofka.todo.model.Todo;
import co.com.sofka.todo.repository.TodoRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


/**
 * Logica de las peticiones del controlador
 */
@Service
public class TodoService {

    @Autowired
    TodoRespository repository;

    public ResponseEntity<List<Todo>> getAll(){
        try {
            List<Todo> todos = new ArrayList<>();
            repository.findAll().forEach(todos::add);
            return new ResponseEntity<List<Todo>>(todos, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    public ResponseEntity<Todo> getById(Long id){
        try {
            Optional<Todo> todo = repository.findById(id);
            if (todo.isPresent()){
                return new ResponseEntity<Todo>(todo.get(), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }

    public ResponseEntity<Todo> save(Todo todo){
        try{
            repository.save(todo);
            return new ResponseEntity<Todo>(todo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
