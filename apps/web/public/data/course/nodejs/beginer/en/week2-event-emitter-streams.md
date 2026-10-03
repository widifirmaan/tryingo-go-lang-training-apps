# Event-Driven Architecture: EventEmitter, Transform Streams & Backpressure

> **Kategori:** Node.js Backend | **Level:** Beginner | **Minggu 2:** Event-Driven Architecture: EventEmitter, Transform Streams & Backpressure
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Node.js core event-driven architecture: `EventEmitter` and in-memory Pub/Sub patterns.
- Understand the 4 stream paradigms: Readable, Writable, Duplex, and Transform.
- Understand Backpressure hazards and why `pipeline()` from `node:stream/promises` is mandatory over legacy `.pipe()`.
- Construct custom Transform Streams in `objectMode` for streaming data processing.

---

## Program: Telemetry Data Cleansing & Compression Pipeline with Transform Streams

```javascript
import { EventEmitter } from 'node:events';
import { Transform, Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

// 1. Bus Event Sensor Berbasis EventEmitter
class SensorEventHub extends EventEmitter {
  emitTelemetry(sensorId, value) {
    if (value > 85.0) {
      this.emit('alert:overheat', { sensorId, value, timestamp: Date.now() });
    }
    this.emit('telemetry', { sensorId, value });
  }
}

const hub = new SensorEventHub();

// Daftarkan listener alert overheat
hub.on('alert:overheat', (evt) => {
  console.log(`[CRITICAL ALERT] Sensor ${evt.sensorId} overheating: ${evt.value}°C!`);
});

// 2. Transform Stream: Memfilter Anomali & Menghitung Normalisasi
class TelemetryFilterTransform extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    // Buang data noise (sensor rusak dengan nilai negatif)
    if (chunk.value >= 0) {
      const enriched = {
        ...chunk,
        status: chunk.value > 80 ? 'WARNING' : 'NORMAL',
        processedAt: Date.now()
      };
      this.push(enriched);
    }
    callback();
  }
}

// 3. Eksekusi Pipeline Asinkron dengan Penanganan Backpressure Aman
async function runStreamPipeline() {
  console.log('=== MEMULAI PIPELINE STREAM TELEMETRI ===');
  
  // Sumber Data Stream (Readable)
  const rawReadings = [
    { sensorId: 'SNS-01', value: 24.5 },
    { sensorId: 'SNS-02', value: -999.0 }, // Noise data
    { sensorId: 'SNS-03', value: 92.1 },   // Overheat!
    { sensorId: 'SNS-04', value: 31.0 }
  ];

  const sourceStream = Readable.from(rawReadings);
  const filterTransform = new TelemetryFilterTransform();

  const sinkStream = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      console.log(` -> [PIPELINE OUTPUT]: Sensor ${chunk.sensorId} -> ${chunk.value}°C [${chunk.status}]`);
      callback();
    }
  });

  // stream/promises pipeline otomatis menangani pembersihan memory & error propagation
  await pipeline(sourceStream, filterTransform, sinkStream);
  console.log('=== PIPELINE SELESAI DENGAN SUKSES ===');
}

hub.emitTelemetry('SNS-03', 92.1);
await runStreamPipeline();
```

---

## Key Concepts

Node.js was engineered from inception as an asynchronous, event-driven I/O platform. The twin cornerstones of this design are **EventEmitter** and **Streams**.

### EventEmitter & Listener Safety
`EventEmitter` allows objects to publish named events (`hub.emit('telemetry')`) observed by callback subscribers. Node.js issues warning notices if more than 10 listeners bind to an instance, preventing subtle memory leaks.

### Why Streams Deliver Extreme Efficiency
If a server must process a 10GB log file or continuous sensor feeds, buffering everything into memory will instantly trigger `JavaScript heap out of memory` crashes. Streams slice data into discrete **chunks**, processing them progressively.

### Backpressure Hazards & pipeline()
When a Readable stream produces data faster than a Writable destination can consume, intermediate RAM buffers inflate uncontrollably—a state known as **Backpressure**.
The legacy `source.pipe(dest)` syntax harbored critical flaws: errors did not close underlying descriptors, leading to resource leaks. Modern Node.js mandates `pipeline()` from `node:stream/promises`, which regulates backpressure and guarantees descriptor destruction upon completion or failure.


---

---

## Beginner Friendly Explanation

Imagine a high-pressure fire hose (Readable Stream) pouring directly into a small household bucket (Writable Stream). If left unchecked, water floods the room (Memory Crash). Backpressure functions like an automated valve that throttles water delivery to match the exact ingestion speed of the bucket.

## Experiments

- Modify buffer capacity via the `highWaterMark` option and observe chunk frequency.
- Bind more than 10 listeners to `hub` and observe the `MaxListenersExceededWarning` in the console.
- Simulate a mid-stream fault and prove that `sinkStream` descriptors are safely cleaned up.

---

## Challenge

Build a `GzipCompressionTransform` Transform Stream that compresses streaming text chunks into compressed buffers via `node:zlib`.

---

## Visual Mental Model & Architecture Flow

![Diagram Arsitektur V8 Engine & Libuv Event Loop Node.js](/diagrams/js-event-loop.svg)

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
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

You have mastered EventEmitter, Transform Streams, and Backpressure governance with pipeline. Next week we explore File System, Path, and Child Process.
