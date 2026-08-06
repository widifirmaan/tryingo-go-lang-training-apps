# Loading & Error UI

> **Kategori:** Next.js | **Level:** Intermediate | **Minggu 7:** Loading & Error UI

## Learning Objectives

- loading.js: skeleton/spinner during data loading
- error.js: error boundary per route
- not-found.js: custom 404 page
- reset function to retry errors
- Streaming with Suspense

---

## Program: UX Patterns

```jsx
// Next.js: Loading UI, Error Handling, Not Found
// File conventions: loading.js, error.js, not-found.js

// ── app/products/loading.js ──
// Tampil saat halaman/products loading
export default function Loading() {
  return (
    <div>
      <div className="skeleton" style={{ height: 40, width: "60%", background: "#eee", marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 200, background: "#eee", marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 200, background: "#eee" }} />
    </div>
  );
}

// ── app/products/error.js ──
// "use client"; // error.js harus Client Component
// Error boundary untuk halaman
"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Terjadi kesalahan!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Coba Lagi</button>
    </div>
  );
}

// ── app/products/not-found.js ──
export default function NotFound() {
  return (
    <div>
      <h2>404 — Tidak Ditemukan</h2>
      <p>Halaman yang Anda cari tidak ada.</p>
      <a href="/">Kembali ke Beranda</a>
    </div>
  );
}

// ── app/products/[id]/page.js ──
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound(); // Tampilkan not-found.js
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Rp {product.price?.toLocaleString("id-ID") || 0}</p>
    </div>
  );
}

async function getProduct(id) {
  const products = {
    "1": { id: 1, name: "Laptop", price: 15000000 },
    "2": { id: 2, name: "Mouse", price: 250000 },
  };
  return products[id] || null;
}

console.log("Loading & Error UI siap digunakan");
```

---

## Key Concepts

### Loading UI
loading.js auto shows during fetch/streaming.

### Error Boundary
error.js catches errors, reset() retries.

### Not Found
not-found.js = 404 page.

### Suspense
Wrap components for streaming.

---

## Experiments

- Create skeleton UI matching content
- Implement error recovery
- Create custom 404 page
- Setup Suspense for streaming

---

## Challenge

Build a product detail page with: loading skeleton, error boundary, 404 handling, and streaming content.

---

## Summary

Week 7 of 12: **Loading & Error UI** (Level: Intermediate). Good UX. Next week: **Middleware & Auth**.
