# Arsitektur In-Memory, Strings & Manajemen TTL (Time-To-Live)

> **Kategori:** Redis | **Level:** Struktur Data In-Memory & Pola Caching | **Minggu 1:** Arsitektur In-Memory, Strings & Manajemen TTL (Time-To-Live)

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

## Ringkasan

Anda telah memahami arsitektur Single-Threaded Event Loop Redis, manipulasi tipe String dan atomic counter, manajemen siklus hidup TTL, serta dasar mutex lock dengan SET NX EX.
