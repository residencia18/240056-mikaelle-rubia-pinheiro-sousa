package com.javaAvancado.grud;

import static org.junit.jupiter.api.Assertions.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;


import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.javafaker.Faker;
import com.javaAvancado.grud.entities.Category;
import com.javaAvancado.grud.entities.Product;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;



class ProductTests {

	 private static final Faker faker = new Faker();
	 private static final Logger LOGGER = LoggerFactory.getLogger(GrudApplication.class);
	 private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
	 
    @Test
    void testProductCreation() {

        Long productId = 1L;
        String productName = faker.commerce().productName();
        String productDescription = faker.lorem().sentence();
        Double productPrice = faker.number().randomDouble(2, 10, 1000);
        String productImgUrl = faker.internet().image();
        Instant productDate = Instant.now();

        Product product = new Product(productId, productName, productDescription, productPrice, productImgUrl, productDate);

        LOGGER.info("--------Executando  class ProductTests, metodo testProductCreation() --------");
        assertEquals(productId, product.getId());
        assertEquals(productName, product.getName());
        assertEquals(productDescription, product.getDescription());
        assertEquals(productPrice, product.getPrice());
        assertEquals(productImgUrl, product.getImgUrl());
        assertEquals(productDate, product.getDate());
    }

    @Test
    void testProductCategoryAssociation() {

        Category category = new Category(1L, "Electronics");


        Product product = new Product();
        Set<Category> categories = new HashSet<>();
        categories.add(category);
        product.setCategories(categories);
        
        
        LOGGER.info("--------Executando  class ProductTests, metodo testProductCategoryAssociation() --------");
        assertNotNull(product.getCategories());
        assertEquals(1, product.getCategories().size());
        assertEquals(category, product.getCategories().iterator().next());
    }
    
    
    @Test
    void testProductNameNotNull() {
        Product product = new Product();
        product.setName(null);

        var violations = validator.validate(product);

        assertEquals(2, violations.size());
        LOGGER.info("--------Executando  class ProductTests, metodo testProductNameNotNull() --------");
        for (ConstraintViolation<Product> violation : violations) {
            if (violation.getPropertyPath().toString().equals("name")) {
                assertEquals("Valor do campo name não pode ser null ou vazio", violation.getMessage());
            }
        }
    }

    @Test
    void testProductDescriptionNotNull() {
        Product product = new Product();
        product.setDescription(null);

        var violations = validator.validate(product);

        assertEquals(2, violations.size());
        LOGGER.info("--------Executando  class ProductTests, metodo testProductDescriptionNotNull() --------");
        for (ConstraintViolation<Product> violation : violations) {
            if (violation.getPropertyPath().toString().equals("description")) {
                assertEquals("Valor do campo description não pode ser null ou vazio", violation.getMessage());
            }
        }
    }
}
