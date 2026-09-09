# Testing — Uji Warung Node Sebelum Buka

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 9:** Testing
> **Prasyarat:** Minggu 8 — **Database**.

## Tujuan Pembelajaran

- `npm install --save-dev vitest`, `test("hitung", ()=> expect(hitung(2,3)).toBe(5))` — uji sebelum deploy

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `vitest`, ubah rumus → salah ketahuan pelanggan. Dengan 2 test, ubah → merah → perbaiki. `npm test` 3 detik.

---

## Program

```bash
npm install --save-dev vitest
# Tambah script test di package.json agar `npm test` jalan:
# { "scripts": { "test": "vitest run" } }
```

```javascript
// hitung.js
export function hitung(a,b){ return a+b; }

// hitung.test.js
import { test, expect } from "vitest";
import { hitung } from "./hitung.js";
test("2+3=5", ()=> expect(hitung(2,3)).toBe(5));
test("0+0=0", ()=> expect(hitung(0,0)).toBe(0));
// npm test
```


---

## Penjelasan untuk Pemula

### Analogi: Cicip Dapur Node
- **`test` + `expect` = cicip mesin**: salah → MERAH + baris ditunjuk.
- **Tanpa test = masak buta**: `npm test` 3 detik cicip SEMUA resep!

### Langkah 0 — Siapkan Device
- Sama Node W1 + paket minggu ini (`vitest`/`pm2`/`vercel`).

### Cara Komputer Membaca
- `test(name, fn)` + `expect(a).toBe(b)`; `npm test` cari `*.test.js`.

### 3 Istilah Wajib
- 1. **test/expect**: cicip/harap

---

## Tantangan

**Testing di Warungmu:** jalankan ulang hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai di Program; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Database** (Minggu 8): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 9: **Uji Node** — `vitest` sebelum buka. Minggu depan: **Performance**.
