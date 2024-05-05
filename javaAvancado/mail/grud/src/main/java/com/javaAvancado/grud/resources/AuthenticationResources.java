package com.javaAvancado.grud.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaAvancado.grud.entities.User;
import com.javaAvancado.grud.repository.UserRepository;
import com.javaAvancado.grud.resources.DTO.AuthenticationDTO;
import com.javaAvancado.grud.resources.DTO.LoginResponseDTO;
import com.javaAvancado.grud.resources.DTO.RegisterDTO;
import com.javaAvancado.grud.services.TokenServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthenticationResources {
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationResources.class);
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository repository;
    
    @Autowired
    private TokenServices tokenServices;
	
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
    	 LOGGER.info("Executando operação de login. :{}", data.login() );
    	 
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        
        var token = tokenServices.generateToken((User) auth.getPrincipal());
        
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
    
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
    	LOGGER.info("Executando operação de Registrar User.{}", data.login() );
    	
        if(this.repository.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encryptedPassword, data.role());

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }
    
}
