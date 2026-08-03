# Keamanan API & Error Handling

> Node.js | Database & Auth | Pelajaran 12

## Tujuan Pembelajaran

- Memasang helmet, CORS, dan rate limiting
- Menulis validasi input dengan fail fast
- Menangani error secara terpusat
- Menyembunyikan detail error server dari client

---

## Program: Keamanan API & Error Handling

```js
// Keamanan API + error handling terpusat
// Jalankan: node server.js

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

// --- 1) Keamanan dasar ---
app.use(helmet()); // header keamanan HTTP (X-Frame-Options, CSP, dll)
app.use(cors()); // izinkan origin tertentu (bukan * di produksi)
app.use(express.json());

// --- 2) Rate limiting: batasi abuse ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  limit: 100, // maks 100 request per window per IP
  message: { error: 'Terlalu banyak request - coba lagi nanti' },
});
app.use('/api', limiter);

// --- 3) Validasi input ---
function validasiCatatan(req, res, next) {
  const { judul } = req.body;
  if (!judul || typeof judul !== 'string' || judul.length > 200) {
    return res.status(400).json({ error: 'judul wajib: string, maks 200 karakter' });
  }
  req.body.judul = judul.trim(); // bersihkan spasi
  next();
}

// --- 4) Error class khusus (agar handler terpusat tahu jenisnya) ---
class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// --- 5) Data & routes ---
const catatan = [];
let id = 1;

app.get('/api/catatan', (req, res) => {
  res.json(catatan);
});

app.post('/api/catatan', validasiCatatan, (req, res) => {
  const baru = { id: id++, judul: req.body.judul, selesai: false };
  catatan.push(baru);
  res.status(201).json(baru);
});

// Contoh error yang dilempar ke handler terpusat
app.get('/api/ledakan', (req, res, next) => {
  next(new ApiError(500, 'Sesuatu meledak secara terencana'));
});

// --- 6) 404: route tidak ditemukan ---
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route tidak ditemukan' });
});

// --- 7) Error handler TERPUSAT (wajib 4 argumen) ---
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status >= 500) console.error('SERVER ERROR:', err.stack);
  const body = status >= 500
    ? { error: 'Terjadi kesalahan server' } // jangan bocorkan detail ke client
    : { error: err.message };
  res.status(status).json(body);
});

app.listen(3000, () => console.log('Secure API di :3000/api/catatan'));
```

---

## Penjelasan

## Empat Lapis Pertahanan API
(1) helmet: header keamanan HTTP (CSP, X-Frame-Options, HSTS...) - menutup kelas serangan XSS/clickjacking. (2) cors: membatasi browser mana yang boleh memanggil API. (3) rate limit: membatasi request per IP - menahan brute force & DDoS dasar. (4) validasi input: menolak data buruk SEBELUM masuk logika. API produksi memasang semuanya; API kursus biasanya melupakan sebagian.
## Validasi: Fail Fast, Jangan Pernah Percaya Input
Client adalah musuh yang sopan: semua yang masuk lewat HTTP bisa dimanipulasi. Validasi tiap field: wajib, tipe, panjang, format. Trim data (judul.trim()). Tolak dengan 400 + pesan jelas. Pola middleware validasi (validasiCatatan) membuat handler route bersih - ini yang diotomatiskan express-validator/zod di proyek besar.
## Error Handling Terpusat: Satu Tempat untuk Semua
Middleware error (4 argumen: err, req, res, next) menangkap SEMUA error: yang dilempar next(err) maupun error async yang diteruskan. 404 handler menangkap route yang tidak terdefinisi. Keuntungan: format response error konsisten, log terpusat, dan kode route tidak penuh try/catch. ApiError class membawa status code agar handler tahu cara merespons.
## Jangan Bocorkan Detail Server
res.status(500) mengembalikan pesan GENERIK untuk client; detail error (stack trace) hanya ke log server. Stack trace di respons client = peta serangan gratis untuk hacker. Aturan: 4xx = pesan error spesifik untuk client; 5xx = pesan generik + log detail.

---

## Eksperimen

1. **Empat Lapis Pertahanan API**
2. **Validasi: Fail Fast, Jangan Pernah Percaya Input**
3. **Error Handling Terpusat: Satu Tempat untuk Semua**
4. **Jangan Bocorkan Detail Server**

---

## Tantangan

Tambahkan ke API: (1) validasi param id (harus angka positif - selain itu 400), (2) endpoint /api/ganti-password yang melempar ApiError(401) jika token lama tidak valid (simulasi: header x-auth harus "valid"), (3) uji: request tanpa header ke /api/ledakan, request berlebihan (lebih dari 100) ke /api/catatan - catat status code dan body tiap kasus.

---

## Ringkasan

helmet + CORS + rate limit + validasi = 4 lapis pertahanan. Fail fast: tolak input buruk. Error handler terpusat + ApiError. 5xx generik untuk client. Lanjut: upload & integrasi.
