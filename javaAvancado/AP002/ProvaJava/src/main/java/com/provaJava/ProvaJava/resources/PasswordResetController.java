package com.provaJava.ProvaJava.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.provaJava.ProvaJava.domain.User;
import com.provaJava.ProvaJava.repositories.UserRepository;
import com.provaJava.ProvaJava.resources.dto.EmailDTO;
import com.provaJava.ProvaJava.resources.dto.LoginResponseDTO;
import com.provaJava.ProvaJava.resources.dto.ResetPasswordDTO;
import com.provaJava.ProvaJava.security.TokenService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PasswordResetController {
	private static final Logger LOGGER = LoggerFactory.getLogger(PasswordRecoveryController.class);
	
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    
    
    
    @PostMapping("/redefinir-senha")
    public ResponseEntity resetPassword(@RequestBody @Valid ResetPasswordDTO data) {
    	User user = this.userRepository.findByEmail(data.email()).orElseThrow(()->new RuntimeException("User not found "));
    	LOGGER.info("Executando operação de Resetar senha .{}{}{}", data.email(), data.newPassword());
 
    	try {
    		String token = this.tokenService.generateTokenReset(data.newPassword());
    		user.setPassword(this.passwordEncoder.encode(data.newPassword()));
    		
    		this.userRepository.save(user);

    		return ResponseEntity.ok().build();
    	
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
       }
    }
    
}
