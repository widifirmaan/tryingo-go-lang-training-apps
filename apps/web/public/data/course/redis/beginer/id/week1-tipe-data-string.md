## Kenapa Materi Ini Penting

Redis adalah database in-memory secepat kilat - dipakai semua sistem besar untuk cache, leaderboard, session, dan rate limit. Satu fitur kecil "tambah cache Redis" sering menghemat biaya server lebih banyak dari refactor berbulan-bulan.

Program latihan: *"Operasi String Redis"*. Jalankan kode di Playground untuk mempelajari alur kerjanya.


## Tujuan Pembelajaran

- SET dan GET
- MSET dan MGET
- INCR, DECR, INCRBY
- SET dengan TTL (EX, PX)
- SET NX untuk locking


## Fondasi: Sebelum Menulis Kode

Panduan dasar berikut merangkum konsep pemrograman inti yang berlaku universal.

- **File & folder = tempat program tinggal.** Program hanyalah teks biasa yang disimpan dalam file (contoh: `belajar.md`). File punya **ekstensi** yang menunjukkan bahasanya: `.md`, `.go`, `.py`, `.html`. Satu folder berisi semua file program disebut **project**.
- **Terminal / command line.** Jendela hitam tempat kita mengetik perintah teks: `cd folder` (pindah folder), `ls` / `dir` (lihat isi folder), `go run main.go` (jalankan program). Program dijalankan dari folder tempat file-nya berada.
- **Compiled vs interpreted.** Bahasa **compiled** (Go, Rust, C#) diterjemahkan dulu seluruh program menjadi instruksi mesin sebelum jalan - cepat, tapi harus "di-build" dulu. Bahasa **interpreted** (Python, PHP, JavaScript) dieksekusi baris per baris langsung - cocok untuk belajar & prototipe cepat. Playground di website ini mengeksekusi kode **di browser**, jadi Anda bisa mencoba materi tanpa install apa pun.
- **Statically typed vs dynamically typed.** Bahasa **statically typed** (Go, Rust, TypeScript) mewajibkan/mengecek tipe data (angka, teks) saat ditulis - error tertangkap lebih awal. Bahasa **dynamically typed** (Python, PHP, JavaScript) cek tipe saat program berjalan - lebih longgar, error baru muncul saat runtime.
- **Cara membaca pesan error.** Baca baris paling bawah dulu: jenis error + penjelasan singkatnya, lalu cari **nomor baris** yang disebut. Error bukan tragis - itulah cara komputer memberi tahu ada yang perlu diperbaiki.
- **REPL / playground.** REPL (Read-Eval-Print Loop) = "kalkulator" kode: ketik satu baris, langsung terlihat hasilnya. Tombol **Coba di Playground** di setiap blok kode memungkinkan Anda mengubah kode dan menjalankannya langsung - inilah cara tercepat belajar: ubah sedikit, jalankan, lihat bedanya.

> **Catatan penting:** playground di browser memiliki batasan - tidak menerima input keyboard interaktif (stdin). Jika sebuah tantangan meminta "input dari pengguna", cukup tulis nilainya langsung ke variabel (contoh: `let nama = "Budi"`; `rupiah = 250000`), lalu jalankan.

---

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

> **Coba langsung di browser tanpa instalasi.** Semua blok kode dapat dijalankan langsung di Playground.

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Instalasi Runtime & Dependency (Redis 7 (via Docker))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
docker run -d --name redis-dev -p 6379:6379 -v redisdata:/data redis:alpine redis-server --appendonly yes
```

**macOS (Terminal / Homebrew):**
```bash
brew install redis && brew services start redis
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install -y redis-server && sudo systemctl start redis
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
docker exec -it redis-dev redis-cli ping
```

Output yang diharapkan:
```output
PONG
```

> **Tips Prasyarat:** Flag `--appendonly yes` memastikan persistence AOF aktif sehingga data tersimpan ke disk.

---

### 2. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
docker exec -it redis-dev redis-cli
```
- **Keterangan:** Membuka prompt perintah redis-cli untuk mengeksekusi operasi data langsung.
- **Pindah ke direktori project:**
```bash
# Terhubung ke redis-cli
```

---

### 3. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
KEYS *
```
Akses di browser atau terminal: `localhost:6379`

> ℹ️ Redis mengembalikan daftar semua key yang tersimpan di memori.

**File Titik Masuk Utama (`commands.redis`):**
```text
# Caching string dengan TTL 60 detik
SET user:session:101 "token_abc123" EX 60
GET user:session:101
TTL user:session:101

# Hash struktur data
HSET user:profile:101 name "Budi" role "admin" points 150
HGETALL user:profile:101

# Pub/Sub atau Streams
XADD mystream * sensor "temp" value 28.5
```
Kumpulan perintah esensial Redis: String dengan TTL, Hashes, dan Streams.

---

### 4. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
redis-cache/
├── docker-compose.yml   # Layanan Redis dengan volume persistensi
└── redis.conf           # Konfigurasi memory policy (eviction)
```
Struktur konfigurasi Redis in-memory.

---

### 5. Tips & Best Practice untuk Pemula
- Selalu tentukan TTL (`EX <detik>`) pada key caching untuk mencegah memori RAM server penuh.
- Gunakan `SCAN 0 MATCH prefix:*` daripada `KEYS *` di server production untuk menghindari blocking.

---

## Program: Operasi String Redis

```shell
# String: operasi dasar
SET user:1001 "Budi Santoso"
GET user:1001

# SET dengan expiry (TTL)
SET session:abc123 "active" EX 3600  # 1 jam
TTL session:abc123

# Multiple set/get
MSET product:1 "Laptop" product:2 "Mouse" product:3 "Keyboard"
MGET product:1 product:2 product:3

# Increment/Decrement
SET counter:visitors 0
INCR counter:visitors
INCRBY counter:visitors 5
DECR counter:visitors
DECRBY counter:visitors 2
GET counter:visitors

# Append & Strlen
SET greeting "Hello"
APPEND greeting " World"
STRLEN greeting

# Set jika tidak ada (untuk locking)
SET lock:resource "locked" NX EX 10
SET lock:resource "locked" NX EX 10  # Gagal, sudah ada

# GETSET (atomic get + SET)
GETSET counter:visitors 0
```

---

## Konsep Kunci

### String
Tipe data dasar Redis. Bisa simpan text, integer, binary.

### SET & GET
Simpan dan ambil value.

### Multiple
MSET/MGET untuk operasi batch.

### Increment
INCR/DECR atomic counter.

### TTL
EX (detik), PX (milidetik). TTL untuk cek sisa waktu.

---

## Eksperimen

- SET vs SETNX
- BITCOUNT untuk bit
- SETRANGE
- String sebagai counter rate limiter

---

## Tantangan

Session store: simpan session dengan TTL, cek expired.

---

## Ringkasan

Minggu 1 dari 10: **Tipe Data & String** (Pemula).
