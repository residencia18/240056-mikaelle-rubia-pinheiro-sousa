package com.example.grud.Grud.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.grud.Grud.GrudApplication;
import com.example.grud.Grud.controller.Form.UsuarioForm;
import com.example.grud.Grud.controller.dto.CarroDTO;
import com.example.grud.Grud.controller.dto.UsuarioDTO;
import com.example.grud.Grud.model.Carro;
import com.example.grud.Grud.model.Usuario;
import com.example.grud.Grud.repository.CarroRepository;
import com.example.grud.Grud.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios/")
public class Controller {
	private static final Logger LOGGER = LoggerFactory.getLogger(Controller.class);

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    public CarroRepository carroRepository;
    
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listaUsuarios(@RequestParam(required = false) String name) {
        List<Usuario> listUsuarios;
        if (name != null && !name.isEmpty()) {
            listUsuarios = usuarioRepository.findByName(name);
        } else {
            listUsuarios = usuarioRepository.findAll();
        }
        
        if (listUsuarios.isEmpty()) {
            return ResponseEntity.noContent().build(); // Retorna No Content se a lista estiver vazia
        }
        
        List<UsuarioDTO> lista = new ArrayList<>();
        for (Usuario usuario : listUsuarios) {
            List<CarroDTO> carrosDTO = new ArrayList<>();
            for (Carro carro : usuario.getCarros()) {
                CarroDTO carroDTO = new CarroDTO(carro.getId(), carro.getPlaca(), carro.getRenavam(), carro.getProprietario());
                carrosDTO.add(carroDTO);
            }
            UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.getId(), usuario.getName(), usuario.getEmail(), carrosDTO);
            lista.add(usuarioDTO);
        }
        
        LOGGER.info("----------Lista Usuario--------");
        return ResponseEntity.ok(lista);
    }

    
    @PostMapping
    public ResponseEntity<UsuarioDTO> inserir(@RequestBody UsuarioForm us, UriComponentsBuilder uriC) {
    	try {
	        Usuario usuario = us.criarUsuario();
	  
	        usuarioRepository.save(usuario);
	        List<CarroDTO> carrosDTO = new ArrayList<>();
	
	        for (Carro carro : usuario.getCarros()) {
	            CarroDTO carroDTO = new CarroDTO(carro.getId(), carro.getPlaca(), carro.getRenavam(), carro.getProprietario());
	            carrosDTO.add(carroDTO);
	        }
	        UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.getId(), usuario.getName(), usuario.getEmail(), carrosDTO);
	        URI uri = uriC.path("/usuarios/{id}").buildAndExpand(usuario.getId()).toUri();
	        
	        return ResponseEntity.created(uri).body(usuarioDTO);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> atualizar(@PathVariable Long id, @RequestBody UsuarioForm us) {
        try {
            Usuario usuario = usuarioRepository.getReferenceById(id);
            usuario.setName(us.getName());
            usuario.setEmail(us.getEmail());
            usuario.setSenha(us.getSenha());
            usuario.setCarros(us.getCarros());
            usuarioRepository.save(usuario);
            
            List<CarroDTO> carrosDTO = new ArrayList<>();

            for (Carro carro : usuario.getCarros()) {
                CarroDTO carroDTO = new CarroDTO(carro.getId(), carro.getPlaca(), carro.getRenavam(), carro.getProprietario());
                carrosDTO.add(carroDTO);
            }
            UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.getId(), usuario.getName(), usuario.getEmail(), carrosDTO);
            return ResponseEntity.ok(usuarioDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> listaUsuario(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioRepository.getReferenceById(id);
            
            List<CarroDTO> carrosDTO = new ArrayList<>();
            for (Carro carro : usuario.getCarros()) {
                CarroDTO carroDTO = new CarroDTO(carro.getId(), carro.getPlaca(), carro.getRenavam(), carro.getProprietario());
                carrosDTO.add(carroDTO);
            }
            UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.getId(), usuario.getName(), usuario.getEmail(), carrosDTO);
            return ResponseEntity.ok(usuarioDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.getReferenceById(id);
        usuarioRepository.delete(usuario);
        return ResponseEntity.noContent().build(); // Retorna No Content após a exclusão
    }
    
    @DeleteMapping("/")
    public ResponseEntity<Void> deleteUsuarioNull() {
        return ResponseEntity.badRequest().build();
    }
    
    @PutMapping("/")
    public ResponseEntity<Void> atualizaUsuarioNull() {
        return ResponseEntity.badRequest().build();
    }
}
