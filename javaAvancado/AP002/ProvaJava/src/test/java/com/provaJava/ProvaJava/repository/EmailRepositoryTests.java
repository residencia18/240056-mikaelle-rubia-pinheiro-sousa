package com.provaJava.ProvaJava.repository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.provaJava.ProvaJava.domain.Email;
import com.provaJava.ProvaJava.enums.StatusEmail;
import com.provaJava.ProvaJava.repositories.EmailRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@DataJpaTest
public class EmailRepositoryTests {

    @Autowired
    private EmailRepository emailRepository;


    private Long existingId;
    private String OwnerRef;
    
	@BeforeEach
	void setUp() throws Exception{
		existingId = 1L;
		OwnerRef = "Owner Reference";
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
        Email email = new Email();
        email.setSendDateEmail(LocalDateTime.now());
        
        email.setOwnerRef("Owner Reference");
        email.setEmailFrom("from@example.com");
        email.setEmailTo("to@example.com");
        email.setSubject("Test Subject");
        email.setText("Test Content");
        email.setStatusEmail(StatusEmail.SENT);
        email.setId(null);

        email = emailRepository.save(email);

      
        Assertions.assertNotNull(email.getId());
        
    }
}