package com.javaAvancado.grud.repository;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.javaAvancado.grud.entities.Product;

import jakarta.persistence.EntityNotFoundException;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository  productRepository;
	
	private long exintingId;
	@BeforeEach
	void setUp() throws Exception{
		exintingId = 1L;
	}
	
	@Test
	public void deleteShoultDeleteObjWhenIdExists() {
		
		productRepository.deleteById(exintingId);
		
		Optional<Product> result = productRepository.findById(exintingId);
		Assertions.assertFalse(result.isPresent());
	}
	
 
	
}
