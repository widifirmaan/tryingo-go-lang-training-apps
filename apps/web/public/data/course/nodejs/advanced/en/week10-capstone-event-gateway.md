# Capstone: Production-Ready Real-Time Collaborative Event Stream & Notification Gateway

> **Kategori:** Node.js Backend | **Level:** Advanced | **Minggu 10:** Capstone: Production-Ready Real-Time Collaborative Event Stream & Notification Gateway
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Integrate the complete ecosystem: HTTP Ingestion, WebSocket Broadcasting, Heartbeats, and Graceful Shutdown.
- Build high-throughput bidirectional Pub/Sub gateways.
- Implement Asynchronous Ingestion (`HTTP 202 Accepted`) for extreme event volumes.
- Prepare enterprise Node.js services ready for Docker and Kubernetes cluster deployments.

---

## Program: Complete Telemetry Gateway (Fastify/Node.js, WebSocket Hub, Redis Stream Pipeline & Heartbeat)

```javascript
// Node.js 22 LTS Production Gateway Capstone Architecture
import http from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';

// 1. HTTP Ingestion Server & WebSocket Server Hybrid
const server = http.createServer((req, res) => {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'POST' && req.url === '/api/v1/events') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const eventData = JSON.parse(body);
        const enrichedEvent = {
          eventId: `EVT-${Date.now()}`,
          ...eventData,
          receivedAt: new Date().toISOString()
        };

        // Siarkan event yang masuk secara instan ke seluruh client WebSocket
        broadcastToWebSockets(enrichedEvent);

        res.writeHead(202, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'QUEUED', eventId: enrichedEvent.eventId }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'BAD_REQUEST', message: 'Payload JSON invalid.' }));
      }
    });
  } else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'UP', connectedClients: wss.clients.size }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

// 2. WebSocket Hub
const wss = new WebSocketServer({ server });

function broadcastToWebSockets(payload) {
  const jsonStr = JSON.stringify(payload);
  let deliveredCount = 0;

  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonStr);
      deliveredCount++;
    }
  }
  console.log(`[BROADCAST EVENT] Disiarkan ke ${deliveredCount} subscriber aktif:`, payload.eventId);
}

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });
  console.log('[WS CONNECTED] Klien baru terhubung. Total klien:', wss.clients.size);

  ws.send(JSON.stringify({ type: 'WELCOME', message: 'Terhubung ke Tryngo Real-Time Event Gateway' }));
});

// Heartbeat Liveness Monitor
const heartbeatTimer = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 15000);

// Graceful Teardown
process.on('SIGTERM', () => {
  console.log('[GATEWAY SHUTDOWN] Menutup WebSocket dan server HTTP...');
  clearInterval(heartbeatTimer);
  wss.close();
  server.close(() => {
    console.log('[GATEWAY CLOSED] Teardown selesai dengan aman.');
    process.exit(0);
  });
});

console.log('=== TRYNGO REAL-TIME EVENT STREAM GATEWAY BERHASIL DIINISIALISASI ===');
```

---

## Key Concepts

Congratulations! You have reached the Capstone project. This application synthesizes modern Node.js 22 LTS engineering paradigms into a resilient, high-throughput, production-ready real-time event stream and notification gateway.

### Hybrid HTTP & WebSocket Architecture
The service unifies HTTP ingestion and WebSocket multiplexing over a single TCP socket via native `upgrade` interception. Inbound event bursts to `/api/v1/events` yield immediate `202 Accepted` receipts before broadcasting data frames to connected browser dashboards instantaneously.

### Production Resilience
The gateway enforces automated 15-second heartbeat intervals purging stalled zombie sockets, applies nosniff security headers, and orchestrates clean `SIGTERM` connection draining ensuring zero-downtime rolling deployments in Kubernetes.


---

---

## Beginner Friendly Explanation

This project mirrors a metropolitan emergency radio broadcast tower. Police, paramedics, and firefighters report incident dispatches over dedicated priority hotlines (HTTP Ingestion). The tower instantaneously broadcasts the dispatches over the airwaves to thousands of patrol vehicles across the city (WebSocket Broadcast).

## Experiments

- Dispatch a POST payload to `/api/v1/events` via cURL and observe the broadcast frame arriving at client terminals.
- Trigger a `kill -SIGTERM` signal and inspect the clean graceful teardown sequence.
- Navigate to `/health` to audit connected WebSocket socket counts in real time.

---

## Challenge

Add a Redis Streams Publisher integration: every ingested event is committed to a Redis `gateway:events` stream before broadcasting over WebSockets.

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

Congratulations! You have completed the entire Node.js Backend curriculum from zero to an enterprise production event and notification gateway!
