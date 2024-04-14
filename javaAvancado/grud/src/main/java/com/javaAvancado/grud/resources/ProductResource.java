package com.javaAvancado.grud.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.javaAvancado.grud.GrudApplication;
import com.javaAvancado.grud.entities.Category;
import com.javaAvancado.grud.entities.Product;
import com.javaAvancado.grud.entities.Product;
import com.javaAvancado.grud.repository.CategoryRepository;
import com.javaAvancado.grud.repository.ProductRepository;
import com.javaAvancado.grud.resources.DTO.CategoryDTO;
import com.javaAvancado.grud.resources.DTO.ProductDTO;
import com.javaAvancado.grud.resources.form.CategoryForm;
import com.javaAvancado.grud.resources.form.ProductForm;
import com.javaAvancado.grud.services.ProductService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/produtos/")
public class ProductResource {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(GrudApplication.class);
	
	@Autowired
	private ProductService service;
	

    @Transactional(readOnly= true)
    @GetMapping
    public ResponseEntity<List<ProductDTO>> findAllProduct(@RequestParam(required = false) String name) {
    	try {
    	
	    	List<ProductDTO> listDTO= service.findAll();
						
			LOGGER.info("--------Executando operação de busca de produtos. Parâmetro de filtro: {}", name != null ? name : "Nenhum filtro aplicado.-------");
			return ResponseEntity.ok().body(listDTO);
		}catch (Exception e) { 
	        return ResponseEntity.notFound().build();
	    }
    }
    
	@GetMapping("/{id}")
	public ResponseEntity<ProductDTO> findById(@PathVariable Long id) {
		try {
			ProductDTO dto = service.findById(id);
			LOGGER.info("--------Executando operação de busca do produto com ID: {}" + id);
			return ResponseEntity.ok().body(dto);
		}catch (Exception e) { 
	        return ResponseEntity.notFound().build();
	    }
	}
	
	@PostMapping
	public ResponseEntity<ProductDTO> insert(@RequestBody ProductForm productFor, UriComponentsBuilder uriC) {
		try {
			
			ProductDTO productDTO  = service.insert(productFor);
			URI uri = uriC.path("/produtos/{id}").buildAndExpand(productDTO.getId()).toUri();
			LOGGER.info("--------Inserindo nova produto: {}", productFor.getName());
			return ResponseEntity.created(uri).body(productDTO);
		}catch (Exception e) { 
	        return ResponseEntity.notFound().build();
	    }
	}

	@PutMapping("/{id}")
	public ResponseEntity<ProductDTO> update(@PathVariable Long id, @RequestBody ProductForm productFor) {
		try {
			ProductDTO productDTO  = service.update(id, productFor);
			return ResponseEntity.ok().body(productDTO);
			
		}catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
	}

	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		try {
			
			service.delete(id);
			return ResponseEntity.noContent().build();
        }catch (Exception e) {
            LOGGER.error("Erro ao excluir a Produto com ID " + id, e);
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
