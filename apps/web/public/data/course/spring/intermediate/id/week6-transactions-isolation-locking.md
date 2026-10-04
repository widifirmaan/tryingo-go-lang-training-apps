# Integritas Transaksi: @Transactional, Tingkat Isolasi & Pessimistic Locking

> **Kategori:** Spring Boot & Java | **Level:** Menengah | **Minggu 6:** Integritas Transaksi: @Transactional, Tingkat Isolasi & Pessimistic Locking
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai prinsip ACID (Atomicity, Consistency, Isolation, Durability) dan anotasi `@Transactional`.
- Memahami perbedaan tingkat isolasi transaksi: `READ_COMMITTED`, `REPEATABLE_READ`, dan `SERIALIZABLE`.
- Mengetahui perbedaan Pessimistic Locking (`LockModeType.PESSIMISTIC_WRITE`) vs Optimistic Locking (`@Version`).
- Mencegah race condition fatal (double spending & balance overdraft) pada transfer uang simultan.

---

## Program: Transfer Saldo Anti-Overdraft dengan Pessimistic Write Locking

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

## Konsep Kunci

Dalam sistem perbankan, kegagalan menangani konkurensi dapat berakibat fatal: dua penarikan uang yang terjadi pada milidetik yang sama bisa menyebabkan saldo menjadi minus (Overdraft / Double Spending Bug).

### Cara Kerja @Transactional di Spring
Spring menggunakan Dynamic Proxies untuk membungkus method bertanda `@Transactional`. Sebelum method dieksekusi, proxy membuka transaksi database (`BEGIN TRANSACTION`). Jika method selesai tanpa exception, proxy memanggil `COMMIT`. Jika terjadi RuntimeException atau exception yang ditentukan di `rollbackFor`, proxy memanggil `ROLLBACK` dan seluruh perubahan dibatalkan.

### Tingkat Isolasi (Isolation Levels)
Isolasi menentukan sejauh mana transaksi terlindung dari perubahan yang sedang dilakukan transaksi lain:
- **READ_COMMITTED**: Mencegah Dirty Read (membaca data yang belum di-commit transaksi lain). Standar performa terbaik untuk aplikasi web.
- **SERIALIZABLE**: Tingkat isolasi tertinggi yang menjamin eksekusi seolah-olah terjadi satu per satu secara berurutan, namun dengan penalti latensi tinggi.

### Mengapa Memilih Pessimistic Locking?
Optimistic Locking (menggunakan kolom `@Version`) sangat bagus jika konflik jarang terjadi. Namun untuk transaksi rekening bank di mana banyak mutasi terjadi dalam waktu bersamaan, **Pessimistic Write Lock** (`SELECT ... FOR UPDATE`) adalah pilihan wajib: database akan mengunci baris data rekening tersebut sehingga transaksi lain harus mengantre sampai transaksi pertama selesai.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda dan pasangan Anda mencoba menarik sisa uang Rp 1.000.000 di rekening bersama secara bersamaan di dua mesin ATM berbeda pada detik yang sama persis. Pessimistic Lock seperti pintu bilik ATM: begitu Anda masuk, pintu terkunci. Pasangan Anda di ATM lain harus menunggu Anda selesai dan saldo sudah berkurang menjadi Rp 0, sehingga penarikan kedua otomatis ditolak.

## Eksperimen

- Jalankan simulasi 50 thread bersamaan yang mencoba menarik saldo Rp 100.000 dari rekening bersaldo Rp 200.000.
- Bandingkan hasilnya dengan dan tanpa anotasi `@Lock(LockModeType.PESSIMISTIC_WRITE)`.
- Atur timeout transaksi menjadi 1 detik dan amati `QueryTimeoutException` ketika lock contention terjadi.

---

## Tantangan

Cegah Deadlock pada transfer dua arah (Akun A transfer ke B bersamaan dengan B transfer ke A) dengan menerapkan pengurutan penguncian akun berdasarkan ID terkecil terlebih dahulu.

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

Kamu telah menguasai `@Transactional`, tingkat isolasi, dan Pessimistic Locking. Minggu depan kita masuk ke arsitektur asinkron dengan Apache Kafka.
