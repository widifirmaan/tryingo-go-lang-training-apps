# Auth — KTP Node

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 7:** Auth
> **Prasyarat:** Minggu 6 — **REST API**.

## Tujuan Pembelajaran

- `jsonwebtoken` KTP: `jwt.sign({id}, "rahasia")`, `jwt.verify`, `middleware` cek `Authorization` header

---

## Kenapa Ini Penting Buat Kamu?

Tanpa JWT, `/admin` dibuka siapa saja. Dengan `sign` + `verify` + middleware, 10 baris jaga semua pintu.

---

## Program

```javascript
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());

const SECRET = "rahasia-warung";

app.post("/login", (req,res)=>{
  const { username } = req.body;
  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

function cek(req,res,next){
  const token = req.headers.authorization?.split(" ")[1];
  try{ req.user = jwt.verify(token, SECRET); next(); }
  catch{ res.status(401).json({ error: "Belum login" }); }
}

app.get("/admin", cek, (req,res)=>res.json({ pesan: `Halo ${req.user.username}` }));
app.listen(3000);
```

Test: `curl -X POST -H "Content-Type: application/json" -d '{"username":"admin"}' http://localhost:3000/login` → token → `curl -H "Authorization: Bearer TOKEN" http://localhost:3000/admin`.


---

## Penjelasan untuk Pemula

### Analogi: Gelang Konser Node
- **`jwt.sign` = cetak gelang**: login benar dapat token 1 jam; `verify` periksa tiap pintu VIP.
- **Middleware `cek` = satpam tempel**: 10 baris jaga SEMUA pintu!

### Langkah 0 — Siapkan Device
- Sama Node W1: `node -v` + `npm install express` (+ `jsonwebtoken`/`prisma` sesuai minggu).

### Cara Komputer Membaca
- `jwt.sign` buat gelang; middleware cek `Authorization: Bearer` tiap pintu jaga.

### 3 Istilah Wajib
- 1. **JWT/middleware**: gelang/satpam

---

## Tantangan

**Auth di Warungmu:** pakai `/login`, `/admin`, `cek` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/login`, `/admin`, `cek`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **REST API** (Minggu 6): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 7: **KTP Node** — JWT + middleware. Minggu depan: **Database**.
