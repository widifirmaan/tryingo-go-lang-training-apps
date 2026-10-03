# File-System Routing: Dynamic Segments ([slug]), Nested Layouts & Not-Found

> **Kategori:** Next.js | **Level:** App Router, RSC & Streaming Foundations | **Minggu 2:** File-System Routing: Dynamic Segments ([slug]), Nested Layouts & Not-Found

## Learning Objectives

- Master Next.js file-system routing conventions: directories mapping directly to URL paths
- Deploy Dynamic Route Segments ([slug], [id]) powering parameterized entity pages
- Await async route parameters conforming to the latest Next.js 15+ Promise specifications
- Architect Nested Layouts preserving navigational scroll position and state across sibling views
- Leverage notFound() dispatchers alongside dedicated not-found.tsx boundaries for graceful 404s

---

## Program: Dynamic Product Detail Page & Tailored 404 Not-Found Boundary

```tsx
// ============================================================================
// File: app/produk/[slug]/page.tsx (Dynamic Route Segment)
// ============================================================================
import { notFound } from "next/navigation";

// Kamus data produk berbasis slug unik
const DATABASE_PRODUK: Record<string, { nama: string; harga: number; deskripsi: string; rating: number }> = {
  "mechanical-keyboard-75": {
    nama: "Mechanical Keyboard 75% Wireless",
    harga: 1250000,
    deskripsi: "Switch tactile gateron pro yellow, gasket mount, RGB south-facing.",
    rating: 4.9
  },
  "monitor-gaming-27": {
    nama: "Monitor Gaming 27\" Fast IPS 165Hz",
    harga: 3850000,
    deskripsi: "Resolusi 2K QHD, 1ms response time, 99% sRGB color gamut.",
    rating: 4.8
  }
};

interface HalamanDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function HalamanDetailProduk({ params }: HalamanDetailProps) {
  // Pada Next.js 15+, params adalah Promise yang wajib di-await
  const { slug } = await params;
  const produk = DATABASE_PRODUK[slug];

  // Jika slug tidak ditemukan di database, picu notFound() otomatis
  if (!produk) {
    notFound();
  }

  return (
    <article style={{ maxWidth: "560px", margin: "24px auto", fontFamily: "sans-serif" }}>
      <a href="/" style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>← Kembali ke Katalog</a>
      <h1 style={{ margin: "16px 0 8px 0" }}>{produk.nama}</h1>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold", color: "#16a34a" }}>
          Rp {produk.harga.toLocaleString("id-ID")}
        </span>
        <span style={{ background: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "4px", fontSize: "13px" }}>
          ★ {produk.rating} / 5.0
        </span>
      </div>
      <p style={{ lineHeight: "1.6", color: "#334155" }}>{produk.deskripsi}</p>
    </article>
  );
}
```

---

## Key Concepts

### Directory-Driven Routing in App Router
Next.js completely eliminates external routing packages. File hierarchies govern application route paths:
- `app/page.tsx` -> `/`
- `app/about/page.tsx` -> `/about`
- `app/products/[slug]/page.tsx` -> `/products/mechanical-keyboard-75`

### Reserved File Conventions
Directories support specialized canonical file names recognized by the runtime:
1. `page.tsx`: Unique UI rendered for this route address.
2. `layout.tsx`: Structural UI shared across sibling and child routes. Layouts **preserve state and avoid destructive re-mounting during transitions**.
3. `loading.tsx`: Instant fallback UI streaming automatically via React Suspense.
4. `not-found.tsx`: Dedicated 404 boundary invoked when `notFound()` triggers.
5. `error.tsx`: Automated React error boundary isolating runtime faults.

### Graceful 404 Handling (`notFound()`)
When users request nonexistent slugs (`/products/missing-sku`), trigger `notFound()`. Next.js halts execution, rendering the closest `not-found.tsx` component while emitting proper HTTP 404 status headers for search crawlers.

---

---

## Beginner Friendly Explanation

### Analogy: Hotel Room Numbers & Persistent Corridors
1. **Dynamic Segment `[slug]`** is a hotel room corridor `/rooms/[roomNumber]`: architects design a single architectural template parameterized by the door sign.
2. **Layout** is the hotel elevator and hallway: the hallway remains permanently in place while you walk between Room 101 and 102 without tearing down the building.
3. **notFound()** is the front desk concierge politely stating: "Room 999 does not exist in our building directory", gracefully escorting you back to the lobby.

## Experiments

- Navigate to /produk/monitor-gaming-27 and confirm dynamic data resolution.
- Navigate to a non-existent slug /produk/non-existent to observe the 404 notFound() boundary.
- Author an app/produk/layout.tsx injecting a promotional banner persistent across all product routes.
- Leverage generateStaticParams() to pre-render dynamic slugs into static HTML at build time (SSG).

---

## Challenge

Author a localized `app/produk/[slug]/not-found.tsx` informing shoppers "This product is discontinued" styled with a return-home call to action.

---

## Summary

You have mastered file-system routing, dynamic segments, nested layouts, and 404 boundaries. Next week, we examine Data Fetching and Caching deeply.
