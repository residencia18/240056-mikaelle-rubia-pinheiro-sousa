package com.provaJava.ProvaJava.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.provaJava.ProvaJava.domain.*;

public interface GymRepositories extends JpaRepository<Gym, Long>{
	Optional <Gym> findByTitle(String title);
}
