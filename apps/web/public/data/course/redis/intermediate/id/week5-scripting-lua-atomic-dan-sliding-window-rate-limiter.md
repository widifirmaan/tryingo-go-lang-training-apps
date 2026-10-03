# Scripting Lua Atomic & Sliding Window Rate Limiter

> **Kategori:** Redis | **Level:** Scripting Lua, Streams & Klaster Terdistribusi | **Minggu 5:** Scripting Lua Atomic & Sliding Window Rate Limiter
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami mengapa Scripting Lua dieksekusi secara atomic mutlak di dalam Redis Event Loop
- Menggunakan perintah EVAL, SCRIPT LOAD, dan EVALSHA untuk optimasi bandwidth jaringan
- Mengimplementasikan algoritma Sliding Window Log Rate Limiter menggunakan Redis Sorted Sets (ZSET)
- Mencegah race condition tanpa perlu menggunakan distributed lock eksternal

---

## Program: Implementasi Sliding Window Log Rate Limiter Menggunakan Script Lua Atomic

```redis
-- Lua Script for High-Precision Sliding Window Log Rate Limiter
-- Evaluated atomically within Redis memory (EVAL command)
-- KEYS[1]: Rate limit key (e.g. "ratelimit:ip_192.168.1.100")
-- ARGV[1]: Current Unix Timestamp in milliseconds
-- ARGV[2]: Window Size in milliseconds (e.g. 60000 for 1 minute)
-- ARGV[3]: Maximum Allowed Requests in window (e.g. 10)

local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local max_requests = tonumber(ARGV[3])
local clear_before = now - window

-- Step 1: Remove all log entries older than current sliding window
redis.call('ZREMRANGEBYSCORE', key, 0, clear_before)

-- Step 2: Count how many requests occurred in the active window
local current_requests = redis.call('ZCARD', key)

-- Step 3: Check if request threshold breached
if current_requests < max_requests then
    -- Under limit: Add current request timestamp as member and score
    redis.call('ZADD', key, now, now)
    -- Extend TTL to auto-expire idle keys
    redis.call('PEXPIRE', key, window)
    return {1, max_requests - current_requests - 1} -- Allowed (1), Remaining quota
else
    return {0, 0} -- Denied (0), 0 remaining
end

-- Invocation from redis-cli:
-- EVAL "local key = KEYS[1] ... return {1, 9}" 1 "ratelimit:ip_192.168.1.100" 1710072000000 60000 10
```

---

## Konsep Kunci

### Mengapa Scripting Lua Bersifat Atomic Mutlak?
Di Redis, setiap script Lua yang dieksekusi melalui perintah `EVAL` atau `EVALSHA` diperlakukan sebagai satu instruksi tunggal yang tidak dapat diinterupsi (*atomic execution*). Selama script Lua berjalan, tidak ada perintah klien lain atau script lain yang dapat disisipkan atau dieksekusi. Ini memberikan kekuatan luar biasa: Anda dapat membaca data, membuat keputusan logika percabangan bisnis (`if/else`), dan menulis data kembali tanpa khawatir ada proses lain yang mengubah data di tengah-tengah proses tersebut.

### Algoritma Sliding Window Log Rate Limiter
Pendekatan rate limiter sederhana (*Fixed Window*, misal per menit kalender) memiliki kelemahan fatal: jika pengguna mengirim 10 request di detik 59 dan 10 request di detik 01 menit berikutnya, pengguna berhasil mengirim 20 request dalam jeda 2 detik!
**Sliding Window Log** memecahkan masalah ini dengan presisi absolut:
1. Menggunakan **Sorted Set** di mana nilai timestamp waktu mikrodetik bertindak sebagai score dan member.
2. Membuang seluruh request yang lebih tua dari jendela waktu (`ZREMRANGEBYSCORE 0 (now - window)`).
3. Menghitung sisa request (`ZCARD`). Jika masih di bawah batas, catat request baru (`ZADD`).

