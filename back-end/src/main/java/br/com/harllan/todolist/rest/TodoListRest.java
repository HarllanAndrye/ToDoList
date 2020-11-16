package br.com.harllan.todolist.rest;

import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import br.com.harllan.todolist.dto.TodoListDTO;
import br.com.harllan.todolist.dto.TodoListStatusDTO;
import br.com.harllan.todolist.service.TodoListService;
import br.com.harllan.todolist.service.TodoListStatusService;

@Path("todolist")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed({"ADMIN", "USER"})
public class TodoListRest {
	
	@Inject
	TodoListService service;
	
	@Inject
	TodoListStatusService statusService;
	
	
	@GET
	@Operation(summary = "Listar tarefas",
		description = "Retorna uma lista com todas as tarefas.")
	@APIResponse(responseCode = "200",
		description = "lista de tarefas",
		content = {
			@Content(mediaType =  "application/json",
			schema = @Schema(implementation = TodoListDTO.class, type = SchemaType.ARRAY))
			}
	)
	public Response getTodoList() {
		return Response
				.status(Status.OK)
				.entity(service.getTodoList())
				.build();
	}
	
	@GET
	@Path("/{id}")
	@Operation(summary = "Lista uma tarefa",
		description = "Retorna uma tarefa com base no ID.")
	@APIResponse(responseCode = "200",
		description = "lista uma tarefa",
		content = {
			@Content(mediaType =  "application/json",
			schema = @Schema(implementation = TodoListDTO.class, type = SchemaType.ARRAY))
			}
	)
	public Response getTodoListById(@PathParam("id") Long id) {
		return Response
				.status(Status.OK)
				.entity(service.getTodoListById(id))
				.build();
	}
	
	@GET
	@Path("status/{id}")
	@Operation(summary = "Lista os status de uma tarefa",
		description = "Retorna uma lista com os status de uma tarefa com base no ID da mesma.")
	@APIResponse(responseCode = "200",
		description = "lista status",
		content = {
			@Content(mediaType =  "application/json",
			schema = @Schema(implementation = TodoListStatusDTO.class, type = SchemaType.ARRAY))
			}
	)
	public Response getStatusByTaskId(@PathParam("id") Long id) {
		return Response
				.status(Status.OK)
				.entity(statusService.getStatusByTaskId(id))
				.build();
	}
	
	@POST
	@Path("insert")
	@Operation(summary = "Inserir tarefa",
		description = "Após inserir a tarefa, a mesma será retornada como um objeto (id, nome, data de criação e status).")
	@APIResponse(responseCode = "201",
		description = "inserir tarefa",
		content = {
			@Content(mediaType =  "application/json",
			schema = @Schema(implementation = TodoListDTO.class, type = SchemaType.ARRAY))
			}
	)
	public Response insertTodoList(TodoListDTO dto, @Context SecurityContext securityContext) {
		List<String> errors = service.validateDto(dto); // Validando os dados do dto
		
		if (!errors.isEmpty()) {
			return Response
					.status(Status.BAD_REQUEST)
					.entity(errors.get(0))
					.build();
		}
		
		Long id = service.insertTodoList(dto, securityContext.getUserPrincipal().getName());
		
		return Response
				.status(Status.CREATED)
				.entity(service.getTodoListById(id))
				.build();
	}
	
	@PUT
	@Path("update/{id}")
	@Operation(summary = "Atualizar uma tarefa",
		description = "Atualizar tarefa com base no ID.")
	@APIResponse(responseCode = "201",
		description = "atualizar tarefa",
		content = {
			@Content(mediaType =  "application/json",
			schema = @Schema(implementation = TodoListDTO.class))
			}
	)
	public Response updateTodoList(@PathParam("id") Long id, TodoListDTO dto,  @Context SecurityContext securityContext) {
		List<String> errors = service.validateDto(dto);
		
		if (!errors.isEmpty()) {
			return Response
					.status(Status.BAD_REQUEST)
					.entity(errors.get(0))
					.build();
		}
		
		service.updateTodoList(id, dto, securityContext.getUserPrincipal().getName());
		
		return Response
				.status(Status.CREATED)
				.build();
	}
	
	@DELETE
	@Path("/delete/{id}")
	@Operation(summary = "Excluir uma tarefa",
		description = "Exclui uma tarefa com base no ID.")
	@APIResponse(responseCode = "204",
		description = "excluir tarefa",
		content = {
			@Content(mediaType =  "application/json",
			schema = @Schema(implementation = TodoListDTO.class))
			}
	)
	public Response deleteTodoList(@PathParam("id") Long id) {
		if (service.deleteTodoList(id)) {
			return Response
					.status(Status.NO_CONTENT)
					.build();
		}
		
		return Response
				.status(Status.INTERNAL_SERVER_ERROR)
				.build();
	}
}
