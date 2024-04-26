package com.javaAvancado.grud.resources.DTO;

import java.io.Serializable;
import java.util.List;

import com.javaAvancado.grud.entities.Profile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
    private String authority;
    
	public ProfileDTO(Long id, String authority) {
		super();
		this.id = id;
		this.authority = authority;
	}
	
	public ProfileDTO(Profile profile) {
		super();
		this.id = profile.getId();
		this.authority = profile.getAuthority();
	}
	public ProfileDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
    
	
    

}
