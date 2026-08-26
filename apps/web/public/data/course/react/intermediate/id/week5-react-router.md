# React Router — Peta Toko Tanpa Reload

> **Kategori:** React | **Level:** Menengah | **Minggu 5:** React Router

## Tujuan Pembelajaran

- Instal `npm install react-router-dom`, bungkus `BrowserRouter`, `Routes` + `Route` = peta
- `Link` pintu geser (tanpa reload) vs `a` bongkar, `useParams` baca `id` dari URL

---

## Kenapa Ini Penting Buat Kamu?

Warung 3 halaman tanpa router = 1 file raksasa `if` manual. Router = **peta**: `/` → Beranda, `/produk/1` → Detail — pindah tanpa reload header.

---

## Program: Toko 3 Halaman

```bash
npm install react-router-dom
```

```jsx
// App.jsx
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function Beranda(){ return <h1>Beranda Warung</h1>; }
function Daftar(){
  return <div><h1>Daftar</h1><Link to="/produk/1">Beras</Link> | <Link to="/produk/2">Bayam</Link></div>;
}
function Detail(){
  const { id } = useParams(); // baca :id dari URL
  return <div><h1>Detail {id}</h1><Link to="/produk">Kembali</Link></div>;
}

export default function App(){
  return (
    <BrowserRouter>
      <nav><Link to="/">Beranda</Link> | <Link to="/produk">Produk</Link></nav>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/produk" element={<Daftar />} />
        <Route path="/produk/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Konsep Kunci

### `BrowserRouter` = Gedung
Bungkus semua, sediakan peta.

### `Routes` + `Route` = Peta
`path="/produk/:id"` `:id` variabel, `element={<Detail />}` yang tampil.

### `Link` vs `a`
`Link` geser, `a` bongkar.

### `useParams` = Amplop
`const {id} = useParams()` ambil `1` dari `/produk/1`.

---

## Penjelasan untuk Pemula

### Analogi: Peta Mall
- **`BrowserRouter` = gedung mall**, **`Routes` = papan peta**, **`Link` = lift ekspres**.

---

## Tantangan

**Toko 3 Halaman:** `Beranda`, `Produk` list `Link` ke `ProdukDetail/:id` yang `useParams`, + `NotFound` `path="*"` .

---

## Ringkasan

Minggu 5: **Peta Toko** — Router tanpa reload. Minggu depan: **Context** — gudang bersama.
