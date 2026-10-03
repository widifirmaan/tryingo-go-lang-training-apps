# CPU-Bound Scalability: Worker Threads, SharedArrayBuffer & Clustering

> **Kategori:** Node.js Backend | **Level:** Intermediate | **Minggu 5:** CPU-Bound Scalability: Worker Threads, SharedArrayBuffer & Clustering

## Learning Objectives

- Understand Node.js single-threaded Event Loop constraints and the hazards of CPU-bound tasks.
- Deploy `node:worker_threads` for heavy computation without stalling network I/O.
- Understand zero-copy memory sharing using `SharedArrayBuffer` and `Atomics`.
- Differentiate `worker_threads` (shared memory threads) from `node:cluster` (multi-process core forking).

---

## Program: Parallel Cryptographic Binary Checksum Calculator with Worker Threads

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

## Key Concepts

A pervasive myth claims "Node.js is purely single-threaded". While network I/O executes over a single event loop, intensive CPU-bound tasks (cryptographic hashing, image manipulation, heavy mathematical modeling) will freeze the event loop, starving incoming connections.

### Worker Threads vs The Cluster Module
- **Cluster Module (`node:cluster`)**: Forks the entire Node.js runtime process across CPU cores. Each worker owns isolated memory while sharing underlying server ports.
- **Worker Threads (`node:worker_threads`)**: Spawns isolated execution threads within a single Node.js process. Tailored for offloading CPU-intensive algorithms without spinning up distinct OS processes.

### SharedArrayBuffer & Atomics
Default inter-thread communication via `postMessage()` incurs structured-cloning serialization penalties. For multi-gigabyte data sets, allocating a `SharedArrayBuffer` permits zero-copy memory sharing between threads, coordinated safely via `Atomics` primitives to prevent race conditions.


---

---

## Beginner Friendly Explanation

Imagine a post office counter staffed by a single clerk (the Event Loop). If a customer demands the clerk manually count 10,000 copper coins (a CPU-bound task), hundreds of waiting customers are blocked for hours. With Worker Threads, the clerk immediately delegates the coin sack to assistants in the back room while keeping the service window open.

## Experiments

- Execute a 100-million iteration loop inside the worker and verify the main thread remains fully responsive.
- Establish peer-to-peer worker communication channels using `MessageChannel`.
- Test `node:cluster` to fork four HTTP worker processes across multi-core processors.

---

## Challenge

Build a custom `WorkerPool(workerScript, poolSize)` reusing a fixed set of persistent worker threads to execute queued tasks without continuous instantiation overhead.

---

## Summary

You have mastered Worker Threads, SharedArrayBuffer, and CPU-bound mitigation. Next week we explore distributed messaging with Redis Pub/Sub and Redis Streams.
