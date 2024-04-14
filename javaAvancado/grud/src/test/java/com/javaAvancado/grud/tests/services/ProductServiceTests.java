package com.javaAvancado.grud.tests.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.javaAvancado.grud.exceptions.ResourceNotFoundException;
import com.javaAvancado.grud.repository.ProductRepository;
import com.javaAvancado.grud.services.ProductService;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {
	
	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository productRepository;
	
	private Long existingId;
	private Long nonExistingId;
	
	
	@BeforeEach
	void setUp() throws Exception{
	    existingId = 6L;
	    nonExistingId = 1000L;
	    
	    Mockito.doNothing().when(productRepository).deleteById(existingId);
	    Mockito.doThrow(EmptyResultDataAccessException.class).when(productRepository).deleteById(nonExistingId);
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
	    Assertions.assertThrows(ResourceNotFoundException.class, () -> {
	        service.delete(nonExistingId);
	    });
	    
	    Mockito.verify(productRepository, Mockito.times(1)).deleteById(nonExistingId);
	    
	}

	@Test
	public void deleteShouldDoNothingWhenIdExists() {
	    Assertions.assertDoesNotThrow(() -> {
	        service.delete(existingId);
	    });
	    
	    Mockito.verify(productRepository, Mockito.times(1)).deleteById(existingId);
	    
	}
}
	


