# RESTful Web APIs: Spring MVC, Jakarta Validation & RFC 7807 ProblemDetail

> **Kategori:** Spring Boot & Java | **Level:** Beginner | **Minggu 4:** RESTful Web APIs: Spring MVC, Jakarta Validation & RFC 7807 ProblemDetail
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Build standardized RESTful endpoints with `@RestController` and `@RequestMapping`.
- Apply declarative input validation with Jakarta Bean Validation (`@NotNull`, `@DecimalMin`, `@NotBlank`).
- Leverage Spring Boot 3 / Spring 6 native `ProblemDetail` complying with RFC 7807.
- Construct centralized `@RestControllerAdvice` exception handlers across all controller layers.

---

## Program: Fund Transfer REST API with Payload Validation & Global Exception Handler

```java
package com.tryngo.banking.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/transfers")
public class TransferController {

    @PostMapping
    public ResponseEntity<TransferResponse> executeTransfer(@Valid @RequestBody TransferRequest request) {
        // Simulasi validasi bisnis saldo
        if (request.amount().compareTo(new BigDecimal("50000000.00")) > 0) {
            throw new InsufficientBalanceException("Saldo harian tidak mencukupi untuk transfer di atas Rp 50.000.000!");
        }

        var response = new TransferResponse(
            "TRX-2026-" + System.currentTimeMillis(),
            request.sourceAccount(),
            request.targetAccount(),
            request.amount(),
            "SUCCESS",
            Instant.now()
        );

        return ResponseEntity
            .created(URI.create("/api/v1/transfers/" + response.transferId()))
            .body(response);
    }
}

// DTO Requests & Responses menggunakan Java Records
record TransferRequest(
    @NotBlank(message = "Nomor rekening asal tidak boleh kosong.")
    String sourceAccount,

    @NotBlank(message = "Nomor rekening tujuan tidak boleh kosong.")
    String targetAccount,

    @NotNull(message = "Nominal transfer wajib diisi.")
    @DecimalMin(value = "10000.00", message = "Minimal transfer adalah Rp 10.000,00.")
    @DecimalMax(value = "100000000.00", message = "Maksimal transfer per transaksi adalah Rp 100.000.000,00.")
    BigDecimal amount
) {}

record TransferResponse(String transferId, String from, String to, BigDecimal amount, String status, Instant timestamp) {}

// Custom Business Exception
class InsufficientBalanceException extends RuntimeException {
    public InsufficientBalanceException(String message) { super(message); }
}

// Global Exception Handler menggunakan Standar RFC 7807 ProblemDetail bawaan Spring 6
@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(InsufficientBalanceException.class)
    public ProblemDetail handleInsufficientBalance(InsufficientBalanceException ex) {
        var problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
        problem.setTitle("Kegagalan Validasi Saldo Perbankan");
        problem.setType(URI.create("https://tryngo.io/errors/insufficient-balance"));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationErrors(MethodArgumentNotValidException ex) {
        var problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, "Payload request tidak valid.");
        problem.setTitle("Kesalahan Validasi Data");
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err -> 
            errors.put(err.getField(), err.getDefaultMessage())
        );
        problem.setProperty("fieldErrors", errors);
        return problem;
    }
}
```

---

## Key Concepts

Enterprise Web APIs mandate strict contract clarity, robust input validation before touching persistence engines, and standardized error communication.

### Spring MVC & RestController
The `@RestController` annotation pairs `@Controller` with `@ResponseBody`, indicating to Spring that returned Java objects must serialize directly into HTTP response bodies (JSON) via Jackson without HTML view resolution.

### Jakarta Bean Validation
Rather than littering controllers with repetitive `if (req.getAmount() < 10000)` checks, declarative Jakarta Validation annotations (`@DecimalMin`, `@NotBlank`) annotate DTO records. Applying `@Valid` triggers automated request auditing prior to controller invocation.

### Native RFC 7807 ProblemDetail in Spring Boot 3
Spring Boot 3 adopts the **RFC 7807 Problem Details** standard via `org.springframework.http.ProblemDetail`. Operating alongside `@RestControllerAdvice`, domain exceptions translate into uniform error payloads containing `type`, `title`, `status`, `detail`, and custom properties like `fieldErrors`.


---

---

## Beginner Friendly Explanation

