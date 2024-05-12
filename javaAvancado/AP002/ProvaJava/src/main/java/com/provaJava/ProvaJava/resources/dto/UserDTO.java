package com.provaJava.ProvaJava.resources.dto;


import com.provaJava.ProvaJava.domain.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserDTO {
	
	private Long id;
	
	@NotBlank(message = "Valor do campo name não pode ser null ou vazio")
	private String name;
	@Email
	@NotBlank(message = "Valor do campo email não pode ser null ou vazio")
    private String email;
	

	public UserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserDTO(User user) {
		this.id = user.getId();
		this.name = user.getName();
		this.email = user.getEmail();

	}
	public UserDTO(String name, String email) {
		super();
		this.id = null;
		this.name = name;
		this.email = email;

	}
    
    
    
    
}
