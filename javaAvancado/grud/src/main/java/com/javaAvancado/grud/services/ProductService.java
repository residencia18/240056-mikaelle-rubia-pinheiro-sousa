package com.javaAvancado.grud.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import com.javaAvancado.grud.entities.Category;
import com.javaAvancado.grud.entities.Product;
import com.javaAvancado.grud.exceptions.DatabaseException;
import com.javaAvancado.grud.exceptions.ResourceNotFoundException;
import com.javaAvancado.grud.repository.CategoryRepository;
import com.javaAvancado.grud.repository.ProductRepository;
import com.javaAvancado.grud.resources.DTO.CategoryDTO;
import com.javaAvancado.grud.resources.DTO.ProductDTO;
import com.javaAvancado.grud.resources.form.ProductForm;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {
	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findAllPaged() {
		List<Product> list = repository.findAll();
		return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new ProductDTO(entity, entity.getCategories());
	}
	
	@Transactional
	public ProductDTO insert(ProductForm productFor) {
		Product entity = productFor.createProduct();
		repository.save(entity);
		for( CategoryDTO categoryDTO : productFor.getCategories()) {
			Category category = categoryRepository.getOne(categoryDTO.getId());
			entity.getCategories().add(category);
		}
		
		return new ProductDTO(entity);
	}
	

	@Transactional
	public ProductDTO update(Long id, ProductForm productForm) {
		try {
			Product entity = repository.getOne(id);
			entity.setName(productForm.getName());
			entity.setDescription(productForm.getDescription());
			entity.setImgUrl(productForm.getImgUrl());
			entity.setDate(productForm.getDate());
			entity.setPrice(productForm.getPrice());
			entity.getCategories().clear();
			
			for( CategoryDTO categoryDTO : productForm.getCategories()) {
				Category category = categoryRepository.getOne(categoryDTO.getId());
				entity.getCategories().add(category);
			}
			entity = repository.save(entity);
			return new ProductDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}		
	}
	
	public void delete(Long id) {
		try {
			Optional<Product> entity = repository.findById(id);
			repository.delete(entity.get());
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}

}
