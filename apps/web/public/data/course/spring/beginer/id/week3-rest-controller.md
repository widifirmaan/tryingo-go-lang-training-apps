# REST Controller

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 3:** REST Controller

## Tujuan Pembelajaran

- @RestController dan @RequestMapping untuk define endpoint
- @GetMapping, @PostMapping, @PutMapping, @DeleteMapping
- @PathVariable untuk URL parameter, @RequestBody untuk request body
- ResponseEntity untuk kontrol HTTP status code
- RESTful API design: resource-based URL, HTTP methods

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

## Konsep Kunci

### @RestController
Gabungan @Controller + @ResponseBody. Return JSON langsung.

### HTTP Method Mapping
- @GetMapping: baca data
- @PostMapping: buat data baru
- @PutMapping: update data
- @DeleteMapping: hapus data

### @PathVariable
`@GetMapping("/{id}")` + `@PathVariable Long id` — ambil dari URL.

### @RequestBody
`@RequestBody Product product` — parse JSON body ke object.

### ResponseEntity
Kontrol penuh: status code, headers, body.

---

## Eksperimen

- Tambah endpoint dengan query parameter
- Buat endpoint dengan @RequestParam
- Coba ResponseEntity dengan custom header
- Buat endpoint untuk search/filter
- Eksperimen dengan pagination

---

## Tantangan

Buat REST API lengkap untuk Task Manager: CRUD endpoints, proper HTTP status codes, ResponseEntity.

---

## Ringkasan

Minggu 3 dari 14: **REST Controller** (Level: Pemula). Web layer di Spring Boot. Minggu depan: **Spring Data JPA**.
