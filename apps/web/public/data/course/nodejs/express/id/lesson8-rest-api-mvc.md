# REST API & Arsitektur MVC

> Node.js | Express & Web API | Pelajaran 8

## Tujuan Pembelajaran

- Merancang API RESTful: resource, method, status code
- Memisahkan kode menjadi Model, Controller, Route
- Menerapkan konvensi penamaan REST
- Menjelaskan alur request: route → controller → model

---

## Program: REST API & Arsitektur MVC

```js
// Struktur MVC: routes -> controllers -> data
// Jalankan: node server.js

const express = require('express');
const app = express();
app.use(express.json());

// ---- MODEL (layer data) ----
// Di pelajaran 9, bagian ini diganti Mongoose (MongoDB)
const dataCatatan = [
  { id: 1, judul: 'Belajar MVC', selesai: false },
  { id: 2, judul: 'Belajar REST', selesai: true },
];
let idBerikutnya = 3;

// ---- CONTROLLER (logika bisnis) ----
const CatatanController = {
  semua(req, res) {
    res.json(dataCatatan);
  },
  detail(req, res) {
    const item = dataCatatan.find((c) => c.id === Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
    res.json(item);
  },
  buat(req, res) {
    const { judul } = req.body;
    if (!judul) return res.status(400).json({ error: 'judul wajib diisi' });
    const baru = { id: idBerikutnya++, judul, selesai: false };
    dataCatatan.push(baru);
    res.status(201).json(baru);
  },
  hapus(req, res) {
    const sebelum = dataCatatan.length;
    const index = dataCatatan.findIndex((c) => c.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Tidak ditemukan' });
    dataCatatan.splice(index, 1);
    res.status(204).end();
  },
};

// ---- ROUTES (pemetaan URL -> controller) ----
// Konvensi REST: kata benda jamak, tanpa kata kerja di URL
app.get('/catatan', CatatanController.semua);
app.get('/catatan/:id', CatatanController.detail);
app.post('/catatan', CatatanController.buat);
app.delete('/catatan/:id', CatatanController.hapus);

app.use((req, res) => res.status(404).json({ error: 'Route tidak ditemukan' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Kesalahan server' });
});

app.listen(3000, () => console.log('API MVC di http://localhost:3000/catatan'));
```

---

## Penjelasan

## Prinsip REST dalam Satu Paragraf
REST = memodelkan API sebagai RESOURCE (kata benda: /catatan) dan bertindak dengannya via HTTP method (GET baca, POST buat, PUT ubah, DELETE hapus). Bukan aksi dalam URL (/hapusCatatan) - resource + method sudah cukup ekspresif. API RESTful yang baik: konsisten, dapat ditebak, dan sesuai konvensi.
## Mengapa MVC? Sepatu Balet di Pabrik Kode
MVC (Model-View-Controller) memisahkan: Model = data & aturannya, Controller = logika bisnis (validasi, status code), View = output (JSON/HTML - di API, res.json). Di backend API, Routes hanyalah pemetaan URL → controller. Manfaat: setiap file kecil & fokus, bisa di-test, bisa diganti implementasinya (misal: ganti array → MongoDB tanpa menyentuh route).
## Alur Request di Aplikasi Ini
Request masuk → Express mencocokkan URL dengan route → route memanggil controller → controller memvalidasi & memanggil data (model) → controller membentuk response (status + JSON). Jika Anda bisa menjelaskan alur ini tanpa menoleh, Anda sudah memahami arsitektur backend modern - ini juga cara kerja NestJS, Laravel, dan Spring (dengan nama berbeda).
## Konvensi Penamaan REST
Plural noun: /catatan, /user. Resource bersarang: /catatan/:id/komentar. Method + status code sudah dijelaskan pelajaran 6. Konsistensi > kreativitas: satu API harus memakai satu gaya, bukan gaya campuran.

---

## Eksperimen

1. **Prinsip REST dalam Satu Paragraf**
2. **Mengapa MVC? Sepatu Balet di Pabrik Kode**
3. **Alur Request di Aplikasi Ini**
4. **Konvensi Penamaan REST**

---

## Tantangan

Refactor: pisahkan kode menjadi 3 file - routes/catatan.js (Router express), controllers/catatanController.js, dan models/catatanModel.js (fungsi array). server.js hanya memuat app + router. Tambahkan resource baru /label (CRUD lengkap) dengan pola yang sama. Uji kedua resource.

---

## Ringkasan

REST: resource + method, bukan aksi di URL. MVC: model/controller/route terpisah. Alur: route → controller → model → response. Ini fondasi Nest/Laravel/Spring. Lanjut: MongoDB.
