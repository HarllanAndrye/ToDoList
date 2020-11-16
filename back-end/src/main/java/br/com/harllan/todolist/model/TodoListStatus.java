package br.com.harllan.todolist.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.UpdateTimestamp;

import br.com.harllan.todolist.model.enums.StatusEnum;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
@Table(name="todolist_status")
public class TodoListStatus extends PanacheEntity {
	
	@ManyToOne(optional=false) // optional: Informa se a associação é opcional.
	@JoinColumn(name="todolist_id", updatable=false)
	private TodoList todolist;
	
	@Column(name = "status", nullable = false)
	@Enumerated(EnumType.STRING)
	private StatusEnum status;
	
	@Column(name = "creationDate") //, nullable = false
	@UpdateTimestamp
	private LocalDateTime creationDate;

	@ManyToOne(optional = false)
	private User user;
	
	public TodoListStatus() {}
	
	public TodoListStatus(StatusEnum status) {
		this.status = status;
	}
	
	// ID gerado pelo PanacheEntity
	public Long getId() {
		return this.id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public TodoList getTodo() {
		return todolist;
	}

	public void setTodo(TodoList todo) {
		this.todolist = todo;
	}

	public StatusEnum getStatus() {
		return status;
	}

	public void setStatus(StatusEnum status) {
		this.status = status;
	}

	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return this.status.name();
	}

}
