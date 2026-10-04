# Sorted Sets (ZSET) & HyperLogLog untuk Big Data

> **Kategori:** Redis | **Level:** Struktur Data In-Memory & Pola Caching | **Minggu 3:** Sorted Sets (ZSET) & HyperLogLog untuk Big Data
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami struktur internal Sorted Sets (kombinasi SkipList dan Hash Table berkecepatan O(log N))
- Membangun sistem papan peringkat (Leaderboard) real-time dengan ZADD, ZINCRBY, dan ZREVRANK
- Memahami konsep algoritma probabilistik Cardinality Estimation dengan HyperLogLog
- Menghemat gigabyte memori menggunakan HyperLogLog (12KB fixed size) untuk tracking jutaan pengguna unik

---

## Program: Leaderboard Gaming Real-Time dengan ZSET dan Estimasi Unique Visitors dengan HyperLogLog

```redis
# 1. SORTED SETS (ZSET): Elements sorted by a floating-point score (SkipList + HashTable)
# Add players and initial game scores
ZADD leaderboard:weekly 1450 "player:alpha"
ZADD leaderboard:weekly 2800 "player:bravo"
ZADD leaderboard:weekly 1950 "player:charlie"
ZADD leaderboard:weekly 3200 "player:delta"

# Increment player score atomically when they complete a quest (+350 points)
ZINCRBY leaderboard:weekly 350 "player:alpha"

# Get Top 3 highest scoring players with their scores (0-indexed, descending)
ZREVRANGE leaderboard:weekly 0 2 WITHSCORES

# Determine exact rank of a specific player (0-indexed rank: 0 is highest)
ZREVRANK leaderboard:weekly "player:bravo"

# Inspect the exact score of a player
ZSCORE leaderboard:weekly "player:bravo"

# Count total players who scored between 1500 and 3000 points
ZCOUNT leaderboard:weekly 1500 3000

# Paginated Leaderboard Query: Get players ranked 10 to 20
ZREVRANGE leaderboard:weekly 10 20 WITHSCORES

# 2. HYPERLOGLOG (HLL): Probabilistic data structure for estimating cardinalities of billions of items
# Uses ONLY 12KB of fixed memory with standard error of <= 0.81%!
# Track unique daily visitors across distributed servers
PFADD uvc:2026-03-10 "user_ip_192.168.1.1" "user_ip_192.168.1.2" "user_ip_192.168.1.3"
PFADD uvc:2026-03-10 "user_ip_192.168.1.1" # Duplicate entry: will NOT increase cardinality!

# Get estimated unique count
PFCOUNT uvc:2026-03-10

# Merge multiple daily HyperLogLogs into a weekly unique visitor metric without recalculating
PFADD uvc:2026-03-11 "user_ip_192.168.1.1" "user_ip_192.168.1.9"
PFMERGE uvc:weekly_rollup uvc:2026-03-10 uvc:2026-03-11
PFCOUNT uvc:weekly_rollup
```

---

## Konsep Kunci

### Arsitektur Sorted Sets (ZSET) dan SkipList
**Sorted Sets** adalah salah satu struktur data tercanggih di Redis. Setiap elemen terdiri dari string anggota (*member*) dan nilai skor numerik (*score*). Di balik layar, Redis menggabungkan dua struktur data:
1. **Hash Table**: Memetakan member ke score untuk pencarian $O(1)$ instan.
2. **SkipList**: Struktur data probabilistik bertingkat yang menjaga seluruh elemen tetap terurut berdasarkan score dengan kompleksitas penyisipan dan pencarian rentang $O(\log N)$.
Hal ini memungkinkan kita mencari peringkat pemain dari 10 juta peserta game dalam hitungan pecahan mikrodetik.

### HyperLogLog: Keajaiban Matematika Big Data
Jika Anda ingin menghitung jumlah pengunjung unik (*Unique Visitors*) sebuah situs berita dengan 100 juta pengunjung harian menggunakan Set konvensional (`SADD`), menyimpan 100 juta string UUID membutuhkan memori lebih dari **4 Gigabyte RAM**.
**HyperLogLog (HLL)** adalah algoritma probabilistik yang memperkirakan jumlah data unik (*cardinality*). Hebatnya:
- HLL hanya mengonsumsi memori konstan sebesar **12 Kilobyte** berapapun jumlah datanya (bahkan untuk miliaran pengguna unik!).
- Tingkat toleransi kesalahan (*standard error*) matematisnya sangat kecil, yaitu hanya **0.81%**, yang sangat dapat diterima untuk analitik trafik web.

---

---

## Penjelasan untuk Pemula

Bayangkan papan skor turnamen balap mobil (Sorted Set). Setiap kali pembalap menyalip, skornya bertambah dan posisinya di layar TV langsung naik secara otomatis detik itu juga.

HyperLogLog seperti penjaga pintu festival musik yang menggunakan alat penghitung klik mekanis pintar. Penjaga pintu tidak perlu mencatat nomor KTP setiap penonton di buku tebal (yang menghabiskan berton-ton kertas). Ia menggunakan perkiraan statistik cerdas sehingga buku catatannya hanya berukuran sebesar kartu nama tipis (12KB) tetapi bisa memperkirakan 1 juta penonton dengan ketepatan 99%!

## Eksperimen

- Masukkan 10.000 skor acak ke dalam ZSET dan amati seberapa cepat ZREVRANK mengembalikan peringkat pemain
- Uji operasi ZREMRANGEBYRANK untuk mempertahankan hanya 100 pemain teratas dan membuang sisanya secara efisien
- Bandingkan MEMORY USAGE antara SET berisi 100.000 string vs HyperLogLog yang diisi 100.000 string yang sama
- Gunakan PFMERGE untuk menggabungkan metrik pengunjung unik dari 7 hari menjadi laporan mingguan

---

## Tantangan

Rancang sistem peringkat dinamis dengan penalti waktu: skor akhir dihitung dari `poin_murni - (detik_selesai * 0.01)`, dan buat query untuk menampilkan 10 pemain teratas beserta selisih poinnya dari peringkat 1.

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
```output
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
```output
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
```output
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
```output
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

Anda telah menguasai struktur data Sorted Sets (ZSET) untuk leaderboard real-time berkecepatan mikrodetik dan HyperLogLog untuk penghitungan big data kardinalitas tinggi dengan memori konstan 12KB.
