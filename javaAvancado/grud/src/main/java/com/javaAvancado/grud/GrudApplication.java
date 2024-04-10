package com.javaAvancado.grud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class GrudApplication {


	private static final Logger LOGGER = LoggerFactory.getLogger(GrudApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(GrudApplication.class, args);
		LOGGER.info("-------------Iniciando Api de Grud------------------");

		
	
}

}