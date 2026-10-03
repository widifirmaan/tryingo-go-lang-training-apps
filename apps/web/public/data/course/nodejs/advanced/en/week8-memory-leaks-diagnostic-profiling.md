# V8 Diagnostics: Memory Leaks, Event Listener Leaks & Heap Snapshots

> **Kategori:** Node.js Backend | **Level:** Advanced | **Minggu 8:** V8 Diagnostics: Memory Leaks, Event Listener Leaks & Heap Snapshots
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand V8 Garbage Collection mechanics (Generational GC: Scavenge vs Mark-Sweep-Compact).
- Identify primary Node.js memory leak causes: Global variables, Unreleased Closures, and Dangling Event Listeners.
- Deploy `v8.getHeapSnapshot()` to export snapshot files inspectable inside Chrome DevTools.
- Monitor runtime memory metrics: `heapUsed`, `heapTotal`, `rss`, and `external`.

---

## Program: Memory Leak Detector & Automated Heap Snapshot Trigger in Node.js

```javascript
import v8 from 'node:v8';
import fs from 'node:fs/promises';
import { EventEmitter } from 'node:events';

class MemoryDiagnosticsEngine {
  constructor(thresholdMb = 150) {
    this.thresholdMb = thresholdMb;
    this.globalEmitter = new EventEmitter();
    this.leakyStorage = []; // Koleksi berpotensi memory leak
  }

  // Simulasi Bug Klasik: Mendaftarkan closure ke global emitter tanpa pernah di-unsubscribe
  simulateListenerLeak(sensorData) {
    const heavyPayload = new Array(1000).fill(`SENSOR_PAYLOAD_${sensorData.id}`);

    const handler = () => {
      // Closure menahan referensi ke heavyPayload dan sensorData di memori
      console.log('Handler terpanggil:', heavyPayload.length);
    };

    this.globalEmitter.on('telemetry_tick', handler);
    // Masalah: jika handler tidak pernah di `.off()`, memori tidak akan pernah dibersihkan GC!
  }

  checkMemoryAndSnapshot() {
    const memoryUsage = process.memoryUsage();
    const heapUsedMb = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
    const rssMb = (memoryUsage.rss / 1024 / 1024).toFixed(2);

    console.log(`[MEMORY AUDIT] Heap Used: ${heapUsedMb} MB | RSS: ${rssMb} MB | Total Listeners: ${this.globalEmitter.listenerCount('telemetry_tick')}`);

    if (memoryUsage.heapUsed > this.thresholdMb * 1024 * 1024) {
      console.warn(`[ALERT] Penggunaan Heap (${heapUsedMb} MB) melampaui batas ambang (${this.thresholdMb} MB)!`);
      this.triggerHeapSnapshot();
    }
  }

  triggerHeapSnapshot() {
    console.log('[DIAGNOSTIC] Menghasilkan V8 Heap Snapshot ke disk untuk investigasi Chrome DevTools...');
    const snapshotStream = v8.getHeapSnapshot();
    const fileName = `heap-${Date.now()}.heapsnapshot`;

    // Mengalirkan snapshot langsung ke disk
    import('node:fs').then(fsSync => {
      const fileStream = fsSync.createWriteStream(fileName);
      snapshotStream.pipe(fileStream);
      fileStream.on('finish', () => console.log(`[HEAP SNAPSHOT SAVED]: ${fileName}`));
    });
  }
}

// Eksekusi Demonstrasi
const engine = new MemoryDiagnosticsEngine(50); // Threshold rendah untuk pengujian

console.log('=== MEMULAI SIMULASI KEBOCORAN MEMORI V8 ===');
for (let i = 1; i <= 20; i++) {
  engine.simulateListenerLeak({ id: `SNS-${i}` });
}

engine.checkMemoryAndSnapshot();
```

---

## Key Concepts

In containerized cloud environments (Kubernetes), services harboring memory leaks inflate progressively until terminated by kernel OOM killers (`OOMKilled - Exit Code 137`).

### The V8 Garbage Collection Engine
V8 segregates memory into two distinct generations:
1. **Young Generation (New Space)**: Short-lived object allocations, harvested rapidly via the *Scavenge* algorithm.
2. **Old Generation (Old Space)**: Surviving long-lived objects migrate here, harvested via thorough *Mark-Sweep-Compact* cycles.

### The Menace of Dangling Event Listeners
The primary culprit behind Node.js memory leaks is attaching listener callbacks to long-lived singletons (`emitter.on('event', callback)`) without unbinding them via `.off()` upon client disconnection. Closures retain references to parent lexical scopes, preventing garbage collector sweeps.

### Chrome DevTools Heap Snapshots
Leveraging `node:v8`, applications snapshot heap allocations when thresholds breach. Developers open the `.heapsnapshot` profile inside Chrome DevTools (Memory tab) to inspect the Retainers Graph and pinpoint retaining object references.


---

---

## Beginner Friendly Explanation

Imagine renting an apartment. Every time a visitor stops by, you pin their framed photograph to your bedroom wall (Event Listener). If guests leave but you never unpin the frames, the room fills with thousands of photo frames until you run out of breathing room and get evicted (OOM Kill).

## Experiments

- Add `.off("telemetry_tick", handler)` logic and verify the listener count drops back to 0.
- Load the exported `.heapsnapshot` file inside Chrome DevTools and locate the `MemoryDiagnosticsEngine` constructor.
- Launch Node.js with `--max-old-space-size=64` to simulate OOM boundaries under constrained heap limits.

---

## Challenge

Build an automated memory leak detection middleware sampling `process.memoryUsage().heapUsed` across 1,000 HTTP cycles, alerting if consumption increases monotonically.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

You have mastered V8 memory diagnostics, Retainer graphs, and Heap Snapshots. Next week we cover Security Hardening, Rate Limiting, and Graceful Shutdown.
