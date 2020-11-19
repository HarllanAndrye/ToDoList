package br.com.harllan.todolist.token;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

public class AuthRequest {

	@NotEmpty(message = "O nome de usuário é obrigatório")
	@NotBlank(message = "O nome de usuário é obrigatório")
	public String username;
	
	@NotEmpty(message = "A senha é obrigatória")
	@NotBlank(message = "A senha é obrigatória")
	public String password;
	
}
