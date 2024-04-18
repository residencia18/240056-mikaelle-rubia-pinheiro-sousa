package com.javaAvancado.grud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaAvancado.grud.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	
	List<Product> findByName(String name);
}
