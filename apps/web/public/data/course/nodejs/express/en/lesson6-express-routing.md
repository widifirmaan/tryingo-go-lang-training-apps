# Express: Routing & Request Handling

> Node.js | Express & Web APIs | Lesson 6

## Learning Objectives

- Create an Express server in a few lines
- Define full CRUD routes
- Use route params and query strings
- Return correct status codes and JSON

---

## Program: Express: Routing & Request Handling

```js
// Express: framework web paling populer untuk Node
// Jalankan: node server.js

const express = require('express');
const app = express();

// Middleware bawaan: parse JSON body otomatis
app.use(express.json());

// Data in-memory
let catatan = [
  { id: 1, judul: 'Belajar Express', selesai: false },
  { id: 2, judul: 'Belajar Middleware', selesai: true },
];
let idBerikutnya = 3;

// GET semua
app.get('/catatan', (req, res) => {
  res.json(catatan);
});

// GET satu dengan route parameter
app.get('/catatan/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = catatan.find((c) => c.id === id);
  if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.json(item);
});

// GET dengan query string: /catatan?selesai=true
app.get('/catatan-selesai', (req, res) => {
  const hanyaSelesai = req.query.selesai === 'true';
  res.json(catatan.filter((c) => c.selesai === hanyaSelesai));
});

// POST: buat baru (express.json() sudah parse body)
app.post('/catatan', (req, res) => {
  const { judul } = req.body;
  if (!judul) return res.status(400).json({ error: 'judul wajib diisi' });
  const baru = { id: idBerikutnya++, judul, selesai: false };
  catatan.push(baru);
  res.status(201).json(baru);
});

// PUT: update
app.put('/catatan/:id', (req, res) => {
  const item = catatan.find((c) => c.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
  item.judul = req.body.judul || item.judul;
  item.selesai = req.body.selesai !== undefined ? req.body.selesai : item.selesai;
  res.json(item);
});

// DELETE
app.delete('/catatan/:id', (req, res) => {
  const sebelum = catatan.length;
  catatan = catatan.filter((c) => c.id !== Number(req.params.id));
  if (catatan.length === sebelum) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.status(204).end();
});

app.listen(3000, () => {
  console.log('API Express berjalan di http://localhost:3000/catatan');
});
```

---

## Explanation

## Express: Compared to Pure http
Compare this code to lesson 5: 5 routes now ~40 lines vs ~70 lines of manual routing. express.json() replaces manual chunk concatenation. res.json() replaces writeHead+end. res.status(404).json() flows the response in one expression. Express = pure http + convenience, WITHOUT changing how it fundamentally works.
## Route Parameters & Query
req.params.id for /catatan/:id (a path segment). req.query for ?selesai=true (the query string). Remember: params are part of the URL path, query comes after '?'. Both are ALWAYS strings - convert with Number() when needed. Also note: the /catatan-selesai route MUST be defined BEFORE /catatan/:id, otherwise "selesai" gets caught as an id.
## Request Body & Validation
req.body is available because of express.json(). Minimal validation: check required fields (judul), reply 400 with a clear message. This is "fail fast": never store broken data. Full validation (express-validator / zod) comes in lesson 12.
## Status Codes & REST
Note the pattern: GET → 200, POST → 201 (created) + the new data, PUT → 200, DELETE → 204 (no content). This consistency lets frontends and other consumers use the API without guessing. It is also what backend job interviews test.

---

## Experiments

1. **Express: Compared to Pure http**
2. **Route Parameters & Query**
3. **Request Body & Validation**
4. **Status Codes & REST**

---

## Challenge

Add: (1) a GET /statistik route computing total and completed counts from the notes array, (2) a POST /catatan/bulk route accepting an array of titles and creating several notes at once (loop + validate each item), (3) test with fetch in the preview. Document each endpoint's response.

---

## Summary

Express = http + convenience: declarative routing, params, query, JSON bodies, precise status codes. Route order matters. Basic validation + fail fast. Next: middleware.
