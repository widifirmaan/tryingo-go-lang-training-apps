# File Upload & Integrasi API Eksternal

> Node.js | Produksi & Capstone | Pelajaran 13

## Tujuan Pembelajaran

- Menangani upload file dengan multer
- Membatasi tipe dan ukuran file
- Membangun pagination API yang benar
- Memanggil API eksternal dengan fetch

---

## Program: File Upload & Integrasi API Eksternal

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

## Penjelasan

## Multer: File Upload Tanpa Sakit Kepala
Form data multipart tidak bisa diparse express.json(). Multer menyediakan middleware: upload.single('gambar') menangkap file di field tersebut. memoryStorage menyimpan di RAM (cukup untuk kecil); produksi biasanya diskStorage atau langsung ke cloud storage (S3/Cloudinary). Selalu batasi: ukuran (limits.fileSize) dan tipe (fileFilter) - file berbahaya adalah vektor serangan.
## Validasi File: Dua Lapis
fileFilter menolak ekstensi selain gambar. Lapis kedua: verifikasi MIME/isi file (bukan hanya ekstensi - ekstensi bisa dipalsukan). Never trust the client: file yang diunggah user bisa berisi apa saja. Simpan dengan nama random (jangan nama user - path traversal!), dan jangan pernah mengeksekusi file upload.
## Pagination: Skill yang Selalu Diuji
Data besar harus dipecah: page + limit → skip = (page-1)*limit. Respons yang baik menyertakan metadata: total, totalPages, page, limit - frontend butuh untuk tombol navigasi. Batasi limit maksimum (Math.min) agar user tidak minta 10.000 record sekaligus. Pola yang sama di semua stack (offset pagination ini; cursor pagination untuk data raksasa).
## Integrasi API Eksternal
Backend sering jadi "perantara": fetch ke API pihak ketiga, transformasi, lalu sajikan ke frontend (menyembunyikan API key dari browser!). Node 18+ punya fetch bawaan. Praktik penting: timeout (fetch tanpa timeout menggantung selamanya), retry untuk kegagalan sementara, dan simpan hasil yang jarang berubah di cache (pelajaran 15).

---

## Eksperimen

1. **Multer: File Upload Tanpa Sakit Kepala**
2. **Validasi File: Dua Lapis**
3. **Pagination: Skill yang Selalu Diuji**
4. **Integrasi API Eksternal**

---

## Tantangan

Bangun mini endpoint galeri: (1) tambahkan kolom ukuran file dan waktu upload ke respons /post/:id/gambar, (2) route GET /post/:id/gambar yang mengembalikan gambarUrl, (3) route DELETE /post/:id/gambar untuk menghapus gambar, (4) pagination dengan sortir terbaru (id desc). Uji seluruh alur.

---

## Ringkasan

Multer: batasi ukuran & tipe, jangan percaya nama file. Pagination: page/limit + metadata. Fetch eksternal: timeout, retry, cache. Lanjut: testing.
