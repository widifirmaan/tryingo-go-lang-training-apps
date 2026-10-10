# Modern Java 21 LTS: Records, Sealed Interfaces & Pattern Matching

> **Kategori:** Spring Boot & Java | **Level:** Pemula | **Minggu 1:** Modern Java 21 LTS: Records, Sealed Interfaces & Pattern Matching
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai fitur Java 21 LTS modern: `record`, `sealed interface`, dan enhanced switch pattern matching.
- Memahami manfaat immutability dalam pemodelan data finansial perbankan.
- Menerapkan exhaustive pattern matching yang divalidasi oleh kompilator javac.
- Menggunakan `BigDecimal` untuk perhitungan moneter bebas dari floating-point precision error.

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Extension Pack for Java** (`vscjava.vscode-java-pack`): Paket lengkap Java dari Microsoft (LSP, debugger, test runner, maven)
- **Spring Boot Tools** (`vmware.vscode-spring-boot`): Autocomplete properti application.properties, simbol bean, dan navigasi controller

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension vscjava.vscode-java-pack --install-extension vmware.vscode-spring-boot
```

---

### 2. Instalasi Runtime & Dependency (JDK 21 (Eclipse Temurin / OpenJDK))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install EclipseAdoptium.Temurin.21.JDK
```

**macOS (Terminal / Homebrew):**
```bash
brew install openjdk@21
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install openjdk-21-jdk
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
java -version
```

Output yang diharapkan:
```output
openjdk version "21.0.x" ...
```

> 💡 **Tips Prasyarat:** Spring Boot 3 mewajibkan minimal Java versi 17, sangat direkomendasikan menggunakan Java 21 LTS.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
curl https://start.spring.io/starter.zip -d type=maven-project -d language=java -d bootVersion=3.4.0 -d dependencies=web,actuator -o my-spring-app.zip
tar -xf my-spring-app.zip
cd my-spring-app
```
- **Keterangan:** Mengunduh starter resmi Spring Boot dengan Maven wrapper dan dependensi Spring Web terpasang.
- **Pindah ke direktori project:**
```bash
cd my-spring-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
./mvnw spring-boot:run # Windows: .\mvnw.cmd spring-boot:run
```
Akses di browser atau terminal: `http://localhost:8080`

> ℹ️ Embedded Tomcat server aktif di port 8080.

**File Titik Masuk Utama (`src/main/java/com/example/demo/HelloController.java`):**
```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public Map<String, Object> hello() {
        return Map.of(
            "status", "success",
            "message", "Halo dari Spring Boot 3 & Java 21!",
            "framework", "Spring Web"
        );
    }
}
```
REST Controller sederhana mengembalikan respon Map JSON otomatis.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-spring-app/
├── src/
│   ├── main/
│   │   ├── java/com/example/demo/
│   │   │   └── DemoApplication.java # @SpringBootApplication
│   │   └── resources/
│   │       └── application.properties # Konfigurasi port & DB
│   └── test/java/
├── mvnw & mvnw.cmd      # Maven wrapper (tanpa perlu install maven)
└── pom.xml              # Definisi dependensi Maven
```
Struktur Maven standar Java untuk Spring Boot.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan Maven Wrapper (`./mvnw`) agar rekan tim tidak perlu menginstal Maven secara manual di komputer mereka.
- Tambahkan ekstensi `Spring Boot DevTools` di pom.xml untuk restart otomatis saat kode Java berubah.

---

## Program: Domain Model Ledger Transaksi Finansial dengan Java 21 Records

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

## Konsep Kunci

Java 21 LTS membawa transformasi besar yang mengeliminasi reputasi Java lama yang penuh boilerplate kode (getter, setter, konstruktor bertele-tele).

### Record Classes
`record` di Java 21 adalah kelas khusus pembawa data yang bersifat final dan immutable. Kompilator secara otomatis menghasilkan konstruktor kanonikal, method getter (`transfer.amount()`), serta implementasi `equals()`, `hashCode()`, dan `toString()` yang konsisten.

### Sealed Interfaces
Dengan kata kunci `sealed` dan klausul `permits`, kita dapat membatasi secara ketat kelas atau record mana saja yang berhak mengimplementasikan sebuah interface. Hal ini sangat krusial dalam sistem domain finansial: hanya event yang secara eksplisit diizinkan (`TransferEvent`, `DepositEvent`, `WithdrawalEvent`) yang dapat ada dalam sistem.

### Pattern Matching dengan Switch Expression
Switch expression di Java 21 mendukung dekonstruksi record secara langsung (`case TransferEvent(var id, var from, var to, ...)`). Kompilator memastikan seluruh kemungkinan variasi dari `sealed interface` telah ditangani (exhaustive check), sehingga jika kita menambahkan event baru di masa depan, kompilator akan langsung mengingatkan kita jika ada switch yang belum menangani event tersebut.


---

---

## Penjelasan untuk Pemula

Bayangkan buku cek bank resmi. Setiap lembar cek yang dirobek memiliki nomor unik, penerima, dan nominal yang dicap dengan tinta permanen (Record - tidak bisa diubah-ubah). Buku cek itu hanya memiliki 3 jenis slip resmi: Cek Transfer, Slip Setoran, dan Slip Penarikan (Sealed Interface - tidak boleh ada slip palsu ciptaan sendiri).

## Eksperimen

- Ubah nominal transfer menjadi Rp 150.000.000 dan amati bagaimana kondisi guard `when t.amount() > 100jt` terpicu.
- Tambahkan record baru `FeeEvent` dan perhatikan bagaimana kompilator Java meminta Anda menangani event tersebut di switch.
- Bandingkan dua record terpisah dengan nilai properti yang sama menggunakan `.equals()`.

---

## Tantangan

Buat method `LedgerResult processBatch(List<LedgerEvent> events)` yang memvalidasi setiap event secara fungsional menggunakan Java Stream API dan menghitung total dana yang berpindah tangan.

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
```output
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
```output
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
```output
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
```output
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

Kamu telah menguasai fitur Java 21 modern: Records, Sealed Interfaces, dan Pattern Matching. Minggu depan kita masuk ke Spring Boot 3 Core dan Inversion of Control.
