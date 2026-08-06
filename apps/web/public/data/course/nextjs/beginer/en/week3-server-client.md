# Server & Client Components

> **Kategori:** Next.js | **Level:** Beginner | **Minggu 3:** Server & Client Components

## Learning Objectives

- Server Components: default in App Router, render on server
- Client Components: "use client" directive, interactive
- When to use Server vs Client component
- Data fetching directly in Server Component
- Composition pattern: Server wrapping Client

---

## Program: Component Combination

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

## Key Concepts

### Server Components
Default. Render on server. Smaller bundles. Direct fetch.

### Client Components
"use client". For interactivity.

### When to Use
- Server: fetch, read files, static display
- Client: interactivity, hooks, browser APIs

### Pattern
Server wraps Client, not vice versa.

---

## Experiments

- Create Server Component fetching from API
- Create Client Component with interactive form
- Combine both: Server list + Client filter
- Compare bundle sizes

---

## Challenge

Build a dashboard page: Server Component for static data (sidebar, header), Client Component for interactive table with search.

---

## Summary

Week 3 of 12: **Server & Client Components** (Level: Beginner). Next.js component architecture. Next week: **Styling & Optimization**.
