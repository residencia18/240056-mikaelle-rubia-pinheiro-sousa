package com.javaAvancado.grud.resources.form;
import com.javaAvancado.grud.entities.Profile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

	public Profile createProfile() {
		return new Profile(null, authority);
	}
    
}
