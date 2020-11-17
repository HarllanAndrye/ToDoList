package br.com.harllan.todolist.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.hibernate.validator.constraints.Length;

import br.com.harllan.todolist.model.enums.StatusEnum;

/*
 * Esta classe é só para representar o tipo de request (como é o corpo do request) 
 * utilizado no método PUT.
 * */
public class TodoListPutDTO {

	@NotEmpty(message = "O campo 'nome' é obrigatório")
	@NotBlank(message = "O campo 'nome' é obrigatório")
	@Length(min = 3, max = 200)
	private String name;
	
	@Schema(oneOf = StatusEnum.class)
	private String status;
	
}
