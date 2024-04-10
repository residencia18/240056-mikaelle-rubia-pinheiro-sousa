package com.javaAvancado.grud.resouces.form;

import com.javaAvancado.grud.entities.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryForm {
	private String name;
	
	public CategoryForm (){
		
	}

	public CategoryForm ( String name) {
		super();
		this.name = name;
	}
	
	public Category createCategory() {
		return new Category(null, name);
		
	}
}
