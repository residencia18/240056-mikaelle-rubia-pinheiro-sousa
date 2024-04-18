package com.example.grud.Grud.controller.dto;

import java.util.List;

import com.example.grud.Grud.model.Usuario;

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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
