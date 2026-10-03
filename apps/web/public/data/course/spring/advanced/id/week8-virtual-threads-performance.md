# Konkurensi Skala Tinggi: Java 21 Virtual Threads (Project Loom) di Spring Boot 3

> **Kategori:** Spring Boot & Java | **Level:** Lanjutan | **Minggu 8:** Konkurensi Skala Tinggi: Java 21 Virtual Threads (Project Loom) di Spring Boot 3
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami revolusi Project Loom dan arsitektur Virtual Threads di Java 21.
- Mengetahui perbedaan Carrier Threads (Platform Threads OS) vs Virtual Threads berbasis JVM.
- Mengaktifkan Virtual Threads di Spring Boot 3 dengan satu baris konfigurasi (`spring.threads.virtual.enabled=true`).
- Menerapkan Structured Concurrency untuk menghindari kebocoran thread (Thread Leaks).

---

## Program: Batch Settlement Perbankan Konkuren 10.000 Tugas dengan Virtual Threads

```java
package com.tryngo.banking.loom;

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
```

---

## Konsep Kunci

Selama lebih dari dua dekade, satu thread di Java (`java.lang.Thread`) dipetakan 1:1 ke kernel thread sistem operasi. Karena satu OS thread membutuhkan memori stack sekitar 1MB, server Java tradisional akan kehabisan memori jika menangani lebih dari beberapa ribu thread bersamaan.

### Revolusi Virtual Threads (Project Loom)
Virtual Threads di Java 21 adalah thread ringan yang dikelola langsung oleh runtime JVM, bukan sistem operasi. Satu virtual thread hanya membutuhkan memori beberapa ratus byte. Anda dapat membuat **1.000.000 virtual thread** sekaligus di satu laptop tanpa mengalami OutOfMemoryError.

### Unmounting Saat Operasi I/O
Ketika sebuah virtual thread melakukan operasi blocking I/O (seperti `Thread.sleep()`, query database JPA, atau panggilan HTTP eksternal), runtime Java secara otomatis melepaskannya (**unmount**) dari carrier thread sistem operasi. Carrier thread tersebut langsung bebas melayani ribuan tugas lainnya. Begitu operasi I/O selesai, virtual thread di-**mount** kembali secara instan.

### Integrasi Virtual Threads di Spring Boot 3
Mulai Spring Boot 3.2+, Anda tidak perlu lagi menulis kode reaktif yang rumit (`WebFlux` / `Mono` / `Flux`) hanya untuk mendapatkan skalabilitas tinggi. Cukup tambahkan:
`spring.threads.virtual.enabled=true`
Spring Boot akan otomatis mengonfigurasi embedded Tomcat dan TaskExecutors untuk menjalankan setiap HTTP request di atas virtual thread mandiri.


---

---

## Penjelasan untuk Pemula

Bayangkan sebuah bandara dengan 8 landasan pacu (Carrier Threads OS). Di masa lalu, jika sebuah pesawat parkir menunggu penumpang selama 3 jam, pesawat itu memblokir seluruh landasan pacu sehingga pesawat lain tidak bisa mendarat. Dengan Virtual Threads, pesawat langsung ditarik ke hanggar parkir miniatur saat menunggu, membiarkan landasan pacu terus dipakai pesawat lain tanpa henti.

## Eksperimen

- Jalankan program dengan `Executors.newFixedThreadPool(100)` dan bandingkan total waktu penyelesaian dengan Virtual Threads.
- Aktifkan `spring.threads.virtual.enabled=true` di Spring Boot dan amati nama thread pada log Tomcat (`virtual-XX`).
- Uji coba simulasi 100.000 virtual threads dan pantau konsumsi RAM menggunakan `jconsole` atau `VisualVM`.

---

## Tantangan

Gunakan Java 21 `StructuredTaskScope` untuk memanggil 3 API kurs valuta asing (FX Rate) secara paralel dan ambil respons tercepat (Racing/First-Success pattern).

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

Kamu telah menguasai Virtual Threads Java 21 dan Project Loom di Spring Boot 3. Minggu depan kita mempelajari Distributed Caching Redis dan Ketahanan Sistem dengan Resilience4j.
