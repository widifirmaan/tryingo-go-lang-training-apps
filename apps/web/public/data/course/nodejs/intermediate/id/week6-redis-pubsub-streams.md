# Pesan Terdistribusi: Redis Pub/Sub vs Redis Streams & Consumer Groups

> **Kategori:** Node.js Backend | **Level:** Menengah | **Minggu 6:** Pesan Terdistribusi: Redis Pub/Sub vs Redis Streams & Consumer Groups
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengetahui perbedaan mendasar antara Redis Pub/Sub (ephemeral fire-and-forget) vs Redis Streams (persisten & terurut).
- Menggunakan perintah inti Redis Streams: `XADD`, `XREAD`, `XRANGE`, dan `XACK`.
- Menerapkan Consumer Groups untuk membagi beban pemrosesan event di antara beberapa instance worker.
- Menangani pemulihan kegagalan konsumen menggunakan Pending Entries List (PEL) dan `XCLAIM`.

---

## Program: Router Event Telemetri Terdistribusi dengan Redis Streams & Consumer Groups

```javascript
// Simulasi In-Memory Redis Streams Engine untuk Demonstrasi Arsitektur
class InMemoryRedisStreams {
  constructor() {
    this.streams = new Map();
    this.consumerOffsets = new Map();
  }

  // XADD: Tambahkan event ke Stream
  xadd(streamKey, id, fields) {
    if (!this.streams.has(streamKey)) {
      this.streams.set(streamKey, []);
    }
    const entryId = id === '*' ? `${Date.now()}-0` : id;
    const entry = { id: entryId, fields };
    this.streams.get(streamKey).push(entry);
    return entryId;
  }

  // XREADGROUP: Baca event sebagai anggota Consumer Group dengan Ack
  xreadgroup(groupName, consumerName, streamKey, count = 2) {
    const stream = this.streams.get(streamKey) || [];
    const key = `${groupName}:${streamKey}`;
    const lastReadIndex = this.consumerOffsets.get(key) || 0;

    const available = stream.slice(lastReadIndex, lastReadIndex + count);
    this.consumerOffsets.set(key, lastReadIndex + available.length);
    return available;
  }
}

const redis = new InMemoryRedisStreams();

// 1. Produsen: Mempublikasikan event telemetri ke stream 'telemetry:events'
console.log('=== PRODUCER: MEMPUBLIKASIKAN EVENT KE REDIS STREAMS (XADD) ===');
const id1 = redis.xadd('telemetry:events', '*', { sensorId: 'SNS-A1', temp: 34.2, alert: 'NORMAL' });
const id2 = redis.xadd('telemetry:events', '*', { sensorId: 'SNS-B2', temp: 88.5, alert: 'OVERHEAT' });
const id3 = redis.xadd('telemetry:events', '*', { sensorId: 'SNS-C3', temp: 22.0, alert: 'NORMAL' });

console.log(`Event dipublikasikan dengan IDs: ${id1}, ${id2}, ${id3}`);

// 2. Konsumen Kelompok (Consumer Group Worker 1 & Worker 2)
console.log('\n=== CONSUMER GROUP: DISTRIBUSI BEBAN KERJA BERSAMA ===');
const batchWorker1 = redis.xreadgroup('alert-processors', 'worker-pod-1', 'telemetry:events', 2);
console.log('[WORKER 1] Menerima', batchWorker1.length, 'event untuk diproses:');
batchWorker1.forEach(e => console.log(` -> ID: ${e.id} | Sensor: ${e.fields.sensorId} | Temp: ${e.fields.temp}°C`));

const batchWorker2 = redis.xreadgroup('alert-processors', 'worker-pod-2', 'telemetry:events', 2);
console.log('\n[WORKER 2] Menerima sisa', batchWorker2.length, 'event dari stream:');
batchWorker2.forEach(e => console.log(` -> ID: ${e.id} | Sensor: ${e.fields.sensorId} | Temp: ${e.fields.temp}°C`));
```

---

## Konsep Kunci

Ketika aplikasi Node.js dijalankan di banyak container pod di cloud, kita membutuhkan sistem perutean event terdistribusi untuk menghubungkan seluruh instans aplikasi.

### Redis Pub/Sub vs Redis Streams
- **Redis Pub/Sub**: Bersifat *fire-and-forget*. Jika ada subscriber yang sedang offline atau mengalami restart, pesan yang dikirim pada detik itu akan hilang selamanya. Sangat cocok untuk chat ephemeral atau sinyal invalidasi cache cepat.
- **Redis Streams**: Adalah log pesan persisten bergaya Apache Kafka di dalam Redis. Setiap pesan diberi ID berbasis timestamp yang unik. Jika sebuah pod worker mati, worker pengganti dapat membaca ulang pesan dari titik terakhir.

### Keunggulan Consumer Groups
Fitur **Consumer Groups** memungkinkan beberapa pod worker bergabung dalam satu tim kelompok. Redis memastikan satu pesan di dalam stream hanya diproses oleh satu worker di dalam kelompok tersebut (Load Balancing).

### Jaminan Pemrosesan: XACK dan PEL
Setelah worker selesai memproses event, worker harus mengirimkan konfirmasi `XACK`. Jika worker mengalami crash sebelum mengirim `XACK`, event tersebut akan tetap berada di dalam **Pending Entries List (PEL)** sehingga dapat diklaim dan diproses ulang oleh worker lain menggunakan perintah `XCLAIM`.


---

---

## Penjelasan untuk Pemula

Bayangkan siaran radio FM (Redis Pub/Sub). Jika Anda mematikan radio mobil Anda selama 5 menit, Anda melewatkan lagu yang sedang diputar dan tidak bisa mendengarkannya lagi. Bandingkan dengan playlist Spotify (Redis Streams): lagu tersimpan rapi dalam daftar antrean, dan Anda bisa menekan pause atau mendengarkannya kapan pun Anda siap.

## Eksperimen

- Ubah perintah `count` pada `xreadgroup` menjadi 1 dan amati bagaimana pesan didistribusikan satu per satu.
- Simulasikan worker yang crash tanpa memanggil ack dan periksa daftar pending entries.
- Gunakan Redis Pub/Sub (`PUBLISH` dan `SUBSCRIBE`) untuk membandingkan karakteristik latensi dengan Streams.

---

## Tantangan

Bangun worker pemulih `recoverPendingTasks(streamKey, groupName, minIdleTimeMs)` yang secara berkala memeriksa event yang menggantung di PEL dan mengklaimnya kembali untuk diproses.

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

Kamu telah menguasai Redis Streams, Consumer Groups, dan jaminan pengiriman pesan. Minggu depan kita membangun server WebSocket skala besar dengan heartbeat.
