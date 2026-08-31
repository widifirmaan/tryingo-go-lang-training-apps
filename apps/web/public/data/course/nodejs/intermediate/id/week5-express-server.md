# Express Server — Warung Online Node

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 5:** Express Server

## Tujuan Pembelajaran

- `npm install express`, `app.get("/produk", (req,res)=>res.json(daftar))`, `app.listen(3000)`

---

## Kenapa Ini Penting Buat Kamu?

Node `http` asli ribet. Express = **pelayan warung siap pakai**: `app.get` 1 baris jadi API.

---

## Program: Warung Express

```bash
npm install express
```

```javascript
// server.js
const express = require("express");
const app = express();
app.use(express.json());

let daftar = [{ id: 1, nama: "Beras", harga: 62000 }];

app.get("/produk", (req, res) => res.json(daftar));
app.get("/produk/:id", (req, res) => {
  const p = daftar.find(x => x.id == req.params.id);
  res.json(p || { error: "Tidak ada" });
});
app.post("/produk", (req, res) => {
  const baru = { id: Date.now(), ...req.body };
  daftar.push(baru);
  res.status(201).json(baru);
});

app.listen(3000, () => console.log("Buka http://localhost:3000/produk"));
```

`node server.js` → `curl http://localhost:3000/produk`.

---

## Ringkasan

Minggu 5: **Express** — `app.get/post` jadi API.
