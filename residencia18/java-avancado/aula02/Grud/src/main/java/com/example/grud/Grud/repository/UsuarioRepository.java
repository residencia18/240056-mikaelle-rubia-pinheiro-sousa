package com.example.grud.Grud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.grud.Grud.model.*;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	List<Usuario> findByName(String name);
}
