package com.provaJava.ProvaJava.repository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.provaJava.ProvaJava.domain.Email;
import com.provaJava.ProvaJava.enums.StatusEmail;
import com.provaJava.ProvaJava.repositories.EmailRepository;
import com.provaJava.ProvaJava.tests.Factory;

import java.time.LocalDateTime;
import java.util.Optional;

@DataJpaTest
public class EmailRepositoryTests {

    @Autowired
    private EmailRepository emailRepository;


    private Long existingId;

    
	@BeforeEach
	void setUp() throws Exception{
		existingId = 1L;

	}

	@Test
	public void searchByIdWithReturnID(){
	    Optional<Email> result = Optional.ofNullable(emailRepository.getReferenceById(existingId));
	    Assertions.assertTrue(result.isPresent()); 

	    Email email = result.get(); 
	    Assertions.assertNotNull(email.getId());
	    Assertions.assertEquals(existingId, email.getId());
		
	}
    @Test
    public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
        // Given
    	
        Email email = Factory.createEmail();
        email = emailRepository.save(email);

        Assertions.assertNotNull(email.getId());
        
    }
}