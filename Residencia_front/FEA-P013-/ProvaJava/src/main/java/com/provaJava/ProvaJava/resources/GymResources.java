package com.provaJava.ProvaJava.resources;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.provaJava.ProvaJava.resources.dto.GymDto;
import com.provaJava.ProvaJava.resources.form.GymForm;
import com.provaJava.ProvaJava.service.GymService;

@RestController
@RequestMapping("/Gym")
public class GymResources {
	private static final Logger LOGGER = LoggerFactory.getLogger(ScheduleResources.class);
	
	@Autowired
	private GymService service;
	
	
	@GetMapping
	public ResponseEntity<List<GymDto>> findAll() {
	    try {
	        List<GymDto> list;
	        list = service.findAll();
	        
	        if (list.isEmpty()) {
	            return ResponseEntity.noContent().build();
	        }
	        LOGGER.info("Executing Gym search operation.");
	        return ResponseEntity.ok().body(list);
	    } catch (IllegalArgumentException e) {
	        LOGGER.error("Invalid search or sorting parameters: {}", e.getMessage());
	        return ResponseEntity.badRequest().build();
	    }
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<GymDto> update(@PathVariable Long id, @RequestBody GymForm gymForm) {
	    try {
	        GymDto gymDto = service.update(id, gymForm);
	        LOGGER.info("Updating Gym: {}", gymDto.getId());
	        return ResponseEntity.ok().body(gymDto);
	    } catch (Exception e) {
	        LOGGER.error("Gym not found with id: {}", id);
	        return ResponseEntity.notFound().build();
	    }
	}

	@GetMapping("/{id}")
	public ResponseEntity<GymDto> findById(@PathVariable Long id) {
	    try {
	        GymDto GymDto = service.findById(id);
	        LOGGER.info("Executing Gym search operation by ID: {}", id);
	        return ResponseEntity.ok().body(GymDto);
	    } catch (Exception e) {
	        LOGGER.error("Gym not found with id: {}", id);
	        return ResponseEntity.notFound().build();
	    }
	}
	
	@PostMapping
	public ResponseEntity<GymDto> insert(@RequestBody GymForm gymForm, UriComponentsBuilder uriC) {
	    
	    try {
	        GymDto gymDto = service.insert(gymForm);
	        URI uri = uriC.path("/Gym/{id}").buildAndExpand(gymDto.getId()).toUri();
	        LOGGER.info("Inserting new Gym: {}", gymDto.getId());
	        return ResponseEntity.created(uri).body(gymDto);	        
	    } catch (Exception e) {
	        LOGGER.error("Error inserting Gym: {}", e.getMessage());
	        return ResponseEntity.notFound().build();
	   }
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
	    try {
	        service.delete(id);
	        LOGGER.info("Gym with ID {} was successfully deleted.", id);
	        return ResponseEntity.noContent().build();  
	    } catch (Exception e) {
	        LOGGER.error("Gym not found with id: {}", id);
	        return ResponseEntity.notFound().build();
	    }
	}
}
