package com.javaAvancado.grud.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javaAvancado.grud.entities.Profile;
import com.javaAvancado.grud.exceptions.DatabaseException;
import com.javaAvancado.grud.exceptions.ResourceNotFoundException;
import com.javaAvancado.grud.repository.ProfileRepository;
import com.javaAvancado.grud.resources.DTO.ProfileDTO;
import com.javaAvancado.grud.resources.form.ProfileForm;

@Service
public class ProfileService {

	
	@Autowired
	private ProfileRepository repository;
	
	@Transactional(readOnly = true)
	public Page<ProfileDTO> findAll(PageRequest pageRequest) {
		Page<Profile> listProfile = repository.findAll(pageRequest);
	    return  listProfile.map(x -> new ProfileDTO(x));
	}
	
	@Transactional
	public Page<ProfileDTO> findByAuthority(String authority, PageRequest pageRequest) {
		Page<Profile> listProfile = repository.findByAuthority(pageRequest, authority);

	    return listProfile.map(x -> new ProfileDTO(x));
	}
	
	@Transactional(readOnly = true)
	public ProfileDTO findById(Long id) {
		Optional<Profile> obj = repository.findById(id);
		Profile entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new ProfileDTO(entity);
	}
	
	@Transactional
	public ProfileDTO insert(ProfileForm profileFor) {
		Profile entity = new Profile();
		entity = repository.save(profileFor.createProfile());
		
		return new ProfileDTO(entity);
	}
	
	
	@Transactional
	public ProfileDTO update(Long id, ProfileForm ProfileFor) {
		try {
			Profile entity = repository.getOne(id);
			entity.setAuthority(ProfileFor.getAuthority());
			entity = repository.save(entity);
			return new ProfileDTO(entity);
		}
		catch (ResourceNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}		
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
}
