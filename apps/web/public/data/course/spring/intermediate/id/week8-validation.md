# Validation

> **Kategori:** Spring Boot | **Level:** Menengah | **Minggu 8:** Validation

## Tujuan Pembelajaran

- Bean Validation dengan Jakarta annotations
- @NotNull, @NotBlank, @Size, @Min, @Max
- @Valid untuk trigger validation di controller
- MethodArgumentNotValidException handler
- Custom validation message

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

## Konsep Kunci

### Bean Validation
Validasi input dengan annotations. Jakarta Bean Validation 3.0.

### Annotations
- @NotNull: tidak boleh null
- @NotBlank: tidak boleh null/kosong
- @Size: panjang string
- @Min/@Max: batas numerik

### @Valid
Trigger validation di controller method parameter.

### Exception Handler
`MethodArgumentNotValidException` — handle validation errors. Extract field errors.

### Custom Message
`@NotBlank(message = "custom message")` — pesan error custom.

---

## Eksperimen

- Buat custom validation annotation
- Eksperimen dengan validation groups
- Coba @Valid di nested object
- Buat custom validator class
- Eksperimen dengan i18n messages

---

## Tantangan

Buat form validation untuk User registration: name, email, password, age. Custom validation untuk password strength.

---

## Ringkasan

Minggu 8 dari 14: **Validation** (Level: Menengah). Input sanitization dan keamanan. Minggu depan: **Actuator & Monitoring**.
