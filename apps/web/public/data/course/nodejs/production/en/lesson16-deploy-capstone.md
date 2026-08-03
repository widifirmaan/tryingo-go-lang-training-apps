# Deployment, CI/CD & the Capstone

> Node.js | Production & Capstone | Lesson 16

## Learning Objectives

- Prepare an app for production: env vars, port, error handling
- Explain the CI/CD flow: build, test, deploy
- Deploy an API to a PaaS platform (Render/Railway)
- Complete the capstone: an end-to-end Task Manager API

---

## Program: Deployment, CI/CD & the Capstone

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

## Explanation

## From Laptop to Server: What Changes
Same code, different environment: PORT from env (not hardcoded 3000), JWT_SECRET from env (not in code!), DATABASE_URL from env. dotenv reads .env in development; PaaS platforms inject env in production. Rule: no secrets in code, no hardcoded config. Break it once and the secret leaks into git forever.
## CI/CD in One Paragraph
CI (Continuous Integration): every push to git triggers automated build + test - code that breaks tests never reaches production. CD (Continuous Delivery): the main branch that passes deploys automatically. Tools: GitHub Actions (YAML workflow: checkout → npm ci → npm test → deploy). A good pipeline makes deployment as boring as possible - because boring = repeatable = reliable.
## Deploy to PaaS (Render/Railway/Vercel)
PaaS = a platform-managed server: push code (or connect a GitHub repo), the platform builds + runs + gives HTTPS + auto-restart. For Node APIs: specify the build command (npm ci) and start command (npm start / pm2). The database is separate (managed DB on the same platform). A healthcheck endpoint (/health) tells the platform when the app is ready for traffic.
## Capstone: The Concept Wrapping Up the Track
This Task Manager API combines EVERYTHING learned: route/controller structure, fail-fast validation, bcrypt + stateless JWT, per-user data protection (filtering tasks by the userId from the token!), helmet + rate limit, central error handling. To close it out: add tests, deploy, and document the API (README + curl examples) - that is what separates bootcamp graduates from tutorial makers.

---

## Experiments

1. **From Laptop to Server: What Changes**
2. **CI/CD in One Paragraph**
3. **Deploy to PaaS (Render/Railway/Vercel)**
4. **Capstone: The Concept Wrapping Up the Track**

---

## Challenge

Finish the capstone: (1) add task filter & sort (?selesai=true&prioritas=tinggi&sort=terbaru), (2) add a GET /api/me route returning the user profile from the token, (3) write 4 Supertest tests: register→login→create task→read task (happy path flow), (4) write a README: how to run, env vars, endpoint list. If you have a Render/Railway account, deploy and share the URL.

---

## Summary

Production: env vars, stateless, HTTPS, healthchecks. CI/CD: build+test before deploy. PaaS for fast deployment. The capstone ties it together: auth, per-user data, security, error handling. You are Node-ready!
