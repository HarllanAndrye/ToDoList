package br.com.harllan.todolist.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;

import br.com.harllan.todolist.dao.TodoListDAO;
import br.com.harllan.todolist.dto.TodoListDTO;
import br.com.harllan.todolist.model.TodoList;
import br.com.harllan.todolist.model.enums.StatusEnum;
import br.com.harllan.todolist.model.parser.TodoListParser;


@RequestScoped
public class TodoListService {
	
	@Inject
	TodoListDAO dao;
	
	@Inject
	TodoListStatusService statusService;
	
	@Inject
	Validator validator;
	
	public List<TodoListDTO> getTodoList() {
		return dao
				.getTodoList()
				.stream()
				.map(TodoListParser.get()::returnDto)
				.collect(Collectors.toList());
	}
	
	public TodoListDTO getTodoListById(Long id) {
		return TodoListParser.get().returnDto(findById(id));
	}
	
	@Transactional(rollbackOn = Exception.class)
	public Long insertTodoList(TodoListDTO dto, String emailUserLogado) {
		TodoList todo = TodoListParser.get().returnEntity(dto);
		
		Long id = dao.insertTodoList(todo);
		
		statusService.insertStatus(id, StatusEnum.TODO, emailUserLogado);
		
		return id;
	}

	@Transactional(rollbackOn = Exception.class)
	public void updateTodoList(Long id, TodoListDTO dto, String emailUserLogado) {
		// Validando o status
		if ( StatusEnum.isInvalid(dto.getStatus().toString()) ) {
			throw new BadRequestException("Status inválido!");
		}
		
		TodoList todo = TodoListParser.get().returnEntity(dto);
		
		TodoList todoDB = findById(id); // Tarefa encontrada no banco de dados
		todoDB.setName(todo.getName()); // Alterando o nome
		
		dao.updateTodoList(todoDB); // Inserindo a alteração no BD
		
		statusService.updateStatus(id, dto.getStatus(), emailUserLogado); // Atualizando o status
	}
	
	private TodoList findById(Long id) {
		TodoList todo = dao.findById(id);
		
		if(todo == null) {
			throw new NotFoundException();
		}
		
		return todo;
	}

	public Boolean deleteTodoList(Long id) {
		findById(id); // Se não existir a tarefa, será lançada uma exceção
		
		return dao.deleteTodoList(id);
	}

	public List<String> validateDto(TodoListDTO dto) {
		Set<ConstraintViolation<TodoListDTO>> errors = validator.validate(dto);
		
		List<String> errorsList = new ArrayList<>();
		
		// Se existir algum erro, insere na lista
		if (!errors.isEmpty()) {
			errorsList = errors.stream()
					.map(ConstraintViolation::getMessage)
					.collect(Collectors.toList());
			
			//throw new BadRequestException(Response.status(Status.BAD_REQUEST).entity(errorsList.get(0)).build());
		}
		
		return errorsList;
	}

}
