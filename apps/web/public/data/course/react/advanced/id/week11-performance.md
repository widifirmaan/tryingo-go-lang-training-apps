# Performance — Warung Tetap Cepat

> **Kategori:** React | **Level:** Lanjutan | **Minggu 11:** Performance

## Tujuan Pembelajaran

- `React.memo` jangan gambar ulang jika props sama, `useMemo` hitung mahal di-cache, `lazy` + `Suspense` muat lambat

---

## Kenapa Ini Penting Buat Kamu?

Daftar 1000 produk tanpa `memo` → ketik 1 huruf, 1000 kartu gambar ulang (ngos-ngosan). Dengan `memo` + `useMemo` + `lazy`, hanya yang berubah. Beda terasa di HP kentang.

---

## Program

```jsx
import { memo, useMemo, lazy, Suspense } from "react";

const Kartu = memo(function Kartu({ nama }){
  console.log("Render", nama);
  return <div>{nama}</div>;
});

function Daftar({ daftar }){
  const total = useMemo(() => daftar.reduce((s,i)=>s+i.harga,0), [daftar]);
  return <div>Total: {total}<Kartu nama="Beras" /></div>;
}

const Berat = lazy(() => import("./Berat"));
export default function App(){
  return <Suspense fallback="Memuat..."><Berat /></Suspense>;
}
```


---

## Penjelasan untuk Pemula

### Analogi: Warung Hemat Energi
- **1000 kartu render ulang tiap ketik = 1000 pelayan lari tiap 1 tamu batuk**: HP kentang nangis.
- **`memo` = pelayan cuek**: props sama → diam. `useMemo` = contekan hitungan mahal. `lazy` = panggil pelayan SAAT dibutuhkan (bukan standby semua)!

### Langkah 0 — Siapkan Device
- Sama React W1: `npm run dev` di `5173` (+ `vitest` untuk W10).

### Cara Komputer Membaca
- `memo` bungkus: props sama → lewati. `useMemo` ingat hitungan. `lazy` unduh saat perlu.

### 3 Istilah Wajib
- 1. **memo/useMemo/lazy**: lewati/ingat/nanti

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 11: **Cepat** — `memo`, `useMemo`, `lazy`. Minggu depan: **Capstone: Toko E-Commerce Lengkap**.
