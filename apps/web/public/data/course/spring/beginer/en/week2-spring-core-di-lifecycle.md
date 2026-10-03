# Spring Boot 3 Core: Inversion of Control, Bean Lifecycle & Dependency Injection

> **Kategori:** Spring Boot & Java | **Level:** Beginner | **Minggu 2:** Spring Boot 3 Core: Inversion of Control, Bean Lifecycle & Dependency Injection

## Learning Objectives

- Understand Inversion of Control (IoC) and ApplicationContext mechanics in Spring Boot 3.
- Apply Constructor Injection as the industry best practice (avoiding brittle field injection `@Autowired`).
- Recognize Spring stereotype annotations: `@Component`, `@Service`, `@Repository`, and `@Configuration`.
- Manage the Spring Bean lifecycle (`@PostConstruct`, `@PreDestroy`).

---

## Program: Ledger Service Architecture with Spring IoC Container & Bean Profiles

```java
package com.tryngo.banking;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@SpringBootApplication
public class BankingCoreApplication implements CommandLineRunner {

    private final LedgerService ledgerService;

    // Constructor Injection (Spring Best Practice - tanpa @Autowired manual)
    public BankingCoreApplication(LedgerService ledgerService) {
        this.ledgerService = ledgerService;
    }

    public static void main(String[] args) {
        SpringApplication.run(BankingCoreApplication.class, args);
    }

    @Override
    public void run(String... args) {
        System.out.println("=== SPRING BOOT 3 LEDGER SERVICE INITIALIZED ===");
        ledgerService.recordTransfer("ACC-101", "ACC-202", new BigDecimal("1250000.00"));
        System.out.println("Balance ACC-101: Rp " + ledgerService.getBalance("ACC-101"));
        System.out.println("Balance ACC-202: Rp " + ledgerService.getBalance("ACC-202"));
    }
}

// 1. Service Layer
@Service
class LedgerService {
    private final AccountRepository repository;

    public LedgerService(AccountRepository repository) {
        this.repository = repository;
    }

    public void recordTransfer(String fromAcc, String toAcc, BigDecimal amount) {
        repository.updateBalance(fromAcc, amount.negate());
        repository.updateBalance(toAcc, amount);
        System.out.printf("[LEDGER MUTATION] Transferred Rp %,.2f from %s to %s%n", amount, fromAcc, toAcc);
    }

    public BigDecimal getBalance(String accountId) {
        return repository.getBalance(accountId);
    }
}

// 2. Data Access Layer
interface AccountRepository {
    void updateBalance(String accountId, BigDecimal delta);
    BigDecimal getBalance(String accountId);
}

@Component
class InMemoryAccountRepository implements AccountRepository {
    private final Map<String, BigDecimal> accounts = new ConcurrentHashMap<>();

    public InMemoryAccountRepository() {
        accounts.put("ACC-101", new BigDecimal("10000000.00"));
        accounts.put("ACC-202", new BigDecimal("5000000.00"));
    }

    @Override
    public void updateBalance(String accountId, BigDecimal delta) {
        accounts.compute(accountId, (k, v) -> (v == null ? BigDecimal.ZERO : v).add(delta));
    }

    @Override
    public BigDecimal getBalance(String accountId) {
        return accounts.getOrDefault(accountId, BigDecimal.ZERO);
    }
}
```

---

## Key Concepts

Spring Boot 3 stands as the enterprise industry benchmark for mission-critical Java systems. At its heart lies the **Inversion of Control (IoC)** container managing application components (Beans).

### Inversion of Control & Dependency Injection
Rather than letting individual classes manually instantiate their collaborators (`new InMemoryAccountRepository()`), the Spring IoC container creates, wires, and injects dependency instances where requested.

### The Superiority of Constructor Injection
While legacy code heavily utilized field injection (`@Autowired private AccountRepository repo;`), modern Spring strictly advocates **Constructor Injection**:
1. It guarantees non-null immutability across dependencies.
2. It streamlines isolated unit testing by permitting simple constructor instantiation with mock objects without bootstrapping Spring.
3. It exposes circular dependencies eagerly during application startup.

### Stereotype Annotations
Spring offers semantic stereotypes:
- `@Component`: General-purpose Spring-managed bean.
- `@Service`: Encapsulates core business transactions and domain logic.
- `@Repository`: Encapsulates data persistence, translating SQL exceptions into Spring's consistent `DataAccessException` hierarchy.


---

---

## Beginner Friendly Explanation

Think of hiring a master building contractor (the Spring IoC Container). You do not personally visit hardware suppliers to buy cement, bricks, and nails (avoiding `new`). You inform the foreman: "I need a kitchen equipped with plumbing", and the contractor assembles and connects the pipes automatically.

## Experiments

- Add a `@PostConstruct` lifecycle method in `LedgerService` and inspect console logs during bootstrapping.
- Create a second `AccountRepository` bean and observe how `@Primary` or `@Qualifier` resolves wiring ambiguity.
- Execute the app with distinct profile configurations using `spring.profiles.active=dev`.

---

## Challenge

Build a `@Configuration` class declaring an `@Bean` method that instantiates an `AccountAuditFilter` conditionally toggled via `@ConditionalOnProperty`.

---

## Summary

You have mastered Spring IoC, Constructor Injection, and Bean Lifecycles. Next week we connect relational databases with Spring Data JPA.
