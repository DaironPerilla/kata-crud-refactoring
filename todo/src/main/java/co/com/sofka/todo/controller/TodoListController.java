package co.com.sofka.todo.controller;

import co.com.sofka.todo.model.TodoList;
import co.com.sofka.todo.service.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TodoListController {

    @Autowired
    TodoListService service;




    @GetMapping(value = "api/TodoLists")
    public ResponseEntity<List<TodoList>> getAllTodos() {
        return service.getAll();
    }

    @GetMapping(value = "api/TodoList/{id}")
    public ResponseEntity<TodoList> getById(@PathVariable("id") Long id){
        return service.getById(id);
    }

    @PostMapping(value = "api/TodoList")
    public ResponseEntity<TodoList> save(@RequestBody TodoList todo){
        return service.save(todo);
    }

    @PutMapping(value = "api/TodoList")
    public ResponseEntity<TodoList> update(@RequestBody TodoList todo){
        ResponseEntity<TodoList> auxTodo = service.getById(todo.getId());
        if(auxTodo.getStatusCodeValue() == 200){
            return service.save(todo);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }

    @DeleteMapping(value = "api/TodoList/{id}")
    public void deleteById(@PathVariable("id") Long id){
        service.deleteById(id);
    }

    @GetMapping(value = "api/TodoList/nombre/{nombre}")
    public ResponseEntity<List<TodoList>> getByName(@PathVariable("name") String name){
        return service.getByGroupName(name);
    }
}
