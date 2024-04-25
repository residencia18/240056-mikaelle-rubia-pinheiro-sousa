package com.javaAvancado.grud.resources.DTO;

import com.javaAvancado.grud.entities.Profile;

public class ProfileDTO {

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
