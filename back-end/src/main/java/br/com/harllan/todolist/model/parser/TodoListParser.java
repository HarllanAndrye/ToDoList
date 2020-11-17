package br.com.harllan.todolist.model.parser;

import br.com.harllan.todolist.dto.TodoListDTO;
import br.com.harllan.todolist.model.TodoList;

public class TodoListParser {
	
	public static TodoListParser get() {
		return new TodoListParser();
	}
	
	public TodoList returnEntity(TodoListDTO dto) {
		TodoList entityTodolist = new TodoList();
		
		entityTodolist.setId(dto.getId());
		entityTodolist.setName(dto.getName());
		entityTodolist.setCreationDate(dto.getCreationDate());
		
		return entityTodolist;
	}
	
	public TodoListDTO returnDto(TodoList entity) {
		
		TodoListDTO dto = new TodoListDTO();
		
		dto.setId(entity.getId());
		dto.setName(entity.getName());
		dto.setCreationDate(entity.getCreationDate());
		dto.setStatus(entity.getStatus().get(entity.getStatus().size() - 1).toString()); // Obtém o último status atribuído a tarefa		
		dto.setUser(entity.getStatus().get(entity.getStatus().size() - 1).getUser().getName());
		
		return dto;
	}

}
