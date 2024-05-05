package com.javaAvancado.grud.resources.DTO;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

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

}
