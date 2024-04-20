package com.javaAvancado.grud.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.javaAvancado.grud.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	
	Page<Product> findByName(PageRequest pageRequest, String name);
}
