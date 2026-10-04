# HTTP Berperforma Tinggi: Dari node:http ke Fastify & Schema Compilation

> **Kategori:** Node.js Backend | **Level:** Pemula | **Minggu 4:** HTTP Berperforma Tinggi: Dari node:http ke Fastify & Schema Compilation
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengetahui keterbatasan arsitektur Express.js lama dibanding framework modern seperti Fastify.
- Memahami kompilasi serialisasi JSON berkecepatan tinggi dengan `fast-json-stringify`.
- Menguasai validasi deklaratif payload menggunakan JSON Schema dan Ajv.
- Menggunakan Request Lifecycle Hooks (`onRequest`, `preHandler`, `onResponse`) di Fastify.

---

## Program: Ingesti REST API Telemetri Berkecepatan Tinggi dengan Fastify & Skema Ajv

```javascript
// Menggunakan arsitektur Fastify (Framework HTTP tercepat di ekosistem Node.js)
// npm install fastify

import Fastify from 'fastify';

const fastify = Fastify({
  logger: false // Matikan logger bawaan untuk benchmark throughput murni
});

// JSON Schema untuk Validasi Input (Ajv) & Kompilasi Serialisasi Cepat (fast-json-stringify)
const telemetryIngestSchema = {
  body: {
    type: 'object',
    required: ['deviceId', 'temperature', 'humidity'],
    properties: {
      deviceId: { type: 'string', minLength: 3, maxLength: 20 },
      temperature: { type: 'number', minimum: -50, maximum: 120 },
      humidity: { type: 'number', minimum: 0, maximum: 100 },
      batteryLevel: { type: 'number', minimum: 0, maximum: 100, default: 100 }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        packetId: { type: 'string' },
        receivedAt: { type: 'string' }
      }
    }
  }
};

let packetCounter = 0;

// Hook Siklus Hidup Request (Fastify Lifecycle Hooks)
fastify.addHook('onRequest', async (request, reply) => {
  request.startTime = process.hrtime.bigint();
});

fastify.addHook('onResponse', async (request, reply) => {
  const diffNs = process.hrtime.bigint() - request.startTime;
  const elapsedMs = Number(diffNs) / 1_000_000;
  // fastify dapat memproses ribuan request per detik dengan latensi sub-milidetik
});

// Endpoint Ingesti Berkecepatan Tinggi
fastify.post('/api/v1/telemetry', { schema: telemetryIngestSchema }, async (request, reply) => {
  packetCounter++;
  const { deviceId, temperature } = request.body;

  reply.status(201);
  return {
    status: 'ACCEPTED',
    packetId: `PKT-${packetCounter.toString().padStart(6, '0')}`,
    receivedAt: new Date().toISOString()
  };
});

// Endpoint Health Check
fastify.get('/health', async () => ({ status: 'UP', totalPackets: packetCounter }));

console.log('=== MEMULAI FASTIFY TELEMETRY SERVER (SIMULASI INITIALIZATION) ===');
console.log('Fastify siap menerima request di port 3000 dengan skema Ajv terkompilasi.');
```

---

## Konsep Kunci

Selama lebih dari satu dekade, Express.js adalah framework paling populer di Node.js. Namun, Express dirancang di era JavaScript lama dan tidak dioptimalkan untuk async/await modern dan kompilasi skema.

### Mengapa Fastify Menjadi Pilihan Enterprise?
Fastify mampu melayani **hingga 2x - 3x lebih banyak request per detik** dibandingkan Express.js dengan latensi yang jauh lebih rendah dan alokasi memori yang minimal.

### Rahasia Kecepatan: Schema Compilation
Biasanya, server menggunakan `JSON.stringify()` standar untuk mengembalikan data ke klien. `JSON.stringify` harus menelusuri seluruh properti objek secara dinamis saat runtime.
Fastify menggunakan pustaka **fast-json-stringify**: berdasarkan skema `response` yang kita definisikan, Fastify membuat fungsi kompilasi C-like khusus di awal startup. Fungsi ini langsung mencetak string JSON tanpa refleksi, menghasilkan serialisasi 200% lebih cepat.

### Validasi Otomatis dengan Ajv
Dengan mendefinisikan skema JSON pada properti `body`, Fastify menggunakan engine **Ajv** (Another JSON Schema Validator) yang mengompilasi aturan validasi menjadi kode mesin super cepat. Request yang tidak sesuai langsung ditolak dengan status HTTP 400 sebelum menyentuh route handler bisnis kita.


---

---

## Penjelasan untuk Pemula

Bayangkan perbedaan antara seorang juru tulis yang harus membaca ulang seluruh dokumen surat setiap kali ingin memfotokopinya (Express + JSON.stringify biasa) vs mesin stempel cetak otomatis yang sudah punya cetakan huruf tetap (Fastify + Skema Ajv). Mesin stempel langsung mencap dokumen dalam 0,01 detik tanpa membaca ulang kata demi kata.

## Eksperimen

- Kirim request dengan temperature di luar rentang (misal 150) dan amati error validasi Ajv otomatis.
- Hapus field `deviceId` dari body request dan perhatikan penolakan dengan field `required`.
- Ukur durasi eksekusi menggunakan `process.hrtime.bigint()` pada hook `onResponse`.

---

## Tantangan

Tambahkan Fastify plugin kustom menggunakan `fastify-plugin` (fp) yang menginjeksi decorator `fastify.decorate("db", myDatabaseClient)` ke seluruh route aplikasi secara modular.

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

Kamu telah menguasai Fastify, validasi Ajv, dan serialisasi cepat. Level 1 selesai! Di Level 2 kita mempelajari Worker Threads, Redis Streams, dan WebSockets.
