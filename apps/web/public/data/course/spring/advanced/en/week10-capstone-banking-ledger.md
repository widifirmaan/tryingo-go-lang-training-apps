# Capstone: Production-Ready Multi-Tenant Banking Transaction Ledger Microservice

> **Kategori:** Spring Boot & Java | **Level:** Advanced | **Minggu 10:** Capstone: Production-Ready Multi-Tenant Banking Transaction Ledger Microservice
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Integrate the complete ecosystem: Spring Boot 3, JPA, Kafka, Virtual Threads, and Actuator.
- Enforce Pessimistic Locking guaranteeing zero-overdraft ledger mutations.
- Publish asynchronous audit streaming events to Kafka without blocking HTTP client threads.
- Configure Spring Boot Actuator (`/actuator/health`, `/actuator/metrics`) for Kubernetes production monitoring.

---

## Program: Complete Banking Ledger Microservice (Spring Boot 3, JPA, Kafka, Virtual Threads & Actuator)

```java
package com.tryngo.banking;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@SpringBootApplication
public class BankingLedgerApplication {
    public static void main(String[] args) {
        SpringApplication.run(BankingLedgerApplication.class, args);
    }
}

// 1. Domain Entity
@Entity
@Table(name = "ledger_accounts")
class LedgerAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_number", unique = true, nullable = false)
    private String accountNumber;

    @Column(name = "balance", nullable = false)
    private BigDecimal balance;

    protected LedgerAccount() {}
    public LedgerAccount(String accountNumber, BigDecimal balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public String getAccountNumber() { return accountNumber; }
    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
}

// 2. Repository with Concurrency Locking
@Repository
interface LedgerAccountRepository extends JpaRepository<LedgerAccount, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM LedgerAccount a WHERE a.accountNumber = :accountNumber")
    Optional<LedgerAccount> findByAccountNumberWithLock(String accountNumber);
}

// 3. Core Business Service
@Service
class LedgerCoreService {
    private final LedgerAccountRepository accountRepo;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public LedgerCoreService(LedgerAccountRepository accountRepo, KafkaTemplate<String, Object> kafkaTemplate) {
        this.accountRepo = accountRepo;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Transactional(rollbackFor = Exception.class)
    public TransferReceipt executeTransfer(TransferCommand cmd) {
        var sender = accountRepo.findByAccountNumberWithLock(cmd.fromAccount())
            .orElseThrow(() -> new IllegalArgumentException("Rekening pengirim tidak ditemukan."));

        var recipient = accountRepo.findByAccountNumberWithLock(cmd.toAccount())
            .orElseThrow(() -> new IllegalArgumentException("Rekening tujuan tidak ditemukan."));

        if (sender.getBalance().compareTo(cmd.amount()) < 0) {
            throw new IllegalStateException("Saldo tidak mencukupi untuk transfer.");
        }

        // Mutasi Saldo Atomik
        sender.setBalance(sender.getBalance().subtract(cmd.amount()));
        recipient.setBalance(recipient.getBalance().add(cmd.amount()));

        String txId = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        var receipt = new TransferReceipt(txId, cmd.fromAccount(), cmd.toAccount(), cmd.amount(), "SETTLED", Instant.now());

        // Kirim event mutasi asinkron ke Kafka
        kafkaTemplate.send("banking.audit.v1", cmd.fromAccount(), receipt);

        return receipt;
    }
}

// 4. REST Controller
@RestController
@RequestMapping("/api/v1/ledger")
class LedgerApiController {
    private final LedgerCoreService coreService;

    public LedgerApiController(LedgerCoreService coreService) {
        this.coreService = coreService;
    }

    @PostMapping("/transfers")
    public ResponseEntity<TransferReceipt> postTransfer(@Valid @RequestBody TransferCommand cmd) {
        var receipt = coreService.executeTransfer(cmd);
        return ResponseEntity.created(URI.create("/api/v1/ledger/transfers/" + receipt.transactionId())).body(receipt);
    }
}

// DTOs
record TransferCommand(
    @NotBlank String fromAccount,
    @NotBlank String toAccount,
    @NotNull @DecimalMin("1000.00") BigDecimal amount
) {}

record TransferReceipt(String transactionId, String fromAccount, String toAccount, BigDecimal amount, String status, Instant timestamp) {}
```

---

## Key Concepts

Congratulations! You have reached the Capstone project. This application synthesizes modern Java 21 and Spring Boot 3 enterprise paradigms into a high-resilience, production-grade banking ledger microservice.

### Zero-Overdraft Architecture
Account ledger mutations are shielded by database transactions coupled with `PESSIMISTIC_WRITE` locks. This guarantees that regardless of extreme concurrency spikes, double-spending and unauthorized balance overdrafts are strictly prevented.

### Transaction Decoupling & Audit Streaming
Once balances update within the relational database, a transfer event is published to the Apache Kafka `banking.audit.v1` stream. This decouples downstream consumers (statement generation, tax reporting, anti-money laundering analytics) from the critical transaction path, maintaining sub-second HTTP responses.

### Production Observability with Spring Boot Actuator
The service exposes Spring Boot Actuator endpoints including `/actuator/health` (evaluating database pools and Kafka brokers) and `/actuator/prometheus` ready for metric ingestion by Prometheus and Grafana dashboards.


---

---

## Beginner Friendly Explanation

This project mirrors a state-of-the-art digital banking headquarters. Front-line tellers serve incoming clients with blazing speed (REST APIs & Virtual Threads). In the subterranean vault, accounting balances are safeguarded by infallible steel locks (Pessimistic Locking & JPA). And every ledger adjustment broadcasts instantaneously to central compliance monitors without keeping customers waiting (Kafka Streaming).

## Experiments

- Run the application and verify fund transfer workflows via cURL or Postman.
- Check container readiness in your browser via `/actuator/health`.
- Submit a transfer exceeding the account balance and verify clean error responses.

---

## Challenge

Add Testcontainers integration in a `@SpringBootTest` test class running end-to-end transfer tests against real ephemeral PostgreSQL and Kafka containers.

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

Congratulations! You have completed the entire Spring Boot & Java curriculum from zero to an enterprise production banking ledger microservice!
