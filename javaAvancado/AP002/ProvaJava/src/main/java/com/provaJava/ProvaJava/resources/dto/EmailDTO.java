package com.provaJava.ProvaJava.resources.dto;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.provaJava.ProvaJava.repositories.UserRepository;
import com.provaJava.ProvaJava.resources.EmailResource;
import com.provaJava.ProvaJava.security.TokenService;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data

public class EmailDTO {
	
	@NotBlank(message = "Valor do campo email não pode ser null ou vazio")
	private String ownerRef;
	
	@Email
	@NotBlank(message = "Valor do campo email não pode ser null ou vazio")
    private String emailFrom;
	
	@Email
	@NotBlank(message = "Valor do campo email não pode ser null ou vazio")
    private String emailTo;
	
	@NotBlank(message = "Valor do campo email não pode ser null ou vazio")
    private String subject;
	
	@NotBlank(message = "Valor do campo email não pode ser null ou vazio")
    private String text;

	public EmailDTO(String ownerRef, String emailFrom, String emailTo, String subject, String text) {
		super();
		this.ownerRef = ownerRef;
		this.emailFrom = emailFrom;
		this.emailTo = emailTo;
		this.subject = subject;
		this.text = text;
	}
	
}