# REST API — Warung Online Lengkap Node

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 6:** REST API

## Tujuan Pembelajaran

- `GET /produk`, `POST /produk` `req.body`, `PUT /produk/:id`, `DELETE` — CRUD API, `status 201/404`

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

## Ringkasan

Minggu 6: **REST Warung** — `GET/POST/DELETE` JSON.
