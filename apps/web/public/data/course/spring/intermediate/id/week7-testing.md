# Testing

> **Kategori:** Spring Boot | **Level:** Menengah | **Minggu 7:** Testing

## Tujuan Pembelajaran

- Unit test dengan JUnit 5 dan Mockito
- @Mock dan @InjectMocks untuk mock dependency
- @WebMvcTest untuk test controller layer
- @DataJpaTest untuk test repository layer
- AssertJ untuk fluent assertions

---

## Program: Unit & Integration Test

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

## Konsep Kunci

### Unit Test
Test individual components. Mock dependencies dengan Mockito.

### @Mock & @InjectMocks
`@Mock` — buat mock object. `@InjectMocks` — inject mock ke class yang di-test.

### @WebMvcTest
Test controller layer tanpa start full server. Gunakan MockMvc.

### @DataJpaTest
Test repository layer dengan in-memory database.

### AssertJ
Fluent assertions: `assertThat(x).isEqualTo(y).isNotNull()`.

---

## Eksperimen

- Buat test untuk service method lain
- Eksperimen dengan @MockBean di @WebMvcTest
- Coba integration test dengan @SpringBootTest
- Buat test untuk exception handling
- Eksperimen dengan parameterized test

---

## Tantangan

Buat test suite lengkap untuk Product API: unit test service, integration test repository, controller test dengan MockMvc.

---

## Ringkasan

Minggu 7 dari 14: **Testing** (Level: Menengah). Kualitas kode dan keandalan. Minggu depan: **Validation**.
