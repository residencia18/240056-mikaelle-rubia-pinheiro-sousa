package com.provaJava.ProvaJava.resources;

import java.net.URI;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.provaJava.ProvaJava.domain.Email;

import com.provaJava.ProvaJava.resources.dto.EmailDTO;
import com.provaJava.ProvaJava.service.EmailService;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/email")
public class EmailResource {
	private static final Logger LOGGER = LoggerFactory.getLogger(EmailResource.class);
	
	@Autowired
	private EmailService emailService;

	  @GetMapping("/all-email")
	    public ResponseEntity<Page<EmailDTO>> findAllEmail(@RequestParam(value = "page", defaultValue = "0" ) Integer page,
	    		@RequestParam(value = "linesPerPage", defaultValue = "3" ) Integer linesPerPage,
	    		@RequestParam(value = "direction", defaultValue = "ASC" ) String direction,
	    		@RequestParam(value = "orderBy", defaultValue = "ownerRef" ) String orderBy,
	    		@RequestParam(value = "emailFrom", required = false)  String emailFrom,
				@RequestParam(value = "emailTo", required = false)  String emailTo
	    		) {
	    	try {
	    		
	    		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),  orderBy);
		    	Page<EmailDTO> listDTO;
		    	LOGGER.info("--------Executando operação de busca de Email {}", emailFrom );
		        if (emailFrom != null && !emailFrom.isEmpty() && (emailTo == null || emailTo.isEmpty())) {
		            listDTO = emailService.findByEmailFrom(emailFrom, pageRequest);
		        } else if (emailTo != null && !emailTo.isEmpty() && (emailFrom == null || emailFrom.isEmpty())) {
		            listDTO = emailService.findByEmailTo(emailTo, pageRequest);

		        } else {
		            listDTO = emailService.findAll(pageRequest);
		        }

		        if (listDTO.isEmpty()) {
		            return ResponseEntity.noContent().build();
		        }
							
				LOGGER.info("--------Executando operação de busca de Email");
				return ResponseEntity.ok().body(listDTO);
			}catch (Exception e) { 
		        return ResponseEntity.notFound().build();
		    }
	    }
	
	@PostMapping("/sending")
	public ResponseEntity<Email> sendingEmail(@RequestBody @Valid EmailDTO emailDto){
		try {
			
			Email email = new Email();
			BeanUtils.copyProperties(emailDto, email);
			emailService.insert(email);

			LOGGER.info("--------Enviando email-------");
			return ResponseEntity.ok().build();
      } catch (Exception e) {
            return ResponseEntity.notFound().build();
       }
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<EmailDTO> findById(@PathVariable Long id) {
		try {
			EmailDTO dto = emailService.findById(id);
			LOGGER.info("--------Versão 1: Executando operação de busca do email com ID: {}" + id);
			return ResponseEntity.ok().body(dto);
		}catch (Exception e) { 
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		try {

			emailService.delete(id);
			return ResponseEntity.noContent().build();
		}catch (Exception e) {
			LOGGER.error("Versão 1: Erro ao excluir a Produto com ID " + id, e);
			return ResponseEntity.notFound().build();
		} 
	}


	@DeleteMapping("/")
	public ResponseEntity<Void> deleteProductNull() {
		return ResponseEntity.badRequest().build();
	}

	@PutMapping("/")
	public ResponseEntity<Void> atualizaProductNull() {
		return ResponseEntity.badRequest().build();
	}

}
