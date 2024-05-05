package com.provaJava.ProvaJava.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.provaJava.ProvaJava.domain.Email;
import com.provaJava.ProvaJava.enums.StatusEmail;
import com.provaJava.ProvaJava.repositories.EmailRepository;

@Service
public class EmailService {

	@Autowired
	private EmailRepository emailRepository;
	
	@Autowired
	private JavaMailSender emailSender;
	
	public Email insert(Email email) {
		
		email.setSendDateEmail(LocalDateTime.now());
		try {
			SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
			simpleMailMessage.setFrom(email.getEmailFrom());
			simpleMailMessage.setTo(email.getEmailTo());
			simpleMailMessage.setSubject(email.getSubject());
			simpleMailMessage.setText(email.getText());
	
			emailSender.send(simpleMailMessage);
			email.setStatusEmail(StatusEmail.SENT);
      } catch (MailException e) {
            email.setStatusEmail(StatusEmail.ERROR);
       }finally {
    	   return emailRepository.save(email);
       }
		
	}
	
}
