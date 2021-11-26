package co.com.sofka.todo.service;

import co.com.sofka.todo.model.TodoList;
import co.com.sofka.todo.repository.TodoListRepository;
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
public class TodoListService {

    @Autowired
    TodoListRepository repository;
    public ResponseEntity<List<TodoList>> getAll(){
        try {
            List<TodoList> todos = new ArrayList<>();
            repository.findAll().forEach(todos::add);
            return new ResponseEntity<List<TodoList>>(todos, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    public ResponseEntity<TodoList> getById(Long id){
        try {
            Optional<TodoList> todo = repository.findById(id);
            if (todo.isPresent()){
                return new ResponseEntity<TodoList>(todo.get(), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }

    public ResponseEntity<TodoList> save(TodoList todo){
        try{
            repository.save(todo);
            return new ResponseEntity<TodoList>(todo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<TodoList>> getByGroupName(String name){
        try {
            List<TodoList> todo = repository.findByGroudName(name);
            if (todo.size() > 0){
                return new ResponseEntity<List<TodoList>>(todo, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
