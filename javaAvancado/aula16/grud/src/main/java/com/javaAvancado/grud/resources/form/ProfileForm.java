package com.javaAvancado.grud.resources.form;

import com.javaAvancado.grud.entities.Profile;

public class ProfileForm {
    private String authority;

    public ProfileForm() {
    	super();
    	// TODO Auto-generated constructor stub
    }
    
    
	public ProfileForm(String authority) {
		super();
		this.authority = authority;
	}

	private Profile createProfile() {
		return new Profile(null, authority);
	}
    
}
