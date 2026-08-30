# Performance — Warung Tetap Cepat

> **Kategori:** React | **Level:** Lanjutan | **Minggu 11:** Performance

## Tujuan Pembelajaran

- `React.memo` jangan gambar ulang jika props sama, `useMemo` hitung mahal di-cache, `lazy` + `Suspense` muat lambat

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

## Ringkasan

Minggu 11: **Cepat** — `memo`, `useMemo`, `lazy`.
