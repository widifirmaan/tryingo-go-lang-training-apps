# Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory

> **Kategori:** Node.js Backend | **Level:** Pemula | **Minggu 1:** Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami evolusi runtime Node.js 22 LTS dan penggunaan prefix import `node:`.
- Menguasai manajemen memori biner mentah menggunakan `Buffer` dan TypedArrays di luar V8 Heap.
- Membaca dan menulis format biner Big-Endian dan Little-Endian (`readUInt16BE`, `writeFloatBE`).
- Membedakan `Buffer.alloc` (zero-filled yang aman) vs `Buffer.allocUnsafe` (alokasi instan tanpa zero-fill).

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

Kamu telah menguasai Node.js 22 ESM, Buffers, dan parsing protokol biner. Minggu depan kita masuk ke Event-Driven Architecture, EventEmitters, dan Transform Streams.
