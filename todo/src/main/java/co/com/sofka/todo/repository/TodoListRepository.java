package co.com.sofka.todo.repository;

import co.com.sofka.todo.model.TodoList;
import org.springframework.data.repository.CrudRepository;

public interface TodoListRepository extends CrudRepository<TodoList, Long> {
}
