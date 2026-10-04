# Relational Persistence: Spring Data JPA, Hibernate 6 & Entity Auditing

> **Kategori:** Spring Boot & Java | **Level:** Beginner | **Minggu 3:** Relational Persistence: Spring Data JPA, Hibernate 6 & Entity Auditing
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Configure relational entities using the Jakarta Persistence (JPA) specification.
- Utilize Hibernate 6 as the high-throughput ORM engine in Spring Boot 3.
- Leverage Spring Data JPA Derived Query Methods (`findByAccountNumber`).
- Author JPQL (Java Persistence Query Language) queries immune to SQL injection.

---

## Program: Account & Transaction Ledger Entities with Spring Data JPA Repositories

```java
package com.tryngo.banking.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

// 1. Entitas Rekening Bank (JPA + Hibernate 6)
@Entity
@Table(name = "bank_accounts")
@EntityListeners(AuditingEntityListener.class)
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_number", unique = true, nullable = false, length = 32)
    private String accountNumber;

    @Column(name = "holder_name", nullable = false, length = 120)
    private String holderName;

    @Column(name = "balance", nullable = false, precision = 19, scale = 4)
    private BigDecimal balance;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    // Default constructor untuk JPA
    protected BankAccount() {}

    public BankAccount(String accountNumber, String holderName, BigDecimal initialBalance) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = initialBalance;
    }

    // Getters
    public Long getId() { return id; }
    public String getAccountNumber() { return accountNumber; }
    public String getHolderName() { return holderName; }
    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
}

// 2. Spring Data JPA Repository
@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

    // Derived Query Method (Spring secara otomatis membuat SQL berdasarkan nama method)
    Optional<BankAccount> findByAccountNumber(String accountNumber);

    // Custom JPQL Query
    @Query("SELECT a FROM BankAccount a WHERE a.balance >= :minBalance ORDER BY a.balance DESC")
    List<BankAccount> findHighNetWorthAccounts(@Param("minBalance") BigDecimal minBalance);
}
```

---

## Key Concepts

Raw JDBC data access requires tedious boilerplate converting SQL ResultSets into Java objects. Spring Data JPA revolutionizes persistence engineering.

### JPA Specification vs Hibernate Engine
Jakarta Persistence (JPA) establishes the standard Java mapping contract. **Hibernate 6** provides the concrete ORM runtime engine shipped within Spring Boot, translating annotations like `@Entity`, `@Table`, and `@Column` into optimized SQL statements.

### Derived Query Method Generation
By declaring `interface BankAccountRepository extends JpaRepository<BankAccount, Long>`, Spring Data JPA dynamically synthesizes common CRUD operations (`save`, `findById`, `delete`) at runtime. In addition, declaring `findByAccountNumber(String acc)` generates:
`SELECT * FROM bank_accounts WHERE account_number = ?`.

### Financial Precision
Monetary values must never utilize `float` or `double` due to binary floating-point imprecision. We designate `@Column(precision = 19, scale = 4) BigDecimal balance`, mapping to `NUMERIC(19, 4)` in PostgreSQL to guarantee zero rounding divergence.


---

---

## Beginner Friendly Explanation

Imagine holding a paper customer account form (the Java Object) and wishing to archive it in a steel filing vault (the SQL Database). JPA/Hibernate acts as an expert clerk who catalogs and slots the document into the correct filing drawer without you manually opening vault compartments.

## Experiments

- Configure an in-memory H2 database in `application.properties` and inspect Hibernate schema DDL output.
- Add a `findByHolderNameContainingIgnoreCase(String name)` query method and test the lookup.
- Enable `@EnableJpaAuditing` on a config class and verify automatic `createdAt` timestamp population.

---

## Challenge

Add a `@OneToMany List<TransactionRecord> transactions` relationship to `BankAccount` with `CascadeType.ALL` and `FetchType.LAZY`, authoring a repository query fetching transactions within the past 30 days.

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

You have mastered JPA, Hibernate 6, and Spring Data JPA Repositories. Next week we construct REST Controllers with Jakarta validation.
