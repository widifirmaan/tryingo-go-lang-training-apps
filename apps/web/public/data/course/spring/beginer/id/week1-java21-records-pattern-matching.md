# Modern Java 21 LTS: Records, Sealed Interfaces & Pattern Matching

> **Kategori:** Spring Boot & Java | **Level:** Pemula | **Minggu 1:** Modern Java 21 LTS: Records, Sealed Interfaces & Pattern Matching
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai fitur Java 21 LTS modern: `record`, `sealed interface`, dan enhanced switch pattern matching.
- Memahami manfaat immutability dalam pemodelan data finansial perbankan.
- Menerapkan exhaustive pattern matching yang divalidasi oleh kompilator javac.
- Menggunakan `BigDecimal` untuk perhitungan moneter bebas dari floating-point precision error.

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

Kamu telah menguasai fitur Java 21 modern: Records, Sealed Interfaces, dan Pattern Matching. Minggu depan kita masuk ke Spring Boot 3 Core dan Inversion of Control.
