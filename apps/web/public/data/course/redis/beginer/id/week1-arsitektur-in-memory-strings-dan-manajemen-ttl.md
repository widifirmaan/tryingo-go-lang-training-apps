# Arsitektur In-Memory, Strings & Manajemen TTL (Time-To-Live)

> **Kategori:** Redis | **Level:** Struktur Data In-Memory & Pola Caching | **Minggu 1:** Arsitektur In-Memory, Strings & Manajemen TTL (Time-To-Live)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami arsitektur Single-Threaded Event Loop Redis dan multiplexing I/O epoll/kqueue
- Menguasai tipe data String dan operasi nilai angka atomic: INCR, INCRBY, DECR
- Mengelola siklus hidup data cache dengan parameter EX, PX, EXPIRE, dan pemantauan TTL
- Mengimplementasikan primitive lock dasar menggunakan perintah SET dengan opsi NX dan EX

---

## Program: Manajemen Sesi Pengguna dan Atomic Counter dengan Expiration

```redis
# Redis CLI Commands Demonstration
# 1. Store serialized JSON session with explicit Time-To-Live (3600 seconds)
SET session:usr_8921 '{"userId": 8921, "role": "admin", "tenant": "corp_alpha"}' EX 3600

# 2. Check remaining lifetime in seconds
TTL session:usr_8921

# 3. Retrieve session payload
GET session:usr_8921

# 4. Atomic Counter: Page visit counter incrementing safely under high concurrency
INCR stats:page_views:home:2026-03-10

# Increment by custom batch step
INCRBY stats:page_views:home:2026-03-10 15

# Set expiration on the metrics key (keep for 7 days = 604800 seconds)
EXPIRE stats:page_views:home:2026-03-10 604800

# 5. Conditional Insertion (SETNX: Set if Not Exists) - Foundational Distributed Mutex
# Sets lock key ONLY if it does not already exist, with 10-second automatic safety release
SET lock:order_processing:ord_9901 "worker_node_01" NX EX 10

# Attempting to acquire the same lock concurrently fails (returns nil)
SET lock:order_processing:ord_9901 "worker_node_02" NX EX 10

# Safe lock release
DEL lock:order_processing:ord_9901

# 6. Bulk read and write operations to minimize network round trips (pipelining benefits)
MSET config:maintenance_mode "false" config:max_upload_mb "50" config:api_version "v2.1"
MGET config:maintenance_mode config:max_upload_mb
```

---

## Konsep Kunci

### Mengapa Redis Super Cepat? Arsitektur Single-Threaded Event Loop
Mitos umum mengatakan sistem multi-threaded selalu lebih cepat. Kenyataannya, Redis mampu melayani lebih dari 100.000 permintaan per detik (*ops/sec*) pada satu core CPU sederhana karena arsitektur **Single-Threaded Event Loop**. 
1. Seluruh dataset disimpan murni di **RAM** (latensi memori nanodetik vs latensi disk milidetik).
2. Tidak ada overhead penguncian thread (*lock contention*), tidak ada race condition internal, dan tidak ada biaya *context switching* CPU.
3. Menggunakan **I/O Multiplexing** (`epoll` di Linux atau `kqueue` di macOS) untuk menangani puluhan ribu koneksi soket jaringan secara non-blocking dalam satu thread.

### Tipe Data String Bukan Sekadar Teks
Di Redis, tipe **String** adalah *binary-safe*, artinya dapat menyimpan apa saja hingga ukuran 512MB: string teks, representasi JSON terkompresi, gambar biner kecil, atau angka. Jika string berisi angka, Redis mengizinkan operasi matematis atomic seperti `INCRBY`. Operasi ini terjamin atomic secara mutlak: 1.000 thread konkuren yang memanggil `INCR` secara simultan dijamin menaikkan counter tepat 1.000 kali tanpa kehilangan angka.

### SET NX EX: Primitif Kunci Mutex
Perintah `SET key value NX EX seconds`:
- `NX` (*Not Exists*): Hanya menetapkan nilai jika kunci belum pernah ada. Jika kunci sudah ada, perintah gagal (*nil*).
- `EX`: Menentukan waktu kedaluwarsa dalam detik. Opsi ini krusial: jika proses aplikasi yang memegang kunci crash mendadak, Redis akan otomatis melepaskan kunci setelah batas detik tercapai, mencegah *system deadlock*.

---

---

## Penjelasan untuk Pemula

Bayangkan Redis seperti kasir tunggal super cepat di sebuah kedai kopi. Karena kasirnya hanya satu orang jenius yang mengingat semua pesanan di kepalanya (RAM) tanpa pernah mencatat di kertas lambat (Disk), ia bisa melayani 100 orang per detik tanpa pernah bertabrakan dengan pelayan lain.

`SET NX` seperti menaruh tanda 'Sedang Dipakai' di pintu toilet. Jika pintu sudah terkunci dari dalam, orang lain tidak bisa masuk. Tanda `EX 10` memastikan gembok otomatis terbuka sendiri setelah 10 menit jika orang di dalam pingsan.

## Eksperimen

