# Capstone: Complete Node Store

> **Kategori:** Node.js | **Level:** Advanced | **Minggu 12:** Capstone
> **Prerequisites:** Week 11 — **Deployment**.

## Learning Objectives

- Combine `express` + `prisma` + `jwt` + `pm2` + `vercel` into a store with `products` + `cart` + `auth` + `deploy`

---

## Why This Matters (Non-IT)

11 separate weeks — capstone proves the combination: Express + Prisma + JWT + tests + deploy become a store. Node portfolio.

---

## Program: Node Capstone Store

Required features:
- `GET /products` + `POST /products` + `DELETE` via Express + Prisma
- `POST /login` JWT + `middleware` check
- `pm2` + `vercel --prod`

Structure: `server.js`, `prisma/schema.prisma`, `routes/products.js`, `middleware/auth.js`.

**Task:** Deploy `shop-node.vercel.app` + 2-min video adding products → checking on phone.



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

*Paste into the playground → Run, see each route output + LOLOS test results.*

---

## Beginner Friendly Explanation

### Analogy: Node Store Grand Opening
- **11 weeks = assemble shop**: kitchen (Node) + waiters (Express) + warehouse (Prisma) + IDs (JWT).
- **Capstone = grand opening**: API + DB + auth + deploy RUN TOGETHER, `routes/` never mixes dining room!

### Step 0 — Prepare Device
- Same as Node W1 + this week's package (`vitest`/`pm2`/`vercel`).

### How the Computer Reads It
- CHECKLIST (API + DB + auth + test + deploy) then URL + video.

### 3 Must-Know Terms
- 1. **Capstone/deploy**: combine/open

---

## Experiments

- **Green:** `POST` without token → 401? With token → 201?
- **Yellow:** Add `Teh` @8000 via route, `GET` again → 5 products?
- **Red:** Delete `cache.delete` → add product then `GET` → stale count? Restore.

## Challenge

****Node Store Grand Opening:** combine `routes`, `cekToken`, `cache`, and `assert`: add `DELETE /produk/:id` (login required, bust cache), write 2 new asserts, all LOLOS.**

Green: DELETE removes id=1 → GET leaves 3. Yellow: DELETE without token → 401. Red: deploy this pattern to `server.js` + `routes/` + `middleware/` (see Structure).

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 12: **Node Capstone** — complete store, **Node 0→Expert DONE!**
