# High-Throughput HTTP: From node:http to Fastify & Schema Compilation

> **Kategori:** Node.js Backend | **Level:** Beginner | **Minggu 4:** High-Throughput HTTP: From node:http to Fastify & Schema Compilation
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand limitations of legacy Express.js compared to modern frameworks like Fastify.
- Understand accelerated JSON serialization using compiled `fast-json-stringify`.
- Master declarative payload validation leveraging JSON Schema and Ajv.
- Apply Fastify Request Lifecycle Hooks (`onRequest`, `preHandler`, `onResponse`).

---

## Program: High-Throughput Telemetry REST API Ingestion with Fastify & Ajv Schema

```javascript
// Menggunakan arsitektur Fastify (Framework HTTP tercepat di ekosistem Node.js)
// npm install fastify

import Fastify from 'fastify';

const fastify = Fastify({
  logger: false // Matikan logger bawaan untuk benchmark throughput murni
});

// JSON Schema untuk Validasi Input (Ajv) & Kompilasi Serialisasi Cepat (fast-json-stringify)
const telemetryIngestSchema = {
  body: {
    type: 'object',
    required: ['deviceId', 'temperature', 'humidity'],
    properties: {
      deviceId: { type: 'string', minLength: 3, maxLength: 20 },
      temperature: { type: 'number', minimum: -50, maximum: 120 },
      humidity: { type: 'number', minimum: 0, maximum: 100 },
      batteryLevel: { type: 'number', minimum: 0, maximum: 100, default: 100 }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        packetId: { type: 'string' },
        receivedAt: { type: 'string' }
      }
    }
  }
};

let packetCounter = 0;

// Hook Siklus Hidup Request (Fastify Lifecycle Hooks)
fastify.addHook('onRequest', async (request, reply) => {
  request.startTime = process.hrtime.bigint();
});

fastify.addHook('onResponse', async (request, reply) => {
  const diffNs = process.hrtime.bigint() - request.startTime;
  const elapsedMs = Number(diffNs) / 1_000_000;
  // fastify dapat memproses ribuan request per detik dengan latensi sub-milidetik
});

// Endpoint Ingesti Berkecepatan Tinggi
fastify.post('/api/v1/telemetry', { schema: telemetryIngestSchema }, async (request, reply) => {
  packetCounter++;
  const { deviceId, temperature } = request.body;

  reply.status(201);
  return {
    status: 'ACCEPTED',
    packetId: `PKT-${packetCounter.toString().padStart(6, '0')}`,
    receivedAt: new Date().toISOString()
  };
});

// Endpoint Health Check
fastify.get('/health', async () => ({ status: 'UP', totalPackets: packetCounter }));

console.log('=== MEMULAI FASTIFY TELEMETRY SERVER (SIMULASI INITIALIZATION) ===');
console.log('Fastify siap menerima request di port 3000 dengan skema Ajv terkompilasi.');
```

---

## Key Concepts

For over a decade, Express.js dominated the Node.js landscape. However, Express was designed in an earlier era, lacking native optimization for modern async/await execution and schema compilation.

### Why Fastify Powers Modern Enterprise Architectures
Fastify services **2x to 3x higher throughput (requests per second)** than Express.js while sustaining drastically lower latencies and minimal GC allocation footprints.

### The Engine Behind the Speed: Schema Compilation
Standard web frameworks serialize responses via `JSON.stringify()`, which traverses object trees dynamically at runtime.
Fastify integrates **fast-json-stringify**: relying on declared `response` schemas, Fastify synthesizes an optimized C-like serialization function during bootstrapping. This serializes payloads over 200% faster by omitting runtime object introspection.

### High-Speed Validation with Ajv
By binding JSON schemas to route definitions, Fastify compiles validation rules via **Ajv** (Another JSON Schema Validator). Out-of-spec payloads fail fast with HTTP 400 before invoking domain handlers.


---

---

## Beginner Friendly Explanation

Consider the difference between a copyist hand-transcribing each letter from scratch (Express + vanilla JSON.stringify) versus an industrial steel stamping press equipped with pre-molded typeplates (Fastify + compiled Ajv schemas). The stamping press stamps documents in 0.01 seconds without re-reading word-by-word.

## Experiments

- Transmit a payload with temperature exceeding 120 and inspect the automated Ajv schema rejection.
- Omit the `deviceId` field from the body and verify the `required` constraint failure.
- Benchmark execution latency via `process.hrtime.bigint()` in the `onResponse` hook.

---

## Challenge

Author a custom Fastify plugin using `fastify-plugin` (fp) that injects a `fastify.decorate("db", myDatabaseClient)` decorator across all application routes.

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

You have mastered Fastify, Ajv validation, and accelerated serialization. Level 1 complete! Level 2 explores Worker Threads, Redis Streams, and WebSockets.
