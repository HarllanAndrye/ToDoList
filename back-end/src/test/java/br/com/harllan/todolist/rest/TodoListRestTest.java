package br.com.harllan.todolist.rest;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import br.com.harllan.todolist.token.Role;
import br.com.harllan.todolist.token.TokenUtils;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

import java.util.HashSet;
import java.util.Set;

import static org.hamcrest.CoreMatchers.anyOf;
import static org.hamcrest.CoreMatchers.containsString;


@QuarkusTest
@TestMethodOrder(OrderAnnotation.class)
public class TodoListRestTest {

	private static String bearerToken;
	
	@BeforeAll
	public static void generateToken() {
		Set<Role> roles = new HashSet<Role>();
		roles.add(Role.ADMIN);
		
		try {
			bearerToken = TokenUtils.generateToken("teste@email.com", roles, Long.valueOf(3600), "https://harllan.com/issuer");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Order(1)
	@Test
	public void getTodoListEmptyTest() {
		/*
		 * .auth()
			.preemptive()
			.basic("teste@email.com", "123456")
		 * */
		given()
			.headers(
	              "Authorization",
	              "Bearer " + bearerToken,
	              "Content-Type",
	              ContentType.JSON,
	              "Accept",
	              ContentType.JSON)
			.when()
			.get("/restapi/todolist")
			.then()
				.statusCode(200)
				.contentType(ContentType.JSON)
				.body(is("[]")); // 1º GET vem vazio no banco de teste
	}
	
	@Order(2)
	@Test
	public void insertTodoListTest() {
		String data = 
				"{\n"
				+ "  \"name\": \"TesteAgora\"\n"
				+ "}";
		
		given()
			.headers(
	              "Authorization",
	              "Bearer " + bearerToken,
	              "Content-Type",
	              ContentType.JSON,
	              "Accept",
	              ContentType.JSON)
			.contentType(ContentType.JSON)
			.body(data)
			.when()
			.post("/restapi/todolist/insert")
				.then()
				.statusCode(201)
				.contentType(ContentType.JSON)
				.body(anyOf(containsString("TesteAgora")));
	}
	
	@Order(3)
	@Test
	public void getTodoListTest() {
		given()
			.headers(
	              "Authorization",
	              "Bearer " + bearerToken,
	              "Content-Type",
	              ContentType.JSON,
	              "Accept",
	              ContentType.JSON)
			.when()
			.get("/restapi/todolist")
			.then()
				.statusCode(200)
				.contentType(ContentType.JSON)
				.body(anyOf(containsString("TesteAgora"), containsString("TODO")));
	}
	
	@Order(4)
	@Test
	public void getTodoListByIdTest() {
		given()
			.headers(
	              "Authorization",
	              "Bearer " + bearerToken,
	              "Content-Type",
	              ContentType.JSON,
	              "Accept",
	              ContentType.JSON)
			.when()
			.get("/restapi/todolist/1")
			.then()
				.statusCode(200)
				.contentType(ContentType.JSON)
				.body(anyOf(containsString("TesteAgora"), containsString("TODO")));
	}
	
	@Order(5)
	@Test
	public void getStatusByTaskIdTest() {
		given()
		.headers(
	              "Authorization",
	              "Bearer " + bearerToken,
	              "Content-Type",
	              ContentType.JSON,
	              "Accept",
	              ContentType.JSON)
		.when()
		.get("/restapi/todolist/status/1")
		.then()
			.statusCode(200)
			.contentType(ContentType.JSON)
			.body(anyOf(containsString("test"), containsString("TODO")));
	}
	
	@Order(6)
	@Test
	public void updateTodoListTest() {
		String data = "{\r\n" + 
				"  \"name\": \"TesteAgora alterado\",\r\n" + 
				"  \"status\": \"DOING\"\r\n" + 
				"}";
		
		given()
			.headers(
	              "Authorization",
	              "Bearer " + bearerToken,
	              "Content-Type",
	              ContentType.JSON,
	              "Accept",
	              ContentType.JSON)
			.contentType(ContentType.JSON)
			.body(data)
			.when()
			.put("/restapi/todolist/update/1")
				.then()
				.statusCode(201);
	}
	
	@Order(7)
	@Test
	public void deleteTodoListTest() {
		given()
			.headers(
	              "Authorization",
	              "Bearer " + bearerToken,
	              "Content-Type",
	              ContentType.JSON,
	              "Accept",
	              ContentType.JSON)
			.when()
			.delete("/restapi/todolist/delete/1")
			.then()
				.statusCode(204);
	}
	
}
