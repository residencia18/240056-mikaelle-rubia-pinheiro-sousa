package com.provaJava.ProvaJava.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import com.provaJava.ProvaJava.domain.User;
import com.provaJava.ProvaJava.repositories.UserRepository;

import com.provaJava.ProvaJava.resources.dto.UserDTO;

public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAll(PageRequest pageRequest) {
		Page<User> list = userRepository.findAll(pageRequest);
		return  list.map(x -> new UserDTO(x));
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User>obj =  userRepository.findById(id);
		User entity = obj.orElseThrow(()->new RuntimeException());
		return new UserDTO(entity);
	}

	@Transactional
	public void delete(Long id) {
	    User obj =  userRepository.findById(id).orElseThrow(() -> new RuntimeException());
	    userRepository.deleteById(id);
	}
	
	
	@Transactional
	public Page<UserDTO> findByEmail(String email) {
		Optional<User> user= userRepository.findByEmail(email);
		Page<User> entity = (Page<User>) user.orElseThrow(()->new RuntimeException());
	    return entity.map(x -> new UserDTO(x));
	}


}
