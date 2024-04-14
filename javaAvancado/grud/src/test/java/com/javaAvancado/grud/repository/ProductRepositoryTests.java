package com.javaAvancado.grud.repository;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.javaAvancado.grud.entities.Product;
import com.javaAvancado.grud.tests.Factory;

import jakarta.persistence.EntityNotFoundException;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository  productRepository;
	
	private Long existingId;
	private Long countTotalProducts;
	
	@BeforeEach
	void setUp() throws Exception{
		existingId = 1L;
		countTotalProducts = 25L;
	}
	
	@Test
	public void deleteShoultDeleteObjWhenIdExists() {
		
		productRepository.deleteById(existingId);
		
		Optional<Product> result = productRepository.findById(existingId);
		Assertions.assertFalse(result.isPresent());
	}
	
	
	@Test
	public void saveShouldPersistWithAutoincremmentwhenIdIsNull() {
		
		Product product = Factory.createProduct();
		product.setId(null);
		
		product = productRepository.save(product);
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts +1, product.getId());
	
	}
	
	@Test
	public void searchByIdWithReturnID(){
		
	    Optional<Product> result = Optional.ofNullable(productRepository.getReferenceById(existingId));
	    Assertions.assertTrue(result.isPresent()); 

	    Product product = result.get(); 
	    Assertions.assertNotNull(product.getId());
	    Assertions.assertEquals(existingId, product.getId());
		
	}
	

	
	
	
	
}
