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

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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
