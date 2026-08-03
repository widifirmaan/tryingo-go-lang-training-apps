# Authentication: bcrypt & JWT

> Node.js | Databases & Auth | Lesson 11

## Learning Objectives

- Store passwords securely (bcrypt hash + salt)
- Issue and verify JWTs
- Protect routes with an auth middleware
- Apply security practices: 401/409, uniform messages, secrets in .env

---

## Program: Authentication: bcrypt & JWT

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

## Explanation

## Never Store Raw Passwords
If a database leaks and passwords are stored raw, every account is compromised. bcrypt.hash(password, 10): one-way hash + automatic per-user salt. Login uses bcrypt.compare (not string comparison!). Cost factor 10 = security vs performance balance (12 is recommended for production). There is no way to "reverse" a hash - brute force is the only route, and salt makes it futile.
## JWT: Tokens, Not Sessions
After login, the server issues a token (header.payload.signature) that the client carries in the Authorization: Bearer <token> header. The server verifies the signature with JWT_SECRET - WITHOUT storing state (stateless). The payload can be read by anyone - do NOT put sensitive data in it. expiresIn prevents immortal tokens. Logout = the client discards the token (the server is stateless).
## Auth Middleware: One Pattern for All Routes
butuhAuth: take the header, validate "Bearer " format, jwt.verify (throws on invalid/expired), stash the payload in req.user, next(). Mount it on any route: app.get('/profil', butuhAuth, handler). This is the same pattern in every framework (NestJS guards, Laravel middleware).
## Security Practices Often Forgotten
(1) Uniform login errors ("Email or password wrong") - do not say "email not found", that helps attackers. (2) Correct status codes: 401 unauthenticated, 409 conflict, 403 forbidden. (3) JWT_SECRET in .env, never in git. (4) HTTPS in production - without it, tokens can be stolen on the network.

---

## Experiments

1. **Never Store Raw Passwords**
2. **JWT: Tokens, Not Sessions**
3. **Auth Middleware: One Pattern for All Routes**
4. **Security Practices Often Forgotten**

---

## Challenge

Extend the auth system: (1) a role on users ("user" | "admin") and a GET /admin route accessible ONLY by admins (check req.user.role, reply 403 otherwise), (2) a /ganti-password endpoint (butuhAuth): verify the old password with bcrypt.compare, hash the new one, store it, (3) test the whole flow with fetch in the preview.

---

## Summary

bcrypt: hash + salt, never store raw. JWT: stateless tokens + expiresIn. Auth = middleware. Uniform messages + precise status codes + secrets in .env. Next: security & error handling.
