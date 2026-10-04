# Spring Boot 3 Core: Inversion of Control, Bean Lifecycle & Dependency Injection

> **Kategori:** Spring Boot & Java | **Level:** Pemula | **Minggu 2:** Spring Boot 3 Core: Inversion of Control, Bean Lifecycle & Dependency Injection
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep Inversion of Control (IoC) dan ApplicationContext di Spring Boot 3.
- Menggunakan Constructor Injection sebagai standar emas Dependency Injection (menghindari field injection `@Autowired`).
- Mengenal anotasi stereotipe Spring: `@Component`, `@Service`, `@Repository`, dan `@Configuration`.
- Mengelola siklus hidup Spring Beans (`@PostConstruct`, `@PreDestroy`).

---

## Program: Arsitektur Ledger Service dengan Spring IoC Container & Bean Profiles

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

## Konsep Kunci

Spring Boot 3 adalah standar industri de-facto untuk membangun aplikasi enterprise Java. Inti dari Spring Framework adalah kontainer **Inversion of Control (IoC)** yang mengelola siklus hidup komponen aplikasi (Beans).

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


---

---

## Penjelasan untuk Pemula

Bayangkan Anda menyewa jasa kontraktor bangunan (Spring IoC Container). Anda tidak perlu pergi ke toko bangunan sendiri untuk membeli semen, batu bata, dan paku (menghindari `new`). Anda cukup mengatakan ke mandor: "Saya butuh ruangan dengan instalasi pipa air", dan kontraktor akan menyiapkan pipa dan tukang ledeng secara otomatis untuk Anda.

## Eksperimen

- Tambahkan method dengan anotasi `@PostConstruct` di `LedgerService` dan amati log saat aplikasi booting.
- Coba buat bean kedua yang mengimplementasikan `AccountRepository` dan amati bagaimana `@Primary` atau `@Qualifier` menyelesaikan ambiguitas.
- Jalankan aplikasi dengan profil berbeda menggunakan properti `spring.profiles.active=dev`.

---

## Tantangan

Buat `@Configuration` class dengan method `@Bean` yang membuat instance `AccountAuditFilter` yang diaktifkan secara kondisional menggunakan `@ConditionalOnProperty`.

---

## Model Mental & Diagram Alur Visual

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

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `@RestController & @RequestMapping('/api/v1')`
- **Fungsi Utama:** Dekorator API Endpoint Spring Web.
- **Parameter / Atribut:** `Base path mapping`.
- **Perilaku & Efek Sistem:** Mendeklarasikan kelas Java sebagai REST API Controller yang otomatis menserialisasi return value ke JSON..
- **Contoh Penggunaan Praktis:**
```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @GetMapping
    public List<Product> list() { return productService.findAll(); }
}
```
- **Hasil Output yang Diharapkan:**
```text
Endpoint HTTP GET /api/products aktif
```

### 2. `@Service & Injeksi Dependensi Konstruktor`
- **Fungsi Utama:** Komponen Logika Bisnis & Dependency Injection.
- **Parameter / Atribut:** `Constructor Injection`.
- **Perilaku & Efek Sistem:** Mendaftarkan class ke IoC Container Spring dan menginjeksi dependensi yang dibutuhkan secara otomatis..
- **Contoh Penggunaan Praktis:**
```java
@Service
public class ProductService {
    private final ProductRepository repository;
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }
}
```
- **Hasil Output yang Diharapkan:**
```text
Service terinjeksi aman tanpa @Autowired refleksi
```

### 3. `public interface ProductRepository extends JpaRepository<Product, Long>`
- **Fungsi Utama:** Akses Database Otomatis Spring Data JPA.
- **Parameter / Atribut:** `Entity Class, Primary Key Type`.
- **Perilaku & Efek Sistem:** Menyediakan metode CRUD database (findAll, findById, save, delete) instan tanpa menulis implementasi..
- **Contoh Penggunaan Praktis:**
```java
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByInStockTrue();
}
```
- **Hasil Output yang Diharapkan:**
```text
Metode pencarian database siap dipakai seketika
```

### 4. `@Transactional`
- **Fungsi Utama:** Manajemen transaksi database ACID.
- **Parameter / Atribut:** `Propagation, Isolation, RollbackFor`.
- **Perilaku & Efek Sistem:** Menjamin seluruh operasi database di dalam method berhasil seluruhnya atau di-rollback otomatis saat gagal..
- **Contoh Penggunaan Praktis:**
```java
@Transactional
public void checkout(Order order) {
    inventoryService.deduct(order);
    orderRepository.save(order);
}
```
- **Hasil Output yang Diharapkan:**
```text
Transaksi ACID dijamin aman tanpa data korup
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Circular Dependency antar Service Bean
- **Gejala / Masalah:** Aplikasi Spring Boot gagal start dengan pesan `BeanCurrentlyInCreationException`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Rancang ulang arsitektur menggunakan mediator pattern, atau gunakan `@Lazy` sebagai solusi transisi.

### 2. Transaksi Database Tidak Berjalan pada Panggilan Internal
- **Gejala / Masalah:** Anotasi `@Transactional` diabaikan saat dipanggil dari method dalam class yang sama.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pahami bahwa Spring bekerja melalui AOP Proxy; panggil method transaksional melalui bean terinjeksi.

### 3. N+1 Query Problem pada JPA Hibernate
- **Gejala / Masalah:** Database menerima ratusan query SQL individual saat mengambil entitas relasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `JOIN FETCH` pada JPQL query atau tentukan `@EntityGraph` pada repository interface.

---

## Ringkasan

Kamu telah menguasai Spring IoC, Constructor Injection, dan Bean Lifecycles. Minggu depan kita menghubungkan database relasional dengan Spring Data JPA.
