package com.javaAvancado.grud.resources.DTO;

import java.io.Serializable;

import com.javaAvancado.grud.entities.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	
	public CategoryDTO (){
		
	}
	public CategoryDTO (Category entity) {
		super();
		this.id = entity.getId();
		this.name = entity.getName();
	}
	public CategoryDTO (Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	
}