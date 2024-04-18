package com.example.grud.Grud.controller.Form;

import java.util.List;

import com.example.grud.Grud.model.Usuario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjetoForm {
	private List<Usuario> integrante;
	private String nome;
	private String gerente;


	public ProjetoForm() {
		super();
	
	}

	public ProjetoForm(List<Usuario> integrante, String nome, String gerente) {
		super();
		this.integrante = integrante;
		this.nome = nome;
		this.gerente = gerente;
	}


}
