# Server & Client Components

> **Kategori:** Next.js | **Level:** Pemula | **Minggu 3:** Server & Client Components

## Tujuan Pembelajaran

- Server Components: default di App Router, render di server
- Client Components: "use client" directive, interactive
- Kapan pakai Server vs Client component
- Data fetching langsung di Server Component
- Composition pattern: Server wrapping Client

---

## Program: Kombinasi Komponen

```jsx
// Next.js App Router: Server Components (default) & Client Components
// "use client" directive untuk interactive components

// ── Server Component (default) ──
// Bisa: fetch data, akses filesystem, API keys (aman)
// Tidak bisa: useState, useEffect, onClick, browser APIs

// ── app/products/page.js (Server Component) ──
export default async function ProductsPage() {
  // Fetch langsung di server component (aman, cepat)
  const products = await fetchProducts();

  return (
    <div>
      <h1>Produk</h1>
      <ProductList products={products} />
      <SearchBar /> {/* Client Component */}
    </div>
  );
}

async function fetchProducts() {
  // Simulasi fetch data di server
  return [
    { id: 1, name: "Laptop", price: 15000000 },
    { id: 2, name: "Mouse", price: 250000 },
  ];
}

// ── components/ProductList.jsx (Server Component) ──
function ProductList({ products }) {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} — Rp {p.price.toLocaleString("id-ID")}
        </li>
      ))}
    </ul>
  );
}

// ── components/SearchBar.jsx (Client Component) ──
"use client";

import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari produk..."
      />
      <p>Mencari: {query || "(kosong)"}</p>
    </div>
  );
}

console.log("Server & Client Components siap digunakan");
```

---

## Konsep Kunci

### Server Components
Default. Render di server. Bundle size lebih kecil. Bisa fetch langsung.

### Client Components
"use client" directive. Untuk interactive (useState, event handlers).

### Kapan Pakai
- Server: fetch, read file, tampil statis
- Client: interactivity, hooks, browser APIs

### Pattern
Server Component wrap Client Component. Jangan sebaliknya.

---

## Eksperimen

- Buat Server Component yang fetch dari API
- Buat Client Component dengan form interaktif
- Kombinasi keduanya: Server list + Client filter
- Bandingkan ukuran bundle

---

## Tantangan

Buat halaman dashboard: Server Component untuk data statis (sidebar, header), Client Component untuk table interaktif dengan search.

---

## Ringkasan

Minggu 3 dari 12: **Server & Client Components** (Level: Pemula). Arsitektur komponen Next.js. Minggu depan: **Styling & Optimasi**.
