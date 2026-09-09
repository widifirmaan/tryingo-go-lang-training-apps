# Caching — Fast Spring Shop Drawer

> **Kategori:** Spring Boot | **Level:** Advanced | **Minggu 11:** Caching
> **Prerequisites:** Week 10 — **Messaging**.

## Learning Objectives

- `@EnableCaching` + `@Cacheable("products")` stores results in drawer, `@CacheEvict` discards on change (source: docs.spring.io/spring-framework/integration/cache)
- Default drawer (memory) vs Redis (shared drawer)

---

## Why This Matters (Non-IT)

Product lists computed 100x/minute from DB → DB overheats. With `@Cacheable`, compute 1x, 99x from drawer (0.1ms). Without `@CacheEvict` on price edits, customers see stale prices!

---

## Program: Spring Product Drawer

```java
// Enable on main: @EnableCaching

import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
  // Compute 1x, store in "products" drawer. Called again → from drawer!
  @Cacheable("products")
  public List<Product> pricey() {
    System.out.println("COMPUTE from DB..."); // seen only 1x!
    return repo.findAll();
  }

  // Edit → discard drawer so nothing stales
  @CacheEvict(value = "products", allEntries = true)
  public Product add(Product p) { return repo.save(p); }
}
```

`GET /products` 1 → "COMPUTE" log. `GET` 2 → no log (from drawer!). `POST` → drawer discarded → `GET` computes again.

---

## Key Concepts

### `@Cacheable` / `@CacheEvict` = Store/Discard Drawer
`@Cacheable("products")` stores results per arguments. `@CacheEvict(allEntries=true)` discards all on writes.

### Memory Drawer vs Redis
Default: memory (lost on restart). Redis (`spring-boot-starter-data-redis`): drawer shared by 2 servers.

---

## Beginner Friendly Explanation

### Analogy: Cashier Drawer
- **@Cacheable = receipt photocopy**: customers ask again → hand photocopy, no recount.
- **@CacheEvict = discard old photocopies** when prices change.

### Step 0 — Prepare Device
- Same as W1 + `@EnableCaching` on main class.

### How the Computer Reads It
1. First `pricey()` → computes → stores in drawer.
2. Second call same args → drawer hit, method body skipped.

### 3 Must-Know Terms
1. **Cacheable/Evict**: store/discard
2. **TTL**: expiry (optional)

---

## Experiments

- **Green:** `GET` 2x → "COMPUTE" log 1x?
- **Yellow:** `POST` then `GET` → "COMPUTE" again (drawer discarded)?
- **Red:** Remove `@CacheEvict` → POST then GET stale old price? Reattach.

---

## Challenge

**Fast Shop:** `@Cacheable` list + `@CacheEvict` add/remove + `GET/POST/GET` proving 2 computes (not 3).

---

## Mini Glossary

- **Cacheable/Evict**: store/discard drawer

---

## Summary

Week 11 of 14: **Fast Drawer** (Level: Advanced). DB stays cool. Next: **Async & Schedule**.
