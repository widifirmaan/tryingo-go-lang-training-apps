# Skalabilitas CPU-Bound: Worker Threads, SharedArrayBuffer & Clustering

> **Kategori:** Node.js Backend | **Level:** Menengah | **Minggu 5:** Skalabilitas CPU-Bound: Worker Threads, SharedArrayBuffer & Clustering
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami arsitektur Single-Threaded Event Loop Node.js dan bahaya operasi CPU-bound.
- Menggunakan modul `node:worker_threads` untuk komputasi berat tanpa memblokir I/O.
- Memahami mekanisme berbagi memori berkinerja tinggi menggunakan `SharedArrayBuffer` dan `Atomics`.
- Mengetahui perbedaan `worker_threads` (multi-threading dalam 1 proses) vs `node:cluster` (multi-process forking per core CPU).

---

## Program: Kalkulator Checksum Biner Kriptografis Paralel dengan Worker Threads

```javascript
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

if (isMainThread) {
  // === THREAD UTAMA (EVENT LOOP NODE.JS) ===
  console.log(`[MAIN THREAD PID: ${process.pid}] Memulai distribusi beban komputasi CPU berat...`);

  function calculateChecksumInWorker(dataChunk) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { payload: dataChunk }
      });

      worker.on('message', (result) => resolve(result));
      worker.on('error', (err) => reject(err));
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker berhenti dengan exit code: ${code}`));
      });
    });
  }

  // Simulasi 3 Paket Telemetri Besar yang butuh Hashing CPU Intensif
  const chunks = ['PAYLOAD_TELEMETRY_ALPHA_9981', 'PAYLOAD_TELEMETRY_BETA_2314', 'PAYLOAD_TELEMETRY_GAMMA_7712'];
  
  const start = performance.now();
  const promises = chunks.map((chunk, index) => {
    console.log(` -> Mendelegasikan chunk #${index + 1} ke Worker Thread terpisah...`);
    return calculateChecksumInWorker(chunk);
  });

  const results = await Promise.all(promises);
  const elapsed = (performance.now() - start).toFixed(2);

  console.log(`\n=== SEMUA WORKER SELESAI DALAM ${elapsed} ms ===`);
  results.forEach((res, i) => {
    console.log(`Chunk #${i + 1} Hash: ${res.hash} (Dihitung di Worker Thread ID: ${res.threadId})`);
  });

} else {
  // === WORKER THREAD (BERJALAN DI THREAD OS TERPISAH TANPA MEMBLOKIR EVENT LOOP) ===
  import('node:crypto').then(({ createHash }) => {
    const { payload } = workerData;
    
    // Simulasi komputasi kriptografi intensif
    const hash = createHash('sha256').update(payload).digest('hex');
    
    // Simulasi jeda beban kerja
    const target = Date.now() + 50;
    while (Date.now() < target) {}

    parentPort.postMessage({
      hash,
      threadId: (import.meta.url) ? 'Worker-Thread-Active' : 'unknown'
    });
  });
}
```

---

## Konsep Kunci

Mitos umum mengatakan "Node.js itu single-threaded". Faktanya, I/O jaringan memang ditangani secara non-blocking di atas satu event loop. Namun jika ada fungsi CPU-bound yang berat (seperti kompresi gambar, hashing kriptografi rumit, atau kalkulasi matriks AI), event loop akan terblokir dan server tidak bisa melayani request pengguna lain.

### Worker Threads vs Cluster Module
- **Cluster Module (`node:cluster`)**: Menggandakan seluruh proses Node.js di setiap core CPU. Masing-masing proses memiliki memory space terisolasi dan port HTTP yang dibagi bersama.
- **Worker Threads (`node:worker_threads`)**: Menjalankan thread baru di dalam satu proses Node.js yang sama. Sangat ideal untuk mendelegasikan tugas komputasi spesifik dan memungkinkan berbagi data memori secara langsung.

### SharedArrayBuffer dan Atomics
Biasanya, pengiriman data antara thread utama dan worker menggunakan `postMessage()` yang melakukan kloning data (structured cloning). Untuk pertukaran data telemetri berukuran gigabyte tanpa overhead kloning, kita dapat menggunakan `SharedArrayBuffer` yang dipetakan ke memori yang sama di kedua thread, dikendalikan dengan operasi `Atomics` untuk mencegah race condition.


---

---

## Penjelasan untuk Pemula

Bayangkan sebuah kantor pos dengan satu petugas loket yang sangat ramah (Event Loop). Jika ada pelanggan yang meminta petugas loket menghitung 10.000 koin receh dengan tangan (CPU-bound), antrean ratusan orang di belakangnya akan tertahan berjam-jam. Dengan Worker Threads, petugas loket segera memanggil asisten di ruang belakang untuk menghitung koin tersebut, sementara loket tetap buka melayani tamu lain.

## Eksperimen

- Ubah kalkulasi worker menjadi loop penghitungan 100 juta angka dan buktikan thread utama tetap responsif.
- Kirim data antar thread menggunakan `MessageChannel` untuk komunikasi dua arah langsung antar worker.
- Uji coba modul `node:cluster` untuk mem-fork 4 worker HTTP server pada core CPU yang berbeda.

---

## Tantangan

Bangun Thread Pool kustom `WorkerPool(workerScript, poolSize)` yang menggunakan kembali sejumlah worker tetap (misal 4 thread) untuk mengeksekusi antrean tugas tanpa perlu menginstansiasi worker baru setiap saat.

---

## Model Mental & Diagram Alur Visual

![Diagram Arsitektur V8 Engine & Libuv Event Loop Node.js](/diagrams/js-event-loop.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR RUNTIME NODE.JS                               │
│                                                          │
│   V8 JavaScript Engine  ◄──►  Node.js Core C++ Bindings  │
│            │                             │               │
│            ▼                             ▼               │
│   ┌──────────────────────────────────────────────────┐   │
│   │ LIBUV THREAD POOL & ASYNCHRONOUS EVENT LOOP      │   │
│   │ • Non-blocking File I/O (fs.promises)            │   │
│   │ • Network Sockets (http, net, tls)               │   │
│   │ • Worker Threads untuk komputasi CPU berat       │   │
│   └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `import fs from 'node:fs/promises'`
- **Fungsi Utama:** Modul manipulasi filesystem asinkron.
- **Parameter / Atribut:** `Path file, Encoding, Data`.
- **Perilaku & Efek Sistem:** Membaca dan menulis file lokal dengan aman tanpa memblokir thread event loop..
- **Contoh Penggunaan Praktis:**
```javascript
import fs from 'node:fs/promises';
const content = await fs.readFile('app.config.json', 'utf8');
console.log(JSON.parse(content));
```
- **Hasil Output yang Diharapkan:**
```output
Membaca isi berkas konfigurasi secara non-blocking
```

### 2. `http.createServer((req, res) => { ... })`
- **Fungsi Utama:** Server HTTP native berkecepatan tinggi.
- **Parameter / Atribut:** `Request Listener (req, res)`.
- **Perilaku & Efek Sistem:** Menangani koneksi jaringan HTTP langsung dan mengirimkan status respon beserta payload data..
- **Contoh Penggunaan Praktis:**
```javascript
import http from 'node:http';
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok' }));
});
server.listen(3000);
```
- **Hasil Output yang Diharapkan:**
```output
Server aktif mendengarkan di http://localhost:3000
```

### 3. `EventEmitter & .on() / .emit()`
- **Fungsi Utama:** Arsitektur komunikasi berbasis event.
- **Parameter / Atribut:** `Event name, Payload arguments`.
- **Perilaku & Efek Sistem:** Menyediakan decoupling komunikasi modular menggunakan pola pub/sub internal Node.js..
- **Contoh Penggunaan Praktis:**
```javascript
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.on('order', id => console.log('Pesanan masuk:', id));
emitter.emit('order', 'ORD-99');
```
- **Hasil Output yang Diharapkan:**
```output
Pesanan masuk: ORD-99
```

### 4. `process.env.VARIABLE_NAME`
- **Fungsi Utama:** Akses variabel lingkungan sistem.
- **Parameter / Atribut:** `Environment key identifier`.
- **Perilaku & Efek Sistem:** Membaca rahasia kredensial, port server, dan mode operasi (production/development)..
- **Contoh Penggunaan Praktis:**
```javascript
const PORT = process.env.PORT || 8080;
console.log('Menjalankan pada port:', PORT);
```
- **Hasil Output yang Diharapkan:**
```output
Menjalankan pada port: 8080
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Memblokir Event Loop (Synchronous CPU Intensive)
- **Gejala / Masalah:** Seluruh request pengguna lain tertahan dan server berhenti merespons (hang).
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Hindari operasi kriptografi berat atau parsing JSON raksasa di thread utama; gunakan Worker Threads.

### 2. Unhandled Exception pada Asynchronous Callback
- **Gejala / Masalah:** Server Node.js crash seketika dan mematikan seluruh proses aplikasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan async/await dengan try-catch terpusat dan daftarkan handler `process.on('unhandledRejection')`.

### 3. Memory Leak pada Event Emitter Listener
- **Gejala / Masalah:** Muncul warning `MaxListenersExceededWarning` dan memori RAM server meningkat terus-menerus.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu hapus event listener yang tidak digunakan lagi dengan `emitter.off()` atau `emitter.removeListener()`.

---

## Ringkasan

Kamu telah menguasai Worker Threads, SharedArrayBuffer, dan mitigasi CPU-bound. Minggu depan kita mempelajari perutean pesan terdistribusi dengan Redis Pub/Sub dan Redis Streams.
