package com.provaJava.ProvaJava.domain;

import java.time.LocalDateTime;

import com.provaJava.ProvaJava.enums.StatusEmail;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_email")
@AllArgsConstructor
@NoArgsConstructor
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
