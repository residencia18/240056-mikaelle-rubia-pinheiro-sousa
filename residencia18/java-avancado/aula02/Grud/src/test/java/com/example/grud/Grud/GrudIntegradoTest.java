package com.example.grud.Grud;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.grud.Grud.model.Usuario;
import com.example.grud.Grud.repository.UsuarioRepository;

@SpringBootTest
public class GrudIntegradoTest {
	
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    void salvarUsuario() {
        Usuario usuario = new Usuario(null, "ana santos","teste@gmail.com", "1234567");
        usuarioRepository.save(usuario);
        
        int size = this.usuarioRepository.findAll().size();
        String name =  this.usuarioRepository.findById(3L).get().getName();
        
        Assertions.assertEquals(3, size);
        Assertions.assertEquals("ana santos", name);
        
    }

}
