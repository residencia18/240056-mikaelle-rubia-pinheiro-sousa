package com.example.grud.Grud.controller.dto;

import com.example.grud.Grud.model.Usuario;

public class UsuarioDTO {
	private Long id;
	private String name;
	private String email;
	
	
	public UsuarioDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UsuarioDTO(Long id, String name, String email) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
	}
	public UsuarioDTO(Usuario u) {
		// TODO Auto-generated constructor stub
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}
