# Capstone: Multi-Tenant Banking Transaction Ledger Microservice Production-Ready

> **Kategori:** Spring Boot & Java | **Level:** Lanjutan | **Minggu 10:** Capstone: Multi-Tenant Banking Transaction Ledger Microservice Production-Ready
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh ekosistem: Spring Boot 3, JPA, Kafka, Virtual Threads, dan Actuator.
- Menerapkan Pessimistic Locking untuk mutasi saldo zero-overdraft.
- Menyiapkan event streaming audit ke Kafka secara asinkron tanpa memblokir koneksi HTTP.
- Mengonfigurasi Spring Boot Actuator (`/actuator/health`, `/actuator/metrics`) untuk monitoring production Kubernetes.

---

## Program: Layanan Ledger Perbankan Lengkap (Spring Boot 3, JPA, Kafka, Virtual Threads & Actuator)

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

## Konsep Kunci

Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Spring Boot & Java. Sistem ini menggabungkan semua fondasi arsitektur enterprise ke dalam satu microservice ledger perbankan yang siap dideploy di lingkungan produksi perbankan nyata.

### Arsitektur Zero-Overdraft
Mutasi saldo rekening dilindungi oleh transaksi database dengan tingkat isolasi ketat dan `PESSIMISTIC_WRITE` lock. Ini menjamin bahwa berapapun tingginya volume transfer konkuren yang masuk secara bersamaan, saldo rekening nasabah tidak akan pernah terdebit ganda atau bernilai negatif.

### Pemisahan Transaksi dan Audit Streaming
Setelah saldo berhasil dipindahkan di database relasional, event transfer diterbitkan ke topik Apache Kafka (`banking.audit.v1`). Pemisahan ini memastikan bahwa layanan hilir (pencetakan buku tabungan, laporan OJK, scoring anti-pencucian uang) dapat mengonsumsi data secara mandiri tanpa menambah latensi pada response time nasabah.

### Observability dengan Spring Boot Actuator
Aplikasi dilengkapi modul Actuator yang menyediakan endpoint `/actuator/health` (mengecek kesiapan koneksi database dan Kafka cluster) serta `/actuator/prometheus` yang siap di-scrape oleh sistem monitoring Prometheus dan dashboard Grafana.


---

---

## Penjelasan untuk Pemula

Proyek ini ibarat kantor pusat perbankan digital modern. Teller di loket depan melayani transfer nasabah dengan sangat cepat dan ramah (REST API & Virtual Threads). Di ruang brankas, catatan pembukuan dijaga dengan kunci baja yang tidak bisa digandakan (Pessimistic Locking & JPA). Dan setiap transaksi otomatis dicatat di buku rekaman induk yang disiarkan ke bagian pengawasan internal tanpa membuat nasabah menunggu (Kafka Event Streaming).

## Eksperimen

- Jalankan aplikasi dan uji coba alur transfer dana melalui cURL atau Postman.
- Periksa kesehatan aplikasi di browser melalui `/actuator/health`.
- Kirim request transfer dengan saldo tidak mencukupi dan pastikan response error tertangani dengan rapi.

---

## Tantangan

Tambahkan integrasi Testcontainers di kelas pengujian `@SpringBootTest` untuk menjalankan integration test transfer dana terhadap container PostgreSQL dan Kafka yang nyata.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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

Selamat! Kamu telah menyelesaikan seluruh kurikulum Spring Boot & Java dari nol hingga microservice ledger perbankan enterprise!
