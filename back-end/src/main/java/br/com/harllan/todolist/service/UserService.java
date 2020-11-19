package br.com.harllan.todolist.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;

import br.com.harllan.todolist.dao.UserDAO;
import br.com.harllan.todolist.model.User;
import br.com.harllan.todolist.token.AuthRequest;

@RequestScoped
public class UserService {
	
	@Inject
	UserDAO dao;
	
	@Inject
	Validator validator;

	public User getUserByEmail(String email) {
		return dao.getUserByEmail(email);
	}
	
	public List<String> validateRequest(AuthRequest request) {
		Set<ConstraintViolation<AuthRequest>> errors = validator.validate(request);
		
		List<String> errorsList = new ArrayList<>();
		
		if (!errors.isEmpty()) {
			errorsList = errors.stream()
					.map(ConstraintViolation::getMessage)
					.collect(Collectors.toList());
		}
		
		return errorsList;
	}

}
