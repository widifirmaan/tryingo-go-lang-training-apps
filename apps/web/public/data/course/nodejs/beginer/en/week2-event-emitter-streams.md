# Event-Driven Architecture: EventEmitter, Transform Streams & Backpressure

> **Kategori:** Node.js Backend | **Level:** Beginner | **Minggu 2:** Event-Driven Architecture: EventEmitter, Transform Streams & Backpressure

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

## Summary

You have mastered EventEmitter, Transform Streams, and Backpressure governance with pipeline. Next week we explore File System, Path, and Child Process.
