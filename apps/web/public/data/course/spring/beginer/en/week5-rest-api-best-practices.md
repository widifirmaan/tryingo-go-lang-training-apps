# REST API Best Practices

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 5:** REST API Best Practices

## Learning Objectives

- DTO (Data Transfer Object) for request/response
- @RestControllerAdvice for global exception handling
- Custom exception classes with RuntimeException
- Consistent error response format
- API versioning: /api/v1/products

---

## Program: DTO & Exception Handling

```java
// File: ProductDTO.java
package com.example.demo.dto;

public class ProductDTO {
    private Long id;
    private String name;
    private Double price;

    public ProductDTO() {}
    public ProductDTO(Long id, String name, Double price) {
        this.id = id; this.name = name; this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}

// File: ProductNotFoundException.java
package com.example.demo.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("Product not found with id: " + id);
    }
}

// File: GlobalExceptionHandler.java
package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(ProductNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
            "timestamp", LocalDateTime.now().toString(),
            "status", 404,
            "error", "Not Found",
            "message", ex.getMessage()
        ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneral(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
            "timestamp", LocalDateTime.now().toString(),
            "status", 500,
            "error", "Internal Server Error",
            "message", ex.getMessage()
        ));
    }
}

// File: ProductController.java (updated)
/*
@GetMapping("/{id}")
public ProductDTO getProduct(@PathVariable Long id) {
    return productService.getProductById(id)
        .orElseThrow(() -> new ProductNotFoundException(id));
}
*/

// Best Practices:
// 1. Gunakan DTO untuk request/response
// 2. Global exception handling dengan @RestControllerAdvice
// 3. Proper HTTP status codes
// 4. Consistent error response format
// 5. Versioning: /api/v1/products
```

---

## Key Concepts

### DTO
Separate entities from request/response objects.

### @RestControllerAdvice
Global exception handler for all controllers.

### Custom Exceptions
Domain-specific exceptions extending RuntimeException.

### Error Response
Consistent JSON error format.

### API Versioning
Version endpoints for backward compatibility.

---

## Experiments

- Create separate DTOs for request and response
- Add exception handler for validation errors
- Try @ExceptionHandler for multiple exceptions
- Create custom error response class
- Experiment with API versioning

---

## Challenge

Build a REST API with DTOs, exception handling, and versioning. Domain: Task Manager or E-Commerce.

---

## Summary

Week 5 of 14: **REST API Best Practices** (Level: Beginner). Beginner phase complete! Next week: **Spring Security** (Intermediate).
