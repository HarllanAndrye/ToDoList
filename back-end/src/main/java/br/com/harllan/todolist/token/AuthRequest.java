package br.com.harllan.todolist.token;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import org.eclipse.microprofile.openapi.annotations.media.Schema;

public class AuthRequest {

	@NotEmpty(message = "O nome de usuário é obrigatório")
	@NotBlank(message = "O nome de usuário é obrigatório")
	@Schema(description = "Deve ser criptografado com Base64.")
	public String username;
	
	@NotEmpty(message = "A senha é obrigatória")
	@NotBlank(message = "A senha é obrigatória")
	@Schema(description = "Deve ser criptografado com Base64.")
	public String password;
	
}
