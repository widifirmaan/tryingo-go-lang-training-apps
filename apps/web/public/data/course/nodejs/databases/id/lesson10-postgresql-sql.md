# PostgreSQL & SQL: Relational yang Tegas

> Node.js | Database & Auth | Pelajaran 10

## Tujuan Pembelajaran

- Menjelaskan model relasional: tabel, baris, primary/foreign key
- Menulis query CRUD dengan parameterized queries
- Menggabungkan data dengan JOIN
- Memutuskan kapan SQL dan kapan NoSQL

---

## Program: PostgreSQL & SQL: Relational yang Tegas

```js
// PostgreSQL: SQL + relasi antar tabel
// Jalankan: node server.js
// Catatan: playground ini mensimulasikan client pg di memori.

const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// --- Koneksi pool (koneksi dipakai bersama, efisien) ---
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'rahasia',
  database: 'tryngo',
});

// --- Schema SQL (DDL) ---
// CREATE TABLE user (id SERIAL PRIMARY KEY, nama TEXT NOT NULL, email TEXT UNIQUE);
// CREATE TABLE catatan (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
//   judul TEXT NOT NULL,
//   selesai BOOLEAN DEFAULT false,
//   dibuat TIMESTAMPTZ DEFAULT now()
// );

// --- CRUD dengan SQL (parameterized - aman dari SQL injection) ---
app.get('/catatan', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM catatan ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/catatan/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'SELECT * FROM catatan WHERE id = $1',
    [id] // $1 = placeholder aman
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Tidak ditemukan' });
  }
  res.json(result.rows[0]);
});

app.post('/catatan', async (req, res) => {
  const { judul, user_id = 1 } = req.body;
  const result = await pool.query(
    'INSERT INTO catatan (judul, user_id) VALUES ($1, $2) RETURNING *',
    [judul, user_id]
  );
  res.status(201).json(result.rows[0]);
});

app.put('/catatan/:id', async (req, res) => {
  const { judul, selesai } = req.body;
  const result = await pool.query(
    'UPDATE catatan SET judul = $1, selesai = $2 WHERE id = $3 RETURNING *',
    [judul, selesai, req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.json(result.rows[0]);
});

app.delete('/catatan/:id', async (req, res) => {
  await pool.query('DELETE FROM catatan WHERE id = $1', [req.params.id]);
  res.status(204).end();
});

// --- JOIN: relasi antar tabel ---
app.get('/user/:id/catatan', async (req, res) => {
  const result = await pool.query(
    'SELECT u.nama, c.judul, c.selesai FROM user u ' +
    'JOIN catatan c ON c.user_id = u.id WHERE u.id = $1',
    [req.params.id]
  );
  res.json(result.rows);
});

app.listen(3000, () => console.log('API PostgreSQL di :3000/catatan'));
```

---

## Penjelasan

## Model Relasional: Tabel, Baris, Kunci
Data disimpan dalam tabel (baris = record, kolom = field, terdefinisi tegas oleh schema). PRIMARY KEY mengidentifikasi baris; FOREIGN KEY menghubungkan tabel (catatan.user_id → user.id). Relasi mencegah duplikasi: user disimpan sekali, catatan mereferensikannya. Ini kekuatan SQL: integritas data adalah prioritas.
## Parameterized Query: $1, $2
JANGAN PERNAH menggabungkan nilai ke query dengan string template ('...' + judul + '...'). Itu SQL injection - celah yang bisa menghapus seluruh database Anda. Pakai placeholder $1, $2 + array nilai: pg menangani escaping. Ini pelajaran keamanan paling penting di track ini, dan persis yang diuji di wawancara backend.
## JOIN: Menyatukan Data
JOIN menggabungkan baris dari dua tabel berdasarkan kunci (ON c.user_id = u.id). Hasil: data user + data catatannya dalam satu query, tanpa dua round-trip. JOIN ada beberapa jenis: INNER (hanya yang cocok), LEFT (semua baris kiri), dsb. Kemampuan menyusun JOIN adalah skill inti database relasional.
## SQL vs NoSQL: Keputusan Arsitektur
SQL: data sangat terstruktur, relasi kuat, butuh transaksi & konsistensi (finansial, akuntansi, order). NoSQL: fleksibel, scale horizontal mudah, skema berubah cepat (log, katalog, prototype). Banyak stack produksi memakai KEDUANYA (polyglot persistence). Jawaban wawancara yang bagus menjelaskan trade-off, bukan memilih satu pemenang.

---

## Eksperimen

1. **Model Relasional: Tabel, Baris, Kunci**
2. **Parameterized Query: $1, $2**
3. **JOIN: Menyatukan Data**
4. **SQL vs NoSQL: Keputusan Arsitektur**

---

## Tantangan

Tulis DDL untuk sistem blog: tabel user (id, nama, email), tabel post (id, user_id FK, judul, isi, published_at), tabel komentar (id, post_id FK, user_id FK, isi). Lalu tulis 3 query: (1) semua post user tertentu dengan nama user (JOIN), (2) jumlah post per user (GROUP BY), (3) post dengan 5 komentar terbaru. Tuliskan SQL-nya.

---

## Ringkasan

SQL: tabel + kunci + integritas. Parameterized query = wajib. JOIN menyatukan relasi. SQL vs NoSQL = keputusan arsitektur. Lanjut: autentikasi JWT.
