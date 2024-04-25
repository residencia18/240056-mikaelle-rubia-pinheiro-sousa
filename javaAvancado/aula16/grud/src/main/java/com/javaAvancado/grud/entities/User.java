package com.javaAvancado.grud.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_user")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    
    @NotBlank(message = "Valor do campo fistName não pode ser null ou vazio")
	private String firstName;
    
    @NotBlank(message = "Valor do campo lastName não pode ser null ou vazio")
	private String lastName;
    
    
    @NotBlank(message = "Valor do campo email não pode ser null ou vazio")
	private String email;
    
    private String password;
	@ManyToMany
	@JoinTable(name = "tb_user_profile",
		joinColumns = @JoinColumn(name = "user_id" ),
		inverseJoinColumns =  @JoinColumn(name = "profile_id"))
    private Set<Profile> profiles =new HashSet<>(); 
    
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(Long id, String firstName, String lastName, String email, String password) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
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
		User other = (User) obj;
		return Objects.equals(id, other.id);
	}


    
}
