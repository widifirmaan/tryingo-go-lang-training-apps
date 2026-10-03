# Diagnostik V8: Memory Leaks, Event Listener Leaks & Heap Snapshots

> **Kategori:** Node.js Backend | **Level:** Lanjutan | **Minggu 8:** Diagnostik V8: Memory Leaks, Event Listener Leaks & Heap Snapshots

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

## Ringkasan

Kamu telah menguasai diagnostik memori V8, analisis Retainers, dan Heap Snapshots. Minggu depan kita mempelajari Security Hardening, Rate Limiting, dan Graceful Shutdown.
