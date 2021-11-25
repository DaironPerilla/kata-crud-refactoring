package co.com.sofka.todo.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class TodoList {

    @Id
    private Long id;
    private String tarea;
    private boolean completed;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTarea() {
        return tarea;
    }

    public void setTarea(String tarea) {
        this.tarea = tarea;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
