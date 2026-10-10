# Validation

> **Kategori:** Spring Boot | **Level:** Intermediate | **Minggu 8:** Validation

## Learning Objectives

- Bean Validation with Jakarta annotations
- @NotNull, @NotBlank, @Size, @Min, @Max
- @Valid to trigger validation in controllers
- MethodArgumentNotValidException handler
- Custom validation messages

---

## Program: Bean Validation

```java
// File: Product.java (dengan validation)
package com.example.demo.model;

import jakarta.validation.constraints.*;

public class Product {

    private Long id;

    @NotBlank(message = "Nama tidak boleh kosong")
    @Size(min = 2, max = 100, message = "Nama harus 2-100 karakter")
    private String name;

    @NotNull(message = "Harga tidak boleh null")
    @DecimalMin(value = "0.0", message = "Harga harus positif")
    private Double price;

    @Min(value = 0, message = "Stok tidak boleh negatif")
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

// File: ProductController.java (dengan validation)
/*
@PostMapping
public ResponseEntity<?> createProduct(@Valid @RequestBody Product product) {
    Product created = productService.createProduct(product);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
}
*/

// File: GlobalExceptionHandler.java (validation handler)
/*
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(error ->
        errors.put(error.getField(), error.getDefaultMessage()));

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
        "timestamp", LocalDateTime.now().toString(),
        "status", 400,
        "errors", errors
    ));
}
*/

// Validation Annotations:
// @NotNull — tidak boleh null
// @NotBlank — tidak boleh null/kosong/whitespace
// @Size — panjang string/collection
// @Min, @Max — batas numerik
// @Email — format email
// @Pattern — regex pattern
// @Valid — trigger validation
```

---

## Key Concepts

### Bean Validation
Validate input with Jakarta annotations.

### Annotations
@NotNull, @NotBlank, @Size, @Min, @Max for different constraints.

### @Valid
Trigger validation on controller parameters.

### Exception Handler
Handle validation errors with MethodArgumentNotValidException.

### Custom Messages
Provide user-friendly error messages.

---

## Experiments

- Create custom validation annotation
- Experiment with validation groups
- Try @Valid on nested objects
- Create custom validator class
- Experiment with i18n messages

---

## Challenge

Build form validation for User registration: name, email, password, age. Custom validation for password strength.

---

## Summary

Week 8 of 14: **Validation** (Level: Intermediate). Input sanitization and security. Next week: **Actuator & Monitoring**.
