package com.javaAvancado.grud.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javaAvancado.grud.entities.User;
import com.javaAvancado.grud.exceptions.DatabaseException;
import com.javaAvancado.grud.exceptions.ResourceNotFoundException;
import com.javaAvancado.grud.repository.UserRepository;
import com.javaAvancado.grud.resources.DTO.UserDTO;
import com.javaAvancado.grud.resources.form.UserForm;

@Service
public class UserService {
	
	@Autowired
	private UserRepository repository;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAll(PageRequest pageRequest) {
		Page<User> listUser = repository.findAll(pageRequest);
		return  listUser.map(x -> new UserDTO(x));
	}

	@Transactional
	public Page<UserDTO> findByFirstName(String firstName, PageRequest pageRequest) {
		Page<User> listUser = repository.findByFirstName(pageRequest, firstName);

		return listUser.map(x -> new UserDTO(x));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserForm userFor) {
		User entity = new User();
		entity = repository.save(userFor.createUser());
		return new UserDTO(entity);
	}


	@Transactional
	public UserDTO update(Long id, UserForm userFor) {
		try {
			User entity = repository.getOne(id);
			entity.setFirstName(userFor.getFirstName());
			entity = repository.save(entity);
			return new UserDTO(entity);
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
