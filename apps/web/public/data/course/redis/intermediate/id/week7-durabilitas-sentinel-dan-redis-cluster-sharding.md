# Durabilitas (RDB/AOF), Sentinel HA & Redis Cluster

> **Kategori:** Redis | **Level:** Scripting Lua, Streams & Klaster Terdistribusi | **Minggu 7:** Durabilitas (RDB/AOF), Sentinel HA & Redis Cluster
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Membandingkan mekanisme durabilitas persistensi disk: RDB (Snapshots) vs AOF (Append-Only File)
- Memahami trade-off performa vs durabilitas pada opsi appendfsync: always, everysec, dan no
- Mengonfigurasi Redis Sentinel untuk pemantauan kesehatan master dan failover otomatis tanpa downtime
- Menguasai arsitektur sharding Redis Cluster (16.384 Hash Slots) dan aturan Hash Tags ({...})

---

## Program: Konfigurasi Ketahanan Data RDB vs AOF dan Arsitektur 16384 Hash Slots Cluster

```redis
# 1. Durability Configuration in redis.conf
# RDB (Snapshotting) configuration: save <seconds> <changes>
# save 900 1
# save 300 10
# save 60 10000

# AOF (Append-Only File) configuration - recommended for zero data-loss
# appendonly yes
# appendfilename "appendonly.aof"
# appendfsync everysec  # Options: always (slowest), everysec (balanced), no (OS decides)

# Trigger background snapshotting manually without blocking main event loop
BGSAVE

# Trigger AOF background rewrite to compact file size
BGREWRITEAOF

# 2. Redis Sentinel Commands for High Availability & Automated Failover
# Connect to Sentinel port (default 26379)
# SENTINEL masters
# SENTINEL get-master-addr-by-name mymaster
# SENTINEL failover mymaster  # Manual failover drill

# 3. Redis Cluster: 16,384 Hash Slots Sharding Architecture
# Every key is mapped to a slot via CRC16(key) mod 16384
CLUSTER INFO
CLUSTER NODES

# Hash Tags: Ensure related keys hash to the EXACT same slot and physical node!
# The string inside curly braces {} dictates the slot calculation:
MSET {user:1001}:profile "data" {user:1001}:orders "order_list" {user:1001}:tokens "auth"
# All three keys land on the identical hash slot! Multi-key operations are permitted!

# Inspect slot assignment of a key
CLUSTER KEYSLOT "{user:1001}:profile"
```

---

## Konsep Kunci

### Ketahanan Data: RDB vs AOF
Meskipun Redis beroperasi di RAM, data dapat disimpan permanen ke disk melalui dua mekanisme:
- **RDB (Redis Database Snapshot)**: Mengambil snapshot biner padat seluruh isi memori pada interval waktu tertentu (misal tiap 5 menit jika ada 100 perubahan). Operasi menggunakan `fork()` proses latar belakang. Kekurangannya: jika server mati mendadak di menit ke-4, data 4 menit terakhir akan hilang.
- **AOF (Append-Only File)**: Mencatat setiap instruksi modifikasi data ke dalam file log secara berurutan. Opsi `appendfsync everysec` memberikan kompromi sempurna: penulisan di-flush ke disk setiap 1 detik, membatasi potensi kehilangan data maksimal 1 detik dengan performa tetap tinggi.

### High Availability dengan Redis Sentinel
Dalam topologi Master-Replica, jika server Master mati, replika tidak dapat mempromosikan dirinya sendiri tanpa orkestrasi. **Redis Sentinel** adalah sekumpulan daemon pengawas terdistribusi yang memantau node master. Ketika mayoritas Sentinel mendeteksi master mati (*quorum consensus*), Sentinel otomatis mempromosikan salah satu replica menjadi master baru, mengonfigurasi ulang replica lain, dan memberi tahu aplikasi klien tanpa perlu intervensi manusia.

### Redis Cluster: 16.384 Hash Slots dan Hash Tags
Untuk penskalaan horizontal melebihi batas RAM satu mesin (misal butuh 500GB RAM):
- **Redis Cluster** membagi ruang data menjadi **16.384 Hash Slots**. Setiap node master bertanggung jawab atas subset slot tertentu (misal Node A: slot 0-5460).
- Kunci dipetakan menggunakan rumus: `HASH_SLOT = CRC16(key) mod 16384`.
- **Hash Tags**: Redis Cluster melarang operasi multi-key (`MGET`, transaksi) jika kunci berada di node yang berbeda. Dengan menyematkan kurung kurawal `{user:1001}:profile` dan `{user:1001}:orders`, Redis hanya menghitung hash dari teks di dalam kurung kurawal, menjamin seluruh data milik user tersebut berada di node fisik yang sama.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda seorang penulis buku harian.
RDB seperti memotret seluruh isi kamar Anda sekali setiap minggu. Jika ada barang hilang hari Rabu, foto hari Minggu kemarin tidak bisa merekam barang yang baru Anda beli hari Senin.
AOF seperti mencatat setiap tindakan Anda di buku harian setiap detik: 'Pukul 10.00 saya beli buku, pukul 10.01 saya beli kopi'. Jika mati lampu, Anda tinggal membaca kembali buku harian dari awal.

Sentinel seperti 3 orang asisten satpam yang selalu menjaga bos: jika bos pingsan, ketiga satpam berembuk dan sepakat menunjuk wakil bos sebagai pemimpin baru dalam 3 detik!

## Eksperimen

- Jalankan BGSAVE dan periksa kemunculan file dump.rdb di direktori kerja Redis
- Inspeksi file appendonly.aof dengan text editor untuk melihat perintah Redis tersimpan dalam format teks protokol RESP
- Hitung hash slot suatu key menggunakan perintah CLUSTER KEYSLOT
- Buktikan bahwa dua key dengan hash tag yang sama {tenant_42}:users dan {tenant_42}:settings menghasilkan keyslot yang identik

---

## Tantangan

Simulasikan failover terencana pada cluster: kirimkan perintah `SENTINEL failover <master-name>` atau `CLUSTER FAILOVER`, dan ukur waktu yang dibutuhkan aplikasi untuk menyambung kembali ke node master baru.

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

Anda telah menguasai ketahanan data dan penskalaan Redis: persistensi RDB vs AOF, orkestrasi failover Sentinel, serta partisi 16.384 Hash Slots dan Hash Tags pada Redis Cluster.
