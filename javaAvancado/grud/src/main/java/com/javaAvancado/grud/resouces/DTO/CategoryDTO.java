package com.javaAvancado.grud.resouces.DTO;

import com.javaAvancado.grud.entities.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDTO {
	private String name;
	
	public CategoryDTO (){
		
	}

	public CategoryDTO ( String name) {
		super();
		this.name = name;
	}
	
	public Category createCategory() {
		return new Category(null, name);
		
	}
	
}