"""
Spring Boot Track Curriculum Generator (10 Weeks, 3 Levels)
Product: High-Resilience Enterprise Multi-Tenant Banking Transaction Ledger (Spring Boot 3 / Java 21)
"""

def get_track():
    return {
        'slug': 'spring',
        'track_name': 'Spring Boot & Java',
        'levels': [
            {
                'levelId': 'beginer',
                'nameId': 'Pemula (Java 21 LTS & Spring Core)',
                'nameEn': 'Beginner (Java 21 LTS & Spring Core)',
                'descId': 'Modern Java 21 LTS (Records, Pattern Matching, Virtual Threads), Spring Core IoC, Data JPA, dan REST API validation.',
                'descEn': 'Modern Java 21 LTS (Records, Pattern Matching, Virtual Threads), Spring Core IoC, Data JPA, and REST API validation.',
            },
            {
                'levelId': 'intermediate',
                'nameId': 'Menengah (Security, Transactions & Apache Kafka)',
                'nameEn': 'Intermediate (Security, Transactions & Apache Kafka)',
                'descId': 'Spring Security 6 dengan JWT, transaksi database ACID berlocking pesimistik, dan event-driven streaming dengan Kafka.',
                'descEn': 'Spring Security 6 with JWT, pessimistic database transaction locking, and event-driven streaming with Apache Kafka.',
            },
            {
                'levelId': 'advanced',
                'nameId': 'Lanjutan (Resilience, Virtual Threads & Microservice Capstone)',
                'nameEn': 'Advanced (Resilience, Virtual Threads & Microservice Capstone)',
                'descId': 'Project Loom virtual threads, Resilience4j circuit breakers, Redis caching, dan microservice ledger perbankan production.',
                'descEn': 'Project Loom virtual threads, Resilience4j circuit breakers, Redis caching, and production banking ledger microservice.',
            },
        ],
        'modules': [
            # Week 1
            {
                'week': 1,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'java21-records-pattern-matching',
                'titleId': 'Modern Java 21 LTS: Records, Sealed Interfaces & Pattern Matching',
                'titleEn': 'Modern Java 21 LTS: Records, Sealed Interfaces & Pattern Matching',
                'programId': 'Domain Model Ledger Transaksi Finansial dengan Java 21 Records',
                'programEn': 'Financial Ledger Domain Models with Java 21 Records',
                'language': 'java',
                'code': '''import java.math.BigDecimal;
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
''',
                'objectivesId': [
                    'Menguasai fitur Java 21 LTS modern: `record`, `sealed interface`, dan enhanced switch pattern matching.',
                    'Memahami manfaat immutability dalam pemodelan data finansial perbankan.',
                    'Menerapkan exhaustive pattern matching yang divalidasi oleh kompilator javac.',
                    'Menggunakan `BigDecimal` untuk perhitungan moneter bebas dari floating-point precision error.',
                ],
                'objectivesEn': [
                    'Master modern Java 21 LTS features: `record`, `sealed interface`, and enhanced switch pattern matching.',
                    'Understand the advantages of immutability in financial transaction domain modeling.',
                    'Apply exhaustive pattern matching enforced strictly by the javac compiler.',
                    'Utilize `BigDecimal` for monetary calculations free from floating-point rounding errors.',
                ],
                'explanationId': '''Java 21 LTS membawa transformasi besar yang mengeliminasi reputasi Java lama yang penuh boilerplate kode (getter, setter, konstruktor bertele-tele).

### Record Classes
`record` di Java 21 adalah kelas khusus pembawa data yang bersifat final dan immutable. Kompilator secara otomatis menghasilkan konstruktor kanonikal, method getter (`transfer.amount()`), serta implementasi `equals()`, `hashCode()`, dan `toString()` yang konsisten.

### Sealed Interfaces
Dengan kata kunci `sealed` dan klausul `permits`, kita dapat membatasi secara ketat kelas atau record mana saja yang berhak mengimplementasikan sebuah interface. Hal ini sangat krusial dalam sistem domain finansial: hanya event yang secara eksplisit diizinkan (`TransferEvent`, `DepositEvent`, `WithdrawalEvent`) yang dapat ada dalam sistem.

### Pattern Matching dengan Switch Expression
Switch expression di Java 21 mendukung dekonstruksi record secara langsung (`case TransferEvent(var id, var from, var to, ...)`). Kompilator memastikan seluruh kemungkinan variasi dari `sealed interface` telah ditangani (exhaustive check), sehingga jika kita menambahkan event baru di masa depan, kompilator akan langsung mengingatkan kita jika ada switch yang belum menangani event tersebut.
''',
                'explanationEn': '''Java 21 LTS introduces monumental language evolutions, dismantling legacy Java's reputation for verbose boilerplate (getters, setters, verbose constructors).

### Record Classes
A `record` in Java 21 is a compact, immutable data carrier. The compiler automatically synthesizes canonical constructors, accessor methods (`transfer.amount()`), and robust `equals()`, `hashCode()`, and `toString()` implementations.

### Sealed Interfaces
Through `sealed` interfaces paired with the `permits` clause, domain architects strictly regulate which classes or records can extend or implement an interface. In financial domains, this guarantees that only authorized event types (`TransferEvent`, `DepositEvent`, `WithdrawalEvent`) exist within system bounds.

### Pattern Matching with Record Deconstruction
Java 21 switch expressions allow direct record deconstruction (`case TransferEvent(var id, var from, var to, ...)`). The compiler enforces exhaustiveness over sealed hierarchies, guaranteeing compiler errors if an unhandled event variant is introduced in downstream updates.
''',
                'beginnerId': '''Bayangkan buku cek bank resmi. Setiap lembar cek yang dirobek memiliki nomor unik, penerima, dan nominal yang dicap dengan tinta permanen (Record - tidak bisa diubah-ubah). Buku cek itu hanya memiliki 3 jenis slip resmi: Cek Transfer, Slip Setoran, dan Slip Penarikan (Sealed Interface - tidak boleh ada slip palsu ciptaan sendiri).''',
                'beginnerEn': '''Think of an official bank checkbook. Each torn leaf carries a permanent printed serial number, payee, and amount stamped in indelible ink (a Record - immutable). The checkbook contains only three official form types: Transfer Checks, Deposit Slips, and Withdrawal Slips (Sealed Interfaces - arbitrary unofficial forms are prohibited).''',
                'experimentsId': [
                    'Ubah nominal transfer menjadi Rp 150.000.000 dan amati bagaimana kondisi guard `when t.amount() > 100jt` terpicu.',
                    'Tambahkan record baru `FeeEvent` dan perhatikan bagaimana kompilator Java meminta Anda menangani event tersebut di switch.',
                    'Bandingkan dua record terpisah dengan nilai properti yang sama menggunakan `.equals()`.',
                ],
                'experimentsEn': [
                    'Increase the transfer amount to Rp 150,000,000 and verify the `when t.amount() > 100M` guard condition triggers.',
                    'Introduce a new record `FeeEvent` and observe the compiler enforcing exhaustiveness in the switch statement.',
                    'Compare two distinct record instances containing identical field data using `.equals()`.',
                ],
                'challengeId': 'Buat method `LedgerResult processBatch(List<LedgerEvent> events)` yang memvalidasi setiap event secara fungsional menggunakan Java Stream API dan menghitung total dana yang berpindah tangan.',
                'challengeEn': 'Build a `LedgerResult processBatch(List<LedgerEvent> events)` method validating each event functionally with the Java Stream API and aggregating total funds transferred.',
                'summaryId': 'Kamu telah menguasai fitur Java 21 modern: Records, Sealed Interfaces, dan Pattern Matching. Minggu depan kita masuk ke Spring Boot 3 Core dan Inversion of Control.',
                'summaryEn': 'You have mastered modern Java 21 features: Records, Sealed Interfaces, and Pattern Matching. Next week we enter Spring Boot 3 Core and Inversion of Control.',
            },

            # Week 2
            {
                'week': 2,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'spring-core-di-lifecycle',
                'titleId': 'Spring Boot 3 Core: Inversion of Control, Bean Lifecycle & Dependency Injection',
                'titleEn': 'Spring Boot 3 Core: Inversion of Control, Bean Lifecycle & Dependency Injection',
                'programId': 'Arsitektur Ledger Service dengan Spring IoC Container & Bean Profiles',
                'programEn': 'Ledger Service Architecture with Spring IoC Container & Bean Profiles',
                'language': 'java',
                'code': '''package com.tryngo.banking;

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
''',
                'objectivesId': [
                    'Memahami konsep Inversion of Control (IoC) dan ApplicationContext di Spring Boot 3.',
                    'Menggunakan Constructor Injection sebagai standar emas Dependency Injection (menghindari field injection `@Autowired`).',
                    'Mengenal anotasi stereotipe Spring: `@Component`, `@Service`, `@Repository`, dan `@Configuration`.',
                    'Mengelola siklus hidup Spring Beans (`@PostConstruct`, `@PreDestroy`).',
                ],
                'objectivesEn': [
                    'Understand Inversion of Control (IoC) and ApplicationContext mechanics in Spring Boot 3.',
                    'Apply Constructor Injection as the industry best practice (avoiding brittle field injection `@Autowired`).',
                    'Recognize Spring stereotype annotations: `@Component`, `@Service`, `@Repository`, and `@Configuration`.',
                    'Manage the Spring Bean lifecycle (`@PostConstruct`, `@PreDestroy`).',
                ],
                'explanationId': '''Spring Boot 3 adalah standar industri de-facto untuk membangun aplikasi enterprise Java. Inti dari Spring Framework adalah kontainer **Inversion of Control (IoC)** yang mengelola siklus hidup komponen aplikasi (Beans).

### Inversion of Control dan Dependency Injection
Daripada membiarkan kelas membuat sendiri objek yang dibutuhkannya (`new InMemoryAccountRepository()`), Spring IoC container yang menciptakan, mengonfigurasi, dan menyuntikkan (inject) instance dependensi ke dalam kelas yang membutuhkannya.

### Mengapa Constructor Injection?
Di masa lalu, banyak developer menggunakan field injection (`@Autowired private AccountRepository repo;`). Spring modern merekomendasikan **Constructor Injection**. Keuntungannya:
1. Menjamin dependensi tidak pernah bernilai `null` (imutable).
2. Memudahkan pengujian unit (unit testing) karena kelas dapat diinstansiasi secara murni dengan mock objek tanpa perlu menyalakan container Spring.
3. Mendeteksi circular dependency saat waktu kompilasi/startup aplikasi.

### Stereotype Annotations
Spring menyediakan anotasi semantik:
- `@Component`: Induk dari semua bean yang dikelola Spring.
- `@Service`: Menandai kelas yang memuat logika bisnis domain perbankan.
- `@Repository`: Menandai kelas akses data (otomatis mengonversi pengecualian database SQL menjadi unchecked `DataAccessException`).
''',
                'explanationEn': '''Spring Boot 3 stands as the enterprise industry benchmark for mission-critical Java systems. At its heart lies the **Inversion of Control (IoC)** container managing application components (Beans).

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
''',
                'beginnerId': '''Bayangkan Anda menyewa jasa kontraktor bangunan (Spring IoC Container). Anda tidak perlu pergi ke toko bangunan sendiri untuk membeli semen, batu bata, dan paku (menghindari `new`). Anda cukup mengatakan ke mandor: "Saya butuh ruangan dengan instalasi pipa air", dan kontraktor akan menyiapkan pipa dan tukang ledeng secara otomatis untuk Anda.''',
                'beginnerEn': '''Think of hiring a master building contractor (the Spring IoC Container). You do not personally visit hardware suppliers to buy cement, bricks, and nails (avoiding `new`). You inform the foreman: "I need a kitchen equipped with plumbing", and the contractor assembles and connects the pipes automatically.''',
                'experimentsId': [
                    'Tambahkan method dengan anotasi `@PostConstruct` di `LedgerService` dan amati log saat aplikasi booting.',
                    'Coba buat bean kedua yang mengimplementasikan `AccountRepository` dan amati bagaimana `@Primary` atau `@Qualifier` menyelesaikan ambiguitas.',
                    'Jalankan aplikasi dengan profil berbeda menggunakan properti `spring.profiles.active=dev`.',
                ],
                'experimentsEn': [
                    'Add a `@PostConstruct` lifecycle method in `LedgerService` and inspect console logs during bootstrapping.',
                    'Create a second `AccountRepository` bean and observe how `@Primary` or `@Qualifier` resolves wiring ambiguity.',
                    'Execute the app with distinct profile configurations using `spring.profiles.active=dev`.',
                ],
                'challengeId': 'Buat `@Configuration` class dengan method `@Bean` yang membuat instance `AccountAuditFilter` yang diaktifkan secara kondisional menggunakan `@ConditionalOnProperty`.',
                'challengeEn': 'Build a `@Configuration` class declaring an `@Bean` method that instantiates an `AccountAuditFilter` conditionally toggled via `@ConditionalOnProperty`.',
                'summaryId': 'Kamu telah menguasai Spring IoC, Constructor Injection, dan Bean Lifecycles. Minggu depan kita menghubungkan database relasional dengan Spring Data JPA.',
                'summaryEn': 'You have mastered Spring IoC, Constructor Injection, and Bean Lifecycles. Next week we connect relational databases with Spring Data JPA.',
            },

            # Week 3
            {
                'week': 3,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'spring-data-jpa-hibernate',
                'titleId': 'Persistensi Relasional: Spring Data JPA, Hibernate 6 & Entity Auditing',
                'titleEn': 'Relational Persistence: Spring Data JPA, Hibernate 6 & Entity Auditing',
                'programId': 'Entitas Rekening & Ledger Transaksi dengan Repositori Spring Data JPA',
                'programEn': 'Account & Transaction Ledger Entities with Spring Data JPA Repositories',
                'language': 'java',
                'code': '''package com.tryngo.banking.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

// 1. Entitas Rekening Bank (JPA + Hibernate 6)
@Entity
@Table(name = "bank_accounts")
@EntityListeners(AuditingEntityListener.class)
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_number", unique = true, nullable = false, length = 32)
    private String accountNumber;

    @Column(name = "holder_name", nullable = false, length = 120)
    private String holderName;

    @Column(name = "balance", nullable = false, precision = 19, scale = 4)
    private BigDecimal balance;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    // Default constructor untuk JPA
    protected BankAccount() {}

    public BankAccount(String accountNumber, String holderName, BigDecimal initialBalance) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = initialBalance;
    }

    // Getters
    public Long getId() { return id; }
    public String getAccountNumber() { return accountNumber; }
    public String getHolderName() { return holderName; }
    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
}

// 2. Spring Data JPA Repository
@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

    // Derived Query Method (Spring secara otomatis membuat SQL berdasarkan nama method)
    Optional<BankAccount> findByAccountNumber(String accountNumber);

    // Custom JPQL Query
    @Query("SELECT a FROM BankAccount a WHERE a.balance >= :minBalance ORDER BY a.balance DESC")
    List<BankAccount> findHighNetWorthAccounts(@Param("minBalance") BigDecimal minBalance);
}
''',
                'objectivesId': [
                    'Mengonfigurasi entitas relasional menggunakan spesifikasi Jakarta Persistence (JPA).',
                    'Menggunakan Hibernate 6 sebagai engine ORM berkinerja tinggi di Spring Boot 3.',
                    'Memanfaatkan Spring Data JPA Derived Query Methods (`findByAccountNumber`).',
                    'Menulis kueri JPQL (Java Persistence Query Language) yang type-safe dan aman dari SQL Injection.',
                ],
                'objectivesEn': [
                    'Configure relational entities using the Jakarta Persistence (JPA) specification.',
                    'Utilize Hibernate 6 as the high-throughput ORM engine in Spring Boot 3.',
                    'Leverage Spring Data JPA Derived Query Methods (`findByAccountNumber`).',
                    'Author JPQL (Java Persistence Query Language) queries immune to SQL injection.',
                ],
                'explanationId': '''Mengakses database dengan JDBC mentah memerlukan penulisan puluhan baris kode boilerplate untuk mapping ResultSet ke objek Java. Spring Data JPA menyederhanakan akses database secara dramatis.

### JPA Specification vs Hibernate Implementation
Jakarta Persistence (JPA) adalah antarmuka standar Java untuk memetakan objek ke tabel relasional. **Hibernate 6** adalah implementasi konkrit (ORM engine) bawaan di Spring Boot. Hibernate menerjemahkan anotasi seperti `@Entity`, `@Table`, dan `@Column` menjadi skema database SQL secara otomatis.

### Kekuatan Derived Query Methods
Dengan mendefinisikan interface `BankAccountRepository extends JpaRepository<BankAccount, Long>`, Spring Data JPA secara ajaib mengimplementasikan method CRUD dasar (`save`, `findById`, `delete`, `findAll`) saat aplikasi startup. Lebih dari itu, method bernama `findByAccountNumber(String acc)` secara otomatis diterjemahkan oleh Spring menjadi kueri SQL:
`SELECT * FROM bank_accounts WHERE account_number = ?`.

### Keamanan Moneter: Precision dan Scale
Dalam sistem perbankan, nilai moneter tidak boleh disimpan dengan tipe data `float` atau `double`. Kita menggunakan `@Column(precision = 19, scale = 4) BigDecimal balance` yang dipetakan ke tipe data `NUMERIC(19, 4)` di PostgreSQL/MySQL untuk menjamin akurasi desimal hingga 4 angka di belakang koma.
''',
                'explanationEn': '''Raw JDBC data access requires tedious boilerplate converting SQL ResultSets into Java objects. Spring Data JPA revolutionizes persistence engineering.

### JPA Specification vs Hibernate Engine
Jakarta Persistence (JPA) establishes the standard Java mapping contract. **Hibernate 6** provides the concrete ORM runtime engine shipped within Spring Boot, translating annotations like `@Entity`, `@Table`, and `@Column` into optimized SQL statements.

### Derived Query Method Generation
By declaring `interface BankAccountRepository extends JpaRepository<BankAccount, Long>`, Spring Data JPA dynamically synthesizes common CRUD operations (`save`, `findById`, `delete`) at runtime. In addition, declaring `findByAccountNumber(String acc)` generates:
`SELECT * FROM bank_accounts WHERE account_number = ?`.

### Financial Precision
Monetary values must never utilize `float` or `double` due to binary floating-point imprecision. We designate `@Column(precision = 19, scale = 4) BigDecimal balance`, mapping to `NUMERIC(19, 4)` in PostgreSQL to guarantee zero rounding divergence.
''',
                'beginnerId': '''Bayangkan Anda punya formulir pendaftaran nasabah fisik (Objek Java) dan ingin menyimpannya ke lemari arsip baja (Database SQL). JPA/Hibernate adalah petugas kearsipan cerdas yang langsung memfotokopi dan memasukkan formulir Anda ke map arsip yang tepat tanpa Anda perlu repot membuka laci lemari besi sendiri.''',
                'beginnerEn': '''Imagine holding a paper customer account form (the Java Object) and wishing to archive it in a steel filing vault (the SQL Database). JPA/Hibernate acts as an expert clerk who catalogs and slots the document into the correct filing drawer without you manually opening vault compartments.''',
                'experimentsId': [
                    'Ubah konfigurasi database ke H2 in-memory di `application.properties` dan amati skema tabel yang digenerate Hibernate.',
                    'Tambahkan kueri method `findByHolderNameContainingIgnoreCase(String name)` dan lakukan pengujian.',
                    'Aktifkan `@EnableJpaAuditing` pada kelas konfigurasi dan amati nilai `createdAt` yang otomatis terisi.',
                ],
                'experimentsEn': [
                    'Configure an in-memory H2 database in `application.properties` and inspect Hibernate schema DDL output.',
                    'Add a `findByHolderNameContainingIgnoreCase(String name)` query method and test the lookup.',
                    'Enable `@EnableJpaAuditing` on a config class and verify automatic `createdAt` timestamp population.',
                ],
                'challengeId': 'Tambahkan entitas relasi `@OneToMany List<TransactionRecord> transactions` pada `BankAccount` dengan opsi `CascadeType.ALL` dan `FetchType.LAZY`, lalu buat query repository untuk mengambil mutasi 30 hari terakhir.',
                'challengeEn': 'Add a `@OneToMany List<TransactionRecord> transactions` relationship to `BankAccount` with `CascadeType.ALL` and `FetchType.LAZY`, authoring a repository query fetching transactions within the past 30 days.',
                'summaryId': 'Kamu telah menguasai JPA, Hibernate 6, dan Spring Data JPA Repositories. Minggu depan kita membangun REST Controllers dengan validasi Jakarta.',
                'summaryEn': 'You have mastered JPA, Hibernate 6, and Spring Data JPA Repositories. Next week we construct REST Controllers with Jakarta validation.',
            },

            # Week 4
            {
                'week': 4,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'rest-controllers-validation',
                'titleId': 'RESTful Web APIs: Spring MVC, Jakarta Validation & RFC 7807 ProblemDetail',
                'titleEn': 'RESTful Web APIs: Spring MVC, Jakarta Validation & RFC 7807 ProblemDetail',
                'programId': 'REST API Transfer Dana dengan Validasi Payload & Global Exception Handler',
                'programEn': 'Fund Transfer REST API with Payload Validation & Global Exception Handler',
                'language': 'java',
                'code': '''package com.tryngo.banking.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/transfers")
public class TransferController {

    @PostMapping
    public ResponseEntity<TransferResponse> executeTransfer(@Valid @RequestBody TransferRequest request) {
        // Simulasi validasi bisnis saldo
        if (request.amount().compareTo(new BigDecimal("50000000.00")) > 0) {
            throw new InsufficientBalanceException("Saldo harian tidak mencukupi untuk transfer di atas Rp 50.000.000!");
        }

        var response = new TransferResponse(
            "TRX-2026-" + System.currentTimeMillis(),
            request.sourceAccount(),
            request.targetAccount(),
            request.amount(),
            "SUCCESS",
            Instant.now()
        );

        return ResponseEntity
            .created(URI.create("/api/v1/transfers/" + response.transferId()))
            .body(response);
    }
}

// DTO Requests & Responses menggunakan Java Records
record TransferRequest(
    @NotBlank(message = "Nomor rekening asal tidak boleh kosong.")
    String sourceAccount,

    @NotBlank(message = "Nomor rekening tujuan tidak boleh kosong.")
    String targetAccount,

    @NotNull(message = "Nominal transfer wajib diisi.")
    @DecimalMin(value = "10000.00", message = "Minimal transfer adalah Rp 10.000,00.")
    @DecimalMax(value = "100000000.00", message = "Maksimal transfer per transaksi adalah Rp 100.000.000,00.")
    BigDecimal amount
) {}

record TransferResponse(String transferId, String from, String to, BigDecimal amount, String status, Instant timestamp) {}

// Custom Business Exception
class InsufficientBalanceException extends RuntimeException {
    public InsufficientBalanceException(String message) { super(message); }
}

// Global Exception Handler menggunakan Standar RFC 7807 ProblemDetail bawaan Spring 6
@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(InsufficientBalanceException.class)
    public ProblemDetail handleInsufficientBalance(InsufficientBalanceException ex) {
        var problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
        problem.setTitle("Kegagalan Validasi Saldo Perbankan");
        problem.setType(URI.create("https://tryngo.io/errors/insufficient-balance"));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationErrors(MethodArgumentNotValidException ex) {
        var problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, "Payload request tidak valid.");
        problem.setTitle("Kesalahan Validasi Data");
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err -> 
            errors.put(err.getField(), err.getDefaultMessage())
        );
        problem.setProperty("fieldErrors", errors);
        return problem;
    }
}
''',
                'objectivesId': [
                    'Membangun RESTful endpoint berstandar menggunakan `@RestController` dan `@RequestMapping`.',
                    'Menerapkan validasi deklaratif dengan Jakarta Bean Validation (`@NotNull`, `@DecimalMin`, `@NotBlank`).',
                    'Menggunakan fitur `ProblemDetail` bawaan Spring 6 / Spring Boot 3 yang mematuhi RFC 7807.',
                    'Membuat `@RestControllerAdvice` terpusat untuk menangani exception di seluruh controller.',
                ],
                'objectivesEn': [
                    'Build standardized RESTful endpoints with `@RestController` and `@RequestMapping`.',
                    'Apply declarative input validation with Jakarta Bean Validation (`@NotNull`, `@DecimalMin`, `@NotBlank`).',
                    'Leverage Spring Boot 3 / Spring 6 native `ProblemDetail` complying with RFC 7807.',
                    'Construct centralized `@RestControllerAdvice` exception handlers across all controller layers.',
                ],
                'explanationId': '''Membangun Web API enterprise membutuhkan kontrak HTTP yang jelas, validasi input yang ketat sebelum menyentuh database, serta struktur respons error yang terstandarisasi.

### Spring MVC & RestController
Anotasi `@RestController` adalah kombinasi dari `@Controller` dan `@ResponseBody`. Ini memberitahu Spring bahwa setiap method akan langsung mengembalikan payload data (seperti JSON) yang diserialisasi secara otomatis oleh pustaka Jackson tanpa rendering template HTML.

### Jakarta Bean Validation
Alih-alih menulis puluhan kondisi `if (req.getAmount() < 10000)` di dalam controller, kita menggunakan anotasi Jakarta Bean Validation pada DTO record (`@DecimalMin`, `@NotBlank`). Anotasi `@Valid` pada parameter controller memicu validasi otomatis sebelum kode method dijalankan. Jika validasi gagal, Spring langsung melempar `MethodArgumentNotValidException`.

### Standar RFC 7807 ProblemDetail di Spring Boot 3
Spring Boot 3 mengadopsi spesifikasi standar **RFC 7807 Problem Details** secara native melalui kelas `org.springframework.http.ProblemDetail`. Melalui `@RestControllerAdvice`, kita dapat memetakan pengecualian bisnis menjadi format error JSON yang seragam dengan field `type`, `title`, `status`, `detail`, dan properti kustom seperti `fieldErrors`.
''',
                'explanationEn': '''Enterprise Web APIs mandate strict contract clarity, robust input validation before touching persistence engines, and standardized error communication.

### Spring MVC & RestController
The `@RestController` annotation pairs `@Controller` with `@ResponseBody`, indicating to Spring that returned Java objects must serialize directly into HTTP response bodies (JSON) via Jackson without HTML view resolution.

### Jakarta Bean Validation
Rather than littering controllers with repetitive `if (req.getAmount() < 10000)` checks, declarative Jakarta Validation annotations (`@DecimalMin`, `@NotBlank`) annotate DTO records. Applying `@Valid` triggers automated request auditing prior to controller invocation.

### Native RFC 7807 ProblemDetail in Spring Boot 3
Spring Boot 3 adopts the **RFC 7807 Problem Details** standard via `org.springframework.http.ProblemDetail`. Operating alongside `@RestControllerAdvice`, domain exceptions translate into uniform error payloads containing `type`, `title`, `status`, `detail`, and custom properties like `fieldErrors`.
''',
                'beginnerId': '''Bayangkan Anda mengisi formulir penarikan tunai di bank. Jika Anda lupa menulis nomor rekening atau menulis angka penarikan Rp 0, teller di loket (Jakarta Validation) langsung menolak formulir Anda dan melingkari bagian yang salah dengan spidol merah, sebelum formulir itu sempat masuk ke meja manajer kredit.''',
                'beginnerEn': '''Imagine filling out a paper cash withdrawal slip at a bank branch. If you leave your account number blank or enter Rp 0, the teller clerk (Jakarta Validation) immediately rejects the slip and highlights missing fields in red ink before the form reaches the branch manager.''',
                'experimentsId': [
                    'Kirim payload POST dengan nilai amount `5000` dan perhatikan bagaimana validasi `@DecimalMin` menolak request.',
                    'Kirim amount di atas 50 juta dan amati payload ProblemDetail yang dihasilkan oleh `InsufficientBalanceException`.',
                    'Tambahkan header `Content-Type: application/problem+json` pada pengujian REST client.',
                ],
                'experimentsEn': [
                    'Send a POST payload with an amount of `5000` and observe `@DecimalMin` rejecting the request.',
                    'Submit an amount exceeding 50 million and inspect the ProblemDetail generated by `InsufficientBalanceException`.',
                    'Inspect the `Content-Type: application/problem+json` response header using curl or Postman.',
                ],
                'challengeId': 'Buat custom validator annotation `@ValidAccountNumber` yang memverifikasi checksum nomor rekening perbankan menggunakan algoritma Modulo 10 (Luhn Algorithm).',
                'challengeEn': 'Build a custom validator annotation `@ValidAccountNumber` validating banking account numbers using the Modulo 10 (Luhn) checksum algorithm.',
                'summaryId': 'Kamu telah menguasai REST Controllers, Jakarta Validation, dan ProblemDetail RFC 7807. Level 1 selesai! Di Level 2 kita mempelajari Spring Security, Concurrency Locking, dan Kafka.',
                'summaryEn': 'You have mastered REST Controllers, Jakarta Validation, and RFC 7807 ProblemDetail. Level 1 complete! Level 2 covers Spring Security, Concurrency Locking, and Kafka.',
            },

            # Week 5
            {
                'week': 5,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'spring-security-jwt',
                'titleId': 'Keamanan Enterprise: Spring Security 6, Stateless JWT & RBAC',
                'titleEn': 'Enterprise Security: Spring Security 6, Stateless JWT & RBAC',
                'programId': 'Konfigurasi SecurityFilterChain & Autorisasi Berbasis Peran Bank',
                'programEn': 'SecurityFilterChain Configuration & Bank Role-Based Authorization',
                'language': 'java',
                'code': '''package com.tryngo.banking.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Mengaktifkan @PreAuthorize pada method
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF untuk Stateless REST API
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**", "/actuator/health").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/public/**").permitAll()
                .requestMatchers("/api/v1/compliance/**").hasRole("COMPLIANCE_OFFICER")
                .requestMatchers("/api/v1/transfers/**").hasAnyRole("TELLER", "CUSTOMER")
                .anyRequest().authenticated()
            );

        return http.build();
    }
}

// Controller dengan Pengamanan Berlapis di Tingkat Method
@RestController
@RequestMapping("/api/v1/compliance")
class ComplianceAuditController {

    @GetMapping("/flagged-accounts")
    @PreAuthorize("hasRole('COMPLIANCE_OFFICER') and hasAuthority('SCOPE_audit:read')")
    public String getHighRiskAccounts() {
        return "[SECURE] 3 rekening sedang dibekukan oleh unit Anti-Pencucian Uang (AML).";
    }
}
''',
                'objectivesId': [
                    'Memahami evolusi Spring Security 6 (migrasi dari `WebSecurityConfigurerAdapter` ke `SecurityFilterChain`).',
                    'Mengonfigurasi autentikasi Stateless menggunakan JSON Web Token (JWT).',
                    'Menerapkan Role-Based Access Control (RBAC) pada level URL dan method (`@PreAuthorize`).',
                    'Mematikan CSRF dan session state untuk arsitektur cloud microservices REST.',
                ],
                'objectivesEn': [
                    'Understand Spring Security 6 architecture (migration from `WebSecurityConfigurerAdapter` to `SecurityFilterChain`).',
                    'Configure stateless authentication with JSON Web Tokens (JWT).',
                    'Implement Role-Based Access Control (RBAC) at both URL and method levels (`@PreAuthorize`).',
                    'Disable CSRF and session storage for cloud-native stateless REST microservices.',
                ],
                'explanationId': '''Keamanan adalah pilar paling sensitif dalam arsitektur perbankan dan fintech. Spring Security 6 mengusung paradigma modern berbasis komponen fungsional yang sepenuhnya menggantikan adapter lama.

### SecurityFilterChain Bean
Di Spring Security 6, seluruh aturan keamanan didefinisikan melalui bean `SecurityFilterChain`. Melalui lambda DSL yang intuitif, developer mengonfigurasi endpoint mana saja yang terbuka untuk publik (`/api/v1/auth/**`), endpoint mana yang memerlukan autentikasi, serta aturan berbasis peran pengguna (`hasRole('COMPLIANCE_OFFICER')`).

### Stateless Session Policy
Aplikasi monolitik klasik menyimpan sesi login pengguna di memori server (HttpSession). Pada arsitektur microservices terdistribusi yang dijalankan di banyak container pod Kubernetes, server tidak boleh menyimpan state sesi (`SessionCreationPolicy.STATELESS`). Klien menyertakan token JWT pada header `Authorization: Bearer <token>`, dan setiap request divalidasi secara independen.

### Method Security dengan @PreAuthorize
Selain pengamanan URL di `SecurityFilterChain`, anotasi `@PreAuthorize` memungkinkan pengamanan granular langsung di atas method bisnis atau controller. Dengan Spring Expression Language (SpEL), kita dapat mengevaluasi kombinasi peran, scopes token, bahkan kepemilikan data akun.
''',
                'explanationEn': '''Security represents the most critical pillar in financial infrastructure. Spring Security 6 introduces functional component paradigms, retiring legacy inheritance adapters.

### The SecurityFilterChain Bean
In Spring Security 6, all security rules reside within a `SecurityFilterChain` bean. Utilizing an expressive lambda DSL, developers designate open public routes (`/api/v1/auth/**`), authenticated endpoints, and role-based policies (`hasRole('COMPLIANCE_OFFICER')`).

### Stateless Session Management
Monolithic web architectures traditionally retained login sessions in server RAM (HttpSession). In containerized microservices spanning distributed clusters, servers enforce `SessionCreationPolicy.STATELESS`. Every incoming HTTP call carries a JWT within `Authorization: Bearer <token>`, verified independently at each hop.

### Method-Level Security with @PreAuthorize
Beyond URL route filtering, `@PreAuthorize` empowers fine-grained authorization directly atop business methods. Leveraging Spring Expression Language (SpEL), developers enforce rich multi-condition rules blending roles, OAuth scopes, and entity ownership parameters.
''',
                'beginnerId': '''Bayangkan gedung kantor pusat bank. Di lobi utama (SecurityFilterChain), satpam memeriksa apakah tamu memiliki kartu tanda pengenal (Autentikasi). Namun untuk masuk ke ruang brankas penyimpanan emas (Method Security @PreAuthorize), hanya orang dengan otorisasi khusus Direktur yang sidik jarinya bisa membuka pintu.''',
                'beginnerEn': '''Think of a bank corporate headquarters. At the main lobby (SecurityFilterChain), security guards verify visitor badges (Authentication). However, accessing the subterranean bullion vault (Method Security @PreAuthorize) requires biometric authorization granted solely to compliance directors.''',
                'experimentsId': [
                    'Coba akses `/api/v1/compliance/flagged-accounts` tanpa token dan amati respons HTTP 403 Forbidden.',
                    'Tambahkan filter custom `JwtAuthenticationFilter` sebelum `UsernamePasswordAuthenticationFilter`.',
                    'Uji ekspresi `@PreAuthorize("#accountId == authentication.principal.username")` untuk pengamanan kepemilikan rekening.',
                ],
                'experimentsEn': [
                    'Access `/api/v1/compliance/flagged-accounts` without credentials and observe the HTTP 403 response.',
                    'Register a custom `JwtAuthenticationFilter` ahead of `UsernamePasswordAuthenticationFilter`.',
                    'Test a `@PreAuthorize("#accountId == authentication.principal.username")` expression for account ownership.',
                ],
                'challengeId': 'Konfigurasikan Spring Security sebagai OAuth2 Resource Server yang memvalidasi JWT secara otomatis menggunakan public key JWKS dari server otentikasi eksternal (Keycloak / Auth0).',
                'challengeEn': 'Configure Spring Security as an OAuth2 Resource Server that automatically validates JWT signatures using JWKS public keys from an external auth server (Keycloak / Auth0).',
                'summaryId': 'Kamu telah menguasai Spring Security 6, stateless JWT, dan pengamanan RBAC. Minggu depan kita mempelajari manajemen transaksi atomik dan locking database.',
                'summaryEn': 'You have mastered Spring Security 6, stateless JWT, and RBAC authorization. Next week we explore atomic transaction management and database locking.',
            },

            # Week 6
            {
                'week': 6,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'transactions-isolation-locking',
                'titleId': 'Integritas Transaksi: @Transactional, Tingkat Isolasi & Pessimistic Locking',
                'titleEn': 'Transaction Integrity: @Transactional, Isolation Levels & Pessimistic Locking',
                'programId': 'Transfer Saldo Anti-Overdraft dengan Pessimistic Write Locking',
                'programEn': 'Anti-Overdraft Balance Transfer with Pessimistic Write Locking',
                'language': 'java',
                'code': '''package com.tryngo.banking.service;

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
''',
                'objectivesId': [
                    'Menguasai prinsip ACID (Atomicity, Consistency, Isolation, Durability) dan anotasi `@Transactional`.',
                    'Memahami perbedaan tingkat isolasi transaksi: `READ_COMMITTED`, `REPEATABLE_READ`, dan `SERIALIZABLE`.',
                    'Mengetahui perbedaan Pessimistic Locking (`LockModeType.PESSIMISTIC_WRITE`) vs Optimistic Locking (`@Version`).',
                    'Mencegah race condition fatal (double spending & balance overdraft) pada transfer uang simultan.',
                ],
                'objectivesEn': [
                    'Master ACID principles and the mechanics of `@Transactional`.',
                    'Understand transaction isolation levels: `READ_COMMITTED`, `REPEATABLE_READ`, and `SERIALIZABLE`.',
                    'Differentiate Pessimistic Locking (`LockModeType.PESSIMISTIC_WRITE`) from Optimistic Locking (`@Version`).',
                    'Prevent critical race conditions (double spending & balance overdrafts) under concurrent transactions.',
                ],
                'explanationId': '''Dalam sistem perbankan, kegagalan menangani konkurensi dapat berakibat fatal: dua penarikan uang yang terjadi pada milidetik yang sama bisa menyebabkan saldo menjadi minus (Overdraft / Double Spending Bug).

### Cara Kerja @Transactional di Spring
Spring menggunakan Dynamic Proxies untuk membungkus method bertanda `@Transactional`. Sebelum method dieksekusi, proxy membuka transaksi database (`BEGIN TRANSACTION`). Jika method selesai tanpa exception, proxy memanggil `COMMIT`. Jika terjadi RuntimeException atau exception yang ditentukan di `rollbackFor`, proxy memanggil `ROLLBACK` dan seluruh perubahan dibatalkan.

### Tingkat Isolasi (Isolation Levels)
Isolasi menentukan sejauh mana transaksi terlindung dari perubahan yang sedang dilakukan transaksi lain:
- **READ_COMMITTED**: Mencegah Dirty Read (membaca data yang belum di-commit transaksi lain). Standar performa terbaik untuk aplikasi web.
- **SERIALIZABLE**: Tingkat isolasi tertinggi yang menjamin eksekusi seolah-olah terjadi satu per satu secara berurutan, namun dengan penalti latensi tinggi.

### Mengapa Memilih Pessimistic Locking?
Optimistic Locking (menggunakan kolom `@Version`) sangat bagus jika konflik jarang terjadi. Namun untuk transaksi rekening bank di mana banyak mutasi terjadi dalam waktu bersamaan, **Pessimistic Write Lock** (`SELECT ... FOR UPDATE`) adalah pilihan wajib: database akan mengunci baris data rekening tersebut sehingga transaksi lain harus mengantre sampai transaksi pertama selesai.
''',
                'explanationEn': '''In financial core banking, concurrency mismanagement yields disastrous consequences: simultaneous balance debits executing within the same millisecond trigger account overdrafts and double-spending vulnerabilities.

### How @Transactional Functions
Spring employs Dynamic Proxies to wrap `@Transactional` methods. Prior to method entry, the proxy issues `BEGIN TRANSACTION`. If execution finishes normally, the proxy commits. If an unhandled exception triggers, the proxy issues a database `ROLLBACK`, reverting all staged mutations.

### Transaction Isolation Levels
Isolation regulates how modifications made by concurrent transactions interact:
- **READ_COMMITTED**: Eliminates Dirty Reads (inspecting uncommitted data from parallel threads). Represents the gold standard for high-throughput backends.
- **SERIALIZABLE**: Enforces total isolation simulating strictly sequential execution, incurring substantial lock contention penalties.

### The Role of Pessimistic Locking
Optimistic Locking (`@Version`) excels when conflicting writes are infrequent. For financial ledger rows enduring intense concurrent debit attempts, **Pessimistic Write Locking** (`SELECT ... FOR UPDATE`) is mandatory: the database engine holds an exclusive row-level lock, forcing parallel transactions to queue until the active transfer commits.
''',
                'beginnerId': '''Bayangkan Anda dan pasangan Anda mencoba menarik sisa uang Rp 1.000.000 di rekening bersama secara bersamaan di dua mesin ATM berbeda pada detik yang sama persis. Pessimistic Lock seperti pintu bilik ATM: begitu Anda masuk, pintu terkunci. Pasangan Anda di ATM lain harus menunggu Anda selesai dan saldo sudah berkurang menjadi Rp 0, sehingga penarikan kedua otomatis ditolak.''',
                'beginnerEn': '''Imagine you and your spouse simultaneously attempting to withdraw the remaining balance of Rp 1,000,000 from a joint bank account at two separate ATMs at the exact same second. Pessimistic Locking behaves like an automated vault door: the moment you swipe, the account locks exclusively. The second ATM is forced to wait until your withdrawal completes, seeing Rp 0 and rejecting the second attempt.''',
                'experimentsId': [
                    'Jalankan simulasi 50 thread bersamaan yang mencoba menarik saldo Rp 100.000 dari rekening bersaldo Rp 200.000.',
                    'Bandingkan hasilnya dengan dan tanpa anotasi `@Lock(LockModeType.PESSIMISTIC_WRITE)`.',
                    'Atur timeout transaksi menjadi 1 detik dan amati `QueryTimeoutException` ketika lock contention terjadi.',
                ],
                'experimentsEn': [
                    'Simulate 50 concurrent threads attempting to withdraw Rp 100,000 from an account containing Rp 200,000.',
                    'Compare execution results with and without `@Lock(LockModeType.PESSIMISTIC_WRITE)`.',
                    'Set a transaction timeout of 1 second and observe the `QueryTimeoutException` during simulated lock contention.',
                ],
                'challengeId': 'Cegah Deadlock pada transfer dua arah (Akun A transfer ke B bersamaan dengan B transfer ke A) dengan menerapkan pengurutan penguncian akun berdasarkan ID terkecil terlebih dahulu.',
                'challengeEn': 'Avert database deadlocks during bidirectional transfers (Account A transferring to B while B transfers to A) by locking accounts in ascending ID order.',
                'summaryId': 'Kamu telah menguasai `@Transactional`, tingkat isolasi, dan Pessimistic Locking. Minggu depan kita masuk ke arsitektur asinkron dengan Apache Kafka.',
                'summaryEn': 'You have mastered `@Transactional`, isolation levels, and Pessimistic Locking. Next week we enter asynchronous event-driven streaming with Apache Kafka.',
            },

            # Week 7
            {
                'week': 7,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'event-driven-kafka',
                'titleId': 'Arsitektur Event-Driven: Spring for Apache Kafka & Audit Streaming',
                'titleEn': 'Event-Driven Architecture: Spring for Apache Kafka & Audit Streaming',
                'programId': 'Publikasi Event Mutasi & Konsumen Deteksi Fraud dengan Kafka',
                'programEn': 'Mutation Event Publishing & Fraud Detection Consumer with Kafka',
                'language': 'java',
                'code': '''package com.tryngo.banking.kafka;

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
''',
                'objectivesId': [
                    'Memahami konsep dasar Apache Kafka: Topics, Partitions, Consumer Groups, dan Offsets.',
                    'Menggunakan `KafkaTemplate` untuk mempublikasikan event domain secara non-blocking.',
                    'Menerapkan partition keying untuk menjamin urutan event (Ordering Guarantee) per nasabah.',
                    'Mengonsumsi event secara asinkron menggunakan `@KafkaListener` dengan penanganan Dead Letter Topic (DLT).',
                ],
                'objectivesEn': [
                    'Understand core Apache Kafka principles: Topics, Partitions, Consumer Groups, and Offsets.',
                    'Use `KafkaTemplate` to publish domain events asynchronously without blocking HTTP requests.',
                    'Apply partition keys ensuring per-customer event ordering guarantees.',
                    'Consume streaming events using `@KafkaListener` paired with Dead Letter Topic (DLT) retry policies.',
                ],
                'explanationId': '''Dalam arsitektur perbankan modern, mutasi transfer uang tidak boleh menunggu sistem audit, pelaporan pajak, dan sistem anti-fraud selesai memeriksa transaksi. Seluruh sistem downstream harus dihubungkan secara asinkron melalui **Apache Kafka**.

### Mengapa Apache Kafka?
Kafka adalah distributed commit log berkecepatan tinggi yang mampu menangani jutaan event per detik. Tidak seperti message broker tradisional (RabbitMQ), Kafka menyimpan event secara persisten di disk, memungkinkan konsumen membaca ulang pesan lama (Event Replay) jika terjadi audit forensik.

### Pentingnya Partition Key
Sebuah topik Kafka dibagi menjadi beberapa **Partitions** untuk memungkinkan pemrosesan paralel. Kafka menjamin urutan pesan (Strict Ordering) hanya di dalam satu partisi yang sama. Dengan menggunakan nomor rekening (`fromAcc`) sebagai partition key, seluruh transaksi dari rekening tersebut dijamin selalu masuk ke partisi yang sama dan diproses secara berurutan.

### Consumer Groups dan Skalabilitas
Dengan mendefinisikan `groupId = "fraud-detection-group"`, beberapa instance service fraud detection dapat berbagi beban pembacaan partisi secara otomatis. Jika satu instance mati, Kafka secara otomatis melakukan Rebalance ke instance yang masih hidup tanpa kehilangan data.
''',
                'explanationEn': '''In modern financial topologies, transactional funds transfers must not block awaiting tax reporting, external auditing, and machine-learning fraud scoring systems. Downstream systems communicate asynchronously through **Apache Kafka**.

### Why Apache Kafka?
Kafka operates as a distributed immutable commit log processing millions of events per second. Unlike traditional brokers (RabbitMQ), Kafka retains messages durably on disk, empowering consumer services to replay historical logs during forensic auditing.

### Partition Keys & Strict Ordering
A Kafka topic partitions incoming streams across multiple physical shards. Kafka guarantees strict chronological message ordering exclusively within a single partition. Designating the account number (`fromAcc`) as the partition key ensures all mutations for that account funnel into the same partition.

### Consumer Groups & Dynamic Scaling
Designating `groupId = "fraud-detection-group"` orchestrates multiple consumer instances to divide partition consumption dynamically. If a worker pod crashes, Kafka initiates a seamless partition rebalance, averting message loss.
''',
                'beginnerId': '''Bayangkan kantor pos pusat dengan banyak loket (Kafka Partitions). Surat untuk kota Bandung selalu masuk ke loket 1, surat untuk Surabaya masuk ke loket 2 (Partition Key). Tim kurir di Surabaya (Consumer Group) bisa membawa dan mengantarkan surat-surat tersebut secara bersamaan tanpa saling mengganggu kurir di Bandung.''',
                'beginnerEn': '''Think of a central postal sorting terminal with partitioned conveyor lanes. Mail destined for North Station always channels to Lane 1, while South Station mail funnels to Lane 2 (Partition Keys). Fleet drivers (Consumer Groups) unload mail concurrently without interfering with parallel routes.''',
                'experimentsId': [
                    'Jalankan Kafka lokal via Docker Compose dan kirim 10 pesan dengan partition key berbeda.',
                    'Amati di terminal bagaimana pesan didistribusikan ke partisi 0, 1, dan 2 secara merata.',
                    'Konfigurasikan Dead Letter Topic (DLT) untuk menampung pesan yang gagal didecode oleh consumer.',
                ],
                'experimentsEn': [
                    'Launch local Kafka via Docker Compose and transmit 10 events with varying keys.',
                    'Inspect the console output observing events distributing across partitions 0, 1, and 2.',
                    'Configure a Dead Letter Topic (DLT) capturing malformed payloads rejected by the consumer.',
                ],
                'challengeId': 'Buat konfigurasi `ConcurrentKafkaListenerContainerFactory` dengan `SeekToCurrentErrorHandler` yang mencoba membaca ulang pesan yang error sebanyak 3 kali dengan interval 2 detik sebelum mengirimnya ke topik `.DLT`.',
                'challengeEn': 'Build a `ConcurrentKafkaListenerContainerFactory` configured with a `DefaultErrorHandler` retrying failed messages 3 times at 2-second intervals before routing to a `.DLT` topic.',
                'summaryId': 'Kamu telah menguasai arsitektur event-driven dengan Apache Kafka. Level 2 selesai! Di Level 3 kita menaklukkan Virtual Threads, Resilience4j, dan Proyek Capstone.',
                'summaryEn': 'You have mastered event-driven architecture with Apache Kafka. Level 2 complete! Level 3 takes us into Virtual Threads, Resilience4j, and our Capstone Project.',
            },

            # Week 8
            {
                'week': 8,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'virtual-threads-performance',
                'titleId': 'Konkurensi Skala Tinggi: Java 21 Virtual Threads (Project Loom) di Spring Boot 3',
                'titleEn': 'High-Scale Concurrency: Java 21 Virtual Threads (Project Loom) in Spring Boot 3',
                'programId': 'Batch Settlement Perbankan Konkuren 10.000 Tugas dengan Virtual Threads',
                'programEn': 'Concurrent 10,000-Task Banking Settlement Engine with Virtual Threads',
                'language': 'java',
                'code': '''package com.tryngo.banking.loom;

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
''',
                'objectivesId': [
                    'Memahami revolusi Project Loom dan arsitektur Virtual Threads di Java 21.',
                    'Mengetahui perbedaan Carrier Threads (Platform Threads OS) vs Virtual Threads berbasis JVM.',
                    'Mengaktifkan Virtual Threads di Spring Boot 3 dengan satu baris konfigurasi (`spring.threads.virtual.enabled=true`).',
                    'Menerapkan Structured Concurrency untuk menghindari kebocoran thread (Thread Leaks).',
                ],
                'objectivesEn': [
                    'Understand the Project Loom revolution and Virtual Threads architecture in Java 21.',
                    'Differentiate Carrier OS Platform Threads from lightweight JVM-managed Virtual Threads.',
                    'Enable Virtual Threads in Spring Boot 3 via a single property (`spring.threads.virtual.enabled=true`).',
                    'Apply Structured Concurrency primitives averting orphaned thread leaks.',
                ],
                'explanationId': '''Selama lebih dari dua dekade, satu thread di Java (`java.lang.Thread`) dipetakan 1:1 ke kernel thread sistem operasi. Karena satu OS thread membutuhkan memori stack sekitar 1MB, server Java tradisional akan kehabisan memori jika menangani lebih dari beberapa ribu thread bersamaan.

### Revolusi Virtual Threads (Project Loom)
Virtual Threads di Java 21 adalah thread ringan yang dikelola langsung oleh runtime JVM, bukan sistem operasi. Satu virtual thread hanya membutuhkan memori beberapa ratus byte. Anda dapat membuat **1.000.000 virtual thread** sekaligus di satu laptop tanpa mengalami OutOfMemoryError.

### Unmounting Saat Operasi I/O
Ketika sebuah virtual thread melakukan operasi blocking I/O (seperti `Thread.sleep()`, query database JPA, atau panggilan HTTP eksternal), runtime Java secara otomatis melepaskannya (**unmount**) dari carrier thread sistem operasi. Carrier thread tersebut langsung bebas melayani ribuan tugas lainnya. Begitu operasi I/O selesai, virtual thread di-**mount** kembali secara instan.

### Integrasi Virtual Threads di Spring Boot 3
Mulai Spring Boot 3.2+, Anda tidak perlu lagi menulis kode reaktif yang rumit (`WebFlux` / `Mono` / `Flux`) hanya untuk mendapatkan skalabilitas tinggi. Cukup tambahkan:
`spring.threads.virtual.enabled=true`
Spring Boot akan otomatis mengonfigurasi embedded Tomcat dan TaskExecutors untuk menjalankan setiap HTTP request di atas virtual thread mandiri.
''',
                'explanationEn': '''For over two decades, every Java thread (`java.lang.Thread`) mapped 1:1 to an underlying OS kernel thread. Because each platform thread reserves ~1MB of memory, traditional Java servers capped out handling a few thousand concurrent connections.

### The Virtual Threads Revolution (Project Loom)
Virtual Threads in Java 21 are lightweight abstractions managed by the JVM runtime rather than the OS kernel. Consuming mere bytes of heap space, developers can spawn **1,000,000 concurrent virtual threads** on a single workstation without exhausting memory.

### Non-blocking Unmounting on I/O
When a virtual thread encounters blocking I/O (such as `Thread.sleep()`, JPA SQL queries, or remote HTTP REST calls), the JVM unmounts the virtual thread from its underlying OS carrier thread. The carrier thread immediately services other workloads. When the I/O signals completion, the JVM mounts the virtual thread back smoothly.

### Virtual Threads in Spring Boot 3
Starting in Spring Boot 3.2+, developers no longer need complex reactive programming paradigms (`WebFlux` / `Mono` / `Flux`) solely to achieve massive concurrency. Simply setting:
`spring.threads.virtual.enabled=true`
instructs embedded Tomcat and Spring task executors to run every incoming HTTP request on an isolated virtual thread.
''',
                'beginnerId': '''Bayangkan sebuah bandara dengan 8 landasan pacu (Carrier Threads OS). Di masa lalu, jika sebuah pesawat parkir menunggu penumpang selama 3 jam, pesawat itu memblokir seluruh landasan pacu sehingga pesawat lain tidak bisa mendarat. Dengan Virtual Threads, pesawat langsung ditarik ke hanggar parkir miniatur saat menunggu, membiarkan landasan pacu terus dipakai pesawat lain tanpa henti.''',
                'beginnerEn': '''Imagine an airport with 8 tarmac runways (OS Carrier Threads). Historically, if a plane paused to load luggage for three hours, it parked directly on the runway, halting all incoming traffic. With Virtual Threads, stationary planes are lifted into a miniature holding hangar while loading, keeping the main runways operating continuously.''',
                'experimentsId': [
                    'Jalankan program dengan `Executors.newFixedThreadPool(100)` dan bandingkan total waktu penyelesaian dengan Virtual Threads.',
                    'Aktifkan `spring.threads.virtual.enabled=true` di Spring Boot dan amati nama thread pada log Tomcat (`virtual-XX`).',
                    'Uji coba simulasi 100.000 virtual threads dan pantau konsumsi RAM menggunakan `jconsole` atau `VisualVM`.',
                ],
                'experimentsEn': [
                    'Run the benchmark with `Executors.newFixedThreadPool(100)` and compare completion times against Virtual Threads.',
                    'Enable `spring.threads.virtual.enabled=true` in Spring Boot and verify Tomcat logs display virtual thread names.',
                    'Simulate 100,000 concurrent virtual threads and monitor heap consumption via `jconsole` or `VisualVM`.',
                ],
                'challengeId': 'Gunakan Java 21 `StructuredTaskScope` untuk memanggil 3 API kurs valuta asing (FX Rate) secara paralel dan ambil respons tercepat (Racing/First-Success pattern).',
                'challengeEn': 'Utilize Java 21 `StructuredTaskScope` to query 3 external FX foreign exchange rate APIs concurrently, resolving on the fastest successful response.',
                'summaryId': 'Kamu telah menguasai Virtual Threads Java 21 dan Project Loom di Spring Boot 3. Minggu depan kita mempelajari Distributed Caching Redis dan Ketahanan Sistem dengan Resilience4j.',
                'summaryEn': 'You have mastered Java 21 Virtual Threads and Project Loom in Spring Boot 3. Next week we cover Redis Distributed Caching and System Resilience with Resilience4j.',
            },

            # Week 9
            {
                'week': 9,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'caching-redis-resilience4j',
                'titleId': 'Ketahanan & Caching: Spring Data Redis & Resilience4j Circuit Breaker',
                'titleEn': 'Resilience & Caching: Spring Data Redis & Resilience4j Circuit Breaker',
                'programId': 'Pipeline Kurs Valuta Asing Terproteksi Caching Redis & Circuit Breaker',
                'programEn': 'Foreign Exchange Pipeline Protected by Redis Caching & Circuit Breaker',
                'language': 'java',
                'code': '''package com.tryngo.banking.resilience;

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
''',
                'objectivesId': [
                    'Mengonfigurasi Spring Cache Abstraction dengan backend terdistribusi Spring Data Redis.',
                    'Menerapkan anotasi caching: `@Cacheable`, `@CachePut`, dan `@CacheEvict`.',
                    'Mengintegrasikan Resilience4j: Retry, Circuit Breaker, dan Rate Limiter.',
                    'Menulis strategi Graceful Fallback untuk menjaga kelangsungan operasional sistem saat pihak ketiga mengalami gangguan.',
                ],
                'objectivesEn': [
                    'Configure Spring Cache Abstraction backed by distributed Spring Data Redis.',
                    'Apply caching annotations: `@Cacheable`, `@CachePut`, and `@CacheEvict`.',
                    'Integrate Resilience4j: Retry, Circuit Breaker, and Rate Limiter.',
                    'Author Graceful Fallback strategies maintaining business continuity during downstream partner outages.',
                ],
                'explanationId': '''Dalam arsitektur perbankan, layanan kita sering kali bergantung pada API eksternal (seperti kurs mata uang asing, gateway pembayaran, atau verifikasi biometrik). Jika sistem eksternal tersebut down atau lambat, aplikasi kita tidak boleh ikut tumbang (Cascading Failure).

### Spring Cache Abstraction & Redis
Anotasi `@Cacheable(value = "exchangeRates", key = "#currencyPair")` memeriksa apakah data sudah tersedia di Redis. Jika ada (Cache Hit), Spring langsung mengembalikan data tanpa mengeksekusi body method. Jika data belum ada (Cache Miss), method dieksekusi dan hasilnya otomatis disimpan ke Redis dengan Time-To-Live (TTL) yang ditentukan.

### Ketahanan Sistem dengan Resilience4j
Resilience4j adalah pustaka toleransi kesalahan (fault-tolerance library) ringan untuk Java yang dirancang berdasarkan fungsional pemrograman. Dua fitur utamanya:
1. **Retry Pattern**: Mencoba ulang panggilan API yang gagal dengan jeda eksponensial (Exponential Backoff).
2. **Circuit Breaker**: Memantau tingkat kegagalan panggilan. Ketika tingkat kegagalan melebihi 50%, sirkuit beralih ke status **OPEN**. Seluruh panggilan berikutnya langsung dialihkan ke `fallbackMethod` tanpa membebani jaringan eksternal. Begitu sistem eksternal pulih, sirkuit beralih ke status **HALF-OPEN** untuk menguji pemulihan sebelum kembali ke status **CLOSED**.
''',
                'explanationEn': '''In core banking ecosystems, microservices constantly integrate with external gateways (foreign exchange feeds, payment gateways, biometric verification). If an external partner degrades, downstream failures must not cascade into local service outages.

### Spring Cache & Redis
The `@Cacheable(value = "exchangeRates", key = "#currencyPair")` annotation intercepts method execution. Upon a Cache Hit, cached data from Redis returns instantaneously. Upon a Cache Miss, the method executes and commits the result to Redis configured with a Time-To-Live (TTL).

### Resilience Engineering with Resilience4j
Resilience4j is Java's premier lightweight fault-tolerance library built upon functional paradigms. Two primary mechanics:
1. **Retry Pattern**: Automatically retries failed requests with configured exponential backoff.
2. **Circuit Breaker**: Tracks invocation failure metrics. If error thresholds surpass 50%, the breaker flips to the **OPEN** state. Subsequent calls immediately execute the designated `fallbackMethod`. As downstream partners recover, the breaker enters **HALF-OPEN** to probe latency before returning to **CLOSED**.
''',
                'beginnerId': '''Bayangkan Anda pemilik toko yang butuh info harga sembako harian dari pasar induk. Daripada menelpon pasar induk 100 kali setiap ada pembeli (membebani sambungan telepon), Anda mencatat harga pagi hari di papan tulis toko (Redis Cache). Jika kabel telepon pasar induk putus, Anda menggunakan harga standar kemarin daripada membatalkan transaksi pembeli (Circuit Breaker Fallback).''',
                'beginnerEn': '''Imagine a merchant needing wholesale grain prices. Rather than telephoning the central terminal a hundred times per customer (congesting phone lines), you jot the morning price on a shop whiteboard (Redis Cache). If phone lines are severed by a storm, you quote the baseline reserve price rather than turning customers away (Circuit Breaker Fallback).''',
                'experimentsId': [
                    'Ubah properti `failureRateThreshold` Resilience4j menjadi 50% di `application.yml` dan amati transisi status sirkuit.',
                    'Panggil method berulang kali dan pantau metrik Micrometer di `/actuator/circuitbreakers`.',
                    'Uji pembuktian cache hit dengan memeriksa keys di redis-cli (`KEYS exchangeRates*`).',
                ],
                'experimentsEn': [
                    'Configure Resilience4j `failureRateThreshold` to 50% in `application.yml` and inspect state transitions.',
                    'Invoke the method repeatedly and monitor Micrometer metrics at `/actuator/circuitbreakers`.',
                    'Verify cache hits by inspecting keys inside redis-cli (`KEYS exchangeRates*`).',
                ],
                'challengeId': 'Konfigurasikan Resilience4j `RateLimiter` yang membatasi pemanggilan API valuta asing maksimal 10 request per detik per user ID.',
                'challengeEn': 'Configure a Resilience4j `RateLimiter` restricting foreign exchange API consumption to a maximum of 10 requests per second per customer identity.',
                'summaryId': 'Kamu telah menguasai Redis Caching dan ketahanan sistem dengan Resilience4j. Minggu depan adalah Capstone Final: Multi-Tenant Banking Ledger Microservice!',
                'summaryEn': 'You have mastered Redis Caching and system resilience with Resilience4j. Next week is our Final Capstone: Multi-Tenant Banking Ledger Microservice!',
            },

            # Week 10
            {
                'week': 10,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'capstone-banking-ledger',
                'titleId': 'Capstone: Multi-Tenant Banking Transaction Ledger Microservice Production-Ready',
                'titleEn': 'Capstone: Production-Ready Multi-Tenant Banking Transaction Ledger Microservice',
                'programId': 'Layanan Ledger Perbankan Lengkap (Spring Boot 3, JPA, Kafka, Virtual Threads & Actuator)',
                'programEn': 'Complete Banking Ledger Microservice (Spring Boot 3, JPA, Kafka, Virtual Threads & Actuator)',
                'language': 'java',
                'code': '''package com.tryngo.banking;

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
''',
                'objectivesId': [
                    'Mengintegrasikan seluruh ekosistem: Spring Boot 3, JPA, Kafka, Virtual Threads, dan Actuator.',
                    'Menerapkan Pessimistic Locking untuk mutasi saldo zero-overdraft.',
                    'Menyiapkan event streaming audit ke Kafka secara asinkron tanpa memblokir koneksi HTTP.',
                    'Mengonfigurasi Spring Boot Actuator (`/actuator/health`, `/actuator/metrics`) untuk monitoring production Kubernetes.',
                ],
                'objectivesEn': [
                    'Integrate the complete ecosystem: Spring Boot 3, JPA, Kafka, Virtual Threads, and Actuator.',
                    'Enforce Pessimistic Locking guaranteeing zero-overdraft ledger mutations.',
                    'Publish asynchronous audit streaming events to Kafka without blocking HTTP client threads.',
                    'Configure Spring Boot Actuator (`/actuator/health`, `/actuator/metrics`) for Kubernetes production monitoring.',
                ],
                'explanationId': '''Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Spring Boot & Java. Sistem ini menggabungkan semua fondasi arsitektur enterprise ke dalam satu microservice ledger perbankan yang siap dideploy di lingkungan produksi perbankan nyata.

### Arsitektur Zero-Overdraft
Mutasi saldo rekening dilindungi oleh transaksi database dengan tingkat isolasi ketat dan `PESSIMISTIC_WRITE` lock. Ini menjamin bahwa berapapun tingginya volume transfer konkuren yang masuk secara bersamaan, saldo rekening nasabah tidak akan pernah terdebit ganda atau bernilai negatif.

### Pemisahan Transaksi dan Audit Streaming
Setelah saldo berhasil dipindahkan di database relasional, event transfer diterbitkan ke topik Apache Kafka (`banking.audit.v1`). Pemisahan ini memastikan bahwa layanan hilir (pencetakan buku tabungan, laporan OJK, scoring anti-pencucian uang) dapat mengonsumsi data secara mandiri tanpa menambah latensi pada response time nasabah.

### Observability dengan Spring Boot Actuator
Aplikasi dilengkapi modul Actuator yang menyediakan endpoint `/actuator/health` (mengecek kesiapan koneksi database dan Kafka cluster) serta `/actuator/prometheus` yang siap di-scrape oleh sistem monitoring Prometheus dan dashboard Grafana.
''',
                'explanationEn': '''Congratulations! You have reached the Capstone project. This application synthesizes modern Java 21 and Spring Boot 3 enterprise paradigms into a high-resilience, production-grade banking ledger microservice.

### Zero-Overdraft Architecture
Account ledger mutations are shielded by database transactions coupled with `PESSIMISTIC_WRITE` locks. This guarantees that regardless of extreme concurrency spikes, double-spending and unauthorized balance overdrafts are strictly prevented.

### Transaction Decoupling & Audit Streaming
Once balances update within the relational database, a transfer event is published to the Apache Kafka `banking.audit.v1` stream. This decouples downstream consumers (statement generation, tax reporting, anti-money laundering analytics) from the critical transaction path, maintaining sub-second HTTP responses.

### Production Observability with Spring Boot Actuator
The service exposes Spring Boot Actuator endpoints including `/actuator/health` (evaluating database pools and Kafka brokers) and `/actuator/prometheus` ready for metric ingestion by Prometheus and Grafana dashboards.
''',
                'beginnerId': '''Proyek ini ibarat kantor pusat perbankan digital modern. Teller di loket depan melayani transfer nasabah dengan sangat cepat dan ramah (REST API & Virtual Threads). Di ruang brankas, catatan pembukuan dijaga dengan kunci baja yang tidak bisa digandakan (Pessimistic Locking & JPA). Dan setiap transaksi otomatis dicatat di buku rekaman induk yang disiarkan ke bagian pengawasan internal tanpa membuat nasabah menunggu (Kafka Event Streaming).''',
                'beginnerEn': '''This project mirrors a state-of-the-art digital banking headquarters. Front-line tellers serve incoming clients with blazing speed (REST APIs & Virtual Threads). In the subterranean vault, accounting balances are safeguarded by infallible steel locks (Pessimistic Locking & JPA). And every ledger adjustment broadcasts instantaneously to central compliance monitors without keeping customers waiting (Kafka Streaming).''',
                'experimentsId': [
                    'Jalankan aplikasi dan uji coba alur transfer dana melalui cURL atau Postman.',
                    'Periksa kesehatan aplikasi di browser melalui `/actuator/health`.',
                    'Kirim request transfer dengan saldo tidak mencukupi dan pastikan response error tertangani dengan rapi.',
                ],
                'experimentsEn': [
                    'Run the application and verify fund transfer workflows via cURL or Postman.',
                    'Check container readiness in your browser via `/actuator/health`.',
                    'Submit a transfer exceeding the account balance and verify clean error responses.',
                ],
                'challengeId': 'Tambahkan integrasi Testcontainers di kelas pengujian `@SpringBootTest` untuk menjalankan integration test transfer dana terhadap container PostgreSQL dan Kafka yang nyata.',
                'challengeEn': 'Add Testcontainers integration in a `@SpringBootTest` test class running end-to-end transfer tests against real ephemeral PostgreSQL and Kafka containers.',
                'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Spring Boot & Java dari nol hingga microservice ledger perbankan enterprise!',
                'summaryEn': 'Congratulations! You have completed the entire Spring Boot & Java curriculum from zero to an enterprise production banking ledger microservice!',
            },
        ]
    }
