# Testing React — Uji Rasa Komponen

> **Kategori:** React | **Level:** Lanjutan | **Minggu 10:** Testing React

## Tujuan Pembelajaran

- `vitest` + `React Testing Library` — `render(<Card />)` lalu `screen.getByText("Beras")`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa uji, ubah `Card` → harga hilang ketahuan pelanggan. Dengan `render` + `screen`, ubah → merah → perbaiki. RTL uji seperti user lihat (teks), bukan isi state.

---

## Program

```jsx
// Card.jsx
export function Card({ nama }){ return <div>{nama}</div>; }

// Card.test.jsx
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { test, expect } from "vitest";

test("tampil nama", () => {
  render(<Card nama="Beras" />);
  expect(screen.getByText("Beras")).toBeInTheDocument();
});
```

`npm test` → lulus.


---

## Penjelasan untuk Pemula

### Analogi: Mystery Shopper Komponen
- Lihat Program: jalankan, ubah 1 angka/prop, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama React W1: `npm run dev` di `5173` (+ `vitest` untuk W10).

### Cara Komputer Membaca
- `render(<Card/>)` pasang di DOM palsu; `screen.getByText` cari seperti mata user.

### 3 Istilah Wajib
- 1. **render/screen**: pasang/cari

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 10: **Uji Komponen** — `render` + `screen`.
