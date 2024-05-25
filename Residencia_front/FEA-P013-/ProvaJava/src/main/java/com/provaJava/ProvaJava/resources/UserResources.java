package com.provaJava.ProvaJava.resources;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.provaJava.ProvaJava.resources.dto.UserDTO;
import com.provaJava.ProvaJava.service.UserService;




@RestController
@RequestMapping("/user")
public class UserResources {
	private static final Logger LOGGER = LoggerFactory.getLogger(UserResources.class);
	
	@Autowired
	private UserService userService;
	
	
	@GetMapping
	public ResponseEntity<String> getUser(){
		 LOGGER.info("Executando operação getUser.");
		return ResponseEntity.ok("sucesso!");
	}

	@GetMapping("/all")
    public ResponseEntity<Page<UserDTO>> findAllUser(@RequestParam(value = "page", defaultValue = "0" ) Integer page,
    		@RequestParam(value = "linesPerPage", defaultValue = "3" ) Integer linesPerPage,
    		@RequestParam(value = "direction", defaultValue = "ASC" ) String direction,
    		@RequestParam(value = "orderBy", defaultValue = "name" ) String orderBy,
    		@RequestParam(value = "email", required = false)  String email
    		) {
	  
    	try {
    		
    		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),  orderBy);
	    	Page<UserDTO> listDTO;

	    	 if (email != null && !email.isEmpty()) {
	             List<UserDTO> users = userService.findByEmail(email);
	             if (!users.isEmpty()) {
	                 listDTO = new PageImpl<>(users, pageRequest, users.size());
	             } else {

	                 listDTO = Page.empty();
	             }
	        } else {
	            listDTO = userService.findAll(pageRequest);
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
	
	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
		try {
			UserDTO dto = userService.findById(id);
			LOGGER.info("--------Versão 1: Executando operação de busca do email com ID: {}" + id);
			return ResponseEntity.ok().body(dto);
		}catch (Exception e) { 
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		try {

			userService.delete(id);
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
