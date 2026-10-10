# Loading & Error UI

> **Kategori:** Next.js | **Level:** Menengah | **Minggu 7:** Loading & Error UI

## Tujuan Pembelajaran

- loading.js: skeleton/Spinner saat data loading
- error.js: error boundary per route
- not-found.js: 404 halaman custom
- reset function untuk retry error
- Streaming dengan Suspense

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

## Konsep Kunci

### Loading UI
loading.js = auto tampil saat fetch/streaming. Bisa pakai skeleton.


### Error Boundary
error.js = catch error di route. reset() untuk retry.

### Not Found
not-found.js = 404 page. notFound() untuk trigger.

### Suspense
Wrap component dengan Suspense untuk streaming.

---

## Eksperimen

- Buat skeleton UI yang mirip konten asli
- Implementasikan error recovery
- Buat custom 404 page
- Setup Suspense untuk streaming

---

## Tantangan

Buat produk detail page dengan: loading skeleton, error boundary, 404 handling, dan streaming content.

---

## Ringkasan

Minggu 7 dari 12: **Loading & Error UI** (Level: Menengah). UX yang baik. Minggu depan: **Middleware & Auth**.
