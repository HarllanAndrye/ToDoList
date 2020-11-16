package br.com.harllan.todolist.dao;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;

import br.com.harllan.todolist.model.TodoList;

@RequestScoped
public class TodoListDAO {
	
	public List<TodoList> getTodoList() {
		return TodoList.listAll();
	}

	@Transactional
	public Long insertTodoList(TodoList todo) {
		todo.persistAndFlush(); // Inserindo dados no BD
		
		return todo.getId();
	}

	public TodoList findById(Long id) {
		return TodoList.findById(id);
	}

	@Transactional
	public void updateTodoList(TodoList todo) {
		TodoList.update("name = ?1 WHERE id = ?2", todo.getName(), todo.getId());
	}

	@Transactional
	public Boolean deleteTodoList(Long id) {
		return TodoList.deleteById(id);
	}

}
