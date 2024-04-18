package com.example.grud.Grud.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.grud.Grud.controller.Form.CarroForm;
import com.example.grud.Grud.controller.dto.CarroDTO;
import com.example.grud.Grud.model.Carro;
import com.example.grud.Grud.model.Usuario;
import com.example.grud.Grud.repository.CarroRepository;
import com.example.grud.Grud.repository.UsuarioRepository;

@RestController
@RequestMapping("/carros/")
public class ContollerCarro {

    @Autowired
    public CarroRepository carroRepository;

    @Autowired
    public UsuarioRepository usuarioRepository;

    @GetMapping
    public List<CarroDTO> listaCarro(@RequestParam(required = false) String placa) {
        List<Carro> listaCarros;
        if (placa != null && !placa.isEmpty()) {
            listaCarros = carroRepository.findByPlaca(placa);
        } else {
            listaCarros = carroRepository.findAll();
        }
        List<CarroDTO> lista = new ArrayList<>();
        for (Carro carro : listaCarros) {
            Usuario proprietario = carro.getProprietario();
            CarroDTO carroCto = new CarroDTO(carro.getId(), carro.getPlaca(), carro.getRenavam(), carro.getProprietario());
            lista.add(carroCto);
        }
        return lista;
    }

    @PostMapping
    public ResponseEntity<CarroDTO> inserir(@RequestBody CarroForm car, UriComponentsBuilder uriC) {
        if (car.getProprietario() == null) {
            return ResponseEntity.badRequest().body(new CarroDTO());
        }

        Optional<Usuario> optionalUsuario = usuarioRepository.findById(car.getProprietario().longValue());
        return optionalUsuario.map(usuario -> {
            Carro carro = car.criarCarro(usuario);
            carroRepository.save(carro);
            
            CarroDTO carroDTO = new CarroDTO(carro.getId(), carro.getPlaca(), carro.getRenavam(), usuario);
            URI uri = uriC.path("/carros/{id}").buildAndExpand(carro.getId()).toUri();

            return ResponseEntity.created(uri).body(carroDTO);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody CarroForm car) {

        try {

            Carro carro = carroRepository.getReferenceById(id);
            carro.setPlaca(car.getPlaca());
            carro.setRenavam(car.getRenavam());
            
            Optional<Usuario> optionalUsuario = usuarioRepository.findById(car.getProprietario());

            Usuario usuario = optionalUsuario.get();
            
            carro.setProprietario(usuario);
            

            carroRepository.save(carro);
            CarroDTO carroCto = new CarroDTO(carro.getId(), carro.getPlaca(), carro.getRenavam(), usuario);
            return ResponseEntity.ok(carroCto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCarro(@PathVariable Long id) {

        Carro carro = carroRepository.getReferenceById(id);
        
        CarroDTO carroDto = new CarroDTO(carro.getId(), carro.getPlaca(), carro.getRenavam(), carro.getProprietario());

        carroRepository.delete(carro);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listaCarros(@PathVariable Long id) {
        try {
            Carro carro = carroRepository.getReferenceById(id);
            CarroDTO carrDto = new CarroDTO(carro.getId(), carro.getPlaca(), carro.getRenavam(), carro.getProprietario());

            return ResponseEntity.ok(carrDto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteUsuarioNull() {

        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/")
    public ResponseEntity<?> atualizaUsuarioNull() {

        return ResponseEntity.badRequest().build();
    }

}
