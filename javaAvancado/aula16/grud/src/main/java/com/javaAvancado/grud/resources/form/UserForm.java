package com.javaAvancado.grud.resources.form;

import com.javaAvancado.grud.entities.User;

public class UserForm {

	private String firstName;
	private String lastName;
	private String email;
    private String password;
    
	public UserForm(String firstName, String lastName, String email, String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}
	public UserForm() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    public User createUser() {
    	return new User(null, firstName, lastName, email, password);
    }
}
