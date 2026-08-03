# MongoDB & Mongoose: First Persistence

> Node.js | Databases & Auth | Lesson 9

## Learning Objectives

- Explain the document model: collections, documents, BSON
- Define schemas and models with Mongoose
- Perform async CRUD with Mongoose queries
- Leverage built-in Mongoose validation

---

## Program: MongoDB & Mongoose: First Persistence

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

## Explanation

## NoSQL: Think Documents, Not Rows
MongoDB stores documents (JSON/BSON objects) in collections (not tables). A single document may have a different structure (no strict schema) - flexible, but a double-edged sword: without a schema, data can get messy. Mongoose adds schemas at the application level to answer that.
## Schema & Model
Schema = the blueprint (type, required, default, enum, maxlength). Model = the interface to interact with a collection. The golden rule of document modeling: embed (store inside) if always read together, reference (store an id) if used separately. Notes have a tags array inside - embedded, because it always renders with them.
## Async CRUD
Mongoose is an async library: find (query, chainable: .sort().limit()), create, findByIdAndUpdate ({ new: true } returns the updated result, runValidators runs schema validation), findByIdAndDelete. Validation: .create() throws ValidationError when required fields are empty - caught by try/catch and answered with 400.
## timestamps & Useful Queries
{ timestamps: true } adds createdAt/updatedAt automatically - no memorizing, always there. The dynamic filter pattern (selesai, tag, limit) in the sample shows how flexible APIs work: query string → filter object → Mongoose query. This is the pattern nearly every production API uses.

---

## Experiments

1. **NoSQL: Think Documents, Not Rows**
2. **Schema & Model**
3. **Async CRUD**
4. **timestamps & Useful Queries**

---

## Challenge

Add features: (1) a schema field "deadline" of type Date, (2) a GET /catatan/terlambat route filtering deadline < now and selesai = false, (3) make GET /catatan?prioritas=tinggi work - test with fetch. In the seeder, add a note with yesterday's deadline. Document the filter queries you used.

---

## Summary

MongoDB: documents in collections. Mongoose: schemas + models + async CRUD + validation. Embed vs reference. timestamps & dynamic filters. Next: PostgreSQL & SQL.
