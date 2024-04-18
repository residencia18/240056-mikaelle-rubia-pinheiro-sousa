package com.example.grud.Grud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.grud.Grud.model.Projeto;

public interface ProjetoRepository extends JpaRepository<Projeto, Long>{
	List<Projeto> findByNome(String nome);
}
