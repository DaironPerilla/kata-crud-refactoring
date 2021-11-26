package co.com.sofka.todo.controller;

import co.com.sofka.todo.model.Todo;
import co.com.sofka.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Controlador de los contenedores de
 * listas de tareas
 */
@RestController
@CrossOrigin(origins = "*")
public class TodoController {

    @Autowired
    TodoService service;


    @GetMapping(value = "api/todos")
    public ResponseEntity<List<Todo>> getAllTodos() {
        return service.getAll();
    }

    @GetMapping(value = "api/todo/{id}")
    public ResponseEntity<Todo> getById(@PathVariable("id") Long id) {
        return service.getById(id);
    }

    @PostMapping(value = "api/todo")
    public ResponseEntity<Todo> save(@RequestBody Todo todo) {
        System.out.println("todo = " + todo);
        return service.save(todo);
    }

    @PutMapping(value = "api/todo")
    public ResponseEntity<Todo> update(@RequestBody Todo todo) {
        ResponseEntity<Todo> auxTodo = service.getById(todo.getId());
        if (auxTodo.getStatusCodeValue() == 200) {
            return service.save(todo);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }

    @DeleteMapping(value = "api/todo/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        service.deleteById(id);
    }


}
