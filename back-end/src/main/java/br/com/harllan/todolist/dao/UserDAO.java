package br.com.harllan.todolist.dao;

import javax.enterprise.context.RequestScoped;

import br.com.harllan.todolist.model.User;

@RequestScoped
public class UserDAO {

	public User getUserByEmail(String email) {
		return User.find("email", email).firstResult();
	}

}
