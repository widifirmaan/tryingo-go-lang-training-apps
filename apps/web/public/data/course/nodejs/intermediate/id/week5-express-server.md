# Express Server — Warung Online Node

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 5:** Express Server
> **Prasyarat:** Minggu 4 — **Events & Async**.

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

## Tantangan

**Express Server di Warungmu:** pakai `/produk`, `/produk/:id` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/produk`, `/produk/:id`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Events & Async** (Minggu 4): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 5: **Express** — `app.get/post` jadi API. Minggu depan: **REST API**.
