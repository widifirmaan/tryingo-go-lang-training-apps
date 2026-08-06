# REST Controllers

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 3:** REST Controllers

## Learning Objectives

- @RestController and @RequestMapping for endpoint definition
- @GetMapping, @PostMapping, @PutMapping, @DeleteMapping
- @PathVariable for URL parameters, @RequestBody for request body
- ResponseEntity for HTTP status code control
- RESTful API design: resource-based URLs, HTTP methods

---

## Program: CRUD API

```java
// File: ProductController.java
package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // GET /api/products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // GET /api/products/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return productService.getProductById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/products
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product created = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/products/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {
        product.setId(id);
        Product updated = productService.createProduct(product);
        return ResponseEntity.ok(updated);
    }

    // DELETE /api/products/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}

// HTTP Status Codes:
// 200 OK — sukses
// 201 Created — resource baru dibuat
// 204 No Content — sukses tanpa body
// 404 Not Found — resource tidak ditemukan
// 400 Bad Request — input tidak valid
// 500 Internal Server Error — error server
```

---

## Key Concepts

### @RestController
Returns JSON directly without view resolution.

### HTTP Method Mapping
GET for read, POST for create, PUT for update, DELETE for delete.

### @PathVariable
Extract values from URL path.

### @RequestBody
Parse JSON request body to Java object.

### ResponseEntity
Full control over HTTP response.

---

## Experiments

- Add endpoint with query parameters
- Create endpoint with @RequestParam
- Try ResponseEntity with custom headers
- Create endpoint for search/filter
- Experiment with pagination

---

## Challenge

Build a complete REST API for Task Manager: CRUD endpoints, proper HTTP status codes, ResponseEntity.

---

## Summary

Week 3 of 14: **REST Controllers** (Level: Beginner). Web layer in Spring Boot. Next week: **Spring Data JPA**.
