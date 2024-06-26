package com.javaAvancado.grud.tests.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.mockito.ArgumentMatchers.any;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.javaAvancado.grud.entities.Product;
import com.javaAvancado.grud.exceptions.DatabaseException;
import com.javaAvancado.grud.exceptions.ResourceNotFoundException;
import com.javaAvancado.grud.repository.ProductRepository;
import com.javaAvancado.grud.resources.DTO.ProductDTO;
import com.javaAvancado.grud.services.ProductService;
import com.javaAvancado.grud.tests.Factory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {
	
	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository productRepository;
	
	private Long existingId;
	private Long nonExistingId;
	private long dependentId;
	private List<Product> productList;
	private Product product;
	private PageImpl<Product> page;
	
	@BeforeEach
	void setUp() throws Exception{
	    existingId = 6L;
	    nonExistingId = 1000L;
	    dependentId = 4L;
	    productList = new ArrayList<>();
	    product = Factory.createProduct();
	    productList.add(product);
	    page = new PageImpl<>(List.of(product));
	    
	    Mockito.when(productRepository.findAll((Pageable)any())).thenReturn(page);
	    
		Mockito.when(productRepository.findById(existingId)).thenReturn(Optional.of(product));
		Mockito.when(productRepository.findById(nonExistingId)).thenReturn(Optional.empty());
	    
	    Mockito.doNothing().when(productRepository).deleteById(existingId);
	    Mockito.doThrow(EmptyResultDataAccessException.class).when(productRepository).deleteById(nonExistingId);
	    Mockito.doThrow(DataIntegrityViolationException.class).when(productRepository).deleteById(dependentId);
	
	}
	
	@Test
	public void findAllShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
	    Assertions.assertThrows(Exception.class, () -> {
	        service.findById(nonExistingId);
	    });
	    
	    Mockito.verify(productRepository, Mockito.times(1)).findById(nonExistingId);
	    
	}

	@Test
	public void findShouldDoNothingWhenIdExists() {
	    Assertions.assertDoesNotThrow(() -> {
	        service.findById(existingId);
	    });
	    
	    Mockito.verify(productRepository, Mockito.times(1)).findById(existingId);
	    
	}
	
	@Test
	public void findAllShouldReturnList() {
		PageRequest pageRequest = PageRequest.of(0, 12);
		
		Page<ProductDTO> result = service.findAll(pageRequest);
		
		Assertions.assertNotNull(result);
		
		Mockito.verify(productRepository,  Mockito.times(1)).findAll(pageRequest);
		
	}
	
	@Test
	public void deleteShouldThrowDatabaseExceptionWhenDependentId() {
		
		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);
		});
		
		Mockito.verify(productRepository, Mockito.times(1)).deleteById(dependentId);
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
	


