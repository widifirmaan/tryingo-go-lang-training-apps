# Dependency Injection — Automatic Spring Warehouse

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 2:** Dependency Injection
> **Prerequisites:** Week 1 — **Spring Boot Setup**.

## Learning Objectives

- `@Service` marks the kitchen, `@Autowired`/`constructor` auto-injects — no manual `new` (source: docs.spring.io/spring-framework/reference/core/beans)
- Distinguish manual `new ProductService()` (2 different warehouses!) vs injection (1 same warehouse)

---

## Why This Matters (Non-IT)

10 controllers needing `ProductService` — manual `new` in 10 places = 10 warehouses with different data (add in 1, 9 others unaware!). With DI, Spring builds 1 (`singleton`) for all.

---

## Program: Injected Spring Warehouse

```java
// ProductService.java — kitchen (1 for all)
import org.springframework.stereotype.Service;
import java.util.*;

@Service // kitchen card! without it Spring doesn't know
public class ProductService {
  private List<String> list = new ArrayList<>(List.of("Rice", "Spinach"));
  public List<String> all() { return list; }
  public void add(String name) { list.add(name); }
}
```

```java
// ProductController.java — injected waiter
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
  private final ProductService service;

  // Constructor injection (modern way, Spring-recommended)
  public ProductController(ProductService service) {
    this.service = service;
  }

  @GetMapping
  public List<String> all() { return service.all(); }

  @PostMapping
  public String add(@RequestParam String name) {
    service.add(name);
    return "Add " + name;
  }
}
```

Test: `curl http://localhost:8080/products` → `["Rice","Spinach"]`.

---

## Key Concepts

### `@Service` = Kitchen Card
Without `@Service`, Spring never builds → `NoSuchBeanDefinition` error.

### Constructor Inject = Injection (Modern)
`public ProductController(ProductService s)` — Spring auto-fills. Field `@Autowired` is the old way.

### Singleton = 1 Warehouse
Spring default: 1 instance for all (thrifty + consistent).

---

## Beginner Friendly Explanation

### Analogy: Central Mall Kitchen
- **Service = central kitchen**, **controller = waiter**, **DI = automatic pipes** (Spring installs, not you with `new`).

### Step 0 — Prepare Device
- Same as W1: `start.spring.io` + `Spring Web`, `./mvnw spring-boot:run` on `8080`.

### How the Computer Reads It
1. Start → scans `@Service` → builds 1 `ProductService`.
2. `GET /products` → creates controller + injects the same service.

### 3 Must-Know Terms
1. **Service/Inject**: kitchen/inject
2. **Singleton/Bean**: one/Spring-bean

---

## Experiments

- **Green:** `POST /products?name=Coffee` → `GET` shows 3?
- **Yellow:** Remove `@Service` → `NoSuchBean` error? Reattach.
- **Red:** Manual `new ProductService()` in 2 controllers → add in 1, other doesn't follow? (That's why DI!)

---

## Challenge

**2-Waiter Mall:** `ProductService` + `ProductController` (`GET/POST`) + `StockController` (`GET /stock/count` using same service) → add via 1, read via 2, same?
- **Link-up (Week 1 — Spring Boot Setup):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Service/Autowired/singleton**: kitchen/inject/one

---

## Summary

Week 2 of 5: **Automatic Warehouse** (Level: Beginner). 1 data for all. Next: **REST Controller** — doors.
