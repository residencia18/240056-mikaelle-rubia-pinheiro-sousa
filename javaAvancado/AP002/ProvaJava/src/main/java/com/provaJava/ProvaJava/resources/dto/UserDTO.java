package com.provaJava.ProvaJava.resources.dto;


import com.provaJava.ProvaJava.domain.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserDTO {
	
	@NotBlank(message = "Valor do campo name não pode ser null ou vazio")
	private String name;
	@Email
	@NotBlank(message = "Valor do campo email não pode ser null ou vazio")
    private String email;
	
    private String password;
	public UserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserDTO(User user) {
		this.name = user.getName();
		this.email = user.getEmail();
		this.password = user.getPassword();
	}
	public UserDTO(String name, String email, String password) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}
    
    
    
    
}
