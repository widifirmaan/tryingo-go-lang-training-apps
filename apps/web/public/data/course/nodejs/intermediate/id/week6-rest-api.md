# REST API — Warung Online Lengkap Node

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 6:** REST API
> **Prasyarat:** Minggu 5 — **Express Server**.

## Tujuan Pembelajaran

- `GET /produk`, `POST /produk` `req.body`, `PUT /produk/:id`, `DELETE` — CRUD API, `status 201/404`

---

## Kenapa Ini Penting Buat Kamu?

HP butuh `GET` daftar + `POST` tambah + `DELETE` hapus. Tanpa `status` benar (201/404), HP tidak tahu sukses/gagal. Express 10 baris jadi API.

---

## Program: API Warung

```javascript
const express = require("express");
const app = express();
app.use(express.json());
let produk = [{ id: 1, nama: "Beras", harga: 62000 }];

app.get("/produk", (req,res)=>res.json(produk));
app.get("/produk/:id", (req,res)=>{
  const p = produk.find(x=>x.id==req.params.id);
  if(!p) return res.status(404).json({ error: "Tidak ada" });
  res.json(p);
});
app.post("/produk", (req,res)=>{
  const baru = { id: Date.now(), ...req.body };
  produk.push(baru);
  res.status(201).json(baru);
});
app.delete("/produk/:id", (req,res)=>{
  produk = produk.filter(x=>x.id != req.params.id);
  res.json({ ok: true });
});
app.listen(3000, ()=>console.log("http://localhost:3000/produk"));
```

Test: `curl http://localhost:3000/produk` dan `curl -X POST -H "Content-Type: application/json" -d '{"nama":"Gula","harga":15000}' http://localhost:3000/produk`


---

## Penjelasan untuk Pemula

### Analogi: Drive-Thru JSON Node
- **Express = pelayan siap pakai**: 1 baris 1 pintu + JSON otomatis.
- **`res.status(201/404)` = stempel**: HP tahu sukses vs hilang!

### Langkah 0 — Siapkan Device
- Sama Node W1: `node -v` + `npm install express` (+ `jsonwebtoken`/`prisma` sesuai minggu).

### Cara Komputer Membaca
- `app.get/post/delete` daftar pintu; `express.json()` buka amplop; `res.status(201)` stempel sukses.

### 3 Istilah Wajib
- 1. **Express/status**: pelayan/stempel

---

## Tantangan

**REST API di Warungmu:** pakai `/produk`, `/produk/:id` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/produk`, `/produk/:id`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Express Server** (Minggu 5): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 6: **REST Warung** — `GET/POST/DELETE` JSON. Minggu depan: **Auth**.
