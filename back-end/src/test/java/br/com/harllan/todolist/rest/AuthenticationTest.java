package br.com.harllan.todolist.rest;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.anyOf;
import static org.hamcrest.CoreMatchers.containsString;

import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

@QuarkusTest
public class AuthenticationTest {
	
	@Test
	public void insertTodoListTest() {
		String data = "{\r\n" + 
				"  \"password\": \"123456\",\r\n" + 
				"  \"username\": \"teste@email.com\"\r\n" + 
				"}";
		
		given()
			.contentType(ContentType.JSON)
			.body(data)
			.when()
			.post("/restapi/user/login")
				.then()
				.statusCode(200)
				.contentType(ContentType.JSON)
				.body(anyOf(containsString("token")));
	}

}
