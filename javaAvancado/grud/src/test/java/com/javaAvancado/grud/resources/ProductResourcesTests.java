package com.javaAvancado.grud.resources;

import java.util.ArrayList;
import java.util.List;
import static org.mockito.ArgumentMatchers.any;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.javaAvancado.grud.exceptions.DatabaseException;
import com.javaAvancado.grud.exceptions.ResourceNotFoundException;
import com.javaAvancado.grud.resources.DTO.ProductDTO;
import com.javaAvancado.grud.resources.form.ProductForm;
import com.javaAvancado.grud.services.ProductService;
import com.javaAvancado.grud.tests.Factory;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.MediaType;

@WebMvcTest(ProductResource.class)
public class ProductResourcesTests {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ProductService service;
	
	@Autowired
	private ObjectMapper objectMapper;

	private List<ProductDTO> productList;
	private ProductDTO product;
	private Long existingId;
	private ProductDTO productDTO;
	private ProductForm productForm;
	private Long nonExistingId;
	private Long dependentId;
	private PageImpl<ProductDTO> page;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 2L;
		dependentId = 3L;
		
	    productList = new ArrayList<>();
	    product = new ProductDTO( Factory.createProduct());
	    productList.add(product);
	    productDTO = Factory.createProductDTO();
	    productForm = Factory.createProductForm();
	    page = new PageImpl<>(List.of(product));
	    
		Mockito.when(service.findAll(any())).thenReturn(page);
		Mockito.when(service.findById(existingId)).thenReturn(productDTO);
		Mockito.when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

		Mockito.when(service.update(Mockito.eq(existingId), Mockito.any())).thenReturn(productDTO);
		Mockito.when(service.update(Mockito.eq(nonExistingId), Mockito.any())).thenThrow(ResourceNotFoundException.class);
		
		Mockito.doNothing().when(service).delete(existingId);
		Mockito.doThrow(ResourceNotFoundException.class).when(service).delete(nonExistingId);
		Mockito.doThrow(DatabaseException.class).when(service).delete(dependentId);
		
		Mockito.when(service.insert(Mockito.any())).thenReturn(productDTO);
		
	}
	

	@Test
	public void deleteShouldReturnNoContentWhenIdExists() throws Exception {
		
		ResultActions result = 
				mockMvc.perform(delete("/produtos/v1/{id}", existingId)
					.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNoContent());
	}
	
	@Test
	public void deleteShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		
		ResultActions result = 
				mockMvc.perform(delete("/produtos/v1/{id}", nonExistingId)
					.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void insertShouldReturnProductDTOCreated() throws Exception {
		
		String jsonBody = objectMapper.writeValueAsString(productForm);
		
		ResultActions result = 
				mockMvc.perform(post("/produtos/v1")
					.content(jsonBody)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isCreated());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() throws Exception {
		
		String jsonBody = objectMapper.writeValueAsString(productForm);
		
		ResultActions result = 
				mockMvc.perform(put("/produtos/v1/{id}", existingId)
					.content(jsonBody)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
	}
	
	@Test
	public void updateShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		
		String jsonBody = objectMapper.writeValueAsString(productForm);
		
		ResultActions result = 
				mockMvc.perform(put("/produtos/v1/{id}", nonExistingId)
					.content(jsonBody)
					.contentType(MediaType.APPLICATION_JSON)
					.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void findByIdShouldReturnProductWhenIdExists() throws Exception {
		
		ResultActions result = 
				mockMvc.perform(get("/produtos/v1/{id}", existingId)
					.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
	}
	
	@Test
	public void findByIdShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		
		ResultActions result = 
				mockMvc.perform(get("/produtos/v1/{id}", nonExistingId)
					.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNotFound());
	}
	
	
	@Test
	public void findAllShouldReturnList() throws Exception {
		
		ResultActions result = 
				mockMvc.perform(get("/produtos/v1")
					.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
	}
	
	
	
	
	
	
	
	
	
	

}
