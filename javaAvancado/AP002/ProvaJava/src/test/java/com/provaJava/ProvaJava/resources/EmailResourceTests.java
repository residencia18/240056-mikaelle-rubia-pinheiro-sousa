package com.provaJava.ProvaJava.resources;

import org.junit.jupiter.api.BeforeEach;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;






@WebMvcTest(EmailResource.class)
public class EmailResourceTests {

	@Autowired
	private MockMvc mockMvc;
	

	
	@BeforeEach
	void setUp() throws Exception {
		

	}
		


}
