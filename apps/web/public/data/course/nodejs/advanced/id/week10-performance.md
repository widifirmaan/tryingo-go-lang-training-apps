# Performance — Warung Tetap Cepat Node

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 10:** Performance
> **Prasyarat:** Minggu 9 — **Testing**.

## Tujuan Pembelajaran

- `pm2` jaga warung tetap hidup, `cluster` 4 kasir, `caching` laci

---

## Kenapa Ini Penting Buat Kamu?

100 req/detik tanpa `pm2` cluster = 1 core kerja, 7 nganggur + mati tidak bangun. Dengan `pm2 -i max`, semua core + mati hidup lagi.

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

## Penjelasan untuk Pemula

### Analogi: Warung 8 Kasir
- **1 proses = 1 kasir**: 7 inti nganggur + mati tak bangun!
- **`pm2 -i max` = buka kasir per inti** + hidup lagi. `Map` cache = contekan tanpa hitung ulang!

### Langkah 0 — Siapkan Device
- Sama Node W1 + paket minggu ini (`vitest`/`pm2`/`vercel`).

### Cara Komputer Membaca
- `pm2 start -i max` 1 proses per core; `pm2 logs` intip; `pm2 restart` segarkan.

### 3 Istilah Wajib
- 1. **pm2/cluster**: mandor/kasir-banyak

---

## Eksperimen

- **Hijau:** Buka `/produk` → apa yang tampil? Coba ID lain → bedanya apa?
- **Kuning:** Ubah huruf besar-kecil `cache` dan `data` → masih jalan atau error?
- **Merah:** Salah ketik 1 huruf pada `cache` → pesan error apa? Betulkan.

## Tantangan

**Performance di Warungmu:** pakai `/produk` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/produk`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Testing** (Minggu 9): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 10: **Cepat** — `pm2` + `cache`. Minggu depan: **Deployment**.
