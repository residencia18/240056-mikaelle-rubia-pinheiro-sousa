package com.example.grud.Grud.controller.dto;

import java.util.List;

import com.example.grud.Grud.model.Carro;

public class UsuarioDTO {
    private Long id;
    private String name;
    private String email;
    private List<CarroDTO> carros;

    public UsuarioDTO() {
        super();
    }

    public UsuarioDTO(Long id, String name, String email, List<CarroDTO> carros) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
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

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<CarroDTO> getCarros() {
        return carros;
    }

    public void setCarros(List<CarroDTO> carros) {
        this.carros = carros;
    }
}
