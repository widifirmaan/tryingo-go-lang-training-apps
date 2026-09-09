# Testing JavaScript — Uji Sebelum Buka

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 12:** Testing
> **Prasyarat:** Minggu 11 — **Design Patterns**.

## Tujuan Pembelajaran

- `npm install --save-dev vitest`, `test("hitung", ()=> expect(hitung(2,3)).toBe(5))`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `vitest`, ubah rumus → salah ketahuan pelanggan. Dengan 2 test, ubah → merah → perbaiki. `vi.fn()` mock fetch tanpa internet.

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

test("hitung 2+3", () => {
  expect(hitung(2,3)).toBe(5);
});
test("hitung 0+0", () => {
  expect(hitung(0,0)).toBe(0);
});
// npm test
```


---

## Penjelasan untuk Pemula

### Analogi: Cicip Dapur JS
- **`test` = cicip resmi**: `hitung(2,3)` HARUS 5 — beda → MERAH + baris ditunjuk (bukan tebak!).
- **`npm test` = cicip SEMUA menu 3 detik**: ubah rumus → merah → betulkan SEBELUM deploy. Tanpa ini = pelanggan yang cicip (mahal!).

### Langkah 0 — Siapkan Device
- Sama JS W1: `node -v` / browser + `npm test` untuk W12.

### Cara Komputer Membaca
- `test(name, fn)` + `expect(a).toBe(b)`; `npm test` cari `*.test.js`.

### 3 Istilah Wajib
- 1. **test/expect/mock**: cicip/harap/palsu

---

## Tantangan

**Testing JavaScript di Warungmu:** jalankan ulang hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai di Program; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Design Patterns** (Minggu 11): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 12: **Uji** — Vitest sebelum buka warung. Minggu depan: **Performance Optimization**.
