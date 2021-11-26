package co.com.sofka.todo.model;

import javax.persistence.*;

@Entity
public class TodoList {

    @Id
    @GeneratedValue
    private Long id;

    private String tarea;
    private boolean completed;
    private String groudName;

    public String getGroudName() {
        return groudName;
    }

    public void setGroudName(String groudName) {
        this.groudName = groudName;
    }

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
