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


import com.provaJava.ProvaJava.domain.User;
import com.provaJava.ProvaJava.repositories.UserRepository;
import com.provaJava.ProvaJava.resources.dto.UserDTO;
import com.provaJava.ProvaJava.tests.Factory;

@ExtendWith(SpringExtension.class)
public class UserServiceTests {
	@InjectMocks
	private UserService service;
	
	@Mock
    private UserRepository userRepository;
	
	private Long existingId;
	private Long nonExistingId;
	private User user;
	private Page<User> page;
	private String email;
	
	@BeforeEach
	void setUp() throws Exception {

	
		Factory factory = new Factory();
		user = factory.createUser();
		email = user.getEmail();
		existingId = 1L;
		nonExistingId = 20L;
		page = new PageImpl<>(List.of(user));

		
		Mockito.when(userRepository.findAll((Pageable)any())).thenReturn(page);
		Mockito.when(userRepository.findById(nonExistingId)).thenReturn(Optional.empty());
		
		Mockito.when(userRepository.findById(existingId)).thenReturn(Optional.of(user));
	  
		Mockito.when(userRepository.findByEmail(Mockito.eq(email))).thenReturn(Optional.of(user));
	
		
		
	    Mockito.doNothing().when(userRepository).deleteById(existingId);
	    Mockito.doThrow(RuntimeException.class).when(userRepository).deleteById(nonExistingId);
	   
	}
	
	@Test
	public void findByIdShouldThrowExceptionWhenIdDoesNotExist() {
	    Assertions.assertThrows(RuntimeException.class, () -> {
	        service.findById(nonExistingId); 
	    });
	    
	    Mockito.verify(userRepository, Mockito.times(1)).findById(nonExistingId); 
	}
	
	
	@Test
	public void findAllShouldReturnList() {
		PageRequest pageRequest = PageRequest.of(0, 2);
		
		Page<UserDTO> result = service.findAll(pageRequest);
		
		Assertions.assertNotNull(result);
		
		Mockito.verify(userRepository,  Mockito.times(1)).findAll(pageRequest);
		
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

	    Mockito.verify(userRepository, Mockito.times(1)).deleteById(existingId);
	    
	}
	
	@Test
	public void findByEmailFromShouldReturnList() {

		List<UserDTO> resultEmailFrom = service.findByEmail(email);
		
		Assertions.assertNotNull(resultEmailFrom);
		Mockito.verify(userRepository,  Mockito.times(1)).findByEmail(email);
		
	}
	
	
}
