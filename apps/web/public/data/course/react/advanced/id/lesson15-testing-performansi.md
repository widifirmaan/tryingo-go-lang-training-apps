# Testing & Performansi

> React | State Global & Advanced | Pelajaran 15

## Tujuan Pembelajaran

- Menulis test dasar dengan React Testing Library
- Menerapkan memo untuk mencegah re-render tidak perlu
- Menggunakan useMemo untuk kalkulasi mahal
- Memahami kapan optimasi dibutuhkan

---

## Program: Testing & Performansi

```jsx
import { memo, useMemo, useState } from 'react';

const products = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: 'Product ' + (i + 1),
  price: 50000 + i * 25000,
}));

const ProductRow = memo(function ProductRow({ product, onSelect }) {
  return (
    <li style={{ border: '1px solid #eee', borderRadius: 10, padding: '0.6rem', margin: '0.3rem 0' }}>
      <button onClick={() => onSelect(product)} style={{ border: 'none', background: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}>
        <strong>{product.name}</strong> — Rp {product.price.toLocaleString('id-ID')}
      </button>
    </li>
  );
});

export default function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  // useMemo: only recompute when 'query' changes (60 items filtered per keystroke otherwise)
  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div>
      <h1>Testing & Performance</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter products..."
        style={{ width: '100%', boxSizing: 'border-box' }}
      />

      <p style={{ color: '#666' }}>{filtered.length} of {products.length} shown · ProductRow is memoized</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map((p) => (
          <ProductRow key={p.id} product={p} onSelect={setSelected} />
        ))}
      </ul>

      {selected && (
        <p><strong>Selected:</strong> {selected.name} — Rp {selected.price.toLocaleString('id-ID')}</p>
      )}
    </div>
  );
}

```

---

## Penjelasan

## React Testing Library
Test meniru cara user berinteraksi: render komponen, cari elemen, trigger event, cek hasil. `getByPlaceholderText`, `fireEvent.change`, `expect(...).toBeInTheDocument()`. Test file contoh ada di `src/App.test.jsx` (jalankan dengan Vitest + jsdom di project sendiri).

## memo
`memo` membuat komponen me-render ulang hanya jika props berubah. Berguna untuk list besar yang item-nya jarang berubah — mencegah seluruh list re-render saat parent berubah.

## useMemo
`useMemo` menyimpan hasil kalkulasi dan menghitung ulang hanya saat dependency berubah. Untuk filter 60 item per ketikan, ini menghindari kalkulasi ulang pada render yang tidak terkait.

## Jangan Prematur
Aturan praktis (react.dev): ukur dulu dengan profiler, optimasi hanya saat ada masalah nyata. memo/useMemo bukan default untuk setiap komponen — gunakan untuk list besar dan kalkulasi mahal saja.

---

## Eksperimen

1. **React Testing Library**
2. **memo**
3. **useMemo**
4. **Jangan Prematur**

---

## Tantangan

Tambah test baru di App.test.jsx: klik produk menampilkan "Selected:" (gunakan fireEvent.click + getByText). Di komponen: tambahkan ProductRow yang menampilkan badge stok, dan hitung total harga list dengan useMemo.

---

## Ringkasan

Testing = meniru interaksi user. memo/useMemo untuk optimasi list & kalkulasi — ukur dulu sebelum optimasi. Lanjut: project akhir.
