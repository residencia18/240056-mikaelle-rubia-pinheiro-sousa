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
import com.provaJava.ProvaJava.resources.dto.EmailRequestDTO;
import com.provaJava.ProvaJava.resources.dto.LoginResponseDTO;
import com.provaJava.ProvaJava.resources.dto.PasswordRecoveryDTO;
import com.provaJava.ProvaJava.security.TokenService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PasswordRecoveryController {
	private static final Logger LOGGER = LoggerFactory.getLogger(PasswordRecoveryController.class);
	
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final EmailResource emailResource;
    
    @PostMapping("/solicitaReset")
    public ResponseEntity resetPassword(@RequestBody EmailRequestDTO data) {
    	
    	User user = this.userRepository.findByEmail(data.email()).orElseThrow(()->new RuntimeException("User not found "));
    	LOGGER.info("Executando operação de Resetar senha: {}", data.email());
    	try {
	    	if(user.getEmail().equals(data.email())) {
	
	    		String token = this.tokenService.generateToken(user);
	    		
	    		String url_reset_password = "http://localhost:8080/redefinir-senha";
	    		LoginResponseDTO loginResponseDTO  = new LoginResponseDTO(user.getName(), token);
	    		String tokenText = "Link para redefinir senha: http://localhost:8080/redefinir-senha,"
	    				+ " Token de acesso: "+ token;
	    		
	    		String ownerRef = "API prova java";
	    		String emailFrom = "redefinir@gmail.com";
	    		String subject = "Redefinir senha";
	    		String emailTo = data.email();
	    		EmailDTO emailDto = new EmailDTO(ownerRef, emailFrom, emailTo, subject, tokenText);
	    		
	    		this.emailResource.sendingEmail(emailDto);
	    		
	    		return ResponseEntity.ok("Email enviado com sucesso!");
	    	}
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
       }
    	
    	return ResponseEntity.badRequest().build();
    }
    

    
    
}
