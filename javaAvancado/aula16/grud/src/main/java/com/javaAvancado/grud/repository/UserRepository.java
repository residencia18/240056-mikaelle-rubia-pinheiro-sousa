package com.javaAvancado.grud.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.javaAvancado.grud.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Page<User>findByFirstName(PageRequest pageRequest, String firstName);
	Page<User>findByLastName(PageRequest pageRequest, String lastName);

}
