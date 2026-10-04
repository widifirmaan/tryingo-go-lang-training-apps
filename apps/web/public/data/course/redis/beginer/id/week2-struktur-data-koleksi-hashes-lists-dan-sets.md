# Struktur Data Koleksi: Hashes, Lists & Sets

> **Kategori:** Redis | **Level:** Struktur Data In-Memory & Pola Caching | **Minggu 2:** Struktur Data Koleksi: Hashes, Lists & Sets
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memanfaatkan Redis Hashes untuk menyimpan objek terstruktur dan menghemat memori (ziplist/listpack encoding)
- Membangun antrean pesan FIFO berkecepatan tinggi menggunakan Lists (LPUSH dan RPOP / BRPOP)
- Menggunakan Sets untuk memastikan keunikan data dan operasi himpunan matematika (SINTER, SUNION, SDIFF)
- Memahami kompleksitas waktu masing-masing operasi struktur data Redis (O(1) vs O(N))

---

## Program: Profil Objek dengan Hashes, Antrean Job FIFO dengan Lists, dan Tag Unik dengan Sets

```redis
# 1. HASHES: Ideal for representing structured objects without JSON serialization overhead
# Store user profile fields individually
HSET user:profile:1001 name "Dewi Sartika" email "dewi@example.com" login_count 1 tier "gold"

# Increment specific numerical hash field atomically
HINCRBY user:profile:1001 login_count 1

# Retrieve single field, multiple fields, or entire object
HGET user:profile:1001 email
HMGET user:profile:1001 name tier
HGETALL user:profile:1001

# 2. LISTS: Ordered sequence of strings implemented as dual-ended linked lists (Quicklist)
# Push jobs into a background worker queue (Producer)
LPUSH queue:email_jobs '{"to": "dewi@example.com", "template": "welcome"}'
LPUSH queue:email_jobs '{"to": "ahmad@example.com", "template": "invoice"}'

# Inspect queue length
LLEN queue:email_jobs

# Worker pops job from right (Consumer FIFO: First-In, First-Out)
RPOP queue:email_jobs

# Blocking Pop: Worker sleeps waiting for new jobs without polling CPU (timeout 5s)
# BRPOP queue:email_jobs 5

# 3. SETS: Unordered collection of unique strings (O(1) membership checks and mathematical unions)
# Add follower tags
SADD user:tags:1001 "tech" "investing" "crypto" "ai"
SADD user:tags:1002 "tech" "design" "ai" "gaming"

# Test membership: Does user 1001 have "investing" tag? (Returns 1)
SISMEMBER user:tags:1001 "investing"

# Mathematical Intersection: Find mutual interests between user 1001 and 1002
SINTER user:tags:1001 user:tags:1002

# Union: Combine all unique interests across both users
SUNION user:tags:1001 user:tags:1002

# Difference: Interests unique to user 1001 not shared by 1002
SDIFF user:tags:1001 user:tags:1002
```

---

## Konsep Kunci

### Hashes: Representasi Objek Hemat RAM
Menyimpan objek pengguna dalam format serialized JSON String (`"{"name": "..."}"`) memiliki dua kelemahan: untuk mengubah satu field saja (misal `login_count`), aplikasi harus mengambil seluruh string JSON, mem-parse, mengubah, dan menimpa semuanya ke Redis. Dengan **Hashes** (`HSET / HGET`), Anda dapat memodifikasi satu field tertentu secara individual. Di balik layar, Redis mengompresi Hashes kecil menggunakan struktur memori hemat yang disebut **listpack/ziplist**.

### Lists: Antrean FIFO dan Pola Blocking Worker
Redis **List** diimplementasikan sebagai linked list ganda (*quicklist*). Menyisipkan data di ujung kiri (`LPUSH`) atau mengambil data di ujung kanan (`RPOP`) memiliki kompleksitas $O(1)$ instan, tidak peduli apakah list berisi 10 elemen atau 10 juta elemen. Perintah `BRPOP` (*Blocking Right Pop*) membuat thread worker tertidur pulas (*sleep*) dan langsung terbangun saat ada job baru masuk, mengeliminasi polling boros CPU.

### Sets: Aljabar Himpunan dan Graf Relasi
Redis **Sets** menyimpan kumpulan string unik tanpa duplikasi. Penambahan data (`SADD`) dan pengecekan anggota (`SISMEMBER`) berjalan dalam kompleksitas waktu $O(1)$. Kekuatan terbesar Sets terletak pada operasi aljabar himpunan server-side:
- `SINTER`: Menghitung perpotongan dua himpunan (misal mencari *mutual friends* atau kesamaan minat belanja).
- `SDIFF`: Menghitung selisih himpunan. Seluruh kalkulasi dieksekusi langsung di memori RAM Redis dengan kecepatan mikrodetik.

---

---

## Penjelasan untuk Pemula

Bayangkan Hashes seperti buku formulir data diri di mana tiap baris (nama, umur, alamat) bisa dihapus dan diganti secara terpisah tanpa harus merobek seluruh lembaran.

Lists seperti antrean barisan orang membeli tiket bioskop (antrean FIFO): orang baru berdiri di antrean paling belakang (LPUSH), dan yang dilayani pertama adalah orang di posisi paling depan (RPOP).
Sets seperti keranjang stempel kartu unik: Anda tidak bisa menaruh dua stempel yang sama persis, dan Anda bisa membandingkan isi keranjang Anda dengan teman untuk melihat stempel apa saja yang kalian berdua sama-sama miliki (SINTER).

## Eksperimen

- Bandingkan penggunaan memori (MEMORY USAGE) antara 1.000 user yang disimpan sebagai JSON string vs disimpan sebagai Hash
- Simulasikan worker antrean: jalankan BRPOP di terminal 1, lalu lakukan LPUSH di terminal 2 untuk melihat worker terbangun
- Gunakan SADD dengan 10 item di mana 5 item bernilai duplikat dan amati jumlah item unik yang sebenarnya tersimpan
- Gunakan perintah SPOP untuk mengambil dan menghapus elemen acak dari Set (berguna untuk undian lucky draw)

---

## Tantangan

Bangun sistem rekomendasi produk sederhana: simpan daftar kategori yang dilihat pengguna dalam Sets (`user:views:{id}`), dan cari pengguna lain yang memiliki minat serupa menggunakan `SINTERSTORE` dan `SCARD`.

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

Anda telah menguasai struktur data koleksi Redis: representasi objek efisien dengan Hashes, antrean FIFO dengan Lists & BRPOP, serta aljabar himpunan dengan Sets.
