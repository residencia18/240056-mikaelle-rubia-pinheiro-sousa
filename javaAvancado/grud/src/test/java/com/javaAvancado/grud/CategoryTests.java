package com.javaAvancado.grud;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.Locale;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import com.github.javafaker.Faker;
import com.javaAvancado.grud.entities.Category;

@SpringBootTest
public class CategoryTests {

	private static final Faker faker = new Faker(new Locale("py-br"));
	private static final Logger LOGGER = LoggerFactory.getLogger(GrudApplication.class);
	
	@Test
	void testCategoryCreation() {
		Long categoryId = 1L;
		String name = faker.name().fullName();
        
		Category category = new Category(categoryId, name);
		
		try {
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		LOGGER.info("--------Executando  class CategoryTests, metodo testCategoryCreation() --------");
		assertEquals(name,category.getName());
			
	}
	
	@Test
	void testNameNull() {
        Category category = new Category();
        String name = null;
        try {
            category.setName(name);
        } catch (Exception e) {
            e.printStackTrace();
        }
		LOGGER.info("--------Executando  class CategoryTests, metodo testNameNull() --------");
        assertNull(category.getName());
    }
	
	
	
}
