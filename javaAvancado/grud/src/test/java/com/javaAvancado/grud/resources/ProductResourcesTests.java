package com.javaAvancado.grud.resources;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import com.javaAvancado.grud.resources.DTO.ProductDTO;
import com.javaAvancado.grud.services.ProductService;
import com.javaAvancado.grud.tests.Factory;

import org.springframework.http.MediaType;

@WebMvcTest(ProductResource.class)
public class ProductResourcesTests {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ProductService service;

	
	private List<ProductDTO> productList;
	private ProductDTO product;
	
	@BeforeEach
	void setUp() throws Exception {
	    productList = new ArrayList<>();
	    product = new ProductDTO( Factory.createProduct());
	    productList.add(product);
		
		Mockito.when(service.findAll()).thenReturn(productList);
	}
	
	
	@Test
	public void findAllShouldReturnPage() throws Exception {
		
		ResultActions result = 
				mockMvc.perform(get("/produtos/")
					.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
	}
	
	
	
	
	
	
	
	
	

}
