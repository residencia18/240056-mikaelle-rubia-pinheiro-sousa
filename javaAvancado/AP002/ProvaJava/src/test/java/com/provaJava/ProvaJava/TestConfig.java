package com.provaJava.ProvaJava;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;

import com.provaJava.ProvaJava.repositories.UserRepository;

public class TestConfig {

    @Bean
    public UserRepository userRepository() {
        return Mockito.mock(UserRepository.class);
    }
    
}
