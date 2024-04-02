package com.example.grud.Grud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.grud.Grud.model.Carro;

public interface CarroRepository extends JpaRepository<Carro, Long> {
	List<Carro> findByPlaca(String placa);
}
