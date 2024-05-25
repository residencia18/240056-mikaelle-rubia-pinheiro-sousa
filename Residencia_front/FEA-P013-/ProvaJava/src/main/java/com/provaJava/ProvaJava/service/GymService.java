package com.provaJava.ProvaJava.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.provaJava.ProvaJava.domain.Gym;
import com.provaJava.ProvaJava.domain.Schedule;
import com.provaJava.ProvaJava.repositories.GymRepositories;
import com.provaJava.ProvaJava.repositories.ScheduleRepositories;
import com.provaJava.ProvaJava.resources.dto.GymDto;
import com.provaJava.ProvaJava.resources.form.GymForm;

import jakarta.persistence.EntityNotFoundException;

@Service
public class GymService {

	@Autowired
	private GymRepositories repository;
	
	@Autowired
	private ScheduleRepositories schedulerepository;
	
	@Transactional(readOnly = true)
	public List<GymDto> findAll() {
	    return repository.findAll().stream()
	                     .map(this::convertToScheduleDto)
	                     .collect(Collectors.toList());
	}
	
    private GymDto convertToScheduleDto(Gym gym) {
    	
    	Set<Schedule> schedules = schedulerepository.findByGymId(gym.getId());
        return new GymDto(gym, schedules);
    }

	@Transactional(readOnly = true)
	public GymDto findById(Long id) {
	    return repository.findById(id)
	             .map(GymDto::new)
	             .orElseThrow(() -> new EntityNotFoundException("Gym not found for id: " + id));
	}
	
    @Transactional
	public void delete(Long id) {
	    Gym Gym = repository.findById(id)
	                                  .orElseThrow(() -> new EntityNotFoundException("Gym not found for id: " + id));        
	    repository.deleteById(id);
	}
	@Transactional
    public GymDto update(Long id, GymForm gymForm) {
        Gym entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found for id: " + id));
        entity.setTitle(gymForm.title());
        entity.setContent(gymForm.content());
        entity.setOpened(gymForm.opened());
        entity.setMask(gymForm.mask());
        entity.setTowel(gymForm.towel());
        entity.setFountain(gymForm.fountain());
        entity.setLockerRoom(gymForm.lockerRoom()); 
        entity = repository.save(entity);
        return new GymDto(entity);
    }

	@Transactional
	public GymDto insert(GymForm gymForm) {
	    Gym entity = new Gym();
	    entity.setTitle(gymForm.title());
	    entity.setContent(gymForm.content());
	    entity.setOpened(gymForm.opened());
	    entity.setMask(gymForm.mask());
	    entity.setTowel(gymForm.towel());
	    entity.setFountain(gymForm.fountain());
	    entity.setLockerRoom(gymForm.lockerRoom());
	  	
	    entity = repository.save(entity);
	    return new GymDto(entity);
	}
	
	
}
