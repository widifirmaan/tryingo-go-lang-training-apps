# Transaction Integrity: @Transactional, Isolation Levels & Pessimistic Locking

> **Kategori:** Spring Boot & Java | **Level:** Intermediate | **Minggu 6:** Transaction Integrity: @Transactional, Isolation Levels & Pessimistic Locking

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

## Summary

You have mastered `@Transactional`, isolation levels, and Pessimistic Locking. Next week we enter asynchronous event-driven streaming with Apache Kafka.
