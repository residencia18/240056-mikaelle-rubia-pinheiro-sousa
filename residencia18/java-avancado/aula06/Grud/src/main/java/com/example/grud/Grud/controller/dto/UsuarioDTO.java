package com.example.grud.Grud.controller.dto;

import java.util.List;

import com.example.grud.Grud.model.Carro;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

  
}
