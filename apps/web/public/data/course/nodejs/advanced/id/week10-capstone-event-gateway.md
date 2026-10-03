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
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
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
