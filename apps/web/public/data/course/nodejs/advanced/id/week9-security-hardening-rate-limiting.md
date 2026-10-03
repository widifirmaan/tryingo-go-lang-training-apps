# Security Hardening: Rate Limiting, Header Security & Graceful Shutdown

> **Kategori:** Node.js Backend | **Level:** Lanjutan | **Minggu 9:** Security Hardening: Rate Limiting, Header Security & Graceful Shutdown
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengamankan header HTTP menggunakan standar Helmet (`X-Content-Type-Options`, CSP, HSTS).
- Mengimplementasikan algoritma Rate Limiting: Token Bucket vs Leaky Bucket.
- Menangani sinyal terminasi OS (`SIGTERM`, `SIGINT`) untuk Graceful Shutdown tanpa menjatuhkan koneksi klien aktif.
- Menggunakan `unref()` pada timer darurat agar tidak menahan proses Node.js keluar.

---

## Program: Stack Pertahanan API Gateway Node.js dengan Token Bucket & Graceful Teardown

```javascript
import http from 'node:http';

// 1. In-Memory Token Bucket Rate Limiter
class TokenBucketRateLimiter {
  constructor(capacity = 5, refillRatePerSec = 1) {
    this.capacity = capacity;
    this.refillRate = refillRatePerSec;
    this.buckets = new Map();
  }

  isAllowed(clientId) {
    const now = Date.now();
    let bucket = this.buckets.get(clientId);

    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefill: now };
      this.buckets.set(clientId, bucket);
    } else {
      // Tambahkan token berdasarkan waktu yang telah berlalu
      const elapsedSec = (now - bucket.lastRefill) / 1000;
      bucket.tokens = Math.min(this.capacity, bucket.tokens + elapsedSec * this.refillRate);
      bucket.lastRefill = now;
    }

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }
    return false;
  }
}

const rateLimiter = new TokenBucketRateLimiter(3, 1); // 3 token, isi ulang 1 token/detik

// 2. Server HTTP dengan Security Headers (Mirip modul Helmet)
const server = http.createServer((req, res) => {
  const clientIp = req.socket.remoteAddress || '127.0.0.1';

  // Terapkan Security Headers Penting
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Periksa Rate Limiting
  if (!rateLimiter.isAllowed(clientIp)) {
    res.writeHead(429, { 'Content-Type': 'application/json', 'Retry-After': '2' });
    return res.end(JSON.stringify({ error: 'TOO_MANY_REQUESTS', message: 'Rate limit terlampaui. Harap tunggu.' }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'OK', message: 'Akses gateway diizinkan' }));
});

// 3. Graceful Shutdown Handlers (Mencegah Pemutusan Paksa Saat Deployment)
function setupGracefulShutdown(serverInstance) {
  const signals = ['SIGTERM', 'SIGINT'];

  signals.forEach((signal) => {
    process.on(signal, () => {
      console.log(`\n[SIGNAL RECEIVED: ${signal}] Memulai proses Graceful Shutdown...`);

      // Berhenti menerima koneksi baru
      serverInstance.close(() => {
        console.log('[HTTP SERVER CLOSED] Seluruh koneksi HTTP aktif telah diselesaikan.');
        // Tutup koneksi database / Redis di sini
        console.log('[RESOURCES RELEASED] Database pool & socket terputus bersih.');
        process.exit(0);
      });

      // Paksa shutdown jika proses tersangkut melebihi 10 detik
      setTimeout(() => {
        console.error('[FORCE EXIT] Waktu timeout shutdown habis. Memaksa proses keluar.');
        process.exit(1);
      }, 10000).unref();
    });
  });
}

setupGracefulShutdown(server);
console.log('=== GATEWAY DEFENSE STACK INITIALIZED (RATE LIMITER & SECURITY HEADERS) ===');
```

---

## Konsep Kunci

Aplikasi backend yang berjalan di jaringan publik rentan terhadap serangan DDoS, injeksi skrip berbahaya, dan kehilangan data saat proses deployment berlangsung.

### Security Headers Penting
- `X-Content-Type-Options: nosniff`: Mencegah browser menebak (MIME-sniffing) tipe file, memblokir eksekusi skrip berbahaya yang menyamar sebagai gambar.
- `Content-Security-Policy (CSP)`: Membatasi dari domain mana saja skrip, font, dan iframe boleh dimuat, mematikan serangan Cross-Site Scripting (XSS).
- `Strict-Transport-Security (HSTS)`: Memaksa browser hanya menggunakan koneksi HTTPS terenkripsi.

### Algoritma Token Bucket Rate Limiting
Daripada menggunakan fixed window (yang rentan terhadap lonjakan request di pergantian detik), **Token Bucket** memberikan fleksibilitas: pengguna memiliki kapasitas token tertentu untuk menangani lonjakan sesaat (bursts), namun rata-rata konsumsi request jangka panjang dibatasi oleh laju isi ulang token per detik.

### Graceful Shutdown di Kubernetes
Saat Kubernetes melakukan rolling update aplikasi, orchestrator mengirim sinyal `SIGTERM` ke pod. Jika aplikasi langsung mati seketika, ribuan request pengguna yang sedang berlangsung akan putus di tengah jalan (502 Bad Gateway). Dengan graceful shutdown:
1. Server berhenti menerima request baru (`server.close()`).
2. Server menyelesaikan semua request yang sedang diproses.
3. Seluruh koneksi database dan Redis ditutup secara teratur sebelum proses keluar dengan status code 0.


---

---

## Penjelasan untuk Pemula

Bayangkan sebuah kafe yang ingin tutup jam 10 malam. Penjaga kafe membalik tanda di pintu menjadi "TUTUP" (server.close) agar tamu baru tidak masuk. Namun, tamu yang masih duduk makan di dalam kafe dipersilakan menghabiskan makanannya sampai selesai sebelum lampu kafe benar-benar dimatikan (Graceful Shutdown).

## Eksperimen

- Kirim 5 request HTTP secara beruntun dalam 1 detik dan amati respons 429 Too Many Requests.
- Kirim sinyal `process.emit("SIGINT")` dan amati urutan penutupan graceful shutdown di console.
- Periksa header respons menggunakan `curl -I http://localhost:3000` untuk memvalidasi security headers.

---

## Tantangan

Integrasikan rate limiter berbasis Redis (`INCR` dan `EXPIRE`) sehingga kuota request dibagikan secara konsisten ke seluruh instance container yang berjalan paralel.

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

Kamu telah menguasai Security Headers, Token Bucket Rate Limiting, dan Graceful Shutdown. Minggu depan adalah Capstone Final: Gateway Telemetri & Notifikasi Real-Time Skala Tinggi!
