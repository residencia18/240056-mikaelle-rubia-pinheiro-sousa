package com.example.grud.Grud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Carro {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	 private String placa;
	 private String renavam;
	 
	 @ManyToOne
	 private Usuario proprietario;
	 
	public Carro(String placa, String renavam, Usuario proprietario) {
		super();
		this.placa = placa;
		this.renavam = renavam;
		this.proprietario = proprietario;
	}
	public Carro() {
		super();
		// TODO Auto-generated constructor stub
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
	public Usuario getProprietario() {
		return proprietario;
	}
	public void setProprietario(Usuario proprietario) {
		this.proprietario = proprietario;
	}
}
