# API Security & Error Handling

> Node.js | Databases & Auth | Lesson 12

## Learning Objectives

- Mount helmet, CORS, and rate limiting
- Write input validation with fail fast
- Handle errors centrally
- Hide server error details from clients

---

## Program: API Security & Error Handling

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

## Explanation

## Four Layers of API Defense
(1) helmet: HTTP security headers (CSP, X-Frame-Options, HSTS...) - closes a class of XSS/clickjacking attacks. (2) cors: limits which browsers may call the API. (3) rate limit: caps requests per IP - holds back brute force & basic DDoS. (4) input validation: rejects bad data BEFORE it enters business logic. Production APIs mount all of them; tutorial APIs usually forget some.
## Validation: Fail Fast, Never Trust Input
The client is a polite enemy: everything arriving over HTTP can be manipulated. Validate every field: required, type, length, format. Trim data (judul.trim()). Reject with 400 + a clear message. The validation middleware pattern (validasiCatatan) keeps route handlers clean - express-validator/zod automate this in bigger projects.
## Central Error Handling: One Place for Everything
The error middleware (4 args: err, req, res, next) catches ALL errors: those thrown via next(err) and forwarded async errors. The 404 handler catches undefined routes. Payoff: consistent error response format, central logging, and route code free of try/catch soup. The ApiError class carries a status code so the handler knows how to respond.
## Never Leak Server Details
res.status(500) returns a GENERIC message to the client; details (stack traces) go only to server logs. A stack trace in a client response is a free attack map for hackers. Rule: 4xx = specific error message for the client; 5xx = generic message + detailed logs.

---

## Experiments

1. **Four Layers of API Defense**
2. **Validation: Fail Fast, Never Trust Input**
3. **Central Error Handling: One Place for Everything**
4. **Never Leak Server Details**

---

## Challenge

Add to the API: (1) id param validation (must be a positive number - otherwise 400), (2) a /api/ganti-password endpoint throwing ApiError(401) when the old token is invalid (simulation: header x-auth must be "valid"), (3) test: a request without headers to /api/ledakan, an excessive request stream (over 100) to /api/catatan - record status codes and bodies for each case.

---

## Summary

helmet + CORS + rate limit + validation = 4 defense layers. Fail fast: reject bad input. Central error handler + ApiError. Generic 5xx to clients. Next: uploads & integration.
