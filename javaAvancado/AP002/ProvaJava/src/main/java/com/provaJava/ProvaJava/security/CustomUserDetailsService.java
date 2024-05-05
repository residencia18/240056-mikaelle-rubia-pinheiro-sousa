package com.provaJava.ProvaJava.security;

import java.util.ArrayList;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


import com.provaJava.ProvaJava.repositories.UserRepository;

import com.provaJava.ProvaJava.domain.*;


@Component
public class CustomUserDetailsService implements UserDetailsService{

	
    @Autowired
    UserRepository userRepository;
    
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		
		User user = this.userRepository.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("User not found "));
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
	}

}
