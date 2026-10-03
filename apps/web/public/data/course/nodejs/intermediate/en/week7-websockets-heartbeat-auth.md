# Real-Time Communication: WebSockets (ws), Token Auth & Heartbeat Ping/Pong

> **Kategori:** Node.js Backend | **Level:** Intermediate | **Minggu 7:** Real-Time Communication: WebSockets (ws), Token Auth & Heartbeat Ping/Pong

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

## Summary

You have mastered WebSockets, handshake auth, and heartbeat zombie purging. Level 2 complete! Level 3 covers V8 Memory Profiling, Security Hardening, and our Gateway Capstone.
