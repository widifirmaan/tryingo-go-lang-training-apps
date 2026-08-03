# Performa & Skalabilitas: Jangan Blokir Event Loop

> Node.js | Produksi & Capstone | Pelajaran 15

## Tujuan Pembelajaran

- Mengenali kode yang memblokir event loop
- Melepaskan kerja berat ke worker threads
- Menjelaskan clustering dan PM2
- Menerapkan caching untuk beban berulang

---

## Program: Performa & Skalabilitas: Jangan Blokir Event Loop

```js
// Performa: event loop, blocking code, cluster, PM2
// Jalankan: node server.js

const express = require('express');
const app = express();
app.use(express.json());

// --- 1) TUGAS BERAT YANG MEMBLOKIR EVENT LOOP (ANTI-PATTERN) ---
// while loop menahan event loop: SEMUA request lain menunggu.
// Jangan lakukan ini di produksi!
app.get('/blokir', (req, res) => {
  const akhir = Date.now() + 2000; // "kerja" 2 detik
  while (Date.now() < akhir) {} // CPU busy - event loop beku
  res.json({ pesan: 'Selesai memblokir 2 detik. Request lain antri!' });
});

// --- 2) VERSI BAIK: serahkan kerja berat ke worker thread ---
const { Worker } = require('node:worker_threads');

app.get('/kerja-berat', (req, res) => {
  const worker = new Worker(
    `const { parentPort } = require('node:worker_threads');
     let x = 0;
     for (let i = 0; i < 2e9; i++) x += i;
     parentPort.postMessage(x);`,
    { eval: true }
  );
  worker.once('message', (hasil) => res.json({ hasil }));
  worker.once('error', () => res.status(500).json({ error: 'Worker gagal' }));
});

// --- 3) POLA ASYNC YANG BENAR: lepaskan I/O ---
const fs = require('node:fs/promises');
app.get('/baca-file', async (req, res) => {
  // fs/promises = non-blocking; event loop tetap melayani request lain
  const isi = await fs.readFile(__filename, 'utf-8');
  res.json({ baris: isi.split('\n').length });
});

// --- 4) SIMULASI PM2 (multi-proses) ---
// Di produksi, jalankan: pm2 start server.js -i max
// -> satu worker PROCESS per CPU core, load balanced oleh OS/PM2
// app.listen di file terpisah bila memakai cluster mode.

const cluster = require('node:cluster');
const os = require('node:os');

if (cluster.isPrimary && process.env.USE_CLUSTER === 'true') {
  console.log('Primary membagi kerja ke ' + os.cpus().length + ' worker processes...');
  for (let i = 0; i < os.cpus().length; i++) cluster.fork();
} else {
  app.listen(3000, () => console.log('Worker ' + process.pid + ' melayani di :3000'));
}
```

---

## Penjelasan

## Musuh #1: Kode Sinkron yang Panjang
While loop 2 detik membekukan event loop: SEMUA request lain antri sampai selesai. Di produksi, satu route "bocor" begini bisa membuat seluruh API timeout. Sumber umum: perulangan besar tanpa hasil antara, JSON.parse data raksasa, crypto sync, operasi file sync. Aturan: I/O selalu async, CPU berat selalu lepaskan dari thread utama.
## Worker Threads: CPU Heavy ke Thread Lain
worker_threads menjalankan kode JavaScript di thread paralel (Node bukan single-thread untuk komputasi, hanya untuk I/O!). Setiap worker punya event loop sendiri - event loop utama tetap bebas melayani request. Komunikasi lewat postMessage (bukan variabel bersama - memory terpisah, default aman). Pakai untuk: hashing, transformasi gambar, komputasi berat.
## Cluster & PM2: Banyak Proses, Banyak Core
Satu proses Node memakai SATU core CPU. cluster.fork() menyalin proses per core - OS mendistribusikan koneksi. PM2 mengotomatiskan ini (pm2 start server.js -i max) + auto-restart, log management, zero-downtime reload. Stateless API adalah prasyarat: setiap request harus bisa dilayani proses mana pun (jangan simpan session di memori proses!).
## Caching: Beban yang Sama Jangan Dihitung Dua Kali
Data yang jarang berubah (katalog, konfigurasi, hasil API eksternal) sebaiknya di-cache: perhitungan sekali, sajikan berkali-kali. Level: in-memory (Map/Redis - pelajaran Redis track), HTTP cache headers (Cache-Control), CDN. Hit ratio yang baik bisa memangkas latensi dan biaya database secara drastis.

---

## Eksperimen

1. **Musuh #1: Kode Sinkron yang Panjang**
2. **Worker Threads: CPU Heavy ke Thread Lain**
3. **Cluster & PM2: Banyak Proses, Banyak Core**
4. **Caching: Beban yang Sama Jangan Dihitung Dua Kali**

---

## Tantangan

Ukur sendiri: (1) buat endpoint /loop-cepat yang menjalankan loop 100 juta iterasi tanpa worker - buka dua tab, request /blokir lalu /loop-cepat bersamaan - catat waktunya, (2) ganti /loop-cepat memakai worker thread - ulangi percobaan, (3) hitung perbedaan waktu. Tuliskan kesimpulanmu tentang event loop.

---

## Ringkasan

Jangan blokir event loop: I/O async, CPU berat ke worker threads. Cluster/PM2: satu proses per core. Stateless API = prasyarat skala. Cache: hitung sekali, sajikan banyak. Lanjut: deploy & capstone.
