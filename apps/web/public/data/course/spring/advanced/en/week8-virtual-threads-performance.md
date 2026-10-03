# High-Scale Concurrency: Java 21 Virtual Threads (Project Loom) in Spring Boot 3

> **Kategori:** Spring Boot & Java | **Level:** Advanced | **Minggu 8:** High-Scale Concurrency: Java 21 Virtual Threads (Project Loom) in Spring Boot 3
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand the Project Loom revolution and Virtual Threads architecture in Java 21.
- Differentiate Carrier OS Platform Threads from lightweight JVM-managed Virtual Threads.
- Enable Virtual Threads in Spring Boot 3 via a single property (`spring.threads.virtual.enabled=true`).
- Apply Structured Concurrency primitives averting orphaned thread leaks.

---

## Program: Concurrent 10,000-Task Banking Settlement Engine with Virtual Threads

```java
package com.tryngo.banking.loom;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.Executors;
import java.util.stream.IntStream;

public class VirtualThreadsBenchmark {

    public static void main(String[] args) {
        int totalSettlements = 10_000;
        System.out.println("=== MEMULAI SIMULASI SETTLEMENT: " + totalSettlements + " TRANSAKSI ===");

        // Java 21: Executor dengan Virtual Threads (Project Loom)
        // Cukup tambahkan 'spring.threads.virtual.enabled=true' di application.properties Spring Boot 3.2+
        var startTime = Instant.now();

        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(1, totalSettlements + 1).forEach(i -> {
                executor.submit(() -> {
                    processInterbankSettlement(i);
                });
            });
        } // try-with-resources otomatis menunggu seluruh virtual thread selesai (Structured Concurrency)

        var duration = Duration.between(startTime, Instant.now());
        System.out.printf("=== SELESAI: %d penyelesaian antarbank berhasil dalam %d ms! ===%n",
            totalSettlements, duration.toMillis());
    }

    private static void processInterbankSettlement(int txIndex) {
        try {
            // Simulasi panggilan I/O jaringan ke Bank Indonesia / Clearing House selama 100ms
            Thread.sleep(100);
            if (txIndex % 2000 == 0) {
                System.out.printf("[SETTLEMENT CHECKPOINT] Transaksi #%d selesai pada %s%n",
                    txIndex, Thread.currentThread());
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

---

## Key Concepts

For over two decades, every Java thread (`java.lang.Thread`) mapped 1:1 to an underlying OS kernel thread. Because each platform thread reserves ~1MB of memory, traditional Java servers capped out handling a few thousand concurrent connections.

### The Virtual Threads Revolution (Project Loom)
Virtual Threads in Java 21 are lightweight abstractions managed by the JVM runtime rather than the OS kernel. Consuming mere bytes of heap space, developers can spawn **1,000,000 concurrent virtual threads** on a single workstation without exhausting memory.

### Non-blocking Unmounting on I/O
When a virtual thread encounters blocking I/O (such as `Thread.sleep()`, JPA SQL queries, or remote HTTP REST calls), the JVM unmounts the virtual thread from its underlying OS carrier thread. The carrier thread immediately services other workloads. When the I/O signals completion, the JVM mounts the virtual thread back smoothly.

### Virtual Threads in Spring Boot 3
Starting in Spring Boot 3.2+, developers no longer need complex reactive programming paradigms (`WebFlux` / `Mono` / `Flux`) solely to achieve massive concurrency. Simply setting:
`spring.threads.virtual.enabled=true`
instructs embedded Tomcat and Spring task executors to run every incoming HTTP request on an isolated virtual thread.


---

---

## Beginner Friendly Explanation

Imagine an airport with 8 tarmac runways (OS Carrier Threads). Historically, if a plane paused to load luggage for three hours, it parked directly on the runway, halting all incoming traffic. With Virtual Threads, stationary planes are lifted into a miniature holding hangar while loading, keeping the main runways operating continuously.

## Experiments

- Run the benchmark with `Executors.newFixedThreadPool(100)` and compare completion times against Virtual Threads.
- Enable `spring.threads.virtual.enabled=true` in Spring Boot and verify Tomcat logs display virtual thread names.
- Simulate 100,000 concurrent virtual threads and monitor heap consumption via `jconsole` or `VisualVM`.

---

## Challenge

Utilize Java 21 `StructuredTaskScope` to query 3 external FX foreign exchange rate APIs concurrently, resolving on the fastest successful response.

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

You have mastered Java 21 Virtual Threads and Project Loom in Spring Boot 3. Next week we cover Redis Distributed Caching and System Resilience with Resilience4j.
