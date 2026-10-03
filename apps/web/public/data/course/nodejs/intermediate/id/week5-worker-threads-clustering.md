# Skalabilitas CPU-Bound: Worker Threads, SharedArrayBuffer & Clustering

> **Kategori:** Node.js Backend | **Level:** Menengah | **Minggu 5:** Skalabilitas CPU-Bound: Worker Threads, SharedArrayBuffer & Clustering

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

## Ringkasan

Kamu telah menguasai Worker Threads, SharedArrayBuffer, dan mitigasi CPU-bound. Minggu depan kita mempelajari perutean pesan terdistribusi dengan Redis Pub/Sub dan Redis Streams.
