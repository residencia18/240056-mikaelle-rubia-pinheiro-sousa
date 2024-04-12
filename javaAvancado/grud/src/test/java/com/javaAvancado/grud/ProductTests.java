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

class ProductTests {

	 private static final Faker faker = new Faker();
	 private static final Logger LOGGER = LoggerFactory.getLogger(GrudApplication.class);

    @Test
    void testProductCreation() {

        Long productId = 1L;
        String productName = faker.commerce().productName();
        String productDescription = faker.lorem().sentence();
        Double productPrice = faker.number().randomDouble(2, 10, 1000);
        String productImgUrl = faker.internet().image();
        Instant productDate = Instant.now();

        Product product = new Product(productId, productName, productDescription, productPrice, productImgUrl, productDate);

        LOGGER.info("--------Executando  class CategoryTests, metodo test() --------");
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

        assertNotNull(product.getCategories());
        assertEquals(1, product.getCategories().size());
        assertEquals(category, product.getCategories().iterator().next());
    }


}
