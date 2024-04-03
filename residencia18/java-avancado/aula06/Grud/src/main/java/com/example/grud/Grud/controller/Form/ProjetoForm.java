package com.example.grud.Grud.controller.Form;

import java.util.List;

import com.example.grud.Grud.model.Usuario;


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

	public List<Usuario> getIntegrante() {
		return integrante;
	}

	public void setIntegrante(List<Usuario> integrante) {
		this.integrante = integrante;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getGerente() {
		return gerente;
	}

	public void setGerente(String gerente) {
		this.gerente = gerente;
	}
}
