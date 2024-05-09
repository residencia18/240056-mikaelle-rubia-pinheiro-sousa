package com.provaJava.ProvaJava.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.provaJava.ProvaJava.domain.User;
import com.provaJava.ProvaJava.repositories.UserRepository;

import com.provaJava.ProvaJava.resources.dto.UserDTO;

@Service
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
	public List<UserDTO> findByEmail(String email) {
	  Optional<User> user = userRepository.findByEmail(email);
	  if (user.isPresent()) {
	    return Collections.singletonList(new UserDTO(user.get())); 
	  }
	  return Collections.emptyList();
	}


}
