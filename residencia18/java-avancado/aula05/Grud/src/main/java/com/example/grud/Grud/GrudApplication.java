package com.example.grud.Grud;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GrudApplication {
	private static final Logger LOGGER = LoggerFactory.getLogger(GrudApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(GrudApplication.class, args);
		LOGGER.info("-------------Iniciando Api de GRUD------------------");
	}

}
