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

You have mastered Redis Caching and system resilience with Resilience4j. Next week is our Final Capstone: Multi-Tenant Banking Ledger Microservice!
