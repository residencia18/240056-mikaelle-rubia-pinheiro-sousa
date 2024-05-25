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

import com.provaJava.ProvaJava.resources.dto.ScheduleDto;
import com.provaJava.ProvaJava.resources.form.ScheduleForm;
import com.provaJava.ProvaJava.service.ScheduleService;


@RestController
@RequestMapping("/Schedule")
public class ScheduleResources {
	private static final Logger LOGGER = LoggerFactory.getLogger(ScheduleResources.class);
	
	@Autowired
	private ScheduleService service;
	
	@GetMapping
	public ResponseEntity<List<ScheduleDto>> findAll() {
	    try {
	        List<ScheduleDto> list;
	        list = service.findAll();
	        
	        if (list.isEmpty()) {
	            return ResponseEntity.noContent().build();
	        }
	        LOGGER.info("Executing Schedule search operation.");
	        return ResponseEntity.ok().body(list);
	    } catch (IllegalArgumentException e) {
	        LOGGER.error("Invalid search or sorting parameters: {}", e.getMessage());
	        return ResponseEntity.badRequest().build();
	    }
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ScheduleDto> update(@PathVariable Long id, @RequestBody ScheduleForm scheduleForm) {
	    try {
	        ScheduleDto scheduleDto = service.update(id, scheduleForm);
	        LOGGER.info("Updating category: {}", scheduleDto.getId());
	        return ResponseEntity.ok().body(scheduleDto);
	    } catch (Exception e) {
	        LOGGER.error("Category not found with id: {}", id);
	        return ResponseEntity.notFound().build();
	    }
	}

	@GetMapping("/{id}")
	public ResponseEntity<ScheduleDto> findById(@PathVariable Long id) {
	    try {
	        ScheduleDto ScheduleDto = service.findById(id);
	        LOGGER.info("Executing category search operation by ID: {}", id);
	        return ResponseEntity.ok().body(ScheduleDto);
	    } catch (Exception e) {
	        LOGGER.error("Category not found with id: {}", id);
	        return ResponseEntity.notFound().build();
	    }
	}
	
	@PostMapping
	public ResponseEntity<ScheduleDto> insert(@RequestBody ScheduleForm scheduleForm, UriComponentsBuilder uriC) {
	    
	    try {
	        ScheduleDto ScheduleDto = service.insert(scheduleForm);
	        URI uri = uriC.path("/Schedule/{id}").buildAndExpand(ScheduleDto.getId()).toUri();
	        LOGGER.info("Inserting new category: {}", ScheduleDto.getId());
	        return ResponseEntity.created(uri).body(ScheduleDto);	        
	    } catch (Exception e) {
	        LOGGER.error("Error inserting category: {}", e.getMessage());
	        return ResponseEntity.notFound().build();
	   }
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
	    try {
	        service.delete(id);
	        LOGGER.info("Category with ID {} was successfully deleted.", id);
	        return ResponseEntity.noContent().build();  
	    } catch (Exception e) {
	        LOGGER.error("Category not found with id: {}", id);
	        return ResponseEntity.notFound().build();
	    }
	}
	
}
