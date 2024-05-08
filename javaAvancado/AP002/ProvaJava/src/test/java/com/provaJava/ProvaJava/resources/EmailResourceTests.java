package com.provaJava.ProvaJava.resources;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.provaJava.ProvaJava.service.EmailService;
import com.provaJava.ProvaJava.tests.Factory;
import com.provaJava.ProvaJava.TestConfig;
import com.provaJava.ProvaJava.domain.User;
import com.provaJava.ProvaJava.resources.dto.*;
import com.provaJava.ProvaJava.security.TokenService;



import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;


@WebMvcTest(EmailResource.class)
@Import(TestConfig.class)
public class EmailResourceTests {

	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@MockBean
	private EmailService service;
	
	
	private Long existingId;
	private Long nonExistingId;
	
	
	private List<EmailDTO> emailList;
	private EmailDTO emailDto;
	private PageImpl<EmailDTO> page;
	private String VALID_TOKEN;
	
	@BeforeEach
	void setUp() throws Exception {
		Factory factory = new Factory();
		existingId = 1L;
		nonExistingId = 20L;
		emailList = new ArrayList<>();
		emailDto = Factory.createEmailDTO();
		page = new PageImpl<>(List.of(emailDto));
		
		VALID_TOKEN = factory.createToken();
		
	    Mockito.when(service.findAll(Mockito.any())).thenReturn(page);
	    Mockito.when(service.findById(existingId)).thenReturn(emailDto);
	    Mockito.when(service.findById(nonExistingId)).thenThrow(RuntimeException.class);
	    
	    Mockito.doNothing().when(service).delete(existingId);
	    Mockito.doThrow(RuntimeException.class).when(service).delete(nonExistingId);
	    
	    Mockito.when(service.insert(Mockito.any())).thenReturn(Factory.createEmail());
	}
		
//	@Test
//	public void deleteShouldReturnNoContentWhenIdExists() throws Exception {
//		
//		ResultActions result = 
//				mockMvc.perform(delete("/email/{id}", existingId)
//						.accept(MediaType.APPLICATION_JSON));
//						.header("Authorization", "Bearer " + VALID_TOKEN)); 
//		result.andExpect(status().isNoContent());
//	}
	
	@Test
	public void deleteShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		
		ResultActions result = 
				mockMvc.perform(delete("/email/{id}", nonExistingId)
					.accept(MediaType.APPLICATION_JSON)
		 			.header("Authorization", "Bearer " + VALID_TOKEN)); 
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void findByIdShouldReturnProductWhenIdExists() throws Exception {
		
		ResultActions result = 
				mockMvc.perform(get("/email/{id}}", existingId)
					.accept(MediaType.APPLICATION_JSON)
					.header("Authorization", "Bearer " + VALID_TOKEN));
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.ownerRef").exists());
	}
	
}
