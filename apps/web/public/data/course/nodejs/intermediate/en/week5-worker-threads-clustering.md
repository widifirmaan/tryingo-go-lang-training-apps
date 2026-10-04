# CPU-Bound Scalability: Worker Threads, SharedArrayBuffer & Clustering

> **Kategori:** Node.js Backend | **Level:** Intermediate | **Minggu 5:** CPU-Bound Scalability: Worker Threads, SharedArrayBuffer & Clustering
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


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

## Visual Mental Model & Architecture Flow

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

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `import fs from 'node:fs/promises'`
- **Core Functionality:** Modul manipulasi filesystem asinkron.
- **Parameters / Attributes:** `Path file, Encoding, Data`.
- **System Behavior & Return:** Membaca dan menulis file lokal dengan aman tanpa memblokir thread event loop..
- **Practical Code Example:**
```javascript
import fs from 'node:fs/promises';
const content = await fs.readFile('app.config.json', 'utf8');
console.log(JSON.parse(content));
```
- **Expected Execution Output:**
```text
Membaca isi berkas konfigurasi secara non-blocking
```

### 2. `http.createServer((req, res) => { ... })`
- **Core Functionality:** Server HTTP native berkecepatan tinggi.
- **Parameters / Attributes:** `Request Listener (req, res)`.
- **System Behavior & Return:** Menangani koneksi jaringan HTTP langsung dan mengirimkan status respon beserta payload data..
- **Practical Code Example:**
```javascript
import http from 'node:http';
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok' }));
});
server.listen(3000);
```
- **Expected Execution Output:**
```text
Server aktif mendengarkan di http://localhost:3000
```

### 3. `EventEmitter & .on() / .emit()`
- **Core Functionality:** Arsitektur komunikasi berbasis event.
- **Parameters / Attributes:** `Event name, Payload arguments`.
- **System Behavior & Return:** Provides decoupling komunikasi modular menggunakan pola pub/sub internal Node.js..
- **Practical Code Example:**
```javascript
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.on('order', id => console.log('Pesanan masuk:', id));
emitter.emit('order', 'ORD-99');
```
- **Expected Execution Output:**
```text
Pesanan masuk: ORD-99
```

### 4. `process.env.VARIABLE_NAME`
- **Core Functionality:** Akses variabel lingkungan sistem.
- **Parameters / Attributes:** `Environment key identifier`.
- **System Behavior & Return:** Membaca rahasia kredensial, port server, dan mode operasi (production/development)..
- **Practical Code Example:**
```javascript
const PORT = process.env.PORT || 8080;
console.log('Menjalankan pada port:', PORT);
```
- **Expected Execution Output:**
```text
Menjalankan pada port: 8080
```

---

## Common Pitfalls & Debugging Tips

### 1. Event Loop Blocking on Heavy Computation
- **Symptom / Issue:** Freezes response handling for all concurrent user requests.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Delegate CPU-heavy tasks to Worker Threads or external background queues.

### 2. Uncaught Asynchronous Exceptions
- **Symptom / Issue:** Kills the Node.js process abruptly and terminates the service.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Handle async errors with try-catch and attach `process.on('unhandledRejection')` handlers.

### 3. EventEmitter Listener Leak
- **Symptom / Issue:** Generates `MaxListenersExceededWarning` and leaks memory across long-lived servers.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Detach obsolete event handlers using `emitter.off()` or `emitter.removeListener()`.

---

## Summary

You have mastered Worker Threads, SharedArrayBuffer, and CPU-bound mitigation. Next week we explore distributed messaging with Redis Pub/Sub and Redis Streams.
