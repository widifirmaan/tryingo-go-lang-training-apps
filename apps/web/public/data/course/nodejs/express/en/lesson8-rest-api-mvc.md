# REST APIs & MVC Architecture

> Node.js | Express & Web APIs | Lesson 8

## Learning Objectives

- Design RESTful APIs: resources, methods, status codes
- Separate code into Model, Controller, Route
- Apply REST naming conventions
- Explain the request flow: route → controller → model

---

## Program: REST APIs & MVC Architecture

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

## Explanation

## REST Principles in One Paragraph
REST = modeling an API as RESOURCES (nouns: /catatan) and acting on them via HTTP methods (GET read, POST create, PUT update, DELETE delete). Not actions in URLs (/hapusCatatan) - resource + method are expressive enough. A good RESTful API: consistent, predictable, conventional.
## Why MVC? Ballet Shoes in the Code Factory
MVC (Model-View-Controller) separates: Model = data & its rules, Controller = business logic (validation, status codes), View = output (JSON/HTML - in APIs, res.json). In backend APIs, Routes are just URL → controller mappings. Benefits: every file is small & focused, testable, and its implementation swappable (e.g., switching array → MongoDB without touching routes).
## Request Flow in This App
Request arrives → Express matches the URL to a route → the route calls the controller → the controller validates & accesses data (model) → the controller shapes the response (status + JSON). If you can explain this flow without looking, you understand modern backend architecture - it is also how NestJS, Laravel, and Spring work (under different names).
## REST Naming Conventions
Plural nouns: /catatan, /user. Nested resources: /catatan/:id/komentar. Methods + status codes were covered in lesson 6. Consistency > creativity: one API must use one style, not a mix.

---

## Experiments

1. **REST Principles in One Paragraph**
2. **Why MVC? Ballet Shoes in the Code Factory**
3. **Request Flow in This App**
4. **REST Naming Conventions**

---

## Challenge

Refactor: split the code into 3 files - routes/catatan.js (an express Router), controllers/catatanController.js, and models/catatanModel.js (array functions). server.js only mounts the app + router. Add a second resource /label (full CRUD) with the same pattern. Test both resources.

---

## Summary

REST: resources + methods, not actions in URLs. MVC: model/controller/route separated. Flow: route → controller → model → response. This is the foundation of Nest/Laravel/Spring. Next: MongoDB.
