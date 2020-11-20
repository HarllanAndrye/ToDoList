package br.com.harllan.todolist.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.enterprise.context.RequestScoped;

@RequestScoped
public class PasswordEncoder {

	/*
	 * https://www.devmedia.com.br/como-funciona-a-criptografia-hash-em-java/31139
	 * */
	public String encode(String password) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		byte messageDigest[] = md.digest(password.getBytes("UTF-8"));
			
		StringBuilder hexString = new StringBuilder();
		for (byte b : messageDigest) {
			hexString.append(String.format("%02X", 0xFF & b));
		}
		
		String passwordhex = hexString.toString();
		
		return passwordhex;
	}
	
}
