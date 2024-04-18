package com.javaAvancado.grud.resources;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.javaAvancado.grud.resources.DTO.ProductDTO;

import com.javaAvancado.grud.resources.form.ProductForm;
import com.javaAvancado.grud.services.ProductService;


@RestController
@RequestMapping("/produtos/v1")
public class ProductResource {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductResource.class);
	
	@Autowired
	private ProductService service;
	

    @Transactional(readOnly= true)
    @GetMapping()
    public ResponseEntity<Page<ProductDTO>> findAllProductV1(@RequestParam(value = "page", defaultValue = "0" ) Integer page,
    		@RequestParam(value = "linesPerPage", defaultValue = "12" ) Integer linesPerPage,
    		@RequestParam(value = "direction", defaultValue = "ASC" ) String direction,
    		@RequestParam(value = "orderBy", defaultValue = "name" ) String orderBy
    		) {
    	try {
    		
    		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),  orderBy);
	    	Page<ProductDTO> listDTO= service.findAll(pageRequest);
						
			LOGGER.info("--------Executando operação de busca de produtos da Versão 1");
			return ResponseEntity.ok().body(listDTO);
		}catch (Exception e) { 
	        return ResponseEntity.notFound().build();
	    }
    }
    
    @Transactional(readOnly= true)
   
    @GetMapping(params = "version=2")
    public ResponseEntity<Page<ProductDTO>> findAllProduct(@RequestParam(value = "page", defaultValue = "0" ) Integer page,
    		@RequestParam(value = "linesPerPage", defaultValue = "12" ) Integer linesPerPage,
    		@RequestParam(value = "direction", defaultValue = "ASC" ) String direction,
    		@RequestParam(value = "orderBy", defaultValue = "name" ) String orderBy) {
    	try {
    	
    		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),  orderBy);
	    	Page<ProductDTO> listDTO= service.findAll(pageRequest);
						
			LOGGER.info("--------Executando operação de busca de produtos da Versão 2");
			return ResponseEntity.ok().body(listDTO);
		}catch (Exception e) { 
	        return ResponseEntity.notFound().build();
	    }
    }
    
    
	@GetMapping("/{id}")
	public ResponseEntity<ProductDTO> findById(@PathVariable Long id) {
		try {
			ProductDTO dto = service.findById(id);
			LOGGER.info("--------Versão 1: Executando operação de busca do produto com ID: {}" + id);
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
			LOGGER.info("--------Versão 1: Inserindo nova produto: {}", productFor.getName());
			return ResponseEntity.created(uri).body(productDTO);
		}catch (Exception e) { 
	        return ResponseEntity.notFound().build();
	    }
	}

	@PutMapping("/{id}")
	public ResponseEntity<ProductDTO> update(@PathVariable Long id, @RequestBody ProductForm productFor) {
		try {
			ProductDTO productDTO  = service.update(id, productFor);
			LOGGER.info("--------Versão 1: Update de produto");
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
