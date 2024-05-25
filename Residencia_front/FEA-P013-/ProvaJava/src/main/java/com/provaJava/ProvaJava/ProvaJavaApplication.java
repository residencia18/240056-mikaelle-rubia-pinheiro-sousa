package com.provaJava.ProvaJava;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication
public class ProvaJavaApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProvaJavaApplication.class);
	public static void main(String[] args) {
		
		SpringApplication.run(ProvaJavaApplication.class, args);
		LOGGER.info("-------------Iniciando Api de ProvaJava------------------");
	}

}
