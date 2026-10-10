# Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory

> **Kategori:** Node.js Backend | **Level:** Pemula | **Minggu 1:** Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami evolusi runtime Node.js 22 LTS dan penggunaan prefix import `node:`.
- Menguasai manajemen memori biner mentah menggunakan `Buffer` dan TypedArrays di luar V8 Heap.
- Membaca dan menulis format biner Big-Endian dan Little-Endian (`readUInt16BE`, `writeFloatBE`).
- Membedakan `Buffer.alloc` (zero-filled yang aman) vs `Buffer.allocUnsafe` (alokasi instan tanpa zero-fill).

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **ESLint** (`dbaeumer.vscode-eslint`): Linting kode JavaScript & Node.js
- **Prettier** (`esbenp.prettier-vscode`): Formatting konsisten

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS (v20+ / v22+))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

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

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
node -v && npm -v
```

Output yang diharapkan:
```output
v22.x.x
10.x.x
```

> 💡 **Tips Prasyarat:** Node.js sudah menyertakan package manager npm secara otomatis.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-node-api && cd my-node-api
npm init -y
npm install express dotenv
npm install -D typescript tsx @types/node @types/express
npx tsc --init
```
- **Keterangan:** Membuat project Node.js modern menggunakan TypeScript dan runtime eksekusi instan tsx.
- **Pindah ke direktori project:**
```bash
cd my-node-api
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npx tsx watch src/index.ts
```
Akses di browser atau terminal: `http://localhost:3000`

> ℹ️ API server aktif dengan fitur watch otomatis setiap file disimpan.

**File Titik Masuk Utama (`src/index.ts`):**
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
Server Express sederhana dengan healthcheck endpoint.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-node-api/
├── src/
│   └── index.ts         # Server HTTP Express
├── .env                 # Konfigurasi environment variables
├── tsconfig.json        # Konfigurasi compiler TypeScript
└── package.json         # Dependensi & skrip start
```
Struktur ramping dan minimalis, cocok untuk microservice.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan `tsx` (`npx tsx file.ts`) untuk mengeksekusi file TypeScript langsung tanpa kompilasi manual.
- Manfaatkan built-in Node test runner: `node --test` untuk unit test tanpa library pihak ketiga.

---

## Program: Parser Paket Biner Telemetri Perangkat IoT dengan Buffer & TypedArrays

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

## Konsep Kunci

Node.js 22 LTS adalah runtime JavaScript server-side paling matang di dunia. Dalam sistem berskala enterprise seperti IoT gateway dan video/audio streaming, data bergerak dalam bentuk byte biner mentah, bukan string JSON biasa.

### Native ESM dan Awalan node:
Di Node.js modern, modul CommonJS (`require`) telah digantikan oleh Native ECMAScript Modules (`import`). Penggunaan awalan `node:` seperti `import { Buffer } from 'node:buffer'` adalah standar resmi yang menjamin modul dimuat langsung dari core runtime Node.js dan kebal terhadap serangan pembajakan paket pihak ketiga di npm (Dependency Confusion / Typosquatting).

### Buffer: Memori di Luar V8 Heap
V8 JavaScript Engine mengelola objek melalui Garbage Collector di dalam V8 Heap. Namun untuk pemrosesan I/O biner skala besar (jaringan TCP, streaming file), Node.js mengalokasikan memori mentah langsung dari sistem operasi C++ menggunakan kelas `Buffer`. Buffer tidak membebani siklus Garbage Collector V8, sehingga operasi manipulasi byte berjalan secepat kilat.

### Keamanan: Buffer.alloc vs Buffer.allocUnsafe
- `Buffer.alloc(size)`: Menginisialisasi memori dan mengisinya dengan angka 0 (`zero-filled`). Sangat aman dari kebocoran data sensitif.
- `Buffer.allocUnsafe(size)`: Mengalokasikan blok RAM lama tanpa membersihkannya terlebih dahulu. Jauh lebih cepat, namun jika byte-nya langsung dikirim ke client tanpa ditimpa seluruhnya, data sensitif (seperti token atau password lama yang pernah ada di RAM) bisa bocor.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda menerima paket kargo tersegel dari luar negeri berukuran 12 cm (Buffer 12 bytes). 2 cm pertama adalah logo negara pengirim (Magic Bytes), 2 cm berikutnya kode gudang (Device ID), dan 4 cm berikutnya adalah kode angka suhu. Membaca Buffer seperti menggunakan penggaris presisi untuk membaca arti setiap milimeter kotak kargo tersebut.

## Eksperimen

- Ubah byte pertama `rawPacket[0] = 0x00` dan amati bagaimana parser melempar error magic bytes invalid.
- Bandingkan benchmark kecepatan `Buffer.alloc(1024)` vs `Buffer.allocUnsafe(1024)` pada 100.000 iterasi.
- Gunakan `buffer.subarray()` untuk memotong irisan byte tanpa menduplikasi alokasi memori baru (Zero-Copy slicing).

---

## Tantangan

Buat parser biner streaming yang memisahkan aliran byte berkelanjutan menjadi paket-paket telemetri individual berdasarkan delimiter magic bytes `TR`.

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

Kamu telah menguasai Node.js 22 ESM, Buffers, dan parsing protokol biner. Minggu depan kita masuk ke Event-Driven Architecture, EventEmitters, dan Transform Streams.
