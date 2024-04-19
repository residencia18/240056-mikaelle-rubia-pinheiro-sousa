package com.javaAvancado.grud.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.javaAvancado.grud.entities.Category;
import com.javaAvancado.grud.exceptions.DatabaseException;
import com.javaAvancado.grud.exceptions.ResourceNotFoundException;
import com.javaAvancado.grud.repository.CategoryRepository;
import com.javaAvancado.grud.resources.DTO.CategoryDTO;
import com.javaAvancado.grud.resources.form.CategoryForm;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;
	
	@Cacheable("categorias")
	@Transactional(readOnly = true)
	public Page<CategoryDTO> findAll(PageRequest pageRequest) {
		Page<Category> listCategory = repository.findAll(pageRequest);
	    return  listCategory.map(x -> new CategoryDTO(x));
	}
	
	@Transactional
	public List<CategoryDTO> findByName(String name) {
	    List<Category> listCategory =new ArrayList<>();

        listCategory = repository.findByName(name);
	  
	    List<CategoryDTO> listDTO = listCategory.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
	    return listDTO;
	}
	
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO insert(CategoryForm categoryFor) {
		Category entity = new Category();
		entity.setName(categoryFor.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO update(Long id, CategoryForm categoryFor) {
		try {
			Category entity = repository.getOne(id);
			entity.setName(categoryFor.getName());
			entity = repository.save(entity);
			return new CategoryDTO(entity);
		}
		catch (ResourceNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}		
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}

}
