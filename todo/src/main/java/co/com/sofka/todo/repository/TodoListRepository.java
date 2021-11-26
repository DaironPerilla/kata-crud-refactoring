package co.com.sofka.todo.repository;

import co.com.sofka.todo.model.TodoList;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TodoListRepository extends CrudRepository<TodoList, Long> {
    List<TodoList> findByGroudName(String groudName);

}
