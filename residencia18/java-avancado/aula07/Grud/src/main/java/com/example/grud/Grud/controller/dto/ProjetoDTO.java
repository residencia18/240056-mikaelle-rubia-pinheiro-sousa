package com.example.grud.Grud.controller.dto;

import java.util.List;

import com.example.grud.Grud.model.Usuario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjetoDTO {

	private Long id;

	private List<Usuario> integrante;
	private String nome;
	private String gerente;
	
	public ProjetoDTO(Long id, List<Usuario> integrante, String nome, String gerente) {
		super();
		this.id = id;
		this.integrante = integrante;
		this.nome = nome;
		this.gerente = gerente;
	}

	public ProjetoDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	
}
