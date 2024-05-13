package com.provaJava.ProvaJava.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.provaJava.ProvaJava.repositories.UserRepository;
import com.provaJava.ProvaJava.resources.dto.AuthenticationDTO;
import com.provaJava.ProvaJava.resources.dto.LoginResponseDTO;
import com.provaJava.ProvaJava.resources.dto.RegisterDTO;
import com.provaJava.ProvaJava.security.TokenService;
import com.provaJava.ProvaJava.domain.*;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.Optional;



@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthResource {
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthResource.class);
	
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
    	LOGGER.info("Executando operação de login. :{}", data.email() );
    	User user = this.userRepository.findByEmail(data.email()).orElseThrow(()->new RuntimeException("User not found "));
    	
    	if(this.passwordEncoder.matches(data.password(), user.getPassword())) {
    		String token = this.tokenService.generateToken(user);
    		return ResponseEntity.ok(new LoginResponseDTO(user.getName(), token));
//    		return ResponseEntity.ok("Login realizado com sucesso!");
    	}
    	
    	return ResponseEntity.badRequest().build();
    	
    }
    
    
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
    	LOGGER.info("Executando operação de Registrar User.{}", data.email() );
    	Optional <User> user= this.userRepository.findByEmail(data.email());
    	
    	if(user.isEmpty()) {
    		User newUser = new User();
    		newUser.setPassword(passwordEncoder.encode(data.password()));
    		newUser.setEmail(data.email());
    		newUser.setName(data.name());
    		
    		this.userRepository.save(newUser);
    		
//    		String token = this.tokenService.generateToken(newUser);
//    	
//    		return ResponseEntity.ok(new LoginResponseDTO(newUser.getName(), token));

    		return ResponseEntity.ok("Usuario registrado com sucesso!");
    	}
      
    	return ResponseEntity.badRequest().build();
    }
       
}
