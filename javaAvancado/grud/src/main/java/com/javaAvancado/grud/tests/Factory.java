package com.javaAvancado.grud.tests;

import java.time.Instant;

import com.javaAvancado.grud.entities.Category;
import com.javaAvancado.grud.entities.Product;
import com.javaAvancado.grud.resources.DTO.ProductDTO;

public class Factory {
	
	public static Product createProduct() {
		Product product = new Product(1L, "Phone", "good phone", 800.0, " https://img.com/img.png", Instant.parse("2020-07-14T10:00:00Z"));
		product.getCategories().add(new Category(2L, "Eletrônicos"));
		return product;
	}
	
	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product,product.getCategories());
	
	}
	
	
}
