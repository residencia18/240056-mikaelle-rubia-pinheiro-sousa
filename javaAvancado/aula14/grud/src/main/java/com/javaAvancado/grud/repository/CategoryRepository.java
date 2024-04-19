package com.javaAvancado.grud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaAvancado.grud.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	List<Category> findByName(String name);

}
