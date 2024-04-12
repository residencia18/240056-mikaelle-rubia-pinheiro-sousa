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
import com.javaAvancado.grud.resouces.DTO.CategoryDTO;
import com.javaAvancado.grud.resouces.form.CategoryForm;

import jakarta.persistence.EntityNotFoundException;

// implementa o controller
@RestController
@RequestMapping("/categorias/")
public class CategoryResource {

	private static final Faker faker = new Faker(new Locale("py-br"));
	private static final Logger LOGGER = LoggerFactory.getLogger(GrudApplication.class);
	
	
    @Autowired
    private CategoryRepository categoryRepository;
	
    @Transactional(readOnly= true)
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> findAll(@RequestParam(required = false) String name) {
		List<Category>listCategory = new ArrayList<>();
		
		if (name != null && !name.isEmpty()) {
			 listCategory = categoryRepository.findByName(name);
			 if(listCategory.isEmpty()) {
				 LOGGER.info("--------Executando operação de busca de categorias. valor não encontrado. --------");
			     return ResponseEntity.badRequest().build();
			 }
        } else {
        	listCategory = categoryRepository.findAll();
//        	if(listCategory.size() == 0) {
//        		LOGGER.info("--Banco vazio--");
//        		insertData();
//        	}
        }
		
		List<CategoryDTO> listDTO = listCategory.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
		

		LOGGER.info("--------Executando operação de busca de categorias. Parâmetro de filtro: {}", name != null ? name : "Nenhum filtro aplicado.-------");
		return ResponseEntity.ok().body(listDTO);
	}
    
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> findId(@PathVariable Long id) {
        try {
			Category category = categoryRepository.getReferenceById(id);
			
			CategoryDTO categoryDTO = new CategoryDTO(category);
			LOGGER.info("--------Executando operação de busca de categorias com ID: {}", id);
            return ResponseEntity.ok(categoryDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    	
	
    public void insertData() {
        try {
            for (int i = 0; i < 3; i++) {
                CategoryForm categoryForm = new CategoryForm(faker.name().fullName());
                Category category = categoryForm.createCategory();
            
                LOGGER.info("Category: {}", category.getName());          
                categoryRepository.save(category);
            }   
        } catch (Exception e) {
            LOGGER.error("Error occurred while inserting data: {}", e.getMessage());
        }
    }

    
    @PostMapping
    public ResponseEntity<CategoryDTO> insert(@RequestBody CategoryForm categoryFor, UriComponentsBuilder uriC) {
    	 
    	try {
    		Category category = categoryFor.createCategory();
    		
    		categoryRepository.save(category);
    		CategoryDTO categoryDto = new CategoryDTO(category);
    		
    		URI uri = uriC.path("/categorias/{id}").buildAndExpand(category.getId()).toUri();
    		
    		LOGGER.info("--------Inserindo nova categoria: {}", categoryFor.getName());
    		return ResponseEntity.created(uri).body(categoryDto);
    		
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> update(@PathVariable Long id, @RequestBody CategoryForm categoryFor) {
		try {
			Category category = categoryRepository.getReferenceById(id);
			category.setName(categoryFor.getName());
			categoryRepository.save(category);
    		CategoryDTO categoryDto = new CategoryDTO(category);
    		LOGGER.info("Atualizando categoria com ID {}: {}", id, categoryFor.getName());
    		
            return ResponseEntity.ok(categoryDto);
			
	    } catch (Exception e) {
	        return ResponseEntity.notFound().build();
	    }
    }
   
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
    	try {
	        Category category = categoryRepository.getReferenceById(id);
	        if (category == null) {
	            throw new EntityNotFoundException("Categoria com o ID " + id + " não encontrada.");
	        }
	        categoryRepository.delete(category);
	        LOGGER.info("Categoria com ID {} foi excluída com sucesso.", id);
			return ResponseEntity.noContent().build(); 
		
        } catch (Exception e) {
            LOGGER.error("Erro ao excluir a categoria com ID " + id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
