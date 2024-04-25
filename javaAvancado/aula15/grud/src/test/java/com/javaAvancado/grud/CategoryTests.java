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
import com.javaAvancado.grud.entities.Product;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;

@SpringBootTest
public class CategoryTests {

	private static final Faker faker = new Faker(new Locale("py-br"));
	private static final Logger LOGGER = LoggerFactory.getLogger(GrudApplication.class);
	 private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
	
	@Test
	void testCategoryCreation() {
		Long categoryId = 1L;
		String name = faker.name().fullName();
        
		Category category = new Category(categoryId, name);
	
		LOGGER.info("--------Executando  class CategoryTests, metodo testCategoryCreation() --------");
	    assertEquals(categoryId, category.getId());
        assertEquals(name, category.getName());
			
	}
	
    @Test
    void testCategoryNameNotNull() {
    	Category category = new Category();
    	category.setName(null);

        var violations = validator.validate(category);

        assertEquals(1, violations.size());
        ConstraintViolation<Category> violation = violations.iterator().next();
        LOGGER.info("--------Executando  class CategoryTests, metodo testCategoryNameNotNull --------");
        assertEquals("Valor do campo name não pode ser null ou vazio", violation.getMessage());
              
    }

	
	
}
