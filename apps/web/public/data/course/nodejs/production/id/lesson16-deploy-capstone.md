# Deployment, CI/CD & Capstone

> Node.js | Produksi & Capstone | Pelajaran 16

## Tujuan Pembelajaran

- Menyiapkan aplikasi untuk produksi: env vars, port, error handling
- Menjelaskan alur CI/CD: build, test, deploy
- Mendeploy API ke platform PaaS (Render/Railway)
- Menyelesaikan capstone: API Task Manager end-to-end

---

## Program: Deployment, CI/CD & Capstone

```js
// CAPSTONE: API Task Manager yang siap produksi
// Jalankan: node server.js (di produksi: pm2 / container)
// Prasyarat produksi: env vars, database nyata, HTTPS, CI/CD.

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'ganti-di-env-produksi';

// Rate limit
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

// "Database" in-memory (proyek asli: MongoDB/PostgreSQL dari pelajaran 9-10)
let user = [];
let task = [];
let idTask = 1;

// Auth
function butuhAuth(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return res.status(401).json({ error: 'Login dulu' });
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token tidak valid' });
  }
}

// --- Auth routes ---
app.post('/api/register', async (req, res) => {
  const { nama, email, password } = req.body;
  if (!nama || !email || !password) return res.status(400).json({ error: 'Semua field wajib' });
  if (user.find((u) => u.email === email)) return res.status(409).json({ error: 'Email sudah dipakai' });
  const baru = { id: user.length + 1, nama, email, password: await bcrypt.hash(password, 10) };
  user.push(baru);
  res.status(201).json({ id: baru.id, nama, email });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const akun = user.find((u) => u.email === email);
  if (!akun || !(await bcrypt.compare(password, akun.password))) {
    return res.status(401).json({ error: 'Email atau password salah' });
  }
  const token = jwt.sign({ id: akun.id, nama: akun.nama }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// --- Task CRUD (hanya punya user sendiri!) ---
app.get('/api/task', butuhAuth, (req, res) => {
  res.json(task.filter((t) => t.userId === req.user.id));
});

app.post('/api/task', butuhAuth, (req, res) => {
  const { judul, prioritas = 'sedang' } = req.body;
  if (!judul || typeof judul !== 'string') return res.status(400).json({ error: 'judul wajib' });
  const baru = { id: idTask++, userId: req.user.id, judul, prioritas, selesai: false, dibuat: new Date() };
  task.push(baru);
  res.status(201).json(baru);
});

app.put('/api/task/:id', butuhAuth, (req, res) => {
  const t = task.find((x) => x.id === Number(req.params.id) && x.userId === req.user.id);
  if (!t) return res.status(404).json({ error: 'Task tidak ditemukan' });
  if (req.body.judul) t.judul = req.body.judul;
  if (req.body.selesai !== undefined) t.selesai = req.body.selesai;
  res.json(t);
});

app.delete('/api/task/:id', butuhAuth, (req, res) => {
  const idx = task.findIndex((x) => x.id === Number(req.params.id) && x.userId === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'Task tidak ditemukan' });
  task.splice(idx, 1);
  res.status(204).end();
});

// Error handling terpusat
app.use('/api', (req, res) => res.status(404).json({ error: 'Route tidak ditemukan' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Kesalahan server' });
});

app.listen(PORT, () => console.log('Capstone API berjalan di :' + PORT));

// --- Checklist produksi (dari seluruh track) ---
// 1. .env: PORT, JWT_SECRET, DATABASE_URL (tidak pernah di git)
// 2. Database nyata + parameterized queries (pelajaran 9-10)
// 3. helmet, CORS whitelist, rate limit, validasi (pelajaran 12)
// 4. Test dengan Jest + Supertest di CI (pelajaran 14)
// 5. pm2 -i max / container + stateless (pelajaran 15)
// 6. CI/CD: GitHub Actions build+test -> deploy ke Render/Railway
```

---

## Penjelasan

## Dari Laptop ke Server: Apa yang Berubah
Kode yang sama, lingkungan yang berbeda: PORT dari env (bukan hardcode 3000), JWT_SECRET dari env (bukan di kode!), DATABASE_URL dari env. dotenv membaca .env di development; platform PaaS menyuntikkan env di produksi. Aturan: tidak ada rahasia di kode, tidak ada konfigurasi hardcode. Sekali melanggar, rahasia bocor ke git selamanya.
## CI/CD dalam Satu Paragraf
CI (Continuous Integration): setiap push ke git memicu build + test otomatis - kode yang memecahkan test tidak pernah sampai ke produksi. CD (Continuous Delivery): branch utama yang lulus otomatis dideploy. Alat: GitHub Actions (YAML workflow: checkout → npm ci → npm test → deploy). Pipeline yang baik membuat deploy semembosankan mungkin - karena membosankan = dapat diulang = dapat diandalkan.
## Deploy ke PaaS (Render/Railway/Vercel)
PaaS = server dikelola platform: push kode (atau konek GitHub repo), platform build + jalankan + beri HTTPS + auto-restart. Untuk API Node: tentukan build command (npm ci) dan start command (npm start / pm2). Database terpisah (managed DB di platform yang sama). Healthcheck endpoint (/health) memberitahu platform kapan aplikasi siap menerima trafik.
## Capstone: Konsep yang Merangkum Track
Task Manager API ini menggabungkan SEMUA yang dipelajari: struktur route/controller, validasi fail-fast, bcrypt + JWT stateless, proteksi data per-user (filter task oleh userId dari token!), helmet + rate limit, error handling terpusat. Untuk menutup: tambahkan test, deploy, dan dokumentasikan API (README + contoh curl) - itu yang membedakan lulusan bootcamp dari pembuat tutorial.

---

## Eksperimen

1. **Dari Laptop ke Server: Apa yang Berubah**
2. **CI/CD dalam Satu Paragraf**
3. **Deploy ke PaaS (Render/Railway/Vercel)**
4. **Capstone: Konsep yang Merangkum Track**

---

## Tantangan

Selesaikan capstone: (1) tambahkan fitur filter & sort task (?selesai=true&prioritas=tinggi&sort=terbaru), (2) tambahkan route GET /api/me yang mengembalikan profil user dari token, (3) tulis 4 test Supertest: register→login→buat task→baca task (alur happy path), (4) tulis README: cara run, env vars, daftar endpoint. Jika punya akun Render/Railway, deploy dan bagikan URL-nya.

---

## Ringkasan

Produksi: env vars, stateless, HTTPS, healthcheck. CI/CD: build+test sebelum deploy. PaaS untuk deploy cepat. Capstone merangkum: auth, data per-user, keamanan, error handling. Anda siap Node!
