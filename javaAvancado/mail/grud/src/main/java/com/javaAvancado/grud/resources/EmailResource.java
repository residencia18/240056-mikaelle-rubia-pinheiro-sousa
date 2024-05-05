package com.javaAvancado.grud.resources;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.javaAvancado.grud.entities.Email;
import com.javaAvancado.grud.resources.DTO.EmailDTO;
import com.javaAvancado.grud.services.EmailService;

import jakarta.validation.Valid;

@RestController
public class EmailResource {
	private static final Logger LOGGER = LoggerFactory.getLogger(EmailResource.class);
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/sending-email")
	public ResponseEntity<Email> sendingEmail(@RequestBody @Valid EmailDTO emailDto, UriComponentsBuilder uriC){
		try {
			
			Email email = new Email();
			BeanUtils.copyProperties(emailDto, email);
			emailService.insert(email);
			URI uri = uriC.path("/sending-email/{id}").buildAndExpand(email.getId()).toUri();
			LOGGER.info("--------Enviando email-------");
			return ResponseEntity.created(uri).body(emailService.insert(email));
      } catch (Exception e) {
            return ResponseEntity.notFound().build();
       }
	}
}
