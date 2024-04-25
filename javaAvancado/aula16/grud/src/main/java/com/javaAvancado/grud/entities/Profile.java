package com.javaAvancado.grud.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_profile")
public class Profile implements Serializable {
	
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    
    private String authority;
    
    @ManyToMany(mappedBy ="profiles")
    private Set<User> users =new HashSet<>(); 


	public Profile(Long id, String authority) {
		super();
		this.id = id;
		this.authority = authority;
	}


	public Profile() {
		super();
		// TODO Auto-generated constructor stub
	}


	@Override
	public int hashCode() {
		return Objects.hash(id);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Profile other = (Profile) obj;
		return Objects.equals(id, other.id);
	}



	
	
}
