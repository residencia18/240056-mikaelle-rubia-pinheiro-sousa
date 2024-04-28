package com.example.auth.springSecurity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringSecurityApplication {
	private static final Logger LOGGER = LoggerFactory.getLogger(SpringSecurityApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(SpringSecurityApplication.class, args);
		LOGGER.info("---------------Iniciando Api de SpringSecurityApplication------------------");
	}

}
