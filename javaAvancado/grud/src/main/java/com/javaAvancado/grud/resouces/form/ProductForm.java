package com.javaAvancado.grud.resouces.form;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.javaAvancado.grud.entities.Category;
import com.javaAvancado.grud.entities.Product;
import com.javaAvancado.grud.resouces.DTO.CategoryDTO;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ProductForm {
	private String name;
	private String description; 
	private Double price;
	private String imgUrl;
	private Instant date;
	
	private List<CategoryDTO> categories = new ArrayList<>();
	
	public ProductForm ( String name, String description, Double price, String imgUrl, Instant date) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.imgUrl = imgUrl;
		this.date = date;
	}

	public ProductForm (Product entity) {
		super();
		this.name = entity.getName();
		this.description = entity.getDescription();
		this.price = entity.getPrice();
		this.imgUrl = entity.getImgUrl();
		this.date = entity.getDate();
	}
	
	public ProductForm () {
		super();
		// TODO Auto-generated constructor stub
	}
	

	public ProductForm (Product entity, Set<Category> categories) {
		this(entity);
		categories.forEach(cat -> this.categories.add(new CategoryDTO(cat)));
		
	}
	
	
	public Product createProduct() {
		return new Product(null, name, description, price, imgUrl, date);
		
	}
}
