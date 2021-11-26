package co.com.sofka.todo.repository;

import co.com.sofka.todo.model.Todo;
import org.springframework.data.repository.CrudRepository;

public interface TodoRespository extends CrudRepository<Todo, Long>{


}
