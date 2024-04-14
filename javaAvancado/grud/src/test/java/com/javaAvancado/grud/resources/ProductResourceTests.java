package com.javaAvancado.grud.resources;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.javaAvancado.grud.repository.ProductRepository;

@ExtendWith(SpringExtension.class)
public class ProductResourceTests {
	
	@InjectMocks
	private  ProductResource resource;
	
	@Mock
	private ProductRepository productRepository;
	
}
	


