package com.provaJava.ProvaJava.service;

import static org.mockito.ArgumentMatchers.any;


import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.provaJava.ProvaJava.domain.Email;
import com.provaJava.ProvaJava.repositories.EmailRepository;
import com.provaJava.ProvaJava.resources.dto.EmailDTO;
import com.provaJava.ProvaJava.tests.Factory;

@ExtendWith(SpringExtension.class)
public class EmailServicesTest {

	@InjectMocks
	private EmailService service;

	@Mock
    private EmailRepository emailRepository;

	private Long existingId;
	private Long nonExistingId;
	private Email email;
	private Page<Email> page;
	private String EmailFrom;
	private String EmailTo;
	
	@BeforeEach
	void setUp() throws Exception {

	
		Factory factory = new Factory();
		email = factory.createEmail();
		EmailTo = email.getEmailTo();
		EmailFrom = email.getEmailFrom();
		existingId = 1L;
		nonExistingId = 20L;
		page = new PageImpl<>(List.of(email));

		
		Mockito.when(emailRepository.findAll((Pageable)any())).thenReturn(page);
		Mockito.when(emailRepository.findById(nonExistingId)).thenReturn(Optional.empty());
		
		Mockito.when(emailRepository.findById(existingId)).thenReturn(Optional.of(email));


	  
		Mockito.when(emailRepository.findByEmailFrom((PageRequest)any(), Mockito.eq(EmailFrom))).thenReturn(page);
		Mockito.when(emailRepository.findByEmailTo((PageRequest)any(), Mockito.eq(EmailTo))).thenReturn(page);
		
		
	    Mockito.doNothing().when(emailRepository).deleteById(existingId);
	    Mockito.doThrow(RuntimeException.class).when(emailRepository).deleteById(nonExistingId);
	   
	}
	
	
	@Test
	public void findByIdShouldThrowExceptionWhenIdDoesNotExist() {
	    Assertions.assertThrows(RuntimeException.class, () -> {
	        service.findById(nonExistingId); 
	    });
	    
	    Mockito.verify(emailRepository, Mockito.times(1)).findById(nonExistingId); 
	}
	
	
	@Test
	public void findAllShouldReturnList() {
		PageRequest pageRequest = PageRequest.of(0, 2);
		
		Page<EmailDTO> result = service.findAll(pageRequest);
		
		Assertions.assertNotNull(result);
		
		Mockito.verify(emailRepository,  Mockito.times(1)).findAll(pageRequest);
		
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
	    Assertions.assertThrows(RuntimeException.class, () -> {
	        service.delete(nonExistingId);
	    });
	    
	}

	@Test
	public void deleteShouldDoNothingWhenIdExists() {
	    Assertions.assertDoesNotThrow(() -> {
	        service.delete(existingId);
	    });

	    Mockito.verify(emailRepository, Mockito.times(1)).deleteById(existingId);
	    
	}
	
	@Test
	public void findByEmailFromShouldReturnList() {
		PageRequest pageRequest = PageRequest.of(0, 1);
		
		Page<EmailDTO> resultEmailFrom = service.findByEmailFrom(EmailFrom, pageRequest);
		
		Assertions.assertNotNull(resultEmailFrom);
		Mockito.verify(emailRepository,  Mockito.times(1)).findByEmailFrom(pageRequest, EmailFrom);
		
	}
	
	
	@Test
	public void findByEmailToShouldReturnList() {
		PageRequest pageRequest = PageRequest.of(0, 2);
		
		Page<EmailDTO> resultEmailTo = service.findByEmailTo(EmailTo, pageRequest);
		
		Assertions.assertNotNull(resultEmailTo);
		Mockito.verify(emailRepository,  Mockito.times(1)).findByEmailTo(pageRequest, EmailTo);
		
	}
	
	
}
