package com.javaAvancado.grud.services;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.javaAvancado.grud.exceptions.ResourceNotFoundException;
import com.javaAvancado.grud.repository.ProductRepository;
import com.javaAvancado.grud.resources.DTO.ProductDTO;

@SpringBootTest
@Transactional
public class ProductServicesIT {
	@Autowired
	private ProductService service;
	
	@Autowired
	private ProductRepository repository;
	
	private Long existingId;
	private Long nonExistingId;
	private Long countTotalProducts;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
	}
	
	@Test
	public void deleteShouldDeleteResourceWhenIdExists() {
		
		service.delete(existingId);

		Assertions.assertEquals(countTotalProducts - 1, repository.count());
	}
	
	
	@Test
	public void findAllListShouldReturn() {
	
		List<ProductDTO> result = service.findAll();
		Assertions.assertEquals(countTotalProducts, result.size());
	}
	
	
	@Test
	public void finByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
	
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.findById(nonExistingId);
		});
		
	}
	

	@Test
	public void findShouldDoNothingWhenIdExists() {
		ProductDTO result = service.findById(existingId);
		Assertions.assertEquals(result.getId(), existingId);
	    
	}
	
	
}