Imagine filling out a paper cash withdrawal slip at a bank branch. If you leave your account number blank or enter Rp 0, the teller clerk (Jakarta Validation) immediately rejects the slip and highlights missing fields in red ink before the form reaches the branch manager.

## Experiments

- Send a POST payload with an amount of `5000` and observe `@DecimalMin` rejecting the request.
- Submit an amount exceeding 50 million and inspect the ProblemDetail generated by `InsufficientBalanceException`.
- Inspect the `Content-Type: application/problem+json` response header using curl or Postman.

---

## Challenge

Build a custom validator annotation `@ValidAccountNumber` validating banking account numbers using the Modulo 10 (Luhn) checksum algorithm.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR ENTERPRISE SPRING BOOT 3                      │
│                                                          │
│ Client HTTP Request                                      │
│       │                                                  │
│       ▼                                                  │
│ DispatcherServlet                                        │
│       │                                                  │
│       ▼                                                  │
│ @RestController (Controller Endpoint)                    │
│       │ Injeksi Dependensi (@Autowired / Constructor)    │
│       ▼                                                  │
│ @Service (Lapisan Logika Bisnis & @Transactional)        │
│       │                                                  │
│       ▼                                                  │
│ @Repository (Spring Data JPA / Hibernate ORM)            │
│       │                                                  │
│       ▼                                                  │
│ Database Pool (HikariCP)                                 │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `@RestController & @RequestMapping('/api/v1')`
- **Core Functionality:** Dekorator API Endpoint Spring Web.
- **Parameters / Attributes:** `Base path mapping`.
- **System Behavior & Return:** Mendeklarasikan kelas Java sebagai REST API Controller yang otomatis menserialisasi return value ke JSON..
- **Practical Code Example:**
```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @GetMapping
    public List<Product> list() { return productService.findAll(); }
}
```
- **Expected Execution Output:**
```output
Endpoint HTTP GET /api/products aktif
```

### 2. `@Service & Injeksi Dependensi Konstruktor`
- **Core Functionality:** Komponen Logika Bisnis & Dependency Injection.
- **Parameters / Attributes:** `Constructor Injection`.
- **System Behavior & Return:** Mendaftarkan class ke IoC Container Spring dan menginjeksi dependensi yang dibutuhkan secara otomatis..
- **Practical Code Example:**
```java
@Service
public class ProductService {
    private final ProductRepository repository;
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }
}
```
- **Expected Execution Output:**
```output
Service terinjeksi aman tanpa @Autowired refleksi
```

### 3. `public interface ProductRepository extends JpaRepository<Product, Long>`
- **Core Functionality:** Akses Database Otomatis Spring Data JPA.
- **Parameters / Attributes:** `Entity Class, Primary Key Type`.
- **System Behavior & Return:** Provides metode CRUD database (findAll, findById, save, delete) instan tanpa menulis implementasi..
- **Practical Code Example:**
```java
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByInStockTrue();
}
```
- **Expected Execution Output:**
```output
Metode pencarian database siap dipakai seketika
```

### 4. `@Transactional`
- **Core Functionality:** Manajemen transaksi database ACID.
- **Parameters / Attributes:** `Propagation, Isolation, RollbackFor`.
- **System Behavior & Return:** Guarantees seluruh operasi database di dalam method berhasil seluruhnya atau di-rollback otomatis saat gagal..
- **Practical Code Example:**
```java
@Transactional
public void checkout(Order order) {
    inventoryService.deduct(order);
    orderRepository.save(order);
}
```
- **Expected Execution Output:**
```output
Transaksi ACID dijamin aman tanpa data korup
```

---

## Common Pitfalls & Debugging Tips

### 1. Circular Bean Dependencies
- **Symptom / Issue:** Application fails startup with `BeanCurrentlyInCreationException`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Refactor dependencies using mediator patterns or apply `@Lazy` as a stopgap.

### 2. Self-Invocation Bypassing `@Transactional`
- **Symptom / Issue:** Internal method calls within the same class bypass the Spring AOP proxy.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Invoke transactional methods through an injected bean reference.

### 3. N+1 Hibernate Query Problem
- **Symptom / Issue:** Loads relational collections with hundreds of sequential database trips.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `JOIN FETCH` queries or annotate repository methods with `@EntityGraph`.

---

## Summary

You have mastered REST Controllers, Jakarta Validation, and RFC 7807 ProblemDetail. Level 1 complete! Level 2 covers Spring Security, Concurrency Locking, and Kafka.
