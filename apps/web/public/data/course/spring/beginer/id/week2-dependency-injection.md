# Dependency Injection

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 2:** Dependency Injection

## Tujuan Pembelajaran

- Dependency Injection: inject dependency dari luar
- Anotasi stereotype: @Component, @Service, @Repository, @Controller
- Constructor injection dengan @Autowired
- Layered architecture: Controller → Service → Repository
- Inversion of Control (IoC) container

---

## Program: Service & Repository

```java
// File: Product.java (Model)
package com.example.demo.model;

public class Product {
    private Long id;
    private String name;
    private Double price;

    public Product() {}
    public Product(Long id, String name, Double price) {
        this.id = id; this.name = name; this.price = price;
    }

    // Getters dan Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}

// File: ProductRepository.java
package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class ProductRepository {
    private final Map<Long, Product> products = new HashMap<>();
    private Long nextId = 1L;

    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }

    public Optional<Product> findById(Long id) {
        return Optional.ofNullable(products.get(id));
    }

    public Product save(Product product) {
        if (product.getId() == null) {
            product.setId(nextId++);
        }
        products.put(product.getId(), product);
        return product;
    }

    public void deleteById(Long id) {
        products.remove(id);
    }
}

// File: ProductService.java
package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}

// Anotasi DI:
// @Component — generic stereotype
// @Service — business logic
// @Repository — data access
// @Controller / @RestController — web layer
// @Autowired — inject dependency
```

---

## Konsep Kunci

### Dependency Injection
Spring mengelola dependency antar class. Tidak perlu `new` manual.

### Stereotype Annotations
- @Component: generic Spring bean
- @Service: business logic layer
- @Repository: data access layer
- @Controller: web layer

### Constructor Injection
`@Autowired` pada constructor. Preferred field injection.

### IoC Container
ApplicationContext mengelola lifecycle bean. Singleton by default.

### Layered Architecture
Controller → Service → Repository → Database. Separation of concerns.

---

## Eksperimen

- Buat service baru dengan @Service
- Eksperimen dengan field injection vs constructor injection
- Buat repository dengan @Repository
- Coba @Qualifier untuk multiple bean
- Eksperimen dengan @Scope("prototype")

---

## Tantangan

Buat sistem manajemen buku: Model Book, Repository, Service, Controller. Gunakan constructor injection.

---

## Ringkasan

Minggu 2 dari 14: **Dependency Injection** (Level: Pemula). Inti dari Spring Framework. Minggu depan: **REST Controller**.
