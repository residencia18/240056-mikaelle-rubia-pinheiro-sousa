package com.provaJava.ProvaJava.resources.dto;


import java.io.Serializable;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class EmailDTO {

	private Long id;
	
	@NotBlank(message = "Valor do campo ownerRef não pode ser null ou vazio")
	private String ownerRef;
	
	@Email
	@NotBlank(message = "Valor do campo emailFrom não pode ser null ou vazio")
    private String emailFrom;
	
	@Email
	@NotBlank(message = "Valor do campo emailTo não pode ser null ou vazio")
    private String emailTo;
	
	@NotBlank(message = "Valor do campo subject não pode ser null ou vazio")
    private String subject;
	
	@NotBlank(message = "Valor do campo text não pode ser null ou vazio")
    private String text;

	public EmailDTO() {
		
	}

	public EmailDTO(String ownerRef, String emailFrom, String emailTo, String subject, String text) {
		super();
		this.id = null;
		this.ownerRef = ownerRef;
		this.emailFrom = emailFrom;
		this.emailTo = emailTo;
		this.subject = subject;
		this.text = text;
	}
	

}