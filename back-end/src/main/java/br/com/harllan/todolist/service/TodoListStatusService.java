package br.com.harllan.todolist.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.NotAllowedException;
import javax.ws.rs.NotFoundException;

import br.com.harllan.todolist.dao.TodoListStatusDao;
import br.com.harllan.todolist.dto.TodoListStatusDTO;
import br.com.harllan.todolist.model.TodoList;
import br.com.harllan.todolist.model.TodoListStatus;
import br.com.harllan.todolist.model.enums.StatusEnum;
import br.com.harllan.todolist.model.parser.TodoListStatusParser;

@RequestScoped
public class TodoListStatusService {

	@Inject
	TodoListStatusDao dao;
	
	@Inject
	UserService userService;
	
	/*
	 * Método que verifica se o status está correto (se é válido).
	 * (status vindo da aplicação que está consumindo a API.)
	 * */
	private void validateStatus(TodoListStatus todoStatus) {
		if( StatusEnum.isInvalid(todoStatus.getStatus().toString()) ) {
			throw new NotFoundException();
		}
	}
	
	/*
	 * Método que verifica se o status pode ser alterado.
	 * Se tiver como DONE, o mesmo não pode ser alterado.
	 * 
	 * todoStatusDB: é o status da tarefa que está no banco de dados.
	 * todoStatusFront: é o status da tarefa que vem da aplicação que está consumindo a API (front-end).
	 * */
	private void validarAtualizacao(TodoListStatus todoStatusDB, TodoListStatus todoStatusFront) {
		validateStatus(todoStatusFront);
		
		if(todoStatusDB.getStatus().equals(StatusEnum.DONE)) {
			throw new NotAllowedException("Não é permitido a modificação da tarefa com o status DONE!");
		}
	}
	
	public List<TodoListStatusDTO> getStatusByTaskId(Long id) {
		return dao
				.getStatusByTaskId(id)
				.stream()
				.map(TodoListStatusParser.get()::returnDto)
				.collect(Collectors.toList());
	}
	
	@Transactional(rollbackOn = Exception.class)
	public void insertStatus(Long id, StatusEnum statusTodo, String emailUserLogado) {
		TodoListStatus todoListStatus = new TodoListStatus(statusTodo);
		todoListStatus.setTodo(new TodoList(id));
		todoListStatus.setUser(userService.getUserByEmail(emailUserLogado));
		
		validateStatus(todoListStatus);
		
		dao.insertStatus(todoListStatus);
	}
	
	@Transactional(rollbackOn = Exception.class)
	public void updateStatus(Long id, String status, String emailUserLogado) {
		TodoListStatus statusFront = new TodoListStatus(StatusEnum.valueOf(status));
		statusFront.setTodo(new TodoList(id));
		statusFront.setUser(userService.getUserByEmail(emailUserLogado));
		
		TodoListStatus statusDB = dao.getStatusByTaskId(id).get(0); // Retorna o status mais recente da tarefa
		
		validarAtualizacao(statusDB, statusFront);
		
		dao.insertStatus(statusFront);
	}
	
}
