package br.com.harllan.todolist.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

//import javax.json.bind.annotation.JsonbDateFormat;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.hibernate.validator.constraints.Length;

@SuppressWarnings("serial")
public class TodoListDTO implements Serializable {

	private Long id;
	
	@NotEmpty(message = "O campo 'nome' é obrigatório")
	@NotBlank(message = "O campo 'nome' é obrigatório")
	@Length(min = 3, max = 200, message = "Nome deve ter o tamanho maior que 3 e menor que que 200")
	private String name;
	
	//@JsonbDateFormat("dd/MM/yyyy HH:mm")
	private LocalDateTime creationDate;
	
	private String status;
	
	@Schema(description = "Nome do usuário que inseriu a tarefa.")
	private String user;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
	
}
