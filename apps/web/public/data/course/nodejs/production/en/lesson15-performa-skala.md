# Performance & Scalability: Don't Block the Event Loop

> Node.js | Production & Capstone | Lesson 15

## Learning Objectives

- Recognize code that blocks the event loop
- Offload heavy work to worker threads
- Explain clustering and PM2
- Apply caching for repeated loads

---

## Program: Performance & Scalability: Don't Block the Event Loop

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

## Explanation

## Enemy #1: Long Synchronous Code
A 2-second while loop freezes the event loop: EVERY other request queues until it finishes. In production, one "leaky" route like this can time out the whole API. Common sources: big loops with no interleaved awaits, parsing giant JSON, sync crypto, sync file operations. Rules: I/O always async, heavy CPU always off the main thread.
## Worker Threads: Heavy CPU to Other Threads
worker_threads runs JavaScript in parallel threads (Node is not single-threaded for computation, only for I/O!). Each worker has its own event loop - the main loop stays free to serve requests. Communication via postMessage (no shared variables - separate memory, safe by default). Use for: hashing, image transforms, heavy computation.
## Cluster & PM2: Many Processes, Many Cores
One Node process uses ONE CPU core. cluster.fork() duplicates the process per core - the OS distributes connections. PM2 automates this (pm2 start server.js -i max) plus auto-restart, log management, zero-downtime reload. A stateless API is the prerequisite: every request must be servable by any process (never store sessions in process memory!).
## Caching: Don't Recompute the Same Load Twice
Rarely-changing data (catalogs, config, external API results) should be cached: compute once, serve many times. Levels: in-memory (Map/Redis - see the Redis track), HTTP cache headers (Cache-Control), CDN. A good hit ratio can slash latency and database costs dramatically.

---

## Experiments

1. **Enemy #1: Long Synchronous Code**
2. **Worker Threads: Heavy CPU to Other Threads**
3. **Cluster & PM2: Many Processes, Many Cores**
4. **Caching: Don't Recompute the Same Load Twice**

---

## Challenge

Measure it yourself: (1) create a /loop-cepat endpoint running a 100-million-iteration loop without a worker - open two tabs, request /blokir then /loop-cepat simultaneously - record the times, (2) switch /loop-cepat to a worker thread - repeat the experiment, (3) compute the difference. Write down your conclusion about the event loop.

---

## Summary

Do not block the event loop: async I/O, heavy CPU to worker threads. Cluster/PM2: one process per core. Stateless APIs are the scalability prerequisite. Cache: compute once, serve many. Next: deployment & capstone.
