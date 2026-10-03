# Security Hardening: Rate Limiting, Header Security & Graceful Shutdown

> **Kategori:** Node.js Backend | **Level:** Lanjutan | **Minggu 9:** Security Hardening: Rate Limiting, Header Security & Graceful Shutdown

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

## Ringkasan

Kamu telah menguasai Security Headers, Token Bucket Rate Limiting, dan Graceful Shutdown. Minggu depan adalah Capstone Final: Gateway Telemetri & Notifikasi Real-Time Skala Tinggi!
