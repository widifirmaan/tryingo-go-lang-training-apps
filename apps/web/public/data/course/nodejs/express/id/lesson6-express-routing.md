# Express: Routing & Penanganan Request

> Node.js | Express & Web API | Pelajaran 6

## Tujuan Pembelajaran

- Membuat server Express dengan beberapa baris
- Mendefinisikan route CRUD lengkap
- Memakai route params dan query strings
- Mengembalikan status code dan JSON yang benar

---

## Program: Express: Routing & Penanganan Request

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

## Penjelasan

## Express: Perbandingan dengan http Murni
Bandingkan kode ini dengan pelajaran 5: 5 route sekarang ~40 baris vs ~70 baris dengan routing manual. express.json() menggantikan penggabungan chunk manual. res.json() menggantikan writeHead+end. res.status(404).json() mengalirkan respons dengan satu ekspresi. Express = http murni + kenyamanan, TANPA mengganti cara kerja fundamentalnya.
## Route Parameters & Query
req.params.id untuk /catatan/:id (path segment). req.query untuk ?selesai=true (query string). Ingat: params = bagian dari URL path, query = parameter setelah '?'. Keduanya SELALU string - konversi dengan Number() bila perlu. Perhatikan juga: route /catatan-selesai HARUS didefinisikan SEBELUM /catatan/:id, kalau tidak "selesai" tertangkap sebagai id.
## Request Body & Validasi
req.body tersedia karena express.json(). Validasi minimal: cek field wajib (judul), balas 400 dengan pesan jelas. Ini prinsip "fail fast": jangan simpan data rusak ke penyimpanan. Validasi lengkap (express-validator / zod) di pelajaran 12.
## Status Code & REST
Perhatikan pola: GET → 200, POST → 201 (created) + data baru, PUT → 200, DELETE → 204 (no content). Konsistensi ini yang membuat API bisa dipakai frontend dan konsumen lain tanpa tebak-tebakan. Ini juga yang diuji di wawancara kerja backend.

---

## Eksperimen

1. **Express: Perbandingan dengan http Murni**
2. **Route Parameters & Query**
3. **Request Body & Validasi**
4. **Status Code & REST**

---

## Tantangan

Tambahkan: (1) route GET /statistik yang menghitung total dan yang selesai dari array catatan, (2) route POST /catatan/bulk yang menerima array judul dan membuat beberapa catatan sekaligus (loop + validasi tiap item), (3) uji dengan fetch di preview. Dokumentasikan response tiap endpoint.

---

## Ringkasan

Express = http + kenyamanan: routing deklaratif, params, query, JSON body, status codes tepat. Urutan route penting. Validasi dasar + fail fast. Lanjut: middleware.
