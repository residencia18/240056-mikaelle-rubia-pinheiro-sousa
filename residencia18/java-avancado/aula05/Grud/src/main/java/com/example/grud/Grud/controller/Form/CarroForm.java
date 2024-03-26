package com.example.grud.Grud.controller.Form;

import com.example.grud.Grud.model.Carro;
import com.example.grud.Grud.model.Usuario;

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

    public Long getProprietario() {
        return proprietario;
    }

    public void setProprietario(Long proprietario) {
        this.proprietario = proprietario;
    }

    public Carro criarCarro(Usuario us) {
        return new Carro(null, placa, renavam, us);
    }
}
