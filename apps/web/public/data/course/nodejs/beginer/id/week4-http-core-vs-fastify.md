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

Kamu telah menguasai Fastify, validasi Ajv, dan serialisasi cepat. Level 1 selesai! Di Level 2 kita mempelajari Worker Threads, Redis Streams, dan WebSockets.
