package br.com.harllan.todolist.dao;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;

import br.com.harllan.todolist.model.TodoList;
import br.com.harllan.todolist.model.TodoListStatus;
import io.quarkus.panache.common.Sort;

@RequestScoped
public class TodoListStatusDao {

	@Transactional
	public void insertStatus(TodoListStatus status) {
		TodoListStatus.persist(status);
	}
	
	public List<TodoListStatus> getStatusByTaskId(Long id) {
		/*
		 * "todolist" é o atributo da classe TodoListStatus do tipo TodoList
		 * ("todolist" e a foreign key nomeada de todolist_id)
		 * */
		return TodoListStatus.list("todolist", Sort.by("creationDate").descending(), new TodoList(id));
	}

}
