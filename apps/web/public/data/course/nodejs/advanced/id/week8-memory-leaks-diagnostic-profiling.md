# Diagnostik V8: Memory Leaks, Event Listener Leaks & Heap Snapshots

> **Kategori:** Node.js Backend | **Level:** Lanjutan | **Minggu 8:** Diagnostik V8: Memory Leaks, Event Listener Leaks & Heap Snapshots
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami cara kerja V8 Garbage Collector (Generational GC: Scavenge vs Mark-Sweep-Compact).
- Mengidentifikasi 3 penyebab utama memory leak di Node.js: Global variables, Unhandled Closures, dan Dangling Event Listeners.
- Menggunakan `v8.getHeapSnapshot()` untuk menghasilkan file snapshot yang dapat dianalisis di Chrome DevTools.
- Memantau metrik memori proses: `heapUsed`, `heapTotal`, `rss`, dan `external`.

---

## Program: Detektor Kebocoran Memori & Pemicu Heap Snapshot Otomatis di Node.js

```javascript
import v8 from 'node:v8';
import fs from 'node:fs/promises';
import { EventEmitter } from 'node:events';

class MemoryDiagnosticsEngine {
  constructor(thresholdMb = 150) {
    this.thresholdMb = thresholdMb;
    this.globalEmitter = new EventEmitter();
    this.leakyStorage = []; // Koleksi berpotensi memory leak
  }

  // Simulasi Bug Klasik: Mendaftarkan closure ke global emitter tanpa pernah di-unsubscribe
  simulateListenerLeak(sensorData) {
    const heavyPayload = new Array(1000).fill(`SENSOR_PAYLOAD_${sensorData.id}`);

    const handler = () => {
      // Closure menahan referensi ke heavyPayload dan sensorData di memori
      console.log('Handler terpanggil:', heavyPayload.length);
    };

    this.globalEmitter.on('telemetry_tick', handler);
    // Masalah: jika handler tidak pernah di `.off()`, memori tidak akan pernah dibersihkan GC!
  }

  checkMemoryAndSnapshot() {
    const memoryUsage = process.memoryUsage();
    const heapUsedMb = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
    const rssMb = (memoryUsage.rss / 1024 / 1024).toFixed(2);

    console.log(`[MEMORY AUDIT] Heap Used: ${heapUsedMb} MB | RSS: ${rssMb} MB | Total Listeners: ${this.globalEmitter.listenerCount('telemetry_tick')}`);

    if (memoryUsage.heapUsed > this.thresholdMb * 1024 * 1024) {
      console.warn(`[ALERT] Penggunaan Heap (${heapUsedMb} MB) melampaui batas ambang (${this.thresholdMb} MB)!`);
      this.triggerHeapSnapshot();
    }
  }

  triggerHeapSnapshot() {
    console.log('[DIAGNOSTIC] Menghasilkan V8 Heap Snapshot ke disk untuk investigasi Chrome DevTools...');
    const snapshotStream = v8.getHeapSnapshot();
    const fileName = `heap-${Date.now()}.heapsnapshot`;

    // Mengalirkan snapshot langsung ke disk
    import('node:fs').then(fsSync => {
      const fileStream = fsSync.createWriteStream(fileName);
      snapshotStream.pipe(fileStream);
      fileStream.on('finish', () => console.log(`[HEAP SNAPSHOT SAVED]: ${fileName}`));
    });
  }
}

// Eksekusi Demonstrasi
const engine = new MemoryDiagnosticsEngine(50); // Threshold rendah untuk pengujian

console.log('=== MEMULAI SIMULASI KEBOCORAN MEMORI V8 ===');
for (let i = 1; i <= 20; i++) {
  engine.simulateListenerLeak({ id: `SNS-${i}` });
}

engine.checkMemoryAndSnapshot();
```

---

## Konsep Kunci

Dalam lingkungan cloud production (Kubernetes/Docker), server yang mengalami kebocoran memori (memory leak) akan terus membengkak hingga akhirnya dimatikan secara paksa oleh sistem operasi (OOMKilled - Out Of Memory Kill).

### Cara Kerja V8 Garbage Collector
Mesin V8 membagi memori menjadi dua generasi utama:
1. **Young Generation (New Space)**: Objek baru yang berumur pendek dibersihkan dengan algoritma *Scavenge* yang sangat cepat.
2. **Old Generation (Old Space)**: Objek yang bertahan dari beberapa siklus GC dipindahkan ke Old Space dan dibersihkan dengan algoritma *Mark-Sweep-Compact* yang lebih berat.

### Bahaya Dangling Event Listeners
Penyebab memory leak nomor satu di Node.js adalah mendaftarkan listener pada objek global (`emitter.on('event', callback)`) tanpa pernah memanggil `.removeListener()` atau `.off()` saat koneksi ditutup. Fungsi callback menyimpan variabel-variabel di sekitarnya dalam **Closure Scope**, mencegah V8 membebaskan objek-objek tersebut dari RAM.

### Menggunakan Heap Snapshots
Dengan modul bawaan `node:v8`, kita dapat menghasilkan file `.heapsnapshot` saat memori server melonjak. File ini dapat dibuka langsung di browser Google Chrome (tab DevTools -> Memory -> Load Profile) untuk melihat objek mana yang menahan alokasi memori terbesar (Retainers Tree).


---

---

## Penjelasan untuk Pemula

Bayangkan Anda menyewa kamar kos. Setiap kali ada tamu datang, Anda menempelkan foto tamu tersebut di dinding kamar (Event Listener). Jika tamu sudah pulang tetapi fotonya tidak pernah Anda lepas dari dinding, lama-kelamaan kamar kos Anda penuh sesak dengan jutaan lembar foto sampai Anda tidak bisa bergerak dan pemilik kos mengusir Anda keluar (OOM Kill).

## Eksperimen

- Tambahkan method `.off("telemetry_tick", handler)` dan buktikan jumlah listener berkurang kembali ke 0.
- Buka file `.heapsnapshot` yang dihasilkan di Chrome DevTools dan cari kelas `MemoryDiagnosticsEngine`.
- Gunakan flag Node.js `--max-old-space-size=64` untuk menguji perilaku OOM pada memori terbatas.

---

## Tantangan

Buat middleware pendeteksi kebocoran memori otomatis yang membandingkan `process.memoryUsage().heapUsed` sebelum dan sesudah 1.000 HTTP request diproses, mencatat warning jika memori terus naik secara monoton.

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

Kamu telah menguasai diagnostik memori V8, analisis Retainers, dan Heap Snapshots. Minggu depan kita mempelajari Security Hardening, Rate Limiting, dan Graceful Shutdown.
