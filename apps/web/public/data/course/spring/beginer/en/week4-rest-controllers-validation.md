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
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `var x int / x := 42`
- **Core Functionality:** Type-safe variable declaration and short assignment.
- **Parameters / Attributes:** `Identifier, Type / Value`.
- **System Behavior & Return:** `:=` infers concrete types dynamically in function bodies; `var` sets deterministic zero values.
- **Practical Code Example:**
```javascript
counter := 10
fmt.Println("Counter:", counter)
```
- **Expected Execution Output:**
```text
Counter: 10
```

### 2. `func (r Receiver) Method() ReturnType`
- **Core Functionality:** Struct receiver method binding.
- **Parameters / Attributes:** `Receiver instance, Parameters`.
- **System Behavior & Return:** Associates behaviors directly with struct types without classical inheritance hierarchies.
- **Practical Code Example:**
```javascript
type Point struct { X, Y int }
func (p Point) Sum() int {
  return p.X + p.Y
}
```
- **Expected Execution Output:**
```text
Evaluates method computation over struct fields
```

### 3. `go func() { ... }()`
- **Core Functionality:** Lightweight concurrent Goroutine dispatch.
- **Parameters / Attributes:** `Anonymous / Named function`.
- **System Behavior & Return:** Launches asynchronous task execution scheduled cooperatively by the Go runtime (~2KB stack footprint).
- **Practical Code Example:**
```javascript
go func() {
  fmt.Println("Running asynchronously!")
}()
```
- **Expected Execution Output:**
```text
Executes concurrently without blocking the main OS thread
```

### 4. `ch := make(chan int); ch <- 1; v := <-ch`
- **Core Functionality:** Thread-safe CSP Channel pipeline.
- **Parameters / Attributes:** `Element Type, Buffer capacity`.
- **System Behavior & Return:** Transmits values synchronously between Goroutines with zero manual mutex or lock synchronization.
- **Practical Code Example:**
```javascript
ch := make(chan int)
go func() { ch <- 42 }()
fmt.Println(<-ch)
```
- **Expected Execution Output:**
```text
42
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
