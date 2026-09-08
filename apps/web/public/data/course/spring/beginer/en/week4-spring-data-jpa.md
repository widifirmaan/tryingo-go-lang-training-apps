# Spring Data JPA — SQL-Free Automatic Racks

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 4:** Spring Data JPA

## Learning Objectives

- `@Entity` + `@Id @GeneratedValue` rack blueprints (source: docs.spring.io/spring-data/jpa)
- `interface ProductRepo extends JpaRepository<Product, Long>` → `findAll()`, `save()`, `findByCategory()` automatic (zero SQL!)
- `spring.datasource.url` connects Postgres in `application.properties`

---

## Why This Matters (Non-IT)

Without JPA, hand-write `INSERT INTO products ...` + manual connections 30 lines per action. With `repo.save(p)` 1 line. `findByCategory("Veggies")` auto-becomes `SELECT ... WHERE category=?` — no SQL!

---

## Program: Shop JPA Rack

```properties
# application.properties — connect warehouse
spring.datasource.url=jdbc:postgresql://localhost:5432/shop
spring.datasource.username=postgres
spring.datasource.password=secret
spring.jpa.hibernate.ddl-auto=update
```

```java
// Product.java — blueprint
import jakarta.persistence.*;

@Entity // products table automatic!
public class Product {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private Integer price;
  // getters/setters (or Lombok @Data)
  public Long getId() { return id; }
  public String getName() { return name; }
  public void setName(String n) { name = n; }
  public Integer getPrice() { return price; }
  public void setPrice(Integer p) { price = p; }
}
```

```java
// ProductRepo.java — worker (EMPTY! Spring builds it)
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Long> {
  List<Product> findByNameContaining(String find); // automatic LIKE!
  List<Product> findByPriceGreaterThan(Integer min);
}
```

```java
// Controller uses repo
private final ProductRepo repo;
public ProductController(ProductRepo repo) { this.repo = repo; }

@GetMapping
public List<Product> all(@RequestParam(required = false) String find) {
  return find == null ? repo.findAll() : repo.findByNameContaining(find);
}
@PostMapping
public Product add(@RequestBody Product p) { return repo.save(p); }
```

---

## Key Concepts

### `@Entity` + `@Id` = Rack Blueprint
`@Entity` → table, `@Id @GeneratedValue` → automatic numbers.

### `JpaRepository` = Magic Worker
`extends JpaRepository<Product, Long>` → gains `findAll/save/findById/delete` + name-derived `findBy...`!

### `@Transactional` = All-or-Nothing Package (mandatory for money!)

Sell = decrement stock + add order. 1 fails without transactions = lost stock, missing order (MISMATCH!). 1 annotation = 2 writes 1 package:

```java
import org.springframework.transaction.annotation.Transactional;

@Transactional // fails midway? Automatic ROLLBACK of all!
public void sell(Long id, int qty) {
  Product p = repo.findById(id).orElseThrow();
  p.setStock(p.getStock() - qty);
  repo.save(p);
  orderRepo.save(new Order(p.getName(), qty)); // fails here → stock RESTORED!
}
```
- Without `@Transactional`, line 1 succeeds + line 2 fails = corrupt data. With it = all or nothing!

### `ddl-auto=update` = Auto Build (Dev)
Creates/updates tables following entities. Production uses `validate` + migrations!

---

## Beginner Friendly Explanation

### Analogy: Rack with Magic Worker
- **Entity = rack drawing**, **JpaRepository = worker** understanding `findByName` commands without SQL lessons.

### Step 0 — Prepare Device
- Postgres running + `shop` DB + `spring-boot-starter-data-jpa` + `postgresql` in `pom.xml` (via start.spring.io checking JPA + PostgreSQL).

### How the Computer Reads It
1. Start → `ddl-auto=update` → `CREATE TABLE products` when missing.
2. `repo.findByNameContaining("rice")` → `SELECT ... WHERE name LIKE %rice%`.

### 3 Must-Know Terms
1. **Entity/Repository**: blueprint/worker
2. **ddl-auto**: auto-build

---

## Experiments

- **Green:** `POST` 2 products → restart → `GET` still there? (durable!)
- **Yellow:** Add `stock` field to entity → restart → column appears?
- **Red:** `ddl-auto=create-drop` → restart loses data? Switch to `update`.

---

## Challenge

**Complete Rack:** `Product` + `Customer` entities + 2 repos + `GET/POST` both + restart durability check.

---

## Mini Glossary

- **Entity/Id/Repository**: blueprint/number/worker
- **ddl-auto**: build

---

## Summary

Week 4 of 5: **Automatic Racks** (Level: Beginner). No SQL. Next: **Best Practices**.
