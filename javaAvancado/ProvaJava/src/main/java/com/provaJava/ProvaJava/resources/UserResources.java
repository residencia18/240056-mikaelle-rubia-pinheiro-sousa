package com.provaJava.ProvaJava.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserResources {
	private static final Logger LOGGER = LoggerFactory.getLogger(UserResources.class);
	
	
	@GetMapping
	public ResponseEntity<String> getUser(){
		 LOGGER.info("Executando operação getUser.");
		return ResponseEntity.ok("sucesso!");
	}
}
