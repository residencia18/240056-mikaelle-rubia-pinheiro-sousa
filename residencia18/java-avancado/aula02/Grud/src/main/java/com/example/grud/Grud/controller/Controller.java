package com.example.grud.Grud.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.grud.Grud.controller.Form.UsuarioForm;
import com.example.grud.Grud.controller.dto.UsuarioDTO;
import com.example.grud.Grud.model.Usuario;
import com.example.grud.Grud.repository.UsuarioRepository;


@RestController
@RequestMapping("/usuario/")
public class Controller {
	
	@Autowired
	public UsuarioRepository usuarioRepository;
 	
	@GetMapping
	public List<UsuarioDTO> listaUsarios(String name) {
		System.out.println("Parâmetro: " + name);
	    
	    List<Usuario> listUsuarios;
	    if (name != null && !name.isEmpty()) {
	        listUsuarios = usuarioRepository.findByName(name);
	    } else {
	        listUsuarios = usuarioRepository.findAll();
	    }
	    
	    List<UsuarioDTO> lista = new ArrayList<>();
	    for (Usuario usuario : listUsuarios) {
	        UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.getId(), usuario.getName(), usuario.getEmail());
	        lista.add(usuarioDTO);
	    }
	    
	    return lista;
	}
	
	@PostMapping
	public ResponseEntity<UsuarioDTO> inserir(@RequestBody UsuarioForm us,
			UriComponentsBuilder uriC) {
		
		Usuario usuario = us.criarUsuario();
		usuarioRepository.save(usuario);
		UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.getId(),usuario.getName(), usuario.getEmail());
		
		uriC.path("/usuario/{id}");
		URI uri = uriC.buildAndExpand(usuario.getId()).toUri();
		return ResponseEntity.created(uri).body(usuarioDTO);
		
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> atualizar(@PathVariable Long id,@RequestBody UsuarioForm us) {

		try {

			Usuario usuario = usuarioRepository.getReferenceById(id);
			usuario.setName(us.getName());
			usuario.setEmail(us.getEmail());
			usuario.setSenha(us.getSenha());
			usuarioRepository.save(usuario);
			
			UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.getId(),usuario.getName(), usuario.getEmail());
			return ResponseEntity.ok(usuarioDTO);

		}catch (Exception e){
			return ResponseEntity.notFound().build();
		}

		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?>  listaUsuarios(@PathVariable Long id){
		try {
			Usuario usuario = usuarioRepository.getReferenceById(id);
			UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.getId(),usuario.getName(), usuario.getEmail());
			return ResponseEntity.ok(usuarioDTO);
		}catch (Exception e){
			return ResponseEntity.notFound().build();
		}

	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?>  deleteUsuario(@PathVariable Long id){

		Usuario usuario = usuarioRepository.getReferenceById(id);
		UsuarioDTO UsuarioDTO = new UsuarioDTO(usuario.getId(),usuario.getName(), usuario.getEmail());
		
		usuarioRepository.delete(usuario);
		return ResponseEntity.ok(null);
	}

	@DeleteMapping("/")
	public ResponseEntity<?>  deleteUsuarioNull(){

		return ResponseEntity.badRequest().build();
	}
	
	@PutMapping("/")
	public ResponseEntity<?>  atualizaUsuarioNull(){

		return ResponseEntity.badRequest().build();
	}

}
