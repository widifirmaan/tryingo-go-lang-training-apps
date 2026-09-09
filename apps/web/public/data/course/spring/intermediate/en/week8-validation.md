# Validation — Spring Shop Input Guard

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 8:** Validation
> **Prerequisites:** Week 7 — **Testing**.

## Learning Objectives

- `@NotBlank`/`@Min(1)` mandatory stamps on entities + `@Valid` in controllers triggers checks (source: beanvalidation.org + docs.spring.io)
- `BindingResult`/`MethodArgumentNotValidException` catches → neat 400 replies

---

## Why This Matters (Non-IT)

Without validation, `name: ""` + `price: -5` enters the DB → negative receipts, broken reports. With `@NotBlank`, Spring rejects BEFORE saving + automatic "Name required" messages.

---

## Program: Stamped Spring Guard

```java
// Product.java — stamps on entity
import jakarta.validation.constraints.*;

public class Product {
  @NotBlank(message = "Name required")
  private String name;

  @Min(value = 1, message = "Price min 1")
  private Integer price;
  // getters/setters...
}

// Controller — trigger with @Valid
@PostMapping
public Object add(@Valid @RequestBody Product p, BindingResult br) {
  if (br.hasErrors()) {
    return Map.of("error", br.getFieldError().getDefaultMessage());
  }
  return repo.save(p);
}
```

Test: `curl -X POST ... -d '{"name":"","price":-5}'` → `{"error":"Name required"}` status 400 (not 500!).

---

## Key Concepts

### `@NotBlank/@Min/...` = Mandatory Stamps
`@NotBlank` rejects blanks, `@Min(1)` rejects <1, `@Email` checks email.

### `@Valid` = Trigger Check
Without `@Valid`, stamps unread! `BindingResult` holds results.

---

## Beginner Friendly Explanation

### Analogy: Entrance Guard
- **Stamps = requirements**: "Name required" stamped on goods.
- **@Valid = guard reads stamps**: fails → 400 reject.

### Step 0 — Prepare Device
- `spring-boot-starter-validation` in `pom.xml` (or check Validation at start.spring.io).

### How the Computer Reads It
1. `POST` JSON → `Product` → checks each stamp → fails? Gathers errors.
2. `BindingResult` has errors → replies 400 + message.

### 3 Must-Know Terms
1. **NotBlank/Min**: required/minimum
2. **Valid/BindingResult**: trigger/holder

---

## Experiments

- **Green:** POST `name:""` → "Name required"?
- **Yellow:** Remove `@Valid` → bad data passes? (That's why it's mandatory!)
- **Red:** `price: -5` → "Price min 1"?

---

## Challenge

**Guarded Shop:** `name` + `price` + `stock` (`@Min(0)`) + `POST` 3 cases (pass/blank/negative) → neat 400s all.

---

## Mini Glossary

- **NotBlank/Min/Valid**: required/minimum/trigger

---

## Summary

Week 8 of 10: **Input Guard** (Level: Intermediate). Dirty data rejected. Next: **Actuator** — health dashboard.
