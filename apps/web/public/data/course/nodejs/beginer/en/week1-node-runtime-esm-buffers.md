# Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory

> **Kategori:** Node.js Backend | **Level:** Beginner | **Minggu 1:** Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Node.js 22 LTS runtime evolutions and explicit `node:` import prefixes.
- Master raw binary memory management using `Buffer` and TypedArrays allocated outside the V8 heap.
- Read and write Big-Endian and Little-Endian binary layouts (`readUInt16BE`, `writeFloatBE`).
- Differentiate `Buffer.alloc` (safe zero-filled) from `Buffer.allocUnsafe` (high-speed uninitialized memory).

---

## Program: IoT Device Telemetry Binary Packet Parser with Buffers & TypedArrays

```javascript
import { Buffer } from 'node:buffer';

// Simulasi Paket Biner dari Sensor IoT Jarak Jauh (12 Bytes Total)
// Format Protokol:
// [0..1]  : Magic Bytes (0x54, 0x52 -> 'TR')
// [2..3]  : Device ID (Uint16 Big-Endian)
// [4..7]  : Suhu Sensor Celcius (Float32 Big-Endian)
// [8..11] : Timestamp Epoch Detik (Uint32 Big-Endian)

function createSamplePacket(deviceId, temperature, timestamp) {
  const buf = Buffer.alloc(12);
  buf.write('TR', 0, 2, 'ascii');             // Magic Signature
  buf.writeUInt16BE(deviceId, 2);              // Device ID: 2 bytes
  buf.writeFloatBE(temperature, 4);            // Temp Float32: 4 bytes
  buf.writeUInt32BE(timestamp, 8);             // Timestamp Uint32: 4 bytes
  return buf;
}

function decodeTelemetryBuffer(buffer) {
  if (buffer.length !== 12) {
    throw new RangeError(`Paket korup! Panjang harus tepat 12 byte, diterima: ${buffer.length}`);
  }

  const magic = buffer.toString('ascii', 0, 2);
  if (magic !== 'TR') {
    throw new Error(`Magic bytes invalid: ${magic}. Paket tidak dikenali.`);
  }

  const deviceId = buffer.readUInt16BE(2);
  const temperature = Number(buffer.readFloatBE(4).toFixed(2));
  const timestamp = buffer.readUInt32BE(8);

  return {
    magic,
    deviceId,
    temperature,
    timestamp: new Date(timestamp * 1000).toISOString(),
    rawHex: buffer.toString('hex').toUpperCase()
  };
}

// Eksekusi Demonstrasi
const nowEpoch = Math.floor(Date.now() / 1000);
const rawPacket = createSamplePacket(1042, 28.75, nowEpoch);

console.log('=== PAKET RAW BUFFER DITERIMA DARI JARINGAN ===');
console.log('Buffer:', rawPacket);
console.log('Hex representation:', rawPacket.toString('hex').toUpperCase());

console.log('\n=== HASIL DEKODE BINER TELEMETRI ===');
const decoded = decodeTelemetryBuffer(rawPacket);
console.log(decoded);
```

---

## Key Concepts

Node.js 22 LTS stands as the foundational server-side JavaScript runtime. In enterprise IoT hubs and streaming infrastructure, high-volume payloads traverse networks as raw binary bytes rather than bloated JSON strings.

### Native ESM & The node: Prefix
Modern Node.js embraces native ECMAScript Modules (`import/export`) over legacy CommonJS (`require`). Designating the explicit `node:` prefix (`import { Buffer } from 'node:buffer'`) guarantees unambiguous loading from Node's internal C++ core, guarding against npm typosquatting and namespace collisions.

### Buffer: Off-Heap Binary Memory
While the V8 engine manages objects within its garbage-collected heap, high-throughput binary streams allocate memory directly via OS-level memory pools using the `Buffer` class. Off-heap allocation bypasses V8 GC pauses, delivering native throughput.

### Buffer.alloc vs Buffer.allocUnsafe Security
- `Buffer.alloc(size)`: Clears memory chunks with zeroes. Mandatory when preventing memory residue leakage.
- `Buffer.allocUnsafe(size)`: Reserves uninitialized memory instantly without zero-filling. Faster, but risks leaking stale memory fragments (passwords, tokens) if unpopulated bytes are transmitted downstream.


---

---

## Beginner Friendly Explanation

Imagine receiving a sealed 12-centimeter cargo crate from overseas (a 12-byte Buffer). The first 2 cm marks the country seal (Magic Bytes), the next 2 cm stamps the warehouse ID, and the next 4 cm stamps calibrated temperature metrics. Decoding a Buffer is like measuring along a ruler to extract binary data points cleanly.

## Experiments

- Corrupt the first byte `rawPacket[0] = 0x00` and observe the parser rejecting invalid magic bytes.
- Benchmark execution times of `Buffer.alloc(1024)` versus `Buffer.allocUnsafe(1024)` across 100,000 iterations.
- Use `buffer.subarray()` to slice byte segments with zero-copy memory allocation.

---

## Challenge

Build a streaming binary parser that slices continuous incoming byte chunks into discrete telemetry packets using the `TR` magic byte delimiter.

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

You have mastered Node.js 22 ESM, Buffers, and binary protocol parsing. Next week we explore Event-Driven Architecture, EventEmitters, and Transform Streams.
