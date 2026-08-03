# PostgreSQL & SQL: Firmly Relational

> Node.js | Databases & Auth | Lesson 10

## Learning Objectives

- Explain the relational model: tables, rows, primary/foreign keys
- Write CRUD queries with parameterized queries
- Join data across tables with JOIN
- Decide when to use SQL and when NoSQL

---

## Program: PostgreSQL & SQL: Firmly Relational

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

## Explanation

## The Relational Model: Tables, Rows, Keys
Data lives in tables (rows = records, columns = fields, firmly defined by schema). A PRIMARY KEY identifies a row; a FOREIGN KEY links tables (catatan.user_id → user.id). Relations prevent duplication: a user is stored once, notes reference it. This is SQL's strength: data integrity is the priority.
## Parameterized Queries: $1, $2
NEVER splice values into a query with string templates ('...' + judul + '...'). That is SQL injection - a hole that can wipe your entire database. Use $1, $2 placeholders + a values array: pg handles escaping. This is the most important security lesson in this track, and exactly what backend interviews test.
## JOIN: Fusing Data
JOIN combines rows from two tables on a key (ON c.user_id = u.id). Result: a user's data + their notes in one query, without two round-trips. JOIN comes in flavors: INNER (only matches), LEFT (all left rows), etc. Crafting JOINs is a core relational database skill.
## SQL vs NoSQL: An Architecture Decision
SQL: highly structured data, strong relations, needs transactions & consistency (finance, accounting, orders). NoSQL: flexible, easy horizontal scaling, fast-changing schemas (logs, catalogs, prototypes). Many production stacks use BOTH (polyglot persistence). A good interview answer explains trade-offs, not one winner.

---

## Experiments

1. **The Relational Model: Tables, Rows, Keys**
2. **Parameterized Queries: $1, $2**
3. **JOIN: Fusing Data**
4. **SQL vs NoSQL: An Architecture Decision**

---

## Challenge

Write DDL for a blog system: user table (id, nama, email), post table (id, user_id FK, judul, isi, published_at), komentar table (id, post_id FK, user_id FK, isi). Then write 3 queries: (1) all posts of a given user with the user name (JOIN), (2) post count per user (GROUP BY), (3) posts with their 5 latest comments. Write the SQL down.

---

## Summary

SQL: tables + keys + integrity. Parameterized queries are mandatory. JOIN fuses relations. SQL vs NoSQL = an architecture decision. Next: JWT authentication.
