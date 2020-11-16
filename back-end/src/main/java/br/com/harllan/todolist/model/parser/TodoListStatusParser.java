package br.com.harllan.todolist.model.parser;

import br.com.harllan.todolist.dto.TodoListStatusDTO;
import br.com.harllan.todolist.model.TodoListStatus;

public class TodoListStatusParser {

	public static TodoListStatusParser get() {
		return new TodoListStatusParser();
	}
	
	/*public TodoListStatus returnEntity(TodoListStatusDTO dto) {
		TodoListStatus entityStatus = new TodoListStatus();
		
		entityStatus.setStatus(StatusEnum.valueOf(dto.getStatus()));
		entityStatus.setTodo(dto.);
		entityStatus.setCreationDate(dto.getCreationDate());
		
		return entityStatus;
	}*/
	
	public TodoListStatusDTO returnDto(TodoListStatus entity) {
		TodoListStatusDTO dto = new TodoListStatusDTO();
		
		dto.setId(entity.getId());
		dto.setStatus(entity.getStatus().name());
		dto.setCreationDate(entity.getCreationDate());
		dto.setUserName(entity.getUser().getName());
		
		return dto;
	}
	
}
