package com.provaJava.ProvaJava.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import com.provaJava.ProvaJava.exceptions.ResourceNotFoundException;
import com.provaJava.ProvaJava.repositories.EmailRepository;
import com.provaJava.ProvaJava.resources.dto.EmailDTO;
import org.springframework.data.domain.Sort;

@SpringBootTest
@Transactional
public class EmailServicesIT {
	@Autowired
	private EmailService service;
	

    @Autowired
    private EmailRepository emailRepository;
    
	private Long existingId;
	private Long nonExistingId;
	private String emailFrom;
	private Long countTotalEmail;
	
	 
	@BeforeEach
	void setUp() throws Exception {
	existingId = 1L;
	nonExistingId = 1000L;
	countTotalEmail = 3L;
	emailFrom = "Admin@gmail.com";
	}
	
	@Test
	public void deleteShouldDeleteResourceWhenIdExists() {
		
		service.delete(existingId);

		Assertions.assertEquals(countTotalEmail - 1, emailRepository.count());
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
	    Assertions.assertThrows(RuntimeException.class, () -> {
	        service.delete(nonExistingId);
	    });
	}
	
	@Test
	public void findAllPagedShouldReturnPageWhenPage0Size2() {
		
		PageRequest pageRequest = PageRequest.of(0, 2);
		
		Page<EmailDTO> result = service.findAll( pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(0, result.getNumber());
		Assertions.assertEquals(2, result.getSize());
		Assertions.assertEquals(countTotalEmail, result.getTotalElements());
	}
	
	@Test
	public void findAllPagedShouldReturnEmptyPageWhenPageDoesNotExist() {
		
		PageRequest pageRequest = PageRequest.of(50, 10);
		
		Page<EmailDTO> result = service.findAll(pageRequest);
		
		Assertions.assertTrue(result.isEmpty());
	}
	
	@Test
	public void findAllPagedShouldReturnSortedPageWhenSortByownerRef() {
		
		PageRequest pageRequest = PageRequest.of(0, 3, Sort.by("ownerRef"));
		
		Page<EmailDTO> result = service.findAll( pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals("Andre Sousa", result.getContent().get(0).getOwnerRef());
		Assertions.assertEquals("Bruno Silva", result.getContent().get(1).getOwnerRef());
		Assertions.assertEquals("Mikaelle sousa", result.getContent().get(2).getOwnerRef());		
	}
	
	@Test
	public void EmailFromPagedShouldReturnSortedPageWhenByEmailFrom() {
		
		
		Page<EmailDTO> result = service.findByEmailFrom(emailFrom, PageRequest.of(0, 1));
	
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(emailFrom, result.getContent().get(0).getEmailFrom());

	}

}
