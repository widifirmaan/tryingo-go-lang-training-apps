# Autentikasi: bcrypt & JWT

> Node.js | Database & Auth | Pelajaran 11

## Tujuan Pembelajaran

- Menyimpan password dengan aman (bcrypt hash + salt)
- Menerbitkan dan memverifikasi JWT
- Membuat route terproteksi dengan middleware auth
- Menerapkan praktik keamanan: 401/409, pesan seragam, secret di .env

---

## Program: Autentikasi: bcrypt & JWT

```js
// Autentikasi: register + login + protected routes
// Jalankan: node server.js

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// Di produksi: simpan di .env, JANGAN di kode!
const JWT_SECRET = 'kunci-sangat-rahasia';
const JWT_EXPIRES = '2h';

// "Database" in-memory (ganti dengan MongoDB/PostgreSQL di proyek asli)
const user = [];

// --- Helper: middleware auth ---
function butuhAuth(req, res, next) {
  const header = req.headers.authorization; // "Bearer <token>"
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token tidak ada' });
  }
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Token tidak valid / kedaluwarsa' });
  }
}

// --- Register: hash password, simpan user ---
app.post('/register', async (req, res) => {
  const { nama, email, password } = req.body;
  if (!nama || !email || !password) {
    return res.status(400).json({ error: 'nama, email, password wajib diisi' });
  }
  if (user.find((u) => u.email === email)) {
    return res.status(409).json({ error: 'Email sudah terdaftar' });
  }
  const hash = await bcrypt.hash(password, 10); // 10 = cost factor
  const baru = { id: user.length + 1, nama, email, password: hash };
  user.push(baru);
  res.status(201).json({ id: baru.id, nama, email });
});

// --- Login: verifikasi hash, terbitkan JWT ---
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const akun = user.find((u) => u.email === email);
  // Pesan error SAMA untuk email/password salah - jangan bocorkan info
  if (!akun) return res.status(401).json({ error: 'Email atau password salah' });
  const cocok = await bcrypt.compare(password, akun.password);
  if (!cocok) return res.status(401).json({ error: 'Email atau password salah' });

  const token = jwt.sign(
    { id: akun.id, nama: akun.nama },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
  res.json({ token, user: { id: akun.id, nama: akun.nama, email: akun.email } });
});

// --- Protected route ---
app.get('/profil', butuhAuth, (req, res) => {
  const akun = user.find((u) => u.id === req.user.id);
  res.json({ id: akun.id, nama: akun.nama, email: akun.email });
});

// --- Bootstrap: buat user contoh ---
(async () => {
  const hash = await bcrypt.hash('password123', 10);
  user.push({ id: 1, nama: 'Budi', email: 'budi@mail.com', password: hash });
  app.listen(3000, () => console.log('Auth API di :3000 (register/login/profil)'));
})();
```

---

## Penjelasan

## Jangan Pernah Simpan Password Mentah
Jika database bocor dan password tersimpan mentah, semua akun Anda kompromi. bcrypt.hash(password, 10): hash satu arah + salt otomatis per-user. Login memakai bcrypt.compare (bukan perbandingan string!). Cost factor 10 = keseimbangan keamanan vs performa (12 direkomendasikan untuk produksi). Tidak ada cara "reverse" hash - brute force adalah satu-satunya, dan salt membuatnya sia-sia.
## JWT: Token, Bukan Session
Setelah login, server menerbitkan token (header.payload.signature) yang dibawa client di header Authorization: Bearer <token>. Server memverifikasi signature dengan JWT_SECRET - TANPA menyimpan state (stateless). Payload bisa dibaca siapa saja - JANGAN taruh data sensitif di payload. expiresIn mencegah token abadi. Logout = client membuang token (server stateless).
## Middleware Auth: Satu Pola untuk Semua Route
butuhAuth: ambil header, validasi format "Bearer ", jwt.verify (melempar jika invalid/expired), simpan payload ke req.user, next(). Tempelkan ke route mana pun: app.get('/profil', butuhAuth, handler). Ini pola yang sama di semua framework (NestJS pakai guards, Laravel pakai middleware).
## Praktik Keamanan yang Sering Dilupakan
(1) Pesan error login seragam ("Email atau password salah") - jangan bilang "email tidak ditemukan", itu membantu penyerang. (2) Status code tepat: 401 unauthenticated, 409 conflict, 403 forbidden. (3) JWT_SECRET di .env + tidak pernah di git. (4) HTTPS di produksi - tanpa itu, token bisa dicuri di jaringan.

---

## Eksperimen

1. **Jangan Pernah Simpan Password Mentah**
2. **JWT: Token, Bukan Session**
3. **Middleware Auth: Satu Pola untuk Semua Route**
4. **Praktik Keamanan yang Sering Dilupakan**

---

## Tantangan

Perluas sistem auth: (1) role pada user ("user" | "admin") dan route GET /admin yang HANYA bisa diakses admin (cek req.user.role, balas 403 untuk selain admin), (2) endpoint /ganti-password (butuhAuth): verifikasi password lama dengan bcrypt.compare, hash password baru, simpan, (3) uji seluruh alur dengan fetch di preview.

---

## Ringkasan

bcrypt: hash + salt, jangan simpan mentah. JWT: stateless token + expiresIn. Auth = middleware. Pesan seragam + status code tepat + secret di .env. Lanjut: keamanan & error handling.
