package com.provaJava.ProvaJava.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.provaJava.ProvaJava.domain.Email;
import com.provaJava.ProvaJava.enums.StatusEmail;
import com.provaJava.ProvaJava.exceptions.ResourceNotFoundException;
import com.provaJava.ProvaJava.repositories.EmailRepository;

import com.provaJava.ProvaJava.resources.dto.EmailDTO;

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
	
	@Transactional(readOnly = true)
	public Page<EmailDTO> findAll(PageRequest pageRequest) {
		Page<Email> list = emailRepository.findAll(pageRequest);
		return  list.map(x -> new EmailDTO(x.getOwnerRef(), x.getEmailFrom(), x.getEmailTo(), x.getSubject(), x.getText()));
	}
	
	@Transactional(readOnly = true)
	public EmailDTO findById(Long id) {
		Optional<Email> obj =  emailRepository.findById(id);
		Email entity = obj.orElseThrow(()->new RuntimeException("User not found "));
		return new EmailDTO(entity.getOwnerRef(),entity.getEmailFrom(), entity.getEmailTo(), entity.getSubject(), entity.getText());
	}

	@Transactional
	public void delete(Long id) {
	    Optional<Email> obj =  emailRepository.findById(id);
	    Email entity = obj.orElseThrow(() -> new RuntimeException());
	    emailRepository.deleteById(id);
	}
	
	
	@Transactional
	public Page<EmailDTO> findByEmailFrom(String emailFrom, PageRequest pageRequest) {
		Page<Email> listEmail= emailRepository.findByEmailFrom(pageRequest, emailFrom);

	    return listEmail.map(x -> new EmailDTO(x.getOwnerRef(), x.getEmailFrom(), x.getEmailTo(), x.getSubject(), x.getText()));
	}
	
	@Transactional
	public Page<EmailDTO> findByEmailTo(String emailTo, PageRequest pageRequest) {
		Page<Email> listEmail= emailRepository.findByEmailTo(pageRequest, emailTo);

	    return listEmail.map(x -> new EmailDTO(x.getOwnerRef(), x.getEmailFrom(), x.getEmailTo(), x.getSubject(), x.getText()));
	}
	
}
