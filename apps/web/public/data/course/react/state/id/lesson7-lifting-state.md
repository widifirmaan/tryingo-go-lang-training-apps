# Lifting State Up

> React | State & Interaksi | Pelajaran 7

## Tujuan Pembelajaran

- Memahami pola lifting state up 3 langkah
- Menerapkan data flows down, actions flow up
- Membuat komponen controlled oleh parent
- Menggunakan single source of truth

---

## Program: Lifting State Up

```jsx
import { useState } from 'react';

const foods = ['Sate Ayam', 'Rendang', 'Gado-Gado', 'Nasi Goreng', 'Bakso', 'Soto'];

function SearchBar({ query, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search food..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', boxSizing: 'border-box' }}
    />
  );
}

function FoodList({ items }) {
  if (items.length === 0) return <p>No results found.</p>;
  return (
    <ul>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [text, setText] = useState('');
  const results = foods.filter((f) => f.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h1>Lifting State Up</h1>

      <h2>Search Bar (state di parent)</h2>
      <SearchBar query={query} onChange={setQuery} />
      <FoodList items={results} />

      <h2>Synced Inputs (satu state, dua input)</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="First input" />
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Second input" />
      <p>Kedua input selalu sinkron: "{text}"</p>
    </div>
  );
}

```

---

## Penjelasan

## Kapan Lifting Diperlukan
Ketika dua komponen perlu berbagi data yang sama — contoh: SearchBar mengubah list FoodList. State tidak boleh hidup di salah satu saja; ia harus diangkat ke common parent.

## 3 Langkah (react.dev)
1. Hapus state dari child. 2. Terima data via props dari parent. 3. Tambahkan state ke common parent dan oper data + event handler ke bawah sebagai props.

## Data Down, Actions Up
Aturan emas: data mengalir ke bawah via props, aksi mengalir ke atas via callback. `onChange={setQuery}` — parent mengirim setter sebagai prop, child memanggilnya saat input berubah.

## Controlled Components
Komponen yang menerima nilai + handler dari parent disebut controlled. Parent sepenuhnya menentukan perilakunya. Ini pola yang sama dengan controlled forms — hanya dinaikkan levelnya ke antar-komponen.

---

## Eksperimen

1. **Kapan Lifting Diperlukan**
2. **3 Langkah (react.dev)**
3. **Data Down, Actions Up**
4. **Controlled Components**

---

## Tantangan

Refactor App: buat komponen FilterableProductList berisi SearchBar + daftar produk (nama, harga, stok). Tambah filter select (Semua/Tersedia) — state query dan filter tinggal di parent-nya.

---

## Ringkasan

Lifting state: state diangkat ke common parent, data turun via props, aksi naik via callback. Single source of truth. Lanjut: project Todo App.
