package com.javaAvancado.grud.repository;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.javaAvancado.grud.entities.Product;
import com.javaAvancado.grud.tests.Factory;

import jakarta.persistence.EntityNotFoundException;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository  productRepository;
	
	private Long existingId;
	private Long countTotalProducts;
	private String name;
	
	@BeforeEach
	void setUp() throws Exception{
		existingId = 1L;
		countTotalProducts = 25L;
		name = "Smart TV";
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
	
	
	
	@Test
	public void searchByNameWithReturnName(){
		
		 Page<Product> result = productRepository.findByName(PageRequest.of(0, 10), name );
		 Assertions.assertFalse(result.isEmpty());

	    Product product = result.getContent().get(0);
	    Assertions.assertNotNull(product.getId());
	    Assertions.assertEquals(name, product.getName());
	}
	
	
	
	
}
