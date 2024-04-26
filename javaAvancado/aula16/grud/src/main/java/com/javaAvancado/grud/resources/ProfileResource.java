package com.javaAvancado.grud.resources;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.util.UriComponentsBuilder;

import com.javaAvancado.grud.resources.DTO.ProfileDTO;
import com.javaAvancado.grud.resources.form.ProfileForm;
import com.javaAvancado.grud.services.ProfileService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles/")
public class ProfileResource {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ProfileResource.class);
	
	@Autowired
	private ProfileService service;
	
	@GetMapping
	public ResponseEntity<Page<ProfileDTO>> findAll(@RequestParam(value = "page", defaultValue = "0") Integer page,
	        @RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
	        @RequestParam(value = "direction", defaultValue = "ASC") String direction,
	        @RequestParam(value = "orderBy", defaultValue = "authority") String orderBy,
	        @RequestParam(value = "authority", required = false)  String authority) {
	    try {
	        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
	        Page<ProfileDTO> list;
	        if (authority != null && !authority.isEmpty()) {
	            list = service.findByAuthority(authority, pageRequest);
	        } else {
	            list = service.findAll(pageRequest);
	        }
	        
	        if (list.isEmpty()) {
	            return ResponseEntity.noContent().build();
	        }
	        LOGGER.info("Executando operação de busca de Profiles.");
	        return ResponseEntity.ok().body(list);
	    } catch (IllegalArgumentException e) {
	        LOGGER.error("Parâmetros de paginação ou ordenação inválidos: {}", e.getMessage());
	        return ResponseEntity.notFound().build();
	    } 
	}
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<ProfileDTO> findById(@PathVariable Long id) {
		try {
			ProfileDTO profileDTO= service.findById(id);
			LOGGER.info("--------Executando operação de busca de profiles com ID: {}", id);
			return ResponseEntity.ok().body(profileDTO);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping
	public ResponseEntity<ProfileDTO> insert(@RequestBody ProfileForm profileFor, UriComponentsBuilder uriC) {
		
		try {
			ProfileDTO profileDTO = service.insert(profileFor);
			URI uri = uriC.path("/profiles/{id}").buildAndExpand(profileDTO.getId()).toUri();
			LOGGER.info("--------Inserindo nova Authority: {}", profileFor.getAuthority());
			return ResponseEntity.created(uri).body(profileDTO);
			
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
       }
	
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ProfileDTO> update(@PathVariable Long id, @RequestBody  ProfileForm profileFor) {
		
		try {
			ProfileDTO profileDTO = service.update(id, profileFor);
			LOGGER.info("--------Update na profile: {}", profileFor.getAuthority());
			return ResponseEntity.ok().body(profileDTO);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		try {
			service.delete(id);
			LOGGER.info("Profile com ID {} foi excluída com sucesso.", id);
			return ResponseEntity.noContent().build();
			
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@DeleteMapping("/")
    public ResponseEntity<Void> deleteProfileNull() {
        return ResponseEntity.badRequest().build();
    }
    
    @PutMapping("/")
    public ResponseEntity<Void> atualizaProfileNull() {
        return ResponseEntity.badRequest().build();
    
	}
	
}
