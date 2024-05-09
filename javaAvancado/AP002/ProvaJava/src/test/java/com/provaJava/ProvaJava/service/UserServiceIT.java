package com.provaJava.ProvaJava.service;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import com.provaJava.ProvaJava.repositories.UserRepository;
import com.provaJava.ProvaJava.resources.dto.EmailDTO;
import com.provaJava.ProvaJava.resources.dto.UserDTO;

@SpringBootTest
@Transactional
public class UserServiceIT {
	
	@Autowired
	private UserService service;
	
    @Autowired
    private UserRepository userRepository;
    
	private Long existingId;
	private Long nonExistingId;
	private String email;
	private Long countTotalUsers;
	
	
	@BeforeEach
	void setUp() throws Exception {
	existingId = 1L;
	nonExistingId = 1000L;
	countTotalUsers = 2L;
	email = "Admin@gmail.com";
	
	}
	
	
	@Test
	public void deleteShouldDeleteResourceWhenIdExists() {
		
		service.delete(existingId);

		Assertions.assertEquals(countTotalUsers - 1, userRepository.count());
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
		
		Page<UserDTO> result = service.findAll( pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(0, result.getNumber());
		Assertions.assertEquals(2, result.getSize());
		Assertions.assertEquals(countTotalUsers, result.getTotalElements());
	}
	
	@Test
	public void findAllPagedShouldReturnEmptyPageWhenPageDoesNotExist() {
		
		PageRequest pageRequest = PageRequest.of(50, 10);
		
		Page<UserDTO> result = service.findAll(pageRequest);
		
		Assertions.assertTrue(result.isEmpty());
	}
	
	@Test
	public void findAllPagedShouldReturnSortedPageWhenSortByName() {
		
		PageRequest pageRequest = PageRequest.of(0, 2, Sort.by("name"));
		
		Page<UserDTO> result = service.findAll( pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals("Admin", result.getContent().get(0).getName());
		Assertions.assertEquals("Mikaelle", result.getContent().get(1).getName());
	
	}
	
	@Test
	public void findByEmailPagedShouldReturnSortedPageWhenByEmail() {
		
		
		List<UserDTO> result = service.findByEmail(email);
	
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(email, result.get(0).getEmail());

	}
	
}
