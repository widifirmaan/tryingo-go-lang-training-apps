# Middleware: The Request Pipeline

> Node.js | Express & Web APIs | Lesson 7

## Learning Objectives

- Explain the middleware pipeline concept (req, res, next)
- Write custom middleware: logging, auth, 404
- Apply middleware to specific routes
- Handle errors centrally with error middleware

---

## Program: Middleware: The Request Pipeline

```js
// Middleware: pipeline request -> response
// Jalankan: node server.js

const express = require('express');
const app = express();

app.use(express.json());

// 1) Middleware logging kustom
app.use((req, res, next) => {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${req.method} ${req.url}`);
  next(); // WAJIB: teruskan ke middleware berikutnya
});

// 2) Middleware autentikasi sederhana (proteksi route tertentu)
function butuhToken(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (token !== 'rahasia123') {
    return res.status(401).json({ error: 'Token tidak valid' });
  }
  next();
}

// 3) Middleware spesifik route: hitung durasi
app.get('/catatan', (req, res, next) => {
  req.mulai = Date.now();
  next();
}, (req, res) => {
  // Data sementara (akan diganti database di pelajaran 9)
  const data = [
    { id: 1, judul: 'Catatan 1', selesai: false },
    { id: 2, judul: 'Catatan 2', selesai: true },
  ];
  res.json({ data, durasiMs: Date.now() - req.mulai });
});

// 4) Route publik vs terproteksi
app.get('/publik', (req, res) => {
  res.json({ pesan: 'Semua orang bisa akses' });
});

app.get('/rahasia', butuhToken, (req, res) => {
  res.json({ pesan: 'Anda punya token yang benar!' });
});

// 5) Middleware 404: menangkap semua route yang tidak ada
app.use((req, res) => {
  res.status(404).json({ error: 'Route tidak ditemukan' });
});

// 6) Middleware error: 4 argumen (err, req, res, next)
app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);
  res.status(500).json({ error: 'Terjadi kesalahan server' });
});

app.listen(3000, () => console.log('Server middleware di :3000'));
```

---

## Explanation

## Middleware: Express's Core Concept
Middleware is a function receiving (req, res, next) that runs in STAGES: each middleware can read/modify req & res, then calls next() to pass to the next stage. Think of an assembly line: each station handles one task. express.json() itself is middleware - so are morgan (logging), helmet (security).
## Mount Order = Execution Order
Middleware runs in the order it is registered with app.use/routes. Logging must be mounted first (so it logs everything). The 404 middleware is mounted LAST (after all routes). If the order is wrong, app behavior is wrong - the classic Express debugging pattern is checking middleware order.
## next() and Control Flow
Call next() to continue; do NOT call next() after the response has already been sent (double-response - a common bug). Pass a value to next(err) to jump straight to the error middleware. Middleware that neither calls next nor sends a response will hang the request.
## Auth via Middleware
The butuhToken pattern: check the header, if it fails → 401 (return! not next), if it passes → next(). This is the JWT pattern in lesson 11: token-verifying middleware, then the route handler runs. One middleware can mount on many routes - protecting the API without duplicating code.

---

## Experiments

1. **Middleware: Express's Core Concept**
2. **Mount Order = Execution Order**
3. **next() and Control Flow**
4. **Auth via Middleware**

---

## Challenge

Build a simple "rate limiter" middleware: cap requests at 3 per minute per IP (store counts in a Map). If exceeded, reply 429 Too Many Requests. Mount it on the /rahasia route. Test with 5 consecutive requests and record each status code.

---

## Summary

Middleware = the pipeline (req, res, next). Mount order defines behavior. 404 & error handlers go last. Auth = middleware. Next: REST APIs & MVC.
