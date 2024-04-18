package com.example.grud.Grud.controller.Form;

import java.util.List;

import com.example.grud.Grud.model.Carro;
import com.example.grud.Grud.model.Usuario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarroForm {
    private String placa;
    private String renavam;
    private Long proprietario;
    
    
    public CarroForm(String placa, String renavam, Long proprietario) {
        super();
        this.placa = placa;
        this.renavam = renavam;
        this.proprietario = proprietario;
    }

    public CarroForm() {
        super();
    }
    public Carro criarCarro(Usuario us) {
        return new Carro(null, placa, renavam, us);
    }
}
