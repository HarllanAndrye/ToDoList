package br.com.harllan.todolist.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "todolist")
public class TodoList extends PanacheEntityBase {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name", length = 200, nullable = false)
	private String name;
	
	//private String description;
	
	@Column(name = "creationDate", nullable = false, updatable = false)
	@CreationTimestamp
	private LocalDateTime creationDate;
	
	/*
	 * A entidade todolist_status irá armazenar um histórico dos status atribuídos para determinada tarefa, 
	 * 	por isso é uma lista.
	 * 
	 * orphanRemoval: como há um relacionamento, esse parâmetro permite que, ao remover um TodoList, as dependências
	 * 		(registros filhos) também serão removidas. Ou seja, a exclusão de um registro na entidade "todolist", impacta
	 * 		na entidade "todolist_status".
	 * 		Exemplo:
	 * 		Uma tarefa tem 3 histórico de status, se a mesma for removida, o seu histórico também será removido para 
	 * 		evitar "lixo" no BD.
	 * 
	 * mappedBy: esse atributo recebe a string “todolist”, que é o nome do atributo da classe na outra 
	 * 	ponta do relacionamento (TodoListStatus).
	 * */
	@OneToMany(mappedBy = "todolist", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<TodoListStatus> status;
	
	public TodoList() {}

	public TodoList(Long id) {
		this.id = id;
	}

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

	public List<TodoListStatus> getStatus() {
		return status;
	}

	public void setStatus(List<TodoListStatus> status) {
		this.status = status;
	}
	
}
