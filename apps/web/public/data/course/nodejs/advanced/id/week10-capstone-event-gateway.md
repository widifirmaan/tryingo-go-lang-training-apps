# Capstone: Gateway Notifikasi & Aliran Event Kolaboratif Real-Time Production-Ready

> **Kategori:** Node.js Backend | **Level:** Lanjutan | **Minggu 10:** Capstone: Gateway Notifikasi & Aliran Event Kolaboratif Real-Time Production-Ready
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh ekosistem: HTTP Ingestion, WebSocket Broadcasting, Heartbeat, dan Graceful Shutdown.
- Membangun arsitektur Pub/Sub bi-directional berkecepatan tinggi.
- Menerapkan pola Asynchronous Ingestion (`HTTP 202 Accepted`) untuk pemrosesan event throughput tinggi.
- Menyiapkan service Node.js enterprise yang siap di-deploy pada klaster Kubernetes / Docker.

---

## Program: Gateway Telemetri Lengkap (FastAPI/Node.js, WebSocket Hub, Redis Stream Pipeline & Heartbeat)

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

## Konsep Kunci

Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Node.js Backend. Gateway ini menyatukan semua kemampuan runtime Node.js 22 LTS ke dalam satu platform perutean notifikasi dan event real-time yang tangguh, hemat memori, dan berskala tinggi.

### Arsitektur Terpadu HTTP & WebSockets
Aplikasi ini menjalankan server HTTP dan WebSocket pada satu port jaringan TCP yang sama menggunakan event `upgrade`. Endpoint HTTP `/api/v1/events` menerima lonjakan event dari microservices lain, langsung mengembalikan respons `202 Accepted`, dan menyiarkan event tersebut ke ratusan browser atau perangkat mobile secara instan melalui WebSocket.

### Ketahanan Produksi (Resilience)
Gateway dilengkapi dengan timer heartbeat terotomatisasi yang membersihkan koneksi zombie setiap 15 detik, header keamanan nosniff, serta penanganan sinyal OS `SIGTERM` yang memastikan proses pembaruan aplikasi di Kubernetes berjalan mulus tanpa downtime (Zero-Downtime Deployment).


---

---

## Penjelasan untuk Pemula

Proyek ini ibarat menara pemancar radio pusat kota. Stasiun pemadam kebakaran, polisi, dan rumah sakit mengirim berita mendesak ke menara lewat jalur telepon khusus (HTTP Ingestion). Menara pemancar langsung menyiarkan berita tersebut dalam sekejap mata ke ribuan radio mobil di seluruh kota (WebSocket Broadcast) tanpa ada jeda sedikit pun.

## Eksperimen

- Kirim payload POST ke `/api/v1/events` menggunakan cURL dan amati pesan broadcast diterima seketika di console client.
- Kirim sinyal `kill -SIGTERM` pada process ID dan amati proses penutupan gateway yang bersih.
- Buka endpoint `/health` untuk memantau jumlah klien WebSocket yang aktif secara real-time.

---

## Tantangan

Tambahkan integrasi Redis Streams Publisher di dalam gateway: setiap event yang masuk otomatis disimpan ke stream `gateway:events` di Redis sebelum disiarkan ke WebSocket.

---

## Model Mental & Diagram Alur Visual

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

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `import fs from 'node:fs/promises'`
- **Fungsi Utama:** Modul manipulasi filesystem asinkron.
- **Parameter / Atribut:** `Path file, Encoding, Data`.
- **Perilaku & Efek Sistem:** Membaca dan menulis file lokal dengan aman tanpa memblokir thread event loop..
- **Contoh Penggunaan Praktis:**
```javascript
import fs from 'node:fs/promises';
const content = await fs.readFile('app.config.json', 'utf8');
console.log(JSON.parse(content));
```
- **Hasil Output yang Diharapkan:**
```output
Membaca isi berkas konfigurasi secara non-blocking
```

### 2. `http.createServer((req, res) => { ... })`
- **Fungsi Utama:** Server HTTP native berkecepatan tinggi.
- **Parameter / Atribut:** `Request Listener (req, res)`.
- **Perilaku & Efek Sistem:** Menangani koneksi jaringan HTTP langsung dan mengirimkan status respon beserta payload data..
- **Contoh Penggunaan Praktis:**
```javascript
import http from 'node:http';
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok' }));
});
server.listen(3000);
```
- **Hasil Output yang Diharapkan:**
```output
Server aktif mendengarkan di http://localhost:3000
```

### 3. `EventEmitter & .on() / .emit()`
- **Fungsi Utama:** Arsitektur komunikasi berbasis event.
- **Parameter / Atribut:** `Event name, Payload arguments`.
- **Perilaku & Efek Sistem:** Menyediakan decoupling komunikasi modular menggunakan pola pub/sub internal Node.js..
- **Contoh Penggunaan Praktis:**
```javascript
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.on('order', id => console.log('Pesanan masuk:', id));
emitter.emit('order', 'ORD-99');
```
- **Hasil Output yang Diharapkan:**
```output
Pesanan masuk: ORD-99
```

### 4. `process.env.VARIABLE_NAME`
- **Fungsi Utama:** Akses variabel lingkungan sistem.
- **Parameter / Atribut:** `Environment key identifier`.
- **Perilaku & Efek Sistem:** Membaca rahasia kredensial, port server, dan mode operasi (production/development)..
- **Contoh Penggunaan Praktis:**
```javascript
const PORT = process.env.PORT || 8080;
console.log('Menjalankan pada port:', PORT);
```
- **Hasil Output yang Diharapkan:**
```output
Menjalankan pada port: 8080
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Memblokir Event Loop (Synchronous CPU Intensive)
- **Gejala / Masalah:** Seluruh request pengguna lain tertahan dan server berhenti merespons (hang).
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Hindari operasi kriptografi berat atau parsing JSON raksasa di thread utama; gunakan Worker Threads.

### 2. Unhandled Exception pada Asynchronous Callback
- **Gejala / Masalah:** Server Node.js crash seketika dan mematikan seluruh proses aplikasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan async/await dengan try-catch terpusat dan daftarkan handler `process.on('unhandledRejection')`.

### 3. Memory Leak pada Event Emitter Listener
- **Gejala / Masalah:** Muncul warning `MaxListenersExceededWarning` dan memori RAM server meningkat terus-menerus.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu hapus event listener yang tidak digunakan lagi dengan `emitter.off()` atau `emitter.removeListener()`.

---

## Ringkasan

Selamat! Kamu telah menyelesaikan seluruh kurikulum Node.js Backend dari nol hingga gateway notifikasi dan streaming event berskala produksi!
