package com.provaJava.ProvaJava.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.provaJava.ProvaJava.domain.Email;

public interface EmailRepository extends JpaRepository<Email, Long> {
	Page<Email> findByEmailFrom(PageRequest pageRequest, String emailFrom);
	Page<Email> findByEmailTo(PageRequest pageRequest, String emailTo);
}
