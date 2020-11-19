package br.com.harllan.todolist.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.security.jpa.Password;
import io.quarkus.security.jpa.PasswordType;
import io.quarkus.security.jpa.Roles;
import io.quarkus.security.jpa.Username;


//@UserDefinition // Utilizado para autenticação básica
@Entity
@Table(name = "user")
public class User extends PanacheEntityBase {
	
	@Id
	@GeneratedValue(generator = "UUID")
	@GenericGenerator(
			name = "UUID",
			strategy = "org.hibernate.id.UUIDGenerator"
			)
	private UUID id;
	
	@Column(name = "name", nullable = false)
	private String name;

	@Username
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	
	@Password(PasswordType.CLEAR) // Não utilizar o PasswordType.CLEAR em produção, pois armazenha a senha em modo texto no BD.
	@Column(name = "password", nullable = false)
	private String password;
	
	@Roles
	@Column(name = "permission", nullable = false)
	private String permission;

	
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

}
