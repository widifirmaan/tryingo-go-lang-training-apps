# Real-Time Communication: WebSockets (ws), Token Auth & Heartbeat Ping/Pong

> **Kategori:** Node.js Backend | **Level:** Intermediate | **Minggu 7:** Real-Time Communication: WebSockets (ws), Token Auth & Heartbeat Ping/Pong
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the WebSocket protocol (RFC 6455) and HTTP connection upgrade mechanics.
- Implement secure WebSocket authentication via tokens or validated cookies.
- Build Heartbeat Ping/Pong mechanisms detecting and purging stalled zombie connections.
- Optimize high-frequency event broadcasting across thousands of connected clients.

---

## Program: Telemetry WebSocket Gateway with Zombie Connection Detection & Heartbeat

```javascript
// Arsitektur WebSocket Server Berkecepatan Tinggi (Menggunakan pustaka 'ws')
import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

console.log('=== WEBSOCKET TELEMETRY GATEWAY AKTIF DI PORT 8080 ===');

// Pool Klien Terkoneksi
const clients = new Map();

// 1. Heartbeat Ping-Pong Interval (Pembersih Koneksi Zombie)
const heartbeatInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      console.log(`[ZOMBIE DETECTED] Menghentikan koneksi mati untuk client: ${clients.get(ws)?.clientId}`);
      clients.delete(ws);
      return ws.terminate();
    }

    // Tandai false dan kirim Ping; client harus membalas Pong untuk mereset ke true
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => clearInterval(heartbeatInterval));

// 2. Koneksi Masuk & Autentikasi
wss.on('connection', (ws, req) => {
  // Ekstrak token dari query string: ws://localhost:8080?token=SECRET_KEY_99
  const url = new URL(req.url, 'http://localhost:8080');
  const token = url.searchParams.get('token');

  if (token !== 'GATEWAY_SECRET_2026') {
    ws.send(JSON.stringify({ error: 'UNAUTHORIZED: Token invalid!' }));
    return ws.close(1008, 'Policy Violation');
  }

  const clientId = `CLI-${Math.floor(Math.random() * 10000)}`;
  ws.isAlive = true;
  clients.set(ws, { clientId, connectedAt: Date.now() });

  console.log(`[CLIENT CONNECTED] ${clientId} berhasil terautentikasi.`);
  ws.send(JSON.stringify({ event: 'CONNECTED', clientId, message: 'Selamat datang di Tryngo Gateway' }));

  // Handler Pong Heartbeat
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  // Handler Pesan Masuk
  ws.on('message', (data, isBinary) => {
    const messageText = isBinary ? data : data.toString();
    console.log(`[MESSAGE RECEIVED] Dari ${clientId}:`, messageText);

    // Broadcast pesan ke seluruh client aktif lainnya
    for (const [clientWs, meta] of clients.entries()) {
      if (clientWs !== ws && clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ from: clientId, payload: messageText }));
      }
    }
  });

  ws.on('close', () => {
    console.log(`[CLIENT DISCONNECTED] ${clientId} keluar.`);
    clients.delete(ws);
  });
});
```

---

## Key Concepts

Standard HTTP operates as a request-response protocol. For live telemetry streams, multiplayer state replication, and instant push notifications, systems require persistent, low-latency, bidirectional connections: **WebSockets**.

### HTTP Upgrade Handshakes
WebSockets originate via a standard HTTP handshake presenting:
`Connection: Upgrade`
`Upgrade: websocket`
Upon validation, the TCP socket upgrades into a continuous bidirectional stream, omitting repetitive HTTP header overhead on subsequent frames.

### The Threat of Zombie Connections
Mobile devices frequently lose cellular signal, experience battery depletion, or disconnect without transmitting TCP teardown packets (FIN/RST). Without active health probes, these connections stall inside server memory as **Zombie Connections**, exhausting file descriptors and socket pools.

### The Heartbeat Ping/Pong Pattern
The WebSocket specification reserves native control opcodes: `Ping (0x9)` and `Pong (0xA)`. Servers emit periodic Ping frames. If a client fails to return a matching Pong before the subsequent heartbeat tick, the server invokes `ws.terminate()`, releasing OS socket resources immediately.


---

---

## Beginner Friendly Explanation

Imagine speaking on a phone call. If your friend drives into an underground tunnel and loses service without hanging up, you continue talking to a silent line (Zombie Connection). To verify, every 30 seconds you ask: "Are you still there?" (Ping). If they do not respond "Yes!" (Pong), you hang up the receiver.

## Experiments

- Connect a WebSocket client via browser dev tools `const ws = new WebSocket("ws://localhost:8080?token=GATEWAY_SECRET_2026")`.
- Connect with an invalid token and observe the connection closure with code 1008 (Policy Violation).
- Disconnect the client network abruptly and observe the server purging the zombie socket after 30 seconds.

---

## Challenge

Implement a Channel Subscription subsystem: allow clients to submit `{ action: "SUBSCRIBE", channel: "telemetry:room_1" }`, restricting broadcasts solely to verified channel subscribers.

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

You have mastered WebSockets, handshake auth, and heartbeat zombie purging. Level 2 complete! Level 3 covers V8 Memory Profiling, Security Hardening, and our Gateway Capstone.
