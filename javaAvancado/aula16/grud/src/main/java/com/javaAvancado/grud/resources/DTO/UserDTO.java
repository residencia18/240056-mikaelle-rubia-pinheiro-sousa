package com.javaAvancado.grud.resources.DTO;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.javaAvancado.grud.entities.Profile;
import com.javaAvancado.grud.entities.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO  implements Serializable {
	private static final long serialVersionUID = 1L;

		private Long id;
		private String firstName;
		private String lastName;
		private String email;

	    private List<ProfileDTO> profiles =new ArrayList<>();
	    
	    public UserDTO() {
	    	super();
	    	// TODO Auto-generated constructor stub
	    }
	    
		public UserDTO(Long id, String firstName, String lastName, String email) {
			super();
			this.id = id;
			this.firstName = firstName;
			this.lastName = lastName;
			this.email = email;
	
		}

		public UserDTO(User user) {
			super();
			id = user.getId();
			firstName = user.getFirstName();
			lastName = user.getLastName();
			email = user.getEmail();
			user.getProfiles().forEach(prof ->this.profiles.add(new ProfileDTO(prof)));

		}		
	    
	    
}
