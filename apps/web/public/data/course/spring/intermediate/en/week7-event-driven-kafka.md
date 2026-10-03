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

You have mastered event-driven architecture with Apache Kafka. Level 2 complete! Level 3 takes us into Virtual Threads, Resilience4j, and our Capstone Project.
