# Context API — Gudang Bersama Warung

> **Kategori:** React | **Level:** Menengah | **Minggu 6:** Context API & useReducer

## Tujuan Pembelajaran

- `createContext` + `Provider` = gudang bersama, `useContext` ambil — tanpa `props` 5 level
- `useReducer` untuk keranjang kompleks (tambah/hapus/kosongkan)

---

## Kenapa Ini Penting Buat Kamu?

Warung 10 komponen butuh `keranjang` — kirim via props 5 level = estafet melelahkan. Context = **gudang di tengah**, semua ambil langsung.

---

## Program: Gudang Keranjang

```jsx
import { createContext, useContext, useReducer } from "react";

const KeranjangContext = createContext();

function keranjangReducer(state, action){
  if(action.type === "tambah") return [...state, action.item];
  if(action.type === "hapus") return state.filter(i => i.id !== action.id);
  if(action.type === "kosong") return [];
  return state;
}

function KeranjangProvider({ children }){
  const [keranjang, dispatch] = useReducer(keranjangReducer, []);
  return (
    <KeranjangContext.Provider value={{ keranjang, dispatch }}>
      {children}
    </KeranjangContext.Provider>
  );
}

function Produk(){
  const { dispatch } = useContext(KeranjangContext);
  return <button onClick={() => dispatch({ type: "tambah", item: { id: Date.now(), nama: "Beras" } })}>Tambah Beras</button>;
}

function Tampilkan(){
  const { keranjang } = useContext(KeranjangContext);
  return <p>Isi: {keranjang.length} | {keranjang.map(i=>i.nama).join(", ")}</p>;
}

export default function App(){
  return <KeranjangProvider><Produk /><Tampilkan /></KeranjangProvider>;
}
```

---

## Konsep Kunci

### `createContext` + `Provider` = Gudang
Bungkus `App` dengan `Provider value={{ keranjang, dispatch }}`, semua anak `useContext` ambil tanpa props.

### `useReducer` = Kasir Aturan
`dispatch({type:"tambah"})` → `reducer` tentukan cara ubah.

---

## Ringkasan

Minggu 6: **Gudang Bersama** — Context tanpa estafet. Minggu depan: **Forms**.
