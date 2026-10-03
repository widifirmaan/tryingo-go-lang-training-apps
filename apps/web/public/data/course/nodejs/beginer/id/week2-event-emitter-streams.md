# Arsitektur Event-Driven: EventEmitter, Transform Streams & Backpressure

> **Kategori:** Node.js Backend | **Level:** Pemula | **Minggu 2:** Arsitektur Event-Driven: EventEmitter, Transform Streams & Backpressure

## Tujuan Pembelajaran

- Menguasai arsitektur inti Node.js: `EventEmitter` dan pola Publish-Subscribe in-memory.
- Memahami 4 jenis Streams: Readable, Writable, Duplex, dan Transform.
- Memahami bahaya Backpressure dan mengapa `pipeline()` dari `node:stream/promises` wajib digunakan menggantikan `.pipe()`.
- Membangun Transform Stream kustom dalam `objectMode` untuk pengolahan aliran data.

---

## Program: Pipeline Pembersihan & Kompresi Data Telemetri dengan Transform Streams

```javascript
import { EventEmitter } from 'node:events';
import { Transform, Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

// 1. Bus Event Sensor Berbasis EventEmitter
class SensorEventHub extends EventEmitter {
  emitTelemetry(sensorId, value) {
    if (value > 85.0) {
      this.emit('alert:overheat', { sensorId, value, timestamp: Date.now() });
    }
    this.emit('telemetry', { sensorId, value });
  }
}

const hub = new SensorEventHub();

// Daftarkan listener alert overheat
hub.on('alert:overheat', (evt) => {
  console.log(`[CRITICAL ALERT] Sensor ${evt.sensorId} overheating: ${evt.value}°C!`);
});

// 2. Transform Stream: Memfilter Anomali & Menghitung Normalisasi
class TelemetryFilterTransform extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    // Buang data noise (sensor rusak dengan nilai negatif)
    if (chunk.value >= 0) {
      const enriched = {
        ...chunk,
        status: chunk.value > 80 ? 'WARNING' : 'NORMAL',
        processedAt: Date.now()
      };
      this.push(enriched);
    }
    callback();
  }
}

// 3. Eksekusi Pipeline Asinkron dengan Penanganan Backpressure Aman
async function runStreamPipeline() {
  console.log('=== MEMULAI PIPELINE STREAM TELEMETRI ===');
  
  // Sumber Data Stream (Readable)
  const rawReadings = [
    { sensorId: 'SNS-01', value: 24.5 },
    { sensorId: 'SNS-02', value: -999.0 }, // Noise data
    { sensorId: 'SNS-03', value: 92.1 },   // Overheat!
    { sensorId: 'SNS-04', value: 31.0 }
  ];

  const sourceStream = Readable.from(rawReadings);
  const filterTransform = new TelemetryFilterTransform();

  const sinkStream = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      console.log(` -> [PIPELINE OUTPUT]: Sensor ${chunk.sensorId} -> ${chunk.value}°C [${chunk.status}]`);
      callback();
    }
  });

  // stream/promises pipeline otomatis menangani pembersihan memory & error propagation
  await pipeline(sourceStream, filterTransform, sinkStream);
  console.log('=== PIPELINE SELESAI DENGAN SUKSES ===');
}

hub.emitTelemetry('SNS-03', 92.1);
await runStreamPipeline();
```

---

## Konsep Kunci

Node.js dirancang dari akarnya sebagai platform event-driven non-blocking. Dua fondasi paling penting dalam arsitektur Node.js adalah **EventEmitter** dan **Streams**.

### EventEmitter dan Batasan Listener
`EventEmitter` memungkinkan objek memancarkan event bernama (`hub.emit('telemetry')`) yang didengarkan oleh fungsi listener. Secara default, Node.js memberikan peringatan jika ada lebih dari 10 listener pada satu event untuk mencegah kebocoran memori (memory leak).

### Mengapa Streams Sangat Efisien?
Jika server harus membaca file log berukuran 10GB atau ribuan aliran data sensor, memuat seluruh data ke RAM sekaligus akan langsung menyebabkan Node.js crash dengan error `JavaScript heap out of memory`. Streams memecah data menjadi potongan-potongan kecil (**chunks**) dan memprosesnya seiring data tiba.

### Masalah Backpressure dan pipeline()
Ketika data dibaca (Readable) jauh lebih cepat daripada kemampuan pemrosesan downstream (Writable), memori buffer akan membengkak—fenomena ini disebut **Backpressure**.
Metode lama `source.pipe(dest)` memiliki cacat desain: jika terjadi error di tengah stream, koneksi dan file descriptor tidak ditutup secara otomatis. Sejak Node.js modern, kita selalu menggunakan `pipeline(source, transform, sink)` dari `node:stream/promises` yang otomatis mengatur laju backpressure dan menutup seluruh resource jika terjadi error.


---

---

## Penjelasan untuk Pemula

Bayangkan selang air pemadam kebakaran yang sangat deras (Readable Stream) dialirkan ke ember kecil (Writable Stream). Jika keran dibuka penuh tanpa pengatur, air akan tumpah ke mana-mana dan membanjiri ruangan (Memory Crash). Mekanisme Backpressure seperti katup otomatis yang memperlambat semprotan air sesuai kecepatan ember menampungnya.

## Eksperimen

- Ubah kapasitas buffer menggunakan opsi `highWaterMark` pada stream dan amati frekuensi chunk yang dipancarkan.
- Daftarkan lebih dari 10 listener pada `hub` dan perhatikan peringatan `MaxListenersExceededWarning` di console.
- Simulasikan error di tengah pipeline dan buktikan bahwa `sinkStream` tetap ditutup dengan aman.

---

## Tantangan

Buat Transform Stream `GzipCompressionTransform` yang memadatkan potongan chunk teks string menjadi buffer terkompresi menggunakan modul `node:zlib`.

---

## Ringkasan

Kamu telah menguasai EventEmitter, Transform Streams, dan penanganan Backpressure dengan pipeline. Minggu depan kita mempelajari File System, Path, dan Child Process.
