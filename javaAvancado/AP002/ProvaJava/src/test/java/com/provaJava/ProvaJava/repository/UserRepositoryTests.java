package com.provaJava.ProvaJava.repository;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.provaJava.ProvaJava.domain.Email;
import com.provaJava.ProvaJava.domain.User;
import com.provaJava.ProvaJava.repositories.UserRepository;
import com.provaJava.ProvaJava.tests.Factory;

@DataJpaTest
public class UserRepositoryTests {
    @Autowired
    private UserRepository userRepository;
    
    private Long existingId;

    
	@BeforeEach
	void setUp() throws Exception{
		existingId = 1L;

	}
	
	@Test
	public void searchByIdWithReturnID(){
	    Optional<User> result = Optional.ofNullable(userRepository.getReferenceById(existingId));
	    Assertions.assertTrue(result.isPresent()); 

	    User user = result.get(); 
	    Assertions.assertNotNull(user.getId());
	    
	    Assertions.assertEquals(existingId, user.getId());
		
	}
	
    @Test
    public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
    	
        User user = Factory.createUser();
        user = userRepository.save(user);

        Assertions.assertNotNull(user.getId());
        
    }
}
