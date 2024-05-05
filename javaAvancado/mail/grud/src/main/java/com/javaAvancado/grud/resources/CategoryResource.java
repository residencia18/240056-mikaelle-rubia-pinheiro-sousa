package com.javaAvancado.grud.resources;

import java.net.URI;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.bind.annotation.*;


import com.javaAvancado.grud.resources.DTO.CategoryDTO;
import com.javaAvancado.grud.resources.form.CategoryForm;
import com.javaAvancado.grud.services.CategoryService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;

@RestController
@RequestMapping("/categorias/")
public class CategoryResource {


	private static final Logger LOGGER = LoggerFactory.getLogger(CategoryResource.class);
	
	@Autowired
	private CategoryService service;
	
	
	@GetMapping
	public ResponseEntity<Page<CategoryDTO>> findAll(@RequestParam(value = "page", defaultValue = "0")  Integer page,
	        @RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
	        @RequestParam(value = "direction", defaultValue = "ASC") String direction,
	        @RequestParam(value = "orderBy", defaultValue = "name") String orderBy,
	        @RequestParam(value = "name", required = false)  String name) {
	    try {
	        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
	        Page<CategoryDTO> list;
	        if (name != null && !name.isEmpty()) {
	            list = service.findByName(name, pageRequest);
	        } else {
	            list = service.findAll(pageRequest);
	        }
	        
	        if (list.isEmpty()) {
	            return ResponseEntity.noContent().build();
	        }
	        LOGGER.info("Executando operação de busca de categorias.");
	        return ResponseEntity.ok().body(list);
	    } catch (IllegalArgumentException e) {
	        LOGGER.error("Parâmetros de paginação ou ordenação inválidos: {}", e.getMessage());
	        return ResponseEntity.notFound().build();
	    } 
	}
    
    
	@GetMapping(value = "/{id}")
	public ResponseEntity<CategoryDTO> findById(@PathVariable Long id) {
		try {
			CategoryDTO categoryDTO= service.findById(id);
			LOGGER.info("--------Executando operação de busca de categorias com ID: {}", id);
			return ResponseEntity.ok().body(categoryDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
	}
    	
    
	@PostMapping
	public ResponseEntity<CategoryDTO> insert(@RequestBody @Valid CategoryForm categoryFor, UriComponentsBuilder uriC) {
		
		try {
			CategoryDTO categoryDTO = service.insert(categoryFor);
			URI uri = uriC.path("/categorias/{id}").buildAndExpand(categoryDTO.getId()).toUri();
			LOGGER.info("--------Inserindo nova categoria: {}", categoryFor.getName());
			return ResponseEntity.created(uri).body(categoryDTO);
			
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
       }
	
	}
    
	@PutMapping("/{id}")
	public ResponseEntity<CategoryDTO> update(@PathVariable Long id, @RequestBody @Valid CategoryForm categoryFor) {
		
		try {
			CategoryDTO categoryDTO = service.update(id, categoryFor);
			LOGGER.info("--------Update na categoria: {}", categoryFor.getName());
			return ResponseEntity.ok().body(categoryDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
	}
    
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		try {
			service.delete(id);
			LOGGER.info("Categoria com ID {} foi excluída com sucesso.", id);
			return ResponseEntity.noContent().build();
			
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
		
	
	}
    
    @DeleteMapping("/")
    public ResponseEntity<Void> deleteCategoryNull() {
        return ResponseEntity.badRequest().build();
    }
    
    @PutMapping("/")
    public ResponseEntity<Void> atualizaCategoryNull() {
        return ResponseEntity.badRequest().build();
    }

}
