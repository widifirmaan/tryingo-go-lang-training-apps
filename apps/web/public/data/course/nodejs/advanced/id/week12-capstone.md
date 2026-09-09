# Capstone: Toko Node Lengkap

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 12:** Capstone
> **Prasyarat:** Minggu 11 — **Deployment**.

## Tujuan Pembelajaran

- Gabung `express` + `prisma` + `jwt` + `pm2` + `vercel` jadi toko `produk` + `keranjang` + `auth` + `deploy`

---

## Kenapa Ini Penting Buat Kamu?

11 minggu terpisah — capstone buktikan gabung: Express + Prisma + JWT + test + deploy jadi toko. Portfolio Node.

---

## Program: Toko Capstone Node

Fitur wajib:
- `GET /produk` + `POST /produk` + `DELETE` via Express + Prisma
- `POST /login` JWT + `middleware` cek
- `pm2` + `vercel --prod`

Struktur: `server.js`, `prisma/schema.prisma`, `routes/produk.js`, `middleware/auth.js`.

**Tugas:** Deploy `warung-node.vercel.app` + video 2 menit tambah produk → cek di HP.



```javascript
// Capstone Node: mini toko Express+Prisma+JWT+cache dalam 1 file murni
// (simulasi 1-proses agar jalan di playground; pola sama dipakai routes/ + middleware/)
const db = {
  produk: [
    { id: 1, nama: "Beras 5kg", harga: 62000 },
    { id: 2, nama: "Minyak 2L", harga: 48000 },
    { id: 3, nama: "Gula 1kg", harga: 17500 },
  ],
};
// findMany / findUnique ala Prisma
const prisma = {
  findMany: () => db.produk,
  findUnique: (id) => db.produk.find((p) => p.id === id) || null,
  create: (nama, harga) => {
    const p = { id: db.produk.length + 1, nama, harga };
    db.produk.push(p);
    return p;
  },
};
// JWT mainan: token = "id-nama" + "." + cek digit (asli: jsonwebtoken sign/verify)
const buatToken = (user) => `${user.id}-${user.nama}.${(user.id * 7 + user.nama.length) % 97}`;
const cekToken = (token) => {
  const [akun, cek] = token.split(".");
  const [id, ...nm] = akun.split("-");
  const nama = nm.join("-");
  return String((Number(id) * 7 + nama.length) % 97) === cek ? { id: Number(id), nama } : null;
};
// middleware auth ala Express: tempel sebelum handler
const wajibLogin = (token, lanjut) => {
  const user = cekToken(token);
  if (!user) return { status: 401, body: "Butuh login (token salah)" };
  return lanjut(user);
};
// router mini: GET /produk, POST /produk (login), DELETE /produk/:id (login)
const cache = new Map(); // cache ala Map W10 (asli: redis/pm2 scale)
const routes = {
  "GET /produk": () => {
    if (!cache.has("produk")) cache.set("produk", prisma.findMany());
    return { status: 200, body: cache.get("produk") };
  },
  "POST /produk": (req) =>
    wajibLogin(req.token, () => {
      cache.delete("produk"); // tulis -> cache basi dibuang
      const p = prisma.create(req.body.nama, req.body.harga);
      return { status: 201, body: p };
    }),
};
const token = buatToken({ id: 1, nama: "budi" });
console.log("GET /produk ->", JSON.stringify(routes["GET /produk"]().body));
console.log("POST tanpa token ->", routes["POST /produk"]({ token: "salah", body: {} }).status);
console.log("POST + login ->", JSON.stringify(routes["POST /produk"]({ token, body: { nama: "Kopi", harga: 12000 } }).body));
console.log("GET lagi (cache dibuang, baca ulang) ->", routes["GET /produk"]().body.length + " produk");
// mini-uji ala vitest W9
const assert = (nama, dapat, mau) => console.log((dapat === mau ? "LOLOS " : "GAGAL ") + nama);
assert("produk awal 3", prisma.findMany().length >= 3, true);
assert("token budi valid", !!cekToken(token), true);
```

*Tempel di playground → Run, lihat output tiap rute + hasil uji LOLOS.*

---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Toko Node
- **11 minggu = rakit warung**: dapur (Node) + pelayan (Express) + gudang (Prisma) + KTP (JWT).
- **Capstone = grand opening**: API + DB + auth + deploy JALAN BARENG, `routes/` tak campur ruang makan!

### Langkah 0 — Siapkan Device
- Sama Node W1 + paket minggu ini (`vitest`/`pm2`/`vercel`).

### Cara Komputer Membaca
- CHECKLIST (API + DB + auth + test + deploy) lalu URL + video.

### 3 Istilah Wajib
- 1. **Capstone/deploy**: gabung/buka

---

## Eksperimen

- **Hijau:** `POST` tanpa token → 401? Pakai token → 201?
- **Kuning:** Tambah produk `Teh` harga 8000 via rute, `GET` lagi → 5 produk?
- **Merah:** Hapus `cache.delete` → tambah produk lalu `GET` → jumlah basi? Pasang lagi.

## Tantangan

****Toko Node Grand Opening:** gabungkan `routes`, `cekToken`, `cache`, dan `assert`: tambah rute `DELETE /produk/:id` (wajib login, buang cache), tulis 2 assert baru, semua LOLOS.**

Hijau: rute DELETE hapus id=1 → GET tersisa 3. Kuning: DELETE tanpa token → 401. Merah: deploy pola ini ke `server.js` + `routes/` + `middleware/` (lihat Struktur).

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 12: **Capstone Node** — toko lengkap, **Selesai Node 0→Ahli!**
