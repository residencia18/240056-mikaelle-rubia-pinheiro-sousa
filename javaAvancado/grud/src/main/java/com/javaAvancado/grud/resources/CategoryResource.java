package com.javaAvancado.grud.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.bind.annotation.*;

import com.github.javafaker.Faker;
import com.javaAvancado.grud.GrudApplication;
import com.javaAvancado.grud.entities.Category;
import com.javaAvancado.grud.repository.CategoryRepository;
import com.javaAvancado.grud.resources.DTO.CategoryDTO;
import com.javaAvancado.grud.resources.form.CategoryForm;
import com.javaAvancado.grud.services.CategoryService;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;

@RestController
@RequestMapping("/categorias/")
public class CategoryResource {


	private static final Logger LOGGER = LoggerFactory.getLogger(GrudApplication.class);
	
	@Autowired
	private CategoryService service;
	
	

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> findAll(@RequestParam(required = false) String name) {
    	try {
    		List<CategoryDTO> list = new ArrayList<>();

    		if (name != null && !name.isEmpty()) {
    			list = service.findByName(name);
    		}else {
    			list = service.findAll();

    		}
				
			LOGGER.info("--------Executando operação de busca de categorias. Parâmetro de filtro: {}", name != null ? name : "Nenhum filtro aplicado.-------");
			return ResponseEntity.ok().body(list);
			
        } catch (Exception e) {
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
	public ResponseEntity<CategoryDTO> insert(@RequestBody CategoryForm categoryFor, UriComponentsBuilder uriC) {
		
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
	public ResponseEntity<CategoryDTO> update(@PathVariable Long id, @RequestBody CategoryForm categoryFor) {
		
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
