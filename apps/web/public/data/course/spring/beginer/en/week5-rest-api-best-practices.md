# REST API Best Practices — Neat & Safe Shop

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 5:** REST API Best Practices
> **Prerequisites:** Week 4 — **Spring Data JPA**.

## Learning Objectives

- DTOs (`ProductIn`/`ProductOut`) special envelopes — never expose entities directly (source: spring.io/guides)
- `@RestControllerAdvice` global error guard + consistent `{ "error": "..." }` format
- `/api/v1/products` versioning so old phones never break when APIs change

---

## Why This Matters (Non-IT)

Exposing entities directly → hackers see `password` shipped along! Raw `500` errors → phones crash unclearly. Without versions, API changes → all old customer apps break.

---

## Program: Neat Spring Shop

```java
// DTOs: in & out envelopes (not entities!)
public record ProductIn(String name, Integer price) {}
public record ProductOut(Long id, String name, Integer price) {}

// Controller uses DTOs
@PostMapping
public ProductOut add(@Valid @RequestBody ProductIn in) {
  Product p = new Product();
  p.setName(in.name());
  p.setPrice(in.price());
  Product s = repo.save(p);
  return new ProductOut(s.getId(), s.getName(), s.getPrice());
}

// Global error guard
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class Safe {
  @ExceptionHandler(Exception.class)
  public Map<String, String> handle(Exception e) {
    return Map.of("error", e.getMessage());
  }
}
```

```java
// Version: /api/v1/products (add to RequestMapping)
@RequestMapping("/api/v1/products")
```

---

## Key Concepts

### DTO = Special Envelope
`ProductIn` (no id) ≠ `ProductOut` (with id) ≠ `Product` (entity + password?). Safe + clear.

### `@RestControllerAdvice` = Global Guard
Catches all `Exception`s → neat `{ "error": "..." }` JSON, not HTML 500.

### `/api/v1` = Version
API change → build `/api/v2`, old phones stay on `/api/v1`.

---

## Beginner Friendly Explanation

### Analogy: Mall Envelopes & Guards
- **DTO = special brown envelope**: contents fit the need, no mixing.
- **Advice = central guard**: all issues report to 1 door.

### Step 0 — Prepare Device
- Same as W1 + `spring-boot-starter-validation` for `@Valid`.

### How the Computer Reads It
1. `POST /api/v1/products` JSON → `ProductIn` → validate → save → `ProductOut`.
2. Error → `Safe.handle` → `{"error": "..."}` status 500.

### 3 Must-Know Terms
1. **DTO/VO**: envelope
2. **Advice/Handler**: guard
3. **Versioning**: version

---

## Experiments

- **Green:** POST without `name` → neat `{"error": ...}` (not HTML)?
- **Yellow:** `GET /api/v1/products` vs `/api/v2` (missing) → 404?
- **Red:** Return entity with secret field directly → visible? Switch to DTO.

---

## Challenge

**Complete Neat Shop:** In/out DTOs + `Advice` + `/api/v1` + `curl` POST verifying neat JSON. **Beginner Spring DONE!**
- **Link-up (Week 4 — Spring Data JPA):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **DTO/Advice/version**: envelope/guard/version

---

## Summary

Week 5 of 5: **Neat & Safe** (Level: Beginner). **Beginner Spring DONE!** Next: **Security** (Intermediate).