- Set sebuah kunci dengan EX 5, jalankan TTL berkali-kali setiap detik sampai nilainya berubah menjadi -2 (kunci terhapus)
- Jalankan INCRBY pada string yang berisi teks alfabet dan amati error ERR value is not an integer or out of range
- Simulasikan benchmark throughput lokal menggunakan utilitas resmi redis-benchmark -q -n 100000 -c 50
- Gunakan perintah KEYS * vs SCAN 0 MATCH session:* dan pahami mengapa KEYS dilarang di production

---

## Tantangan

Rancang sistem penghitung kuota API sederhana (Rate Limiter primitif) per IP per menit menggunakan kombinasi perintah `INCR` dan penambahan `EXPIRE 60` hanya ketika counter bernilai 1.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR IN-MEMORY SINGLE-THREADED REDIS               │
│                                                          │
│ Klien TCP Request ──► I/O Multiplexing (epoll/kqueue)    │
│                              │                           │
│                              ▼                           │
│                 Pusat Eksekusi Command                   │
│                 (O(1) Super Cepat di RAM)                │
│                 ┌───────────────────────────┐            │
│                 │ STRINGS: 'user:1' -> JSON │            │
│                 │ HASHES:  'cart:9' -> Fields│           │
│                 │ SETS:    'online_users'   │            │
│                 │ STREAMS: 'event_log'      │            │
│                 └─────────────┬─────────────┘            │
│                               │                          │
│                               ▼                          │
│              Persistensi Latar Belakang (AOF / RDB)      │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `SET key value [EX seconds] / GET key`
- **Fungsi Utama:** Operasi string in-memory tercepat.
- **Parameter / Atribut:** `Key identifier, Value payload, Expiration (EX)`.
- **Perilaku & Efek Sistem:** Menyimpan dan mengambil cache data dalam hitungan sub-milidetik dengan batas kedaluwarsa otomatis..
- **Contoh Penggunaan Praktis:**
```redis
SET session:user_99 '{"role":"admin"}' EX 3600
GET session:user_99
```
- **Hasil Output yang Diharapkan:**
```text
"{\"role\":\"admin\"}"
```

### 2. `HSET key field value / HGETALL key`
- **Fungsi Utama:** Struktur data Hash penyimpanan objek.
- **Parameter / Atribut:** `Key, Field name, Value`.
- **Perilaku & Efek Sistem:** Menyimpan banyak atribut objek di bawah satu key tanpa perlu serialisasi JSON berat..
- **Contoh Penggunaan Praktis:**
```redis
HSET user:101 name "Alex" role "developer" active "true"
HGETALL user:101
```
- **Hasil Output yang Diharapkan:**
```text
1) "name" 2) "Alex" 3) "role" 4) "developer"
```

### 3. `LPUSH queue job / RPOP queue`
- **Fungsi Utama:** Struktur List untuk Message Queue FIFO.
- **Parameter / Atribut:** `Key queue, Payload job`.
- **Perilaku & Efek Sistem:** Mengimplementasikan antrean tugas asinkron super cepat antar pekerja worker..
- **Contoh Penggunaan Praktis:**
```redis
LPUSH email_queue "kirim_verifikasi_user_1"
RPOP email_queue
```
- **Hasil Output yang Diharapkan:**
```text
"kirim_verifikasi_user_1"
```

### 4. `PUBLISH channel message / SUBSCRIBE channel`
- **Fungsi Utama:** Pub/Sub komunikasi real-time event.
- **Parameter / Atribut:** `Channel name, Message payload`.
- **Perilaku & Efek Sistem:** Menyiarkan pesan ke jutaan listener secara instan untuk chat atau notifikasi langsung..
- **Contoh Penggunaan Praktis:**
```redis
PUBLISH notifications:global "Server maintenance jam 23:00"
```
- **Hasil Output yang Diharapkan:**
```text
(integer) 1 (Pesan terkirim ke 1 subscriber)
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Lupa Menetapkan TTL (Time-To-Live) pada Kunci Cache
- **Gejala / Masalah:** Memori RAM Redis penuh (*Out of Memory*) dan mematikan fungsi penyimpanan kunci baru.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu tentukan masa kedaluwarsa pada kunci cache: `SET key val EX 3600` (1 jam).

### 2. Menjalankan Perintah `KEYS *` di Server Produksi
- **Gejala / Masalah:** Redis adalah single-threaded; `KEYS *` memblokir seluruh operasi database selama beberapa detik.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan perintah kursor non-blocking `SCAN` untuk mencari pola kunci di produksi.

### 3. Menyimpan Objek Raksasa dalam Satu Key Tunggal
- **Gejala / Masalah:** Memicu latensi jaringan tinggi saat transfer data dan membebani alokasi memori Redis.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pecah objek raksasa ke dalam struktur `HSET` (Hash) atau simpan hanya data esensial yang sering diakses.

---

## Ringkasan

Anda telah memahami arsitektur Single-Threaded Event Loop Redis, manipulasi tipe String dan atomic counter, manajemen siklus hidup TTL, serta dasar mutex lock dengan SET NX EX.
