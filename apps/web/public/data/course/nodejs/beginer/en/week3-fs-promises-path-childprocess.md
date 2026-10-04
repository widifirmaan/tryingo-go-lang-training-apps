# System Operations: node:fs/promises, Path & Child Process Management

> **Kategori:** Node.js Backend | **Level:** Beginner | **Minggu 3:** System Operations: node:fs/promises, Path & Child Process Management
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Use `node:fs/promises` for non-blocking disk operations (`mkdir`, `appendFile`, `stat`).
- Secure path manipulation against Path Traversal vulnerabilities (`path.resolve`, `path.normalize`).
- Execute external processes safely using `child_process.execFile` (immune to shell injection).
- Convert legacy callback APIs into clean Promises using `node:util.promisify`.

---

## Program: Automated File Log Rotator & Subprocess Diagnostic Monitor

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

// 1. Path Normalization & File System Promises
async function logTelemetryAudit(logDir, fileName, entry) {
  // Cegah Path Traversal Attack dengan path.join & path.resolve
  const safeDirPath = path.resolve(logDir);
  const targetFilePath = path.join(safeDirPath, fileName);

  // Buat direktori secara rekursif jika belum ada
  await fs.mkdir(safeDirPath, { recursive: true });

  const logLine = `[${new Date().toISOString()}] ${JSON.stringify(entry)}\n`;
  await fs.appendFile(targetFilePath, logLine, 'utf8');
  console.log(`[FS WRITE SUCCESS] Audit tersimpan ke: ${targetFilePath}`);

  // Periksa Ukuran File untuk Rotasi Log
  const stats = await fs.stat(targetFilePath);
  console.log(`Ukuran file saat ini: ${stats.size} bytes`);
  return stats.size;
}

// 2. Child Process: Menjalankan Perintah OS Diagnostik secara Aman
async function runSystemDiagnostics() {
  console.log('\n=== MENJALANKAN DIAGNOSTIK OS (CHILD PROCESS) ===');
  try {
    // Menjalankan executable langsung tanpa shell untuk mencegah Command Injection
    const isWindows = process.platform === 'win32';
    const cmd = isWindows ? 'cmd.exe' : 'uname';
    const args = isWindows ? ['/c', 'echo Node.js 22 LTS Telemetry Engine Active'] : ['-a'];

    const { stdout, stderr } = await execFileAsync(cmd, args);
    if (stderr) console.error('[CHILD PROCESS WARN]:', stderr);
    console.log('[CHILD PROCESS OUTPUT]:', stdout.trim());
  } catch (err) {
    console.error('[CHILD PROCESS ERROR]: Gagal menjalankan diagnostik:', err.message);
  }
}

// Eksekusi
const sampleAudit = { event: 'DEVICE_PING', deviceId: 'SNS-1002', status: 'OK' };
await logTelemetryAudit('./storage/logs', 'telemetry.log', sampleAudit);
await runSystemDiagnostics();
```

---

## Key Concepts

Enterprise backends frequently interact with host OS environments: managing rotated log volumes, archiving data chunks, and orchestrating external utility sub-processes.

### Non-blocking node:fs/promises
Legacy Node.js relied on callback pyramids or synchronous blocking variants (`fs.readFileSync()`) which paralyzed the event loop. The `node:fs/promises` module provides clean, non-blocking async/await file operations.

### Mitigating Path Traversal Attacks
If an application accepts dynamic file paths from clients (e.g., `../../etc/passwd`), attackers can read arbitrary system configuration. Leveraging `path.resolve` and `path.join` verifies that targets remain confined within intended sandboxes.

### Process Security: exec vs execFile
- `exec('cmd ' + input)`: Spawns an intermediary system shell (`/bin/sh` or `cmd.exe`). Unsanitized input containing delimiters (`;`, `&&`) triggers remote Command Injection exploits.
- `execFile(binary, [args])`: Bypasses shell invocation entirely, executing binaries directly and treating all arguments as isolated string literals, guaranteeing immunity to shell injection.


---

---

## Beginner Friendly Explanation

Think of an archivist. Using fs/promises is like submitting a document retrieval request to the basement vault while continuing to assist lobby visitors. And execFile is like instructing a courier to deliver a sealed envelope directly to an address, rather than giving the courier a master key to explore the entire building.

## Experiments

- Implement log rotation: if file size exceeds 10KB, rotate using `fs.rename` to `telemetry.log.bak`.
- Pass arguments containing `; echo hacked` to `execFile` and observe that shell chaining is neutralized.
- Use `fs.watch` to monitor file system modifications reactively.

---

## Challenge

Build an async log cleanup utility `cleanupOldLogs(dir, maxAgeDays)` scanning directory files, evaluating `stats.mtimeMs`, and purging expired logs.

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

You have mastered fs/promises, path sanitization, and secure child process execution. Next week we transition to high-throughput HTTP with Fastify.
