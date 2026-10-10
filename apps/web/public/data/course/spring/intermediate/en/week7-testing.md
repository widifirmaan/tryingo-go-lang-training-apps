# Testing

> **Kategori:** Spring Boot | **Level:** Intermediate | **Minggu 7:** Testing

## Learning Objectives

- Unit tests with JUnit 5 and Mockito
- @Mock and @InjectMocks for mocking dependencies
- @WebMvcTest for testing controller layer
- @DataJpaTest for testing repository layer
- AssertJ for fluent assertions

---

## Program: Unit & Integration Tests

```java
// File: ProductServiceTest.java
package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void shouldReturnProductById() {
        // Arrange
        Product product = new Product("Laptop", 15000000.0);
        product.setId(1L);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        // Act
        Optional<Product> result = productService.getProductById(1L);

        // Assert
        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("Laptop");
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void shouldReturnEmptyWhenProductNotFound() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Product> result = productService.getProductById(99L);

        assertThat(result).isEmpty();
    }
}

// File: ProductControllerTest.java
/*
@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Test
    void shouldReturnProduct() throws Exception {
        Product product = new Product("Laptop", 15000000.0);
        when(productService.getProductById(1L)).thenReturn(Optional.of(product));

        mockMvc.perform(get("/api/products/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Laptop"));
    }
}
*/

// File: ProductRepositoryTest.java
/*
@DataJpaTest
public class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    void shouldSaveProduct() {
        Product product = new Product("Mouse", 250000.0);
        Product saved = productRepository.save(product);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getName()).isEqualTo("Mouse");
    }
}
*/

// Dependencies:
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
*/
```

---

## Key Concepts

### Unit Tests
Test individual components with mocked dependencies.

### @Mock & @InjectMocks
Create mocks and inject them into test subjects.

### @WebMvcTest
Test controllers without starting full server.

### @DataJpaTest
Test repositories with in-memory database.

### AssertJ
Fluent assertion library.

---

## Experiments

- Create tests for other service methods
- Experiment with @MockBean in @WebMvcTest
- Try integration tests with @SpringBootTest
- Create tests for exception handling
- Experiment with parameterized tests

---

## Challenge

Build a complete test suite for Product API: unit test service, integration test repository, controller test with MockMvc.

---

## Summary

Week 7 of 14: **Testing** (Level: Intermediate). Code quality and reliability. Next week: **Validation**.
