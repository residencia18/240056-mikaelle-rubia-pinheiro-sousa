package com.provaJava.ProvaJava.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.provaJava.ProvaJava.domain.Gym;
import com.provaJava.ProvaJava.domain.Schedule;
import com.provaJava.ProvaJava.repositories.GymRepositories;
import com.provaJava.ProvaJava.repositories.ScheduleRepositories;
import com.provaJava.ProvaJava.resources.dto.ScheduleDto;
import com.provaJava.ProvaJava.resources.form.ScheduleForm;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ScheduleService {
	@Autowired
	private ScheduleRepositories repository;
	
	@Autowired
	private GymRepositories gymRepository;
	
	@Transactional(readOnly = true)
	public List<ScheduleDto> findAll() {
	    return repository.findAll().stream()
	                     .map(ScheduleDto::new)
	                     .collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public ScheduleDto findById(Long id) {
	    return repository.findById(id)
	             .map(ScheduleDto::new)
	             .orElseThrow(() -> new EntityNotFoundException("Schedule not found for id: " + id));
	}

	public void delete(Long id) {
	    Schedule Schedule = repository.findById(id)
	                                  .orElseThrow(() -> new EntityNotFoundException("Schedule not found for id: " + id));        
	    repository.deleteById(id);
	}
	
	
	@Transactional
	public ScheduleDto update(Long id, ScheduleForm scheduleForm) {
	    Schedule entity = repository.findById(id)
	                            .orElseThrow(() -> new EntityNotFoundException("User not found for id: " + id));
	    entity.setWeekdays(scheduleForm.weekdays());
	    entity.setHour(scheduleForm.hour());
		Gym gym = gymRepository.findById(scheduleForm.gymId())
		         .orElseThrow(() -> new EntityNotFoundException("Gym not found for id: " + scheduleForm.gymId()));
		
	    entity = repository.save(entity);
	    return new ScheduleDto(entity);
	}

	@Transactional
	public ScheduleDto insert(ScheduleForm scheduleForm) {
		Schedule entity = new Schedule();
		entity.setWeekdays(scheduleForm.weekdays());
		entity.setHour(scheduleForm.hour());
		Gym gym = gymRepository.findById(scheduleForm.gymId())
		         .orElseThrow(() -> new EntityNotFoundException("Gym not found for id: " + scheduleForm.gymId()));
		entity.setGym(gym);
		entity = repository.save(entity);
		return new ScheduleDto(entity);
	}
}
