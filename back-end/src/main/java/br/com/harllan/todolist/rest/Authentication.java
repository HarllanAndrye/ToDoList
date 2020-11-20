package br.com.harllan.todolist.rest;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import br.com.harllan.todolist.model.User;
import br.com.harllan.todolist.service.UserService;
import br.com.harllan.todolist.token.AuthRequest;
import br.com.harllan.todolist.token.AuthResponse;
import br.com.harllan.todolist.token.Role;
import br.com.harllan.todolist.token.TokenUtils;
import br.com.harllan.todolist.utils.PasswordEncoder;

@Path("user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Authentication")
public class Authentication {
	
	@Inject
	UserService userService;
	
	@Inject
	PasswordEncoder passEncoder;
	
	@ConfigProperty(name = "smallrye.jwt.expiration.grace")
	Long duration;
	
	@ConfigProperty(name = "mp.jwt.verify.issuer")
	String issuer;
	
	@POST
	@PermitAll
	@Path("login")
	public Response login(AuthRequest authRequest) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		List<String> errors = userService.validateRequest(authRequest);
		
		if (!errors.isEmpty()) {
			return Response
					.status(Status.BAD_REQUEST)
					.entity("{\"error\": \"" + errors.get(0) + "\"}")
					.build();
		}
		
		String email;
		try {
			email = new String(Base64.getDecoder().decode(authRequest.username));
		} catch (IllegalArgumentException e) {
			return Response
					.status(Status.BAD_REQUEST)
					.entity("{\"error\": \"Erro ao tentar decodificar username.\"}")
					.build();
		}
		
		//User u = userService.getUserByEmail(authRequest.username);
		User u = userService.getUserByEmail(email);
		
		// Decodificando a senha
		String pass;
		try {
			pass = new String(Base64.getDecoder().decode(authRequest.password));
		} catch (IllegalArgumentException e) {
			return Response
					.status(Status.BAD_REQUEST)
					.entity("{\"error\": \"Erro ao tentar decodificar password.\"}")
					.build();
		}
		
		// Gerando o hash para comparar com o salvo no BD
		pass = passEncoder.encode(pass);
		
		//if (u != null && u.getPassword().equals(authRequest.password)) {
		if (u != null && u.getPassword().equals(pass)) {
			Set<Role> r = new HashSet<Role>();
			r.add(Role.valueOf(u.getPermission()));
			
			try {
				return Response
						.status(Status.OK)
						.entity( new AuthResponse(TokenUtils.generateToken(u.getEmail(), r, duration, issuer)) )
						.build();
			} catch (Exception e) {
				return Response.status(Status.UNAUTHORIZED).build();
			}
		} else {
			return Response.status(Status.UNAUTHORIZED).build();
		}		
	}

}
