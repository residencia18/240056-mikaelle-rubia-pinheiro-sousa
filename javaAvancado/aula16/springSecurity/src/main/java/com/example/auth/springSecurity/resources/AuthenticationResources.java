package com.example.auth.springSecurity.resources;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.auth.springSecurity.entities.AuthenticationDTO;
import com.example.auth.springSecurity.entities.RegisterDTO;
import com.example.auth.springSecurity.entities.User;
import com.example.auth.springSecurity.repositories.UserRepository;



import jakarta.validation.Valid;


@RestController
@RequestMapping("/auth")
public class AuthenticationResources {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository repository;


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);


        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(this.repository.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(null, data.login(), encryptedPassword, data.role());

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/")
    public ResponseEntity<Void> atualizaProfileNull() {
        return ResponseEntity.badRequest().build();
    
	}

}
