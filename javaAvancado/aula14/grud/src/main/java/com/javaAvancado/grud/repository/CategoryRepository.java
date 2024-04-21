package com.javaAvancado.grud.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.javaAvancado.grud.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	Page<Category> findByName(PageRequest pageRequest, String name);

}
