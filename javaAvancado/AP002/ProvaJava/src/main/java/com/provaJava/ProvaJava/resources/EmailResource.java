package com.provaJava.ProvaJava.resources;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.bind.annotation.*;

import com.provaJava.ProvaJava.domain.Email;
import com.provaJava.ProvaJava.resources.dto.EmailDTO;
import com.provaJava.ProvaJava.service.EmailService;

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
