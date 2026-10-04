# Event-Driven Architecture: Spring for Apache Kafka & Audit Streaming

> **Kategori:** Spring Boot & Java | **Level:** Intermediate | **Minggu 7:** Event-Driven Architecture: Spring for Apache Kafka & Audit Streaming
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand core Apache Kafka principles: Topics, Partitions, Consumer Groups, and Offsets.
- Use `KafkaTemplate` to publish domain events asynchronously without blocking HTTP requests.
- Apply partition keys ensuring per-customer event ordering guarantees.
- Consume streaming events using `@KafkaListener` paired with Dead Letter Topic (DLT) retry policies.

---

## Program: Mutation Event Publishing & Fraud Detection Consumer with Kafka

```java
package com.tryngo.banking.kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;

@Configuration
class KafkaTopicConfig {
    @Bean
    public NewTopic transactionsTopic() {
        return TopicBuilder.name("banking.transactions.v1")
            .partitions(3)
            .replicas(1)
            .build();
    }
}

// 1. Produsen Event: Menerbitkan event mutasi ke Kafka
@Service
public class TransactionEventProducer {

    private final KafkaTemplate<String, TransactionAuditMessage> kafkaTemplate;

    public TransactionEventProducer(KafkaTemplate<String, TransactionAuditMessage> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishTransactionEvent(String txId, String fromAcc, String toAcc, BigDecimal amount) {
        var message = new TransactionAuditMessage(txId, fromAcc, toAcc, amount, Instant.now());
        
        // Gunakan fromAcc sebagai Kafka Partition Key agar mutasi akun yang sama selalu masuk ke partisi yang sama
        kafkaTemplate.send("banking.transactions.v1", fromAcc, message)
            .whenComplete((result, ex) -> {
                if (ex == null) {
                    System.out.printf("[KAFKA SENT] Tx %s published to Partition %d with Offset %d%n",
                        txId, result.getRecordMetadata().partition(), result.getRecordMetadata().offset());
                } else {
                    System.err.println("[KAFKA ERROR] Failed to publish audit event: " + ex.getMessage());
                }
            });
    }
}

// 2. Konsumen Event: Deteksi Fraud & Anti-Pencucian Uang (AML)
@Service
class FraudDetectionConsumer {

    @KafkaListener(topics = "banking.transactions.v1", groupId = "fraud-detection-group")
    public void evaluateFraud(TransactionAuditMessage event) {
        System.out.println("[FRAUD CONSUMER] Analyzing transaction: " + event.transactionId());
        
        if (event.amount().compareTo(new BigDecimal("50000000.00")) >= 0) {
            System.err.printf("[FRAUD ALERT] High-risk transaction detected! Tx: %s | Amount: Rp %,.2f%n",
                event.transactionId(), event.amount());
        } else {
            System.out.println("[FRAUD CLEARED] Transaction passed safety heuristics.");
        }
    }
}

public record TransactionAuditMessage(
    String transactionId,
    String fromAccount,
    String toAccount,
    BigDecimal amount,
    Instant timestamp
) {}
```

---

## Key Concepts

In modern financial topologies, transactional funds transfers must not block awaiting tax reporting, external auditing, and machine-learning fraud scoring systems. Downstream systems communicate asynchronously through **Apache Kafka**.

### Why Apache Kafka?
Kafka operates as a distributed immutable commit log processing millions of events per second. Unlike traditional brokers (RabbitMQ), Kafka retains messages durably on disk, empowering consumer services to replay historical logs during forensic auditing.

### Partition Keys & Strict Ordering
A Kafka topic partitions incoming streams across multiple physical shards. Kafka guarantees strict chronological message ordering exclusively within a single partition. Designating the account number (`fromAcc`) as the partition key ensures all mutations for that account funnel into the same partition.

### Consumer Groups & Dynamic Scaling
Designating `groupId = "fraud-detection-group"` orchestrates multiple consumer instances to divide partition consumption dynamically. If a worker pod crashes, Kafka initiates a seamless partition rebalance, averting message loss.


---

---

## Beginner Friendly Explanation

Think of a central postal sorting terminal with partitioned conveyor lanes. Mail destined for North Station always channels to Lane 1, while South Station mail funnels to Lane 2 (Partition Keys). Fleet drivers (Consumer Groups) unload mail concurrently without interfering with parallel routes.

## Experiments

- Launch local Kafka via Docker Compose and transmit 10 events with varying keys.
- Inspect the console output observing events distributing across partitions 0, 1, and 2.
- Configure a Dead Letter Topic (DLT) capturing malformed payloads rejected by the consumer.

---

## Challenge

Build a `ConcurrentKafkaListenerContainerFactory` configured with a `DefaultErrorHandler` retrying failed messages 3 times at 2-second intervals before routing to a `.DLT` topic.

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

You have mastered event-driven architecture with Apache Kafka. Level 2 complete! Level 3 takes us into Virtual Threads, Resilience4j, and our Capstone Project.
