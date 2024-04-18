package com.example.grud.Grud;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.grud.Grud.model.Usuario;

@SpringBootTest
class GrudApplicationTests {

	@Test
	void contextLoads() {
		Usuario usuario = new Usuario();
		String name = "maria";
		String email = "teste@gamail.com";
		String senha= "12345698";
		try {
			usuario.setName(name);
			usuario.setEmail(email);
			usuario.setSenha(senha);
			
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		assertEquals(name, usuario.getName());
		
		//------------------------------------------------///
	}
	
	@Test 
	void validaTamanho() {
	
		Usuario usuario = new Usuario();
		
		String name = "k";
		
		try {
			usuario.setName(name);
		} catch (Exception e) {
			assertEquals("Nome deve ter mais de 2 caracteres", e.getMessage());
		}
		assertNotEquals(name, usuario.getName());
		
	}
	
	@Test 
	void validaTamanhoSenha() {
	
		Usuario usuario = new Usuario();
		
		String senha = "12369";
		
		try {
			usuario.setSenha(senha);
		} catch (Exception e) {
			assertEquals("senha deve ter no minimo 6 caracteres", e.getMessage());
		}
		assertNotEquals(senha, usuario.getSenha());
		
	}

}
