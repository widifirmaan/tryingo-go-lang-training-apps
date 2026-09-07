# Testing — Uji Warung Node Sebelum Buka

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 9:** Testing

## Tujuan Pembelajaran

- `npm install --save-dev vitest`, `test("hitung", ()=> expect(hitung(2,3)).toBe(5))` — uji sebelum deploy

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `vitest`, ubah rumus → salah ketahuan pelanggan. Dengan 2 test, ubah → merah → perbaiki. `npm test` 3 detik.

---

## Program

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
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Node W1 + paket minggu ini (`vitest`/`pm2`/`vercel`).

### Cara Komputer Membaca
- `test(name, fn)` + `expect(a).toBe(b)`; `npm test` cari `*.test.js`.

### 3 Istilah Wajib
- 1. **test/expect**: cicip/harap

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 9: **Uji Node** — `vitest` sebelum buka.