### Optimasi dengan SCRIPT LOAD dan EVALSHA
Mengirimkan teks kode script Lua yang panjang di setiap request API menghabiskan bandwidth jaringan. Perintah `SCRIPT LOAD` mengompilasi script sekali saja di server Redis dan mengembalikan hash SHA1 40-karakter. Aplikasi selanjutnya cukup memanggil `EVALSHA <sha1> ...` yang berukuran sangat kecil.

---

---

## Penjelasan untuk Pemula

Bayangkan pintu putar gedung bioskop yang dijaga satpam tegas. Satpam punya stopwatch.
Aturannya: 'Dalam 60 detik terakhir, hanya boleh ada 10 orang yang lewat'.
Setiap kali ada orang mau masuk, satpam melihat daftar catatan di tangannya: ia mencoret orang-orang yang masuk lebih dari 60 detik lalu, lalu menghitung sisanya. 

Karena satpam memeriksa dan mencatat semuanya sendiri tanpa ada yang boleh mengganggunya (Lua Atomic), tidak ada orang yang bisa menyelinap masuk lewat pintu putar!

## Eksperimen

- Muat script Lua ke Redis menggunakan SCRIPT LOAD dan eksekusi dengan EVALSHA
- Simulasikan penolakan request dengan menembakkan 15 request berurutan dan amati nilai return 0 (denied)
- Bandingkan performa transaksi MULTI/EXEC vs script Lua untuk operasi read-modify-write
- Uji batas waktu eksekusi lua-time-limit dan amati perintah SCRIPT KILL saat script macet dalam loop tak terbatas

---

## Tantangan

Tulis script Lua atomic untuk mengimplementasikan algoritma Token Bucket: simpan jumlah token dan last_refill_timestamp, hitung penambahan token baru berdasarkan waktu berlalu, dan kurangi 1 token jika tersedia.

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

### 1. `CREATE TABLE name ( col TYPE CONSTRAINT );`
- **Fungsi Utama:** Mendefinisikan skema tabel relasional.
- **Parameter / Atribut:** `Nama tabel, definisi kolom, batasan (PK, FK, NOT NULL)`.
- **Perilaku & Efek Sistem:** Menyiapkan tabel database dengan validasi tipe data presisi dan integritas data.
- **Contoh Penggunaan Praktis:**
```javascript
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
- **Hasil Output yang Diharapkan:**
```text
Tabel users siap menerima baris data
```

### 2. `SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;`
- **Fungsi Utama:** Query pembacaan dan penyaringan data.
- **Parameter / Atribut:** `Daftar kolom, kondisi WHERE, klausa urutan dan limit`.
- **Perilaku & Efek Sistem:** Mengambil rekaman data yang memenuhi kriteria pengujian secara efisien.
- **Contoh Penggunaan Praktis:**
```javascript
SELECT id, email FROM users WHERE created_at > NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 10;
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan 10 baris pengguna terbaru
```

### 3. `INSERT INTO tbl (cols) VALUES (vals) RETURNING id;`
- **Fungsi Utama:** Penyisipan baris baru dengan pengembalian nilai instan.
- **Parameter / Atribut:** `Kolom target, data masukan, klausa RETURNING`.
- **Perilaku & Efek Sistem:** Menyimpan data baru dan langsung mengembalikan nilai kolom yang digenerasi otomatis (seperti ID atau timestamp).
- **Contoh Penggunaan Praktis:**
```javascript
INSERT INTO users (email) VALUES ('alex@example.com') RETURNING id, created_at;
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan ID UUID yang baru dibuat
```

### 4. `SELECT * FROM a INNER JOIN b ON a.id = b.a_id;`
- **Fungsi Utama:** Penggabungan relasi antar tabel (Join).
- **Parameter / Atribut:** `Nama tabel, kondisi pencocokan kunci relasi ON`.
- **Perilaku & Efek Sistem:** Menggabungkan baris dari dua tabel berdasarkan relasi foreign key.
- **Contoh Penggunaan Praktis:**
```javascript
SELECT u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;
```
- **Hasil Output yang Diharapkan:**
```text
Daftar transaksi pesanan beserta email pemilik akun
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

Anda telah menguasai eksekusi atomic dengan Scripting Lua di Redis, optimasi SCRIPT LOAD / EVALSHA, dan implementasi Sliding Window Log Rate Limiter.
