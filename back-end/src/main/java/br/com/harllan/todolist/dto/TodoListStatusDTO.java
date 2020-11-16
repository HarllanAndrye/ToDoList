package br.com.harllan.todolist.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

//import javax.json.bind.annotation.JsonbDateFormat;

@SuppressWarnings("serial")
public class TodoListStatusDTO implements Serializable {
	
	private Long id;
	
	//@JsonbDateFormat("dd/MM/yyyy HH:mm")
	private LocalDateTime creationDate;
	
	private String status;
	
	private String userName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime date) {
		this.creationDate = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
}
