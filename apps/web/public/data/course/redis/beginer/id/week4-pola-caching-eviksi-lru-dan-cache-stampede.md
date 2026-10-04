# Pola Caching, Kebijakan Eviksi LRU & Mitigasi Stampede

> **Kategori:** Redis | **Level:** Struktur Data In-Memory & Pola Caching | **Minggu 4:** Pola Caching, Kebijakan Eviksi LRU & Mitigasi Stampede
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami pola-pola arsitektur Caching: Cache-Aside, Write-Through, Write-Behind, dan Refresh-Ahead
- Mengonfigurasi kebijakan penggusuran memori Redis: allkeys-lru, volatile-lru, allkeys-lfu, dan noeviction
- Mendiagnosis tiga bahaya mematikan cache: Cache Penetration, Cache Breakdown (Stampede), dan Cache Avalanche
- Menerapkan solusi Mutex Lock dan Probabilistic Early Expiration (XFetch) untuk mencegah Dogpile Effect

---

## Program: Simulasi Pola Cache-Aside, Konfigurasi Memori Maksimal, dan Eviksi LRU

```redis
# 1. Inspect and configure maximum memory limits and eviction policies
CONFIG SET maxmemory 256mb

# Configure eviction algorithm: volatile-lru (evict least recently used keys with an expire set)
# Other options: allkeys-lru, allkeys-lfu, volatile-ttl, noeviction
CONFIG SET maxmemory-policy allkeys-lru

# 2. Inspect memory metrics and eviction stats
INFO memory

# 3. Cache-Aside Pattern workflow in application pseudocode:
# Step A: Check if key exists in Redis Cache
# GET product:details:prod_5501
# Step B: If found (CACHE HIT) -> return immediately
# Step C: If nil (CACHE MISS) -> Query PostgreSQL/MySQL
# Step D: Populate Redis cache with TTL to avoid stale data
SET product:details:prod_5501 '{"title": "Mechanical Keyboard", "price": 1200000}' EX 300

# 4. Mitigation of Cache Stampede (Dogpile Effect) using Mutex Locking
# When a hot key expires, hundreds of concurrent requests attempt to query DB simultaneously.
# Only the thread that successfully acquires this mutex lock queries the DB!
SET lock:rebuild:product:5501 "worker_uuid" NX EX 5

# Inspect eviction count to monitor if memory is under pressure
INFO stats
```

---

## Konsep Kunci

### Pola Arsitektur Cache-Aside
Dalam pola **Cache-Aside** (paling populer di industri):
1. Aplikasi membaca data dari Redis terlebih dahulu (*Cache Read*).
2. Jika data ditemukan (**Cache Hit**), data langsung dikembalikan ke klien (latensi < 1 milidetik).
3. Jika data tidak ada (**Cache Miss**), aplikasi mengambil data dari database relasional (PostgreSQL/MySQL), menyimpannya ke Redis dengan durasi TTL tertentu, lalu mengembalikannya ke klien.
4. Saat data diperbarui di database, aplikasi secara proaktif menghapus (*invalidate*) kunci di Redis.

### Kebijakan Penggusuran Memori (Eviction Policies)
Ketika data di Redis mencapai batas `maxmemory`, Redis harus memilih kunci mana yang akan dihapus:
- `allkeys-lru`: Menghapus kunci yang paling jarang diakses baru-baru ini (*Least Recently Used*) dari seluruh kunci.
- `volatile-lru`: Hanya menghapus kunci LRU yang memiliki batas kedaluwarsa (`EXPIRE`).
- `allkeys-lfu`: Menghapus kunci berdasarkan frekuensi akses paling rendah (*Least Frequently Used*).
- `noeviction`: Menolak operasi tulis baru dan mengembalikan pesan error `OOM command not allowed when used memory > 'maxmemory'`.

### Tiga Bahaya Mematikan Sistem Cache
1. **Cache Penetration**: Klien meminta data yang tidak ada di cache maupun di database (misal ID acak `-999`). Permintaan selalu tembus ke database. Solusi: *Bloom Filters* atau menyimpan nilai kosong dengan TTL singkat.
2. **Cache Breakdown (Stampede / Dogpile Effect)**: Sebuah kunci populer (*hot key*, misal produk flash sale) kedaluwarsa tepat saat ribuan request datang bersamaan. Seluruh request serentak menembus database relasional hingga server tumbang. Solusi: *Distributed Mutex* agar hanya 1 request yang me-rebuild cache.
3. **Cache Avalanche**: Ribuan kunci cache disetel kedaluwarsa pada detik yang persis sama. Solusi: Menambahkan jitter waktu acak (*Random TTL Jitter*).

---

---

## Penjelasan untuk Pemula

Bayangkan Anda membuka warung fotokopi di depan kampus. 
Cache-Aside seperti memfotokopi 5 lembar modul kuliah terpopuler dan menaruhnya di meja depan. Jika ada mahasiswa datang minta modul itu (Cache Hit), Anda langsung menyerahkannya dalam 1 detik. Jika mahasiswa meminta modul langka (Cache Miss), Anda harus berjalan ke gudang belakang untuk memfotokopinya dulu.

Eviksi LRU seperti meja depan yang terbatas: jika meja penuh, modul yang sudah 3 hari tidak ada yang membeli disingkirkan ke gudang belakang. Sedangkan Cache Stampede seperti saat modul ujian tiba-tiba habis tepat ketika 500 mahasiswa menyerbu kasir secara serempak!

## Eksperimen

- Set maxmemory ke 2MB di instance lokal, masukkan banyak key dan amati evicted_keys bertambah di INFO stats
- Simulasikan Cache Avalanche: buat 100 key dengan TTL 5 detik yang sama persis dan amati penurunan drastis key di INFO keyspace
- Terapkan jitter acak: TTL = 300 + Math.floor(Math.random() * 60) dan perhatikan distribusi kedaluwarsa yang merata
- Uji mode noeviction dan amati error yang dihasilkan saat memori penuh

---

## Tantangan

Implementasikan algoritma penanganan Cache Stampede berbasis Mutex: saat cache miss terjadi, gunakan `SET lock:{key} NX EX 5`. Jika berhasil acquire lock, baca DB dan isi cache; jika gagal, lakukan retry loop dengan sleep 50ms.

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

Anda telah menguasai pola arsitektur Caching (Cache-Aside), konfigurasi kebijakan eviksi memori (allkeys-lru), dan mitigasi risiko Cache Penetration, Avalanche, dan Stampede.
