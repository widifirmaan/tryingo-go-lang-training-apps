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
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `var x int / x := 42`
- **Fungsi Utama:** Deklarasi variabel statis dan deklarasi pendek (Short Declaration).
- **Parameter / Atribut:** `Identifier, Type / Value`.
- **Perilaku & Efek Sistem:** `:=` menginferensi tipe data secara otomatis di dalam fungsi; `var` digunakan untuk deklarasi paket atau nilai default.
- **Contoh Penggunaan Praktis:**
```javascript
age := 25
name := "Alex Iskandar"
fmt.Printf("%s berusia %d tahun
", name, age);
```
- **Hasil Output yang Diharapkan:**
```text
Alex Iskandar berusia 25 tahun
```

### 2. `func (r Receiver) Method() ReturnType`
- **Fungsi Utama:** Penerapan Method pada Struct (OOP ala Go).
- **Parameter / Atribut:** `Receiver (value/pointer), Parameters`.
- **Perilaku & Efek Sistem:** Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa class inheritance hierarki.
- **Contoh Penggunaan Praktis:**
```javascript
type User struct { Name string }
func (u User) Greet() string {
  return "Halo, " + u.Name
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan string sapaan personal
```

### 3. `go func() { ... }()`
- **Fungsi Utama:** Eksekusi thread ringan konkuren (Goroutine).
- **Parameter / Atribut:** `Fungsi anonim / fungsi bernama`.
- **Perilaku & Efek Sistem:** Menjalankan komputasi di thread runtime Go yang sangat ringan (hanya ~2KB memori awal).
- **Contoh Penggunaan Praktis:**
```javascript
go func() {
  fmt.Println("Berjalan konkuren di goroutine terpisah!")
}()
```
- **Hasil Output yang Diharapkan:**
```text
Dieksekusi asinkron tanpa memblokir alur utama program
```

### 4. `ch := make(chan string); ch <- val; val := <-ch`
- **Fungsi Utama:** Saluran komunikasi antar goroutine (Channel).
- **Parameter / Atribut:** `Tipe data channel, kapasitas buffer`.
- **Perilaku & Efek Sistem:** Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa perlu lock/mutex manual.
- **Contoh Penggunaan Praktis:**
```javascript
ch := make(chan int)
go func() { ch <- 100 }()
result := <-ch
fmt.Println("Diterima:", result);
```
- **Hasil Output yang Diharapkan:**
```text
Diterima: 100
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
