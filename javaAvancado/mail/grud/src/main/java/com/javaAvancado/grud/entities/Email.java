package com.javaAvancado.grud.entities;

import java.time.LocalDateTime;

import com.javaAvancado.grud.enums.StatusEmail;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_email")
public class Email {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String ownerRef;
    private String emailFrom;
    private String emailTo;
    private String subject;
   
    @Column(columnDefinition = "TEXT") 
    private String text;
    private LocalDateTime sendDateEmail;
	private StatusEmail statusEmail;
	
}
