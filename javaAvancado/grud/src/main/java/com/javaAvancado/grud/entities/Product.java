package com.javaAvancado.grud.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
public class Product implements Serializable {
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    
    @NotBlank(message = "Valor do campo name não pode ser null ou vazio")
	private String name;

    @NotBlank(message = "Valor do campo description não pode ser null ou vazio")
	@Column(columnDefinition = "TEXT")
	private String description; 
	
    @PositiveOrZero(message = "O valor do campo price não pode ser negativo")
	private Double price;
	
	@Column(name = "img_url")
	private String imgUrl;
	
	@Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private Instant date;
	
	@ManyToMany
	@JoinTable(name = "tb_product_category",
		joinColumns = @JoinColumn(name = "product_id" ),
		inverseJoinColumns =  @JoinColumn(name = "category_id"))
	Set<Category> categories = new HashSet<>();

	
	public Product(Long id, String name, String description, Double price, String imgUrl, Instant date ) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.imgUrl = imgUrl;
		this.date = date;
	}
	public Product() {
		super();
		
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
		Product other = (Product) obj;
		return Objects.equals(id, other.id);
	}


}
