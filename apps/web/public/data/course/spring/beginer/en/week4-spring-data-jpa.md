# Spring Data JPA

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 4:** Spring Data JPA

## Learning Objectives

- @Entity and @Table for class-to-table mapping
- @Id, @GeneratedValue, @Column for field mapping
- JpaRepository<T, ID> as base interface
- Derived query methods: findByName, findByPriceGreaterThan
- @Query for custom JPQL queries

---

## Program: Database Integration

```java
// File: Product.java (Entity)
package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    private Integer stock;

    // Constructors, getters, setters
    public Product() {}
    public Product(String name, Double price) {
        this.name = name; this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}

// File: ProductRepository.java
package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Derived query methods
    List<Product> findByName(String name);
    List<Product> findByPriceGreaterThan(Double price);
    List<Product> findByNameContaining(String keyword);

    // Custom query
    @Query("SELECT p FROM Product p WHERE p.price < :maxPrice")
    List<Product> findCheaperThan(@Param("maxPrice") Double maxPrice);
}

// File: application.properties
/*
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=update
*/
```

---

## Key Concepts

### JPA Entity
Map Java classes to database tables with @Entity.

### Field Mapping
@Id for primary key, @GeneratedValue for auto-increment.

### JpaRepository
Interface providing CRUD operations automatically.

### Derived Queries
Method names are parsed into SQL queries.

### @Query
Custom JPQL queries with named parameters.

---

## Experiments

- Create new entity with @OneToMany relationship
- Experiment with derived query methods
- Try @Query with JOIN
- Create pagination with Pageable
- Experiment with @ManyToOne relationships

---

## Challenge

Build a blog system: Entity Post, Comment, User. Relationships @OneToMany, @ManyToOne. Repository with custom queries.

---

## Summary

Week 4 of 14: **Spring Data JPA** (Level: Beginner). Database access without manual SQL. Next week: **REST API Best Practices**.
