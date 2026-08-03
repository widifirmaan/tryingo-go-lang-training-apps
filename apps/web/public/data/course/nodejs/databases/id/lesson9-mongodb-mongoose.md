# MongoDB & Mongoose: Persistensi Pertama

> Node.js | Database & Auth | Pelajaran 9

## Tujuan Pembelajaran

- Menjelaskan model dokumen: collection, document, BSON
- Mendefinisikan schema dan model dengan Mongoose
- Melakukan CRUD async dengan query Mongoose
- Memanfaatkan validasi bawaan Mongoose

---

## Program: MongoDB & Mongoose: Persistensi Pertama

```js
// MongoDB + Mongoose: data yang bertahan hidup
// Catatan: di playground ini, DB disimulasikan di memori.
// Di mesin lokal: instal MongoDB (atau pakai Atlas) + mongoose.

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// --- Schema: cetak biru dokumen ---
const catatanSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true, maxlength: 200 },
    selesai: { type: Boolean, default: false },
    prioritas: { type: String, enum: ['rendah', 'sedang', 'tinggi'], default: 'sedang' },
    tags: [String],
  },
  { timestamps: true } // createdAt & updatedAt otomatis
);

// --- Model: interface untuk koleksi "catatans" ---
const Catatan = mongoose.model('Catatan', catatanSchema);

// --- Koneksi (di lokal: mongodb://localhost:27017/tryngo) ---
// mongoose.connect('mongodb://localhost:27017/tryngo')
//   .then(() => console.log('Terhubung ke MongoDB'))
//   .catch((err) => console.error('Gagal konek:', err));

// --- CRUD dengan Mongoose ---
app.get('/catatan', async (req, res) => {
  const { selesai, tag, limit = 10 } = req.query;
  const filter = {};
  if (selesai !== undefined) filter.selesai = selesai === 'true';
  if (tag) filter.tags = tag;
  const data = await Catatan.find(filter).sort({ createdAt: -1 }).limit(Number(limit));
  res.json(data);
});

app.post('/catatan', async (req, res) => {
  try {
    const baru = await Catatan.create(req.body);
    res.status(201).json(baru);
  } catch (err) {
    // ValidationError dari Mongoose
    res.status(400).json({ error: err.message });
  }
});

app.put('/catatan/:id', async (req, res) => {
  const item = await Catatan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.json(item);
});

app.delete('/catatan/:id', async (req, res) => {
  const item = await Catatan.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.status(204).end();
});

// Seeder: isi data contoh saat server start
(async () => {
  if ((await Catatan.countDocuments()) === 0) {
    await Catatan.create([
      { judul: 'Belajar Mongoose', prioritas: 'tinggi', tags: ['node'] },
      { judul: 'Belajar Schema', selesai: true, tags: ['node'] },
    ]);
  }
  app.listen(3000, () => console.log('API MongoDB di :3000/catatan'));
})();
```

---

## Penjelasan

## NoSQL: Berpikir Dokumen, Bukan Baris
MongoDB menyimpan dokumen (objek JSON/BSON) dalam collection (bukan tabel). Satu dokumen bisa punya struktur berbeda (no strict schema) - flexibel, tapi ini pedang bermata dua: tanpa schema, data bisa berantakan. Mongoose menambahkan schema di level aplikasi untuk menjawabnya.
## Schema & Model
Schema = cetak biru (type, required, default, enum, maxlength). Model = interface untuk berinteraksi dengan collection. Aturan emas modeling dokumen: embed (simpan di dalam) jika dibaca bersama, reference (id) jika dipakai terpisah. Catatan punya tags array di dalamnya - embedded, karena selalu tampil bersama.
## CRUD Async
Mongoose adalah library async: find (query, bisa dirantai: .sort().limit()), create, findByIdAndUpdate ({ new: true } mengembalikan hasil terbaru, runValidators menjalankan validasi schema), findByIdAndDelete. Validasi: .create() melempar ValidationError jika field wajib kosong - ditangkap try/catch dan dibalas 400.
## timestamps & Query yang Bermanfaat
{ timestamps: true } menambahkan createdAt/updatedAt otomatis - tidak perlu dihafal, selalu ada. Pattern filter dinamis (selesai, tag, limit) di contoh menunjukkan cara API yang fleksibel: query string → filter object → query Mongoose. Ini pola yang dipakai hampir semua API produksi.

---

## Eksperimen

1. **NoSQL: Berpikir Dokumen, Bukan Baris**
2. **Schema & Model**
3. **CRUD Async**
4. **timestamps & Query yang Bermanfaat**

---

## Tantangan

Tambah fitur: (1) schema field "deadline" bertipe Date, (2) route GET /catatan/terlambat: filter deadline < sekarang dan selesai = false, (3) route GET /catatan?prioritas=tinggi bekerja - uji dengan fetch. Seeder: tambah catatan dengan deadline kemarin. Dokumentasikan query filter yang Anda pakai.

---

## Ringkasan

MongoDB: dokumen dalam collection. Mongoose: schema + model + CRUD async + validasi. Embed vs reference. timestamps & filter dinamis. Lanjut: PostgreSQL & SQL.
