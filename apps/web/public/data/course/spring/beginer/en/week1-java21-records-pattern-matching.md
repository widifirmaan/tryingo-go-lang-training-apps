# Modern Java 21 LTS: Records, Sealed Interfaces & Pattern Matching

> **Kategori:** Spring Boot & Java | **Level:** Beginner | **Minggu 1:** Modern Java 21 LTS: Records, Sealed Interfaces & Pattern Matching
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master modern Java 21 LTS features: `record`, `sealed interface`, and enhanced switch pattern matching.
- Understand the advantages of immutability in financial transaction domain modeling.
- Apply exhaustive pattern matching enforced strictly by the javac compiler.
- Utilize `BigDecimal` for monetary calculations free from floating-point rounding errors.

---

## Program: Financial Ledger Domain Models with Java 21 Records

```java
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public class BankingDomainApp {
    public static void main(String[] args) {
        var transfer = new TransferEvent(
            UUID.randomUUID().toString(),
            "ACC-IDR-10029",
            "ACC-IDR-88301",
            new BigDecimal("2500000.00"),
            "Payment for Invoice #INV-2026-09",
            Instant.now()
        );

        System.out.println("[TRANSACTION CREATED] ID: " + transfer.eventId());
        System.out.println("Details: " + transfer);

        String auditLog = evaluateTransaction(transfer);
        System.out.println("[AUDIT EVALUATION] " + auditLog);
    }

    // Java 21: Pattern Matching for switch with Record Deconstruction
    public static String evaluateTransaction(LedgerEvent event) {
        return switch (event) {
            case TransferEvent t when t.amount().compareTo(new BigDecimal("100000000.00")) > 0 ->
                "FLAGGED: High-value transaction requires AML Compliance review! (Amount: Rp " + t.amount() + ")";
            case TransferEvent(var id, var from, var to, var amount, var desc, var ts) ->
                "CLEARED: Standard transfer of Rp " + amount + " from " + from + " to " + to;
            case DepositEvent d ->
                "DEPOSIT: Credited Rp " + d.amount() + " to account " + d.targetAccount();
            case WithdrawalEvent w ->
                "WITHDRAWAL: Debited Rp " + w.amount() + " from account " + w.sourceAccount();
        };
    }
}

// Sealed Hierarchy: Hanya subtipe ini yang boleh mengimplementasikan LedgerEvent
sealed interface LedgerEvent permits TransferEvent, DepositEvent, WithdrawalEvent {}

// Java Records: Immutable data carrier dengan equals(), hashCode(), dan toString() otomatis
record TransferEvent(
    String eventId,
    String sourceAccount,
    String targetAccount,
    BigDecimal amount,
    String description,
    Instant timestamp
) implements LedgerEvent {}

record DepositEvent(String eventId, String targetAccount, BigDecimal amount, Instant timestamp) implements LedgerEvent {}
record WithdrawalEvent(String eventId, String sourceAccount, BigDecimal amount, Instant timestamp) implements LedgerEvent {}
```

---

## Key Concepts

Java 21 LTS introduces monumental language evolutions, dismantling legacy Java's reputation for verbose boilerplate (getters, setters, verbose constructors).

### Record Classes
A `record` in Java 21 is a compact, immutable data carrier. The compiler automatically synthesizes canonical constructors, accessor methods (`transfer.amount()`), and robust `equals()`, `hashCode()`, and `toString()` implementations.

### Sealed Interfaces
Through `sealed` interfaces paired with the `permits` clause, domain architects strictly regulate which classes or records can extend or implement an interface. In financial domains, this guarantees that only authorized event types (`TransferEvent`, `DepositEvent`, `WithdrawalEvent`) exist within system bounds.

### Pattern Matching with Record Deconstruction
Java 21 switch expressions allow direct record deconstruction (`case TransferEvent(var id, var from, var to, ...)`). The compiler enforces exhaustiveness over sealed hierarchies, guaranteeing compiler errors if an unhandled event variant is introduced in downstream updates.


---

---

## Beginner Friendly Explanation

Think of an official bank checkbook. Each torn leaf carries a permanent printed serial number, payee, and amount stamped in indelible ink (a Record - immutable). The checkbook contains only three official form types: Transfer Checks, Deposit Slips, and Withdrawal Slips (Sealed Interfaces - arbitrary unofficial forms are prohibited).

## Experiments

- Increase the transfer amount to Rp 150,000,000 and verify the `when t.amount() > 100M` guard condition triggers.
- Introduce a new record `FeeEvent` and observe the compiler enforcing exhaustiveness in the switch statement.
- Compare two distinct record instances containing identical field data using `.equals()`.

---

## Challenge

Build a `LedgerResult processBatch(List<LedgerEvent> events)` method validating each event functionally with the Java Stream API and aggregating total funds transferred.

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

You have mastered modern Java 21 features: Records, Sealed Interfaces, and Pattern Matching. Next week we enter Spring Boot 3 Core and Inversion of Control.
