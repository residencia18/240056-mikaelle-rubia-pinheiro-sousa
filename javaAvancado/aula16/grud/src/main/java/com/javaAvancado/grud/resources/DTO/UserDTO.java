package com.javaAvancado.grud.resources.DTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.javaAvancado.grud.entities.Profile;
import com.javaAvancado.grud.entities.User;

public class UserDTO {

		private Long id;
		private String firstName;
		private String lastName;
		private String email;
	    private String password;
	    private List<ProfileDTO> profiles =new ArrayList<>();
	    
	    
		public UserDTO(Long id, String firstName, String lastName, String email, String password) {
			super();
			this.id = id;
			this.firstName = firstName;
			this.lastName = lastName;
			this.email = email;
			this.password = password;
		}

		public UserDTO(User user) {
			super();
			this.id = user.getId();
			this.firstName = user.getFirstName();
			this.lastName = user.getLastName();
			this.email = user.getEmail();
			this.password = user.getPassword();
		}
		
		public UserDTO(User user, Set<Profile> profiles ) {
			this(user);
			profiles.forEach(prof ->this.profiles.add(new ProfileDTO(prof)));
		}
		
		public UserDTO() {
			super();
			// TODO Auto-generated constructor stub
		}

		
		
	    
	    
}
