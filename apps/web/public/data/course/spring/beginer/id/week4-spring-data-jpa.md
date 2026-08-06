# Spring Data JPA

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 4:** Spring Data JPA

## Tujuan Pembelajaran

- @Entity dan @Table untuk mapping class ke database table
- @Id, @GeneratedValue, @Column untuk mapping field
- JpaRepository<T, ID> sebagai base interface
- Derived query methods: findByName, findByPriceGreaterThan
- @Query untuk custom JPQL query

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

## Konsep Kunci

### JPA Entity
`@Entity` — class dipetakan ke table. `@Table` — custom table name.

### Field Mapping
`@Id` primary key. `@GeneratedValue` auto-increment. `@Column` column properties.

### JpaRepository
Interface yang extend JpaRepository otomatis punya: save, findById, findAll, delete.

### Derived Query
Method name di-parse jadi query: `findByName` → `SELECT * FROM products WHERE name = ?`.

### @Query
Custom JPQL: `@Query("SELECT p FROM Product p WHERE p.price < :maxPrice")`.

---

## Eksperimen

- Buat entity baru dengan relasi @OneToMany
- Eksperimen dengan derived query methods
- Coba @Query dengan JOIN
- Buat pagination dengan Pageable
- Eksperimen dengan @ManyToOne relasi

---

## Tantangan

Buat sistem blog: Entity Post, Comment, User. Relasi @OneToMany, @ManyToOne. Repository dengan custom query.

---

## Ringkasan

Minggu 4 dari 14: **Spring Data JPA** (Level: Pemula). Database access tanpa SQL manual. Minggu depan: **REST API Best Practices**.
