# Performance — Warung Tetap Cepat Node

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 10:** Performance

## Tujuan Pembelajaran

- `pm2` jaga warung tetap hidup, `cluster` 4 kasir, `caching` laci

---

## Program

```bash
npm install -g pm2
pm2 start server.js -i 4 # 4 kasir
pm2 logs
pm2 restart server
```

```javascript
// caching sederhana
const cache = new Map();
app.get("/produk", (req,res)=>{
  if(cache.has("produk")) return res.json(cache.get("produk"));
  const data = [{ id: 1, nama: "Beras" }];
  cache.set("produk", data);
  res.json(data);
});
```

---

## Ringkasan

Minggu 10: **Cepat** — `pm2` + `cache`.
