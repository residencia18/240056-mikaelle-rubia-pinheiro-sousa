package com.provaJava.ProvaJava.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.provaJava.ProvaJava.domain.*;

public interface ScheduleRepositories extends JpaRepository<Schedule, Long> {
	Set<Schedule> findByGymId(Long gymId);
	
}
