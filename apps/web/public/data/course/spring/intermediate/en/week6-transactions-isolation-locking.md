# Transaction Integrity: @Transactional, Isolation Levels & Pessimistic Locking

> **Kategori:** Spring Boot & Java | **Level:** Intermediate | **Minggu 6:** Transaction Integrity: @Transactional, Isolation Levels & Pessimistic Locking
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master ACID principles and the mechanics of `@Transactional`.
- Understand transaction isolation levels: `READ_COMMITTED`, `REPEATABLE_READ`, and `SERIALIZABLE`.
- Differentiate Pessimistic Locking (`LockModeType.PESSIMISTIC_WRITE`) from Optimistic Locking (`@Version`).
- Prevent critical race conditions (double spending & balance overdrafts) under concurrent transactions.

---

## Program: Anti-Overdraft Balance Transfer with Pessimistic Write Locking

```java
package com.tryngo.banking.service;

import com.tryngo.banking.entity.BankAccount;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class TransferService {

    private final LockedAccountRepository accountRepo;

    public TransferService(LockedAccountRepository accountRepo) {
        this.accountRepo = accountRepo;
    }

    // Transaksi Atomik dengan Tingkat Isolasi READ_COMMITTED & Rollback Otomatis
    @Transactional(
        isolation = Isolation.READ_COMMITTED,
        rollbackFor = Exception.class,
        timeout = 5 // Batas waktu transaksi 5 detik
    )
    public void transferFunds(String fromAccNum, String toAccNum, BigDecimal amount) {
        // Kunci baris database (SELECT ... FOR UPDATE) untuk mencegah race condition
        BankAccount sender = accountRepo.findByAccountNumberWithLock(fromAccNum)
            .orElseThrow(() -> new IllegalArgumentException("Rekening pengirim tidak ditemukan: " + fromAccNum));

        BankAccount recipient = accountRepo.findByAccountNumberWithLock(toAccNum)
            .orElseThrow(() -> new IllegalArgumentException("Rekening penerima tidak ditemukan: " + toAccNum));

        // Validasi Saldo (Anti-Overdraft)
        if (sender.getBalance().compareTo(amount) < 0) {
            throw new IllegalStateException("Saldo tidak mencukupi! Saldo saat ini: " + sender.getBalance());
        }

        // Mutasi Saldo
        sender.setBalance(sender.getBalance().subtract(amount));
        recipient.setBalance(recipient.getBalance().add(amount));

        // Hibernate otomatis melakukan dirty check dan update saat commit transaksi
        System.out.printf("[MUTATION OK] Saldo dipindahkan: Rp %,.2f dari %s ke %s%n", amount, fromAccNum, toAccNum);
    }
}

@Repository
interface LockedAccountRepository extends JpaRepository<BankAccount, Long> {

    // Pessimistic Write Lock: Memicu 'SELECT ... FOR UPDATE' pada PostgreSQL/MySQL
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM BankAccount a WHERE a.accountNumber = :accountNumber")
    Optional<BankAccount> findByAccountNumberWithLock(String accountNumber);
}
```

---

## Key Concepts

In financial core banking, concurrency mismanagement yields disastrous consequences: simultaneous balance debits executing within the same millisecond trigger account overdrafts and double-spending vulnerabilities.

### How @Transactional Functions
Spring employs Dynamic Proxies to wrap `@Transactional` methods. Prior to method entry, the proxy issues `BEGIN TRANSACTION`. If execution finishes normally, the proxy commits. If an unhandled exception triggers, the proxy issues a database `ROLLBACK`, reverting all staged mutations.

### Transaction Isolation Levels
Isolation regulates how modifications made by concurrent transactions interact:
- **READ_COMMITTED**: Eliminates Dirty Reads (inspecting uncommitted data from parallel threads). Represents the gold standard for high-throughput backends.
- **SERIALIZABLE**: Enforces total isolation simulating strictly sequential execution, incurring substantial lock contention penalties.

### The Role of Pessimistic Locking
Optimistic Locking (`@Version`) excels when conflicting writes are infrequent. For financial ledger rows enduring intense concurrent debit attempts, **Pessimistic Write Locking** (`SELECT ... FOR UPDATE`) is mandatory: the database engine holds an exclusive row-level lock, forcing parallel transactions to queue until the active transfer commits.


---

---

## Beginner Friendly Explanation

Imagine you and your spouse simultaneously attempting to withdraw the remaining balance of Rp 1,000,000 from a joint bank account at two separate ATMs at the exact same second. Pessimistic Locking behaves like an automated vault door: the moment you swipe, the account locks exclusively. The second ATM is forced to wait until your withdrawal completes, seeing Rp 0 and rejecting the second attempt.

## Experiments

- Simulate 50 concurrent threads attempting to withdraw Rp 100,000 from an account containing Rp 200,000.
- Compare execution results with and without `@Lock(LockModeType.PESSIMISTIC_WRITE)`.
- Set a transaction timeout of 1 second and observe the `QueryTimeoutException` during simulated lock contention.

---

## Challenge

Avert database deadlocks during bidirectional transfers (Account A transferring to B while B transfers to A) by locking accounts in ascending ID order.

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
```text
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
```text
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
```text
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
```text
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

You have mastered `@Transactional`, isolation levels, and Pessimistic Locking. Next week we enter asynchronous event-driven streaming with Apache Kafka.
