package com.provaJava.ProvaJava.tests;

import java.time.LocalDateTime;

import org.springframework.boot.test.mock.mockito.MockBean;

import com.provaJava.ProvaJava.domain.Email;
import com.provaJava.ProvaJava.domain.User;
import com.provaJava.ProvaJava.enums.StatusEmail;
import com.provaJava.ProvaJava.resources.dto.EmailDTO;
import com.provaJava.ProvaJava.security.TokenService;

import java.time.LocalDateTime;

public class Factory {
	
	 private TokenService tokenService = new TokenService();
	
	public static Email createEmail() {
		Email email = new Email(1L, "Owner Reference", "from@example.com", "to@example.com" ,"Test Subject", "Test Content", LocalDateTime.now(), StatusEmail.SENT );
		return email;
	}
	
	public static EmailDTO createEmailDTO() {
		Email x = createEmail();
		return new EmailDTO (x.getOwnerRef(), x.getEmailFrom(), x.getEmailTo(), x.getSubject(), x.getText());
	}
	
	public String createToken() {
	    User user = new User(1L, "name", "name@gmail.com", "123456");
	    try {
	        return tokenService.generateToken(user);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return null;
	    }
	}
	
}
