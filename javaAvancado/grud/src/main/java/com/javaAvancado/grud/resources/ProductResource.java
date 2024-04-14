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
import com.javaAvancado.grud.resouces.DTO.CategoryDTO;
import com.javaAvancado.grud.resouces.DTO.ProductDTO;
import com.javaAvancado.grud.resouces.DTO.ProductDTO;
import com.javaAvancado.grud.resouces.form.CategoryForm;
import com.javaAvancado.grud.resouces.form.ProductForm;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/produtos/")
public class ProductResource {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(GrudApplication.class);
	
	@Autowired
	private ProductRepository productRepository;
	
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional(readOnly= true)
    @GetMapping
    public ResponseEntity<List<ProductDTO>> findAllProduct(@RequestParam(required = false) String name) {
		List<Product>listProduct = new ArrayList<>();
		
		if (name != null && !name.isEmpty()) {
			 listProduct =  productRepository.findByName(name);
			 if(listProduct.isEmpty()) {
				 LOGGER.info("--------Executando operação de busca de Produtos. valor não encontrado. --------");
			     return ResponseEntity.badRequest().build();
			 }
        } else {
        	listProduct =  productRepository.findAll();
        }
		List<ProductDTO> listDTO = listProduct.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
		LOGGER.info("--------Executando operação de busca de produtos. Parâmetro de filtro: {}", name != null ? name : "Nenhum filtro aplicado.-------");
		return ResponseEntity.ok().body(listDTO);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> findId(@PathVariable Long id) {
        try {
        	Product product = productRepository.getReferenceById(id);
			
        	ProductDTO productDTO = new ProductDTO(product, product.getCategories());
			LOGGER.info("--------Executando operação de busca do produto com ID: {}");
            return ResponseEntity.ok(productDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<ProductDTO> insertProduct(@RequestBody ProductForm productFor, UriComponentsBuilder uriC) {
    	 
    	try {
    		Product product = productFor.createProduct();
    		productRepository.save(product);
    		
    		
			for( CategoryDTO categoryDTO : productFor.getCategories()) {
				Category category = categoryRepository.getOne(categoryDTO.getId());
				product.getCategories().add(category);
			}
			
    		ProductDTO ProductDTO = new ProductDTO(product);
    		
    		URI uri = uriC.path("/produtos/{id}").buildAndExpand(product.getId()).toUri();
    		
    		LOGGER.info("--------Inserindo nova produto: {}", productFor.getName());
    		return ResponseEntity.created(uri).body(ProductDTO);
    		
        } catch (Exception e) {
        	return ResponseEntity.notFound().build();
        }
    }
     
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> update(@PathVariable Long id, @RequestBody ProductForm productForm) {
		try {
			Product product = productRepository.getReferenceById(id);
			product.setName(productForm.getName());
			product.setDescription(productForm.getDescription());
			product.setImgUrl(productForm.getImgUrl());
			product.setDate(productForm.getDate());
			product.setPrice(productForm.getPrice());
			
			product.getCategories().clear();
			
			for( CategoryDTO categoryDTO : productForm.getCategories()) {
				Category category = categoryRepository.getOne(categoryDTO.getId());
				product.getCategories().add(category);
			}
			
			productRepository.save(product);
			ProductDTO productDTO = new ProductDTO(product);
    		LOGGER.info("Atualizando produto com ID {}: {}", id, productForm.getName());
    		
            return ResponseEntity.ok(productDTO);
			
	    } catch (Exception e) {
	        return ResponseEntity.notFound().build();
	    }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    	try {
    		
    		 Product product = productRepository.getReferenceById(id);
    		 ProductDTO productDTO = new ProductDTO(product, product.getCategories());

    	     productRepository.delete(product);

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
