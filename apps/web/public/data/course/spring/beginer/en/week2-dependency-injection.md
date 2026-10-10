# Dependency Injection

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 2:** Dependency Injection

## Learning Objectives

- Dependency Injection: inject dependencies from outside
- Stereotype annotations: @Component, @Service, @Repository, @Controller
- Constructor injection with @Autowired
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

## Key Concepts

### Dependency Injection
Spring manages dependencies between classes. No manual instantiation.

### Stereotype Annotations
@Component, @Service, @Repository, @Controller for different layers.

### Constructor Injection
Preferred way to inject dependencies.

### IoC Container
ApplicationContext manages bean lifecycle.

### Layered Architecture
Controller → Service → Repository for separation of concerns.

---

## Experiments

- Create new service with @Service
- Experiment with field vs constructor injection
- Create repository with @Repository
- Try @Qualifier for multiple beans
- Experiment with @Scope("prototype")

---

## Challenge

Build a book management system: Model Book, Repository, Service, Controller. Use constructor injection.

---

## Summary

Week 2 of 14: **Dependency Injection** (Level: Beginner). Core of Spring Framework. Next week: **REST Controllers**.
