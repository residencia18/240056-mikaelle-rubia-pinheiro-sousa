package com.javaAvancado.grud.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.javaAvancado.grud.entities.Product;
import com.javaAvancado.grud.entities.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long>{
	
	Page<Product> findByAuthority(PageRequest pageRequest, String authority);
}
