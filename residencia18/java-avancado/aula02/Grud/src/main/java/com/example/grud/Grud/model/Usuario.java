package com.example.grud.Grud.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;

import com.example.grud.Grud.controller.dto.CarroDTO;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String senha;
    
    @OneToMany(mappedBy = "proprietario", cascade = CascadeType.ALL)
    private List<Carro> carros;
    
    public Usuario() {
        super();
    }
    
    public Usuario(Long id, String name, String email, String senha) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.senha = senha;
		
	}


	public Usuario(Long id, String name, String email, String senha, List<Carro> carros) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.senha = senha;
		this.carros = carros;
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
    
    public void setName(String name) throws Exception {
        if (name.length() < 3) {
            Exception e = new Exception("Nome deve ter mais de 2 caracteres");
            throw e;
        }
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getSenha() {
        return senha;
    }
    
    public void setSenha(String senha) {
        this.senha = senha;
    }
    
    public List<Carro> getCarros() {
        return carros;
    }
    
    public void setCarros(List<Carro> carros) {
        this.carros = carros;
    }
}
