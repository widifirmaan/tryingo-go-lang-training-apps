# Redis Streams & Consumer Groups untuk Event-Driven

> **Kategori:** Redis | **Level:** Scripting Lua, Streams & Klaster Terdistribusi | **Minggu 6:** Redis Streams & Consumer Groups untuk Event-Driven
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Membedakan keterbatasan arsitektur Pub/Sub tradisional (fire-and-forget) dibanding Redis Streams (persisten)
- Menyisipkan dan membaca log event menggunakan XADD, XRANGE, dan XREVRANGE
- Mendistribusikan beban kerja secara paralel menggunakan Consumer Groups (XREADGROUP)
- Menangani kegagalan worker menggunakan sistem acknowledgment (XACK) dan pengklaiman tugas tertunda (XCLAIM / XAUTOCLAIM)

---

## Program: Arsitektur Event-Driven dengan Redis Streams, Consumer Groups, dan Acknowledgement

```redis
# 1. Produce events to an append-only Redis Stream (XADD)
# Auto-generates millisecond-sequence ID (e.g. 1710073000000-0)
XADD stream:orders * orderId "ORD-9901" customerId "CUST-42" amount 450000 status "PLACED"
XADD stream:orders * orderId "ORD-9902" customerId "CUST-88" amount 1250000 status "PLACED"

# Inspect stream length and entries
XLEN stream:orders
XRANGE stream:orders - + COUNT 2

# 2. Setup Consumer Group for distributed scale-out processing (starts from beginning '$' or '0')
XGROUP CREATE stream:orders group:order_processors 0 MKSTREAM

# 3. Consumer 1 reads new unprocessed messages (ID '>' means messages never delivered to others)
XREADGROUP GROUP group:order_processors worker_alpha COUNT 1 BLOCK 2000 STREAMS stream:orders >

# 4. Acknowledge message processing completion (Removes message from Pending Entries List / PEL)
XACK stream:orders group:order_processors 1710073000000-0

# 5. Inspect Pending Entries List (Messages claimed by workers that have NOT been ACKed yet)
XPENDING stream:orders group:order_processors - + 10

# 6. Dead Worker Recovery: Claim a stuck/abandoned message from a dead worker if idle > 60000ms
XCLAIM stream:orders group:order_processors worker_beta 60000 1710073000000-0
```

---

## Konsep Kunci

### Mengapa Redis Streams? Melampaui Pub/Sub Tradisional
Mekanisme `PUBLISH / SUBSCRIBE` tradisional di Redis bersifat *fire-and-forget*. Jika ada subscriber yang sedang offline atau mengalami gangguan koneksi sesaat, seluruh pesan yang dikirim saat itu akan **hilang selamanya**. 
Diperkenalkan pada Redis 5.0, **Redis Streams** adalah struktur data log pesan persisten (mirip Apache Kafka versi in-memory berkecepatan tinggi). Pesan disimpan secara permanen di disk/RAM dengan ID waktu unik (`timestamp-sequence`), mendukung pembacaan ulang historis, serta replikasi terjamin.

### Arsitektur Consumer Groups
Dalam sistem enterprise, kita memerlukan beberapa instance worker untuk memproses antrean pesanan bersama-sama tanpa duplikasi:
- **Consumer Group**: Membagi aliran pesan ke sekumpulan worker yang tergabung dalam grup yang sama.
- Pesan yang diambil oleh `worker_alpha` tidak akan dikirimkan ke `worker_beta`.
- Setiap pesan memiliki ID khusus. Karakter `>` menandakan worker meminta pesan yang belum pernah diserahkan ke worker manapun.

### Pending Entries List (PEL) dan Kegagalan Worker
Ketika worker mengambil pesan, Redis mencatat pesan tersebut ke dalam **Pending Entries List (PEL)**. Pesan baru dihapus dari PEL setelah worker mengirimkan konfirmasi `XACK`. Jika worker mati mendadak sebelum mengirim `XACK`, pesan tetap aman di PEL. Worker lain dapat menggunakan perintah `XCLAIM` atau `XAUTOCLAIM` untuk mengambil alih pesan yang menggantung tersebut dan memprosesnya hingga tuntas.

---

---

## Penjelasan untuk Pemula

Bayangkan Pub/Sub seperti siaran radio FM: jika radio mobil Anda mati saat melewati terowongan, Anda melewatkan lagu yang sedang diputar selamanya.

Redis Streams seperti rekaman video YouTube: videonya tersimpan permanen dan bisa Anda tonton ulang kapan saja. Consumer Group seperti kantor pos dengan 5 kurir: surat-surat baru dibagi rata sehingga kurir A mengantar paket ke blok A, kurir B ke blok B. Jika motor kurir A mogok di jalan, paketnya bisa diambil alih oleh kurir B (XCLAIM) agar paket tetap sampai ke penerima!

## Eksperimen

- Kirim 5 pesan ke stream dan baca satu per satu menggunakan Consumer Groups
- Simulasikan kegagalan worker: baca pesan tanpa menjalankan XACK, lalu inspeksi XPENDING untuk melihat pesan menggantung
- Jalankan XCLAIM dari worker kedua untuk merebut pesan yang menggantung dari worker pertama
- Gunakan opsi MAXLEN ~ 1000 pada XADD untuk membatasi ukuran stream agar memori RAM tidak meledak

---

## Tantangan

Bangun sistem dead-letter queue (DLQ) otomatis: periksa XPENDING secara berkala, jika sebuah pesan telah gagal di-ACK dan di-reclaim lebih dari 3 kali (`delivery_count > 3`), pindahkan pesan tersebut ke `stream:dead_letters` dan kirimkan `XACK` pada stream utama.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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

Anda telah menguasai Redis Streams: append-only log persisten, pemrosesan paralel dengan Consumer Groups, pelacakan Pending Entries List (PEL), dan pemulihan pesan dengan XCLAIM.
