package br.com.harllan.todolist.rest;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.anyOf;
import static org.hamcrest.CoreMatchers.containsString;


@QuarkusTest
@TestMethodOrder(OrderAnnotation.class)
public class TodoListRestTest {

	@Order(1)
	@Test
	public void getTodoListEmptyTest() {
		given()
			.auth()
			.preemptive()
			.basic("teste@email.com", "123456")
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
			.auth()
			.preemptive()
			.basic("teste@email.com", "123456")
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
			.auth()
			.preemptive()
			.basic("teste@email.com", "123456")
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
			.auth()
			.preemptive()
			.basic("teste@email.com", "123456")
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
		.auth()
		.preemptive()
		.basic("teste@email.com", "123456")
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
			.auth()
			.preemptive()
			.basic("teste@email.com", "123456")
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
			.auth()
			.preemptive()
			.basic("teste@email.com", "123456")
			.when()
			.delete("/restapi/todolist/delete/1")
			.then()
				.statusCode(204);
	}
	
}
