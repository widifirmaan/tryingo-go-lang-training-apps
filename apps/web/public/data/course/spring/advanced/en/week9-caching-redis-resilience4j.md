# Resilience & Caching: Spring Data Redis & Resilience4j Circuit Breaker

> **Kategori:** Spring Boot & Java | **Level:** Advanced | **Minggu 9:** Resilience & Caching: Spring Data Redis & Resilience4j Circuit Breaker

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

## Summary

You have mastered Redis Caching and system resilience with Resilience4j. Next week is our Final Capstone: Multi-Tenant Banking Ledger Microservice!
