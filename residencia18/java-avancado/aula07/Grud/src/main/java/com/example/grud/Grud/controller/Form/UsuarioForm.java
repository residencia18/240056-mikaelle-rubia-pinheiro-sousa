package com.example.grud.Grud.controller.Form;

import java.util.List;

import com.example.grud.Grud.controller.dto.CarroDTO;
import com.example.grud.Grud.model.Carro;
import com.example.grud.Grud.model.Usuario;

import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UsuarioForm {
    @NotNull(message = "Name cannot be null")
	private String name;
    
	private String email;
    
	private String senha;
	
    private List<Carro> carros;
    
	public UsuarioForm( ) {
		super();
		// TODO Auto-generated constructor stub
	}

	public UsuarioForm(String name, String email, String senha, List<Carro> carros) {
		super();
		this.name = name;
		this.email = email;
		this.senha = senha;
		this.carros= carros;
	}


	
	public Usuario criarUsuario() {
		return new Usuario(null, name, email, senha, carros);
		
	}

	
}
