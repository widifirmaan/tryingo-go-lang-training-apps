# Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory

> **Kategori:** Node.js Backend | **Level:** Beginner | **Minggu 1:** Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Node.js 22 LTS runtime evolutions and explicit `node:` import prefixes.
- Master raw binary memory management using `Buffer` and TypedArrays allocated outside the V8 heap.
- Read and write Big-Endian and Little-Endian binary layouts (`readUInt16BE`, `writeFloatBE`).
- Differentiate `Buffer.alloc` (safe zero-filled) from `Buffer.allocUnsafe` (high-speed uninitialized memory).

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **ESLint** (`dbaeumer.vscode-eslint`): Code linting for Node.js
- **Prettier** (`esbenp.prettier-vscode`): Consistent code formatting

Or install all recommended extensions at once via terminal:
```bash
code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode
```

---

### 2. Runtime & Dependency Installation (Node.js LTS (v20+ / v22+))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
node -v && npm -v
```

Expected output:
```output
v22.x.x
10.x.x
```

> 💡 **Prerequisite Note:** Node.js bundles the npm package manager by default.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-node-api && cd my-node-api
npm init -y
npm install express dotenv
npm install -D typescript tsx @types/node @types/express
npx tsc --init
```
- **Details:** Sets up a modern Node.js project powered by TypeScript and tsx fast executor.
- **Navigate to the project directory:**
```bash
cd my-node-api
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npx tsx watch src/index.ts
```
Open in browser or terminal: `http://localhost:3000`

> ℹ️ API server runs with live file watching on port 3000.

**Initial Entry File (`src/index.ts`):**
```js
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`⚡ Server Node.js aktif di http://localhost:${PORT}`);
});
```
Simple Express server with health check route.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-node-api/
├── src/
│   └── index.ts         # Server HTTP Express
├── .env                 # Konfigurasi environment variables
├── tsconfig.json        # Konfigurasi compiler TypeScript
└── package.json         # Dependensi & skrip start
```
Lean and lightweight structure ideal for backend microservices.

---

### 6. Beginner Tips & Best Practices
- Use `tsx` (`npx tsx file.ts`) to execute TypeScript directly without pre-compiling.
- Leverage the built-in Node test runner via `node --test` for zero-dependency tests.

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
```output
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
```output
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
```output
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
```output
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

You have mastered Node.js 22 ESM, Buffers, and binary protocol parsing. Next week we explore Event-Driven Architecture, EventEmitters, and Transform Streams.
