package br.com.harllan.todolist.openapi;

import javax.ws.rs.core.Application;

import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.servers.Server;
import org.eclipse.microprofile.openapi.annotations.info.Contact;

@OpenAPIDefinition(
		info = @Info(
				title = "Task list API",
				description = "Conjunto de endpoints utilizados para manipular as tarefas.", 
				version = "1.0.0",
				contact = @Contact(
			            name = "Harllan Andryê",
			            url = "https://github.com/HarllanAndrye")
				),
		servers = {
		        @Server(url = "http://localhost:8080")
		    }
		)
public class ConfigOpenApi extends Application {

}
