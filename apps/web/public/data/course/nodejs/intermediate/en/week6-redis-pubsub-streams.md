# Distributed Messaging: Redis Pub/Sub vs Redis Streams & Consumer Groups

> **Kategori:** Node.js Backend | **Level:** Intermediate | **Minggu 6:** Distributed Messaging: Redis Pub/Sub vs Redis Streams & Consumer Groups
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Differentiate Redis Pub/Sub (ephemeral fire-and-forget) from Redis Streams (durable, ordered log).
- Use core Redis Streams commands: `XADD`, `XREAD`, `XRANGE`, and `XACK`.
- Implement Consumer Groups distributing streaming workloads across worker instances.
- Handle consumer failure recoveries via Pending Entries Lists (PEL) and `XCLAIM`.

---

## Program: Distributed Telemetry Event Router with Redis Streams & Consumer Groups

```javascript
// Simulasi In-Memory Redis Streams Engine untuk Demonstrasi Arsitektur
class InMemoryRedisStreams {
  constructor() {
    this.streams = new Map();
    this.consumerOffsets = new Map();
  }

  // XADD: Tambahkan event ke Stream
  xadd(streamKey, id, fields) {
    if (!this.streams.has(streamKey)) {
      this.streams.set(streamKey, []);
    }
    const entryId = id === '*' ? `${Date.now()}-0` : id;
    const entry = { id: entryId, fields };
    this.streams.get(streamKey).push(entry);
    return entryId;
  }

  // XREADGROUP: Baca event sebagai anggota Consumer Group dengan Ack
  xreadgroup(groupName, consumerName, streamKey, count = 2) {
    const stream = this.streams.get(streamKey) || [];
    const key = `${groupName}:${streamKey}`;
    const lastReadIndex = this.consumerOffsets.get(key) || 0;

    const available = stream.slice(lastReadIndex, lastReadIndex + count);
    this.consumerOffsets.set(key, lastReadIndex + available.length);
    return available;
  }
}

const redis = new InMemoryRedisStreams();

// 1. Produsen: Mempublikasikan event telemetri ke stream 'telemetry:events'
console.log('=== PRODUCER: MEMPUBLIKASIKAN EVENT KE REDIS STREAMS (XADD) ===');
const id1 = redis.xadd('telemetry:events', '*', { sensorId: 'SNS-A1', temp: 34.2, alert: 'NORMAL' });
const id2 = redis.xadd('telemetry:events', '*', { sensorId: 'SNS-B2', temp: 88.5, alert: 'OVERHEAT' });
const id3 = redis.xadd('telemetry:events', '*', { sensorId: 'SNS-C3', temp: 22.0, alert: 'NORMAL' });

console.log(`Event dipublikasikan dengan IDs: ${id1}, ${id2}, ${id3}`);

// 2. Konsumen Kelompok (Consumer Group Worker 1 & Worker 2)
console.log('\n=== CONSUMER GROUP: DISTRIBUSI BEBAN KERJA BERSAMA ===');
const batchWorker1 = redis.xreadgroup('alert-processors', 'worker-pod-1', 'telemetry:events', 2);
console.log('[WORKER 1] Menerima', batchWorker1.length, 'event untuk diproses:');
batchWorker1.forEach(e => console.log(` -> ID: ${e.id} | Sensor: ${e.fields.sensorId} | Temp: ${e.fields.temp}°C`));

const batchWorker2 = redis.xreadgroup('alert-processors', 'worker-pod-2', 'telemetry:events', 2);
console.log('\n[WORKER 2] Menerima sisa', batchWorker2.length, 'event dari stream:');
batchWorker2.forEach(e => console.log(` -> ID: ${e.id} | Sensor: ${e.fields.sensorId} | Temp: ${e.fields.temp}°C`));
```

---

## Key Concepts

When Node.js applications scale across clustered containers in the cloud, distributed event routing tiers become mandatory to coordinate workloads across nodes.

### Redis Pub/Sub vs Redis Streams
- **Redis Pub/Sub**: Operates on a *fire-and-forget* principle. If a subscriber experiences momentary network blips or container restarts, transmitted messages vanish irrecoverably. Suited for real-time ephemeral notifications or cache invalidation signals.
- **Redis Streams**: Acts as an append-only durable commit log modeled after Apache Kafka. Messages receive chronological timestamped IDs. Disconnected workers recover missed events upon reconnecting.

### Consumer Groups Architecture
**Consumer Groups** allow clusters of worker pods to divide stream ingestion dynamically. Redis guarantees that each discrete event within a consumer group is routed exclusively to a single active worker, establishing native horizontal load balancing.

### Delivery Guarantees: XACK & The PEL
Upon completing work, consumers issue an `XACK` acknowledgment. If a worker pod crashes mid-computation, the unacknowledged event remains inside the **Pending Entries List (PEL)**, allowing healthy peer workers to adopt and process it via `XCLAIM`.


---

---

## Beginner Friendly Explanation

Think of broadcast FM radio (Redis Pub/Sub). If you turn off your car radio for five minutes, you miss whatever song aired and cannot retrieve it. In contrast, consider a queued Spotify playlist (Redis Streams): every track is durably cataloged, allowing you to pause, resume, or replay whenever you are ready.

## Experiments

- Adjust the `count` parameter in `xreadgroup` to 1 and inspect granular distribution behavior.
- Simulate an unacknowledged worker failure and audit the pending entries list.
- Deploy Redis Pub/Sub (`PUBLISH`/`SUBSCRIBE`) and compare latency characteristics against Streams.

---

## Challenge

Author a `recoverPendingTasks(streamKey, groupName, minIdleTimeMs)` worker that periodically inspects stalled entries in the PEL, reclaiming them for completion.

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

You have mastered Redis Streams, Consumer Groups, and delivery guarantees. Next week we construct high-scale WebSocket servers with heartbeats.
