# Resilience & Caching: Spring Data Redis & Resilience4j Circuit Breaker

> **Kategori:** Spring Boot & Java | **Level:** Advanced | **Minggu 9:** Resilience & Caching: Spring Data Redis & Resilience4j Circuit Breaker
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Configure Spring Cache Abstraction backed by distributed Spring Data Redis.
- Apply caching annotations: `@Cacheable`, `@CachePut`, and `@CacheEvict`.
- Integrate Resilience4j: Retry, Circuit Breaker, and Rate Limiter.
- Author Graceful Fallback strategies maintaining business continuity during downstream partner outages.

---

## Program: Foreign Exchange Pipeline Protected by Redis Caching & Circuit Breaker

```java
package com.tryngo.banking.resilience;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ForeignExchangeService {

    // 1. Caching Terdistribusi dengan Redis (@Cacheable)
    @Cacheable(value = "exchangeRates", key = "#currencyPair")
    @CircuitBreaker(name = "fxServiceBreaker", fallbackMethod = "getFallbackExchangeRate")
    @Retry(name = "fxServiceRetry")
    public BigDecimal getExchangeRate(String currencyPair) {
        System.out.println("[FX PROVIDER CALL] Menghubungi penyedia kurs valuta asing global untuk: " + currencyPair);
        
        // Simulasi kegagalan koneksi ke Bank Sentral
        if ("USD/IDR".equals(currencyPair)) {
            throw new RuntimeException("Koneksi timeout ke FX Gateway Internasional!");
        }

        return new BigDecimal("16250.00");
    }

    // Fallback Method: Dipanggil saat Circuit Breaker terbuka atau retry habis
    public BigDecimal getFallbackExchangeRate(String currencyPair, Throwable ex) {
        System.err.println("[CIRCUIT BREAKER OPEN / FALLBACK TRIGGERED] Menggunakan kurs darurat offline! Alasan: " + ex.getMessage());
        return new BigDecimal("16000.00"); // Kurs darurat yang aman
    }

    // Pembersihan Cache saat ada pembaruan kurs manual dari admin
    @CacheEvict(value = "exchangeRates", key = "#currencyPair")
    public void invalidateRateCache(String currencyPair) {
        System.out.println("[CACHE EVICT] Cache kurs untuk " + currencyPair + " berhasil dibersihkan dari Redis.");
    }
}
```

---

## Key Concepts

In core banking ecosystems, microservices constantly integrate with external gateways (foreign exchange feeds, payment gateways, biometric verification). If an external partner degrades, downstream failures must not cascade into local service outages.

### Spring Cache & Redis
The `@Cacheable(value = "exchangeRates", key = "#currencyPair")` annotation intercepts method execution. Upon a Cache Hit, cached data from Redis returns instantaneously. Upon a Cache Miss, the method executes and commits the result to Redis configured with a Time-To-Live (TTL).

### Resilience Engineering with Resilience4j
Resilience4j is Java's premier lightweight fault-tolerance library built upon functional paradigms. Two primary mechanics:
1. **Retry Pattern**: Automatically retries failed requests with configured exponential backoff.
2. **Circuit Breaker**: Tracks invocation failure metrics. If error thresholds surpass 50%, the breaker flips to the **OPEN** state. Subsequent calls immediately execute the designated `fallbackMethod`. As downstream partners recover, the breaker enters **HALF-OPEN** to probe latency before returning to **CLOSED**.


---

---

## Beginner Friendly Explanation

Imagine a merchant needing wholesale grain prices. Rather than telephoning the central terminal a hundred times per customer (congesting phone lines), you jot the morning price on a shop whiteboard (Redis Cache). If phone lines are severed by a storm, you quote the baseline reserve price rather than turning customers away (Circuit Breaker Fallback).

## Experiments

- Configure Resilience4j `failureRateThreshold` to 50% in `application.yml` and inspect state transitions.
- Invoke the method repeatedly and monitor Micrometer metrics at `/actuator/circuitbreakers`.
- Verify cache hits by inspecting keys inside redis-cli (`KEYS exchangeRates*`).

---

## Challenge

Configure a Resilience4j `RateLimiter` restricting foreign exchange API consumption to a maximum of 10 requests per second per customer identity.

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

You have mastered Redis Caching and system resilience with Resilience4j. Next week is our Final Capstone: Multi-Tenant Banking Ledger Microservice!
