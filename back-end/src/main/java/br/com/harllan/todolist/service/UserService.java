package br.com.harllan.todolist.service;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

import br.com.harllan.todolist.dao.UserDAO;
import br.com.harllan.todolist.model.User;

@RequestScoped
public class UserService {
	
	@Inject
	UserDAO dao;

	public User getUserByEmail(String email) {
		return dao.getUserByEmail(email);
	}

}
