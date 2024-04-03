package com.example.grud.Grud.controller.dto;

import com.example.grud.Grud.model.Usuario;


public class CarroDTO {
    private Long id;
    private String placa;
    private String renavam;
    private Usuario proprietario;
	public CarroDTO(Long id, String placa, String renavam, Usuario proprietario) {
		super();
		this.id = id;
		this.placa = placa;
		this.renavam = renavam;
		this.proprietario = proprietario;
	}
	
	public CarroDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPlaca() {
		return placa;
	}
	public void setPlaca(String placa) {
		this.placa = placa;
	}
	public String getRenavam() {
		return renavam;
	}
	public void setRenavam(String renavam) {
		this.renavam = renavam;
	}
	public Usuario proprietario() {
		return proprietario;
	}
	public void setProprietario(Usuario proprietario) {
		this.proprietario = proprietario;
	}


  


}
