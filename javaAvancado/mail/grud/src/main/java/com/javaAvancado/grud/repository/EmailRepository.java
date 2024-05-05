package com.javaAvancado.grud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaAvancado.grud.entities.Email;

public interface EmailRepository extends JpaRepository<Email, Long> {

}
