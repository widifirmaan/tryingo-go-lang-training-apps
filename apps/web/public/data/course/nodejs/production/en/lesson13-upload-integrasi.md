# File Uploads & External API Integration

> Node.js | Production & Capstone | Lesson 13

## Learning Objectives

- Handle file uploads with multer
- Restrict file types and sizes
- Build correct API pagination
- Call external APIs with fetch

---

## Program: File Uploads & External API Integration

```js
// File upload (multer) + integrasi API eksternal + pagination
// Jalankan: node server.js

const express = require('express');
const multer = require('multer');
const path = require('node:path');

const app = express();
app.use(express.json());

// --- Multer: handle multipart/form-data ---
// Simpan di memori (untuk produksi: cloud storage / disk dengan validasi)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // maks 2MB
  fileFilter: (req, file, cb) => {
    const ok = ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file.originalname).toLowerCase());
    cb(ok ? null : new Error('Hanya gambar yang diizinkan'), ok);
  },
});

// --- Data in-memory dengan pagination ---
const post = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  judul: 'Postingan ' + (i + 1),
  gambarUrl: null,
}));

// --- Upload endpoint ---
app.post('/post/:id/gambar', upload.single('gambar'), (req, res) => {
  const p = post.find((x) => x.id === Number(req.params.id));
  if (!p) return res.status(404).json({ error: 'Post tidak ditemukan' });
  if (!req.file) return res.status(400).json({ error: 'File gambar wajib ada' });
  p.gambarUrl = 'data:' + req.file.mimetype + ';base64,' + req.file.buffer.toString('base64');
  res.json({ pesan: 'Gambar diunggah', ukuranKB: Math.round(req.file.size / 1024), gambarUrl: p.gambarUrl });
});

// --- Pagination: /post?page=1&limit=10 ---
app.get('/post', (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 10);
  const mulai = (page - 1) * limit;
  const data = post.slice(mulai, mulai + limit);
  res.json({
    data,
    pagination: { page, limit, total: post.length, totalPages: Math.ceil(post.length / limit) },
  });
});

// --- Integrasi API eksternal (simulasi fetch ke https://api.contoh.com/users) ---
app.get('/user-eksternal', async (req, res) => {
  // Di produksi: const resp = await fetch('https://api.example.com/users', { headers: {...} });
  // Di playground, simulasikan respons API eksternal:
  const data = await Promise.resolve([
    { id: 1, nama: 'Budi' },
    { id: 2, nama: 'Ani' },
  ]);
  res.json(data);
});

app.listen(3000, () => console.log('Upload & integrasi API di :3000'));
```

---

## Explanation

## Multer: File Uploads Without Headaches
Multipart form data cannot be parsed by express.json(). Multer provides the middleware: upload.single('gambar') captures the file in that field. memoryStorage keeps it in RAM (fine for small files); production usually uses diskStorage or straight to cloud storage (S3/Cloudinary). Always limit: size (limits.fileSize) and type (fileFilter) - dangerous files are an attack vector.
## File Validation: Two Layers
fileFilter rejects extensions other than images. The second layer: verify MIME/actual content (not just extension - extensions can be faked). Never trust the client: an uploaded file may contain anything. Save with random names (never user names - path traversal!), and never execute uploaded files.
## Pagination: A Skill Always Tested
Large data must be split: page + limit → skip = (page-1)*limit. A good response includes metadata: total, totalPages, page, limit - frontends need it for navigation buttons. Cap the maximum limit (Math.min) so users cannot request 10,000 records at once. The same pattern exists in every stack (this is offset pagination; cursor pagination for giant datasets).
## External API Integration
Backends often act as "middlemen": fetch a third-party API, transform, then serve to the frontend (hiding API keys from the browser!). Node 18+ has built-in fetch. Essential practices: timeouts (a fetch without a timeout hangs forever), retries for transient failures, and caching rarely-changing results (lesson 15).

---

## Experiments

1. **Multer: File Uploads Without Headaches**
2. **File Validation: Two Layers**
3. **Pagination: A Skill Always Tested**
4. **External API Integration**

---

## Challenge

Build a mini gallery endpoint: (1) add file size and upload time fields to the /post/:id/gambar response, (2) a GET /post/:id/gambar route returning gambarUrl, (3) a DELETE /post/:id/gambar route removing the image, (4) pagination sorted newest first (id desc). Test the whole flow.

---

## Summary

Multer: cap size & type, never trust file names. Pagination: page/limit + metadata. External fetch: timeout, retry, cache. Next: testing.
