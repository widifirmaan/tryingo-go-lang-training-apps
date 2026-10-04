# Capstone: Production Headless E-Commerce Storefront Architecture

> **Kategori:** Next.js | **Level:** Dynamic SEO, Optimizations & E-Commerce Capstone | **Minggu 10:** Capstone: Production Headless E-Commerce Storefront Architecture
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Synthesize all modern Next.js primitives: App Router, RSC, Server Actions, and Caching
- Wire up shopping cart mutations natively leveraging zero-API Server Actions
- Optimize the entire catalog visual asset pipeline using next/image with adaptive sizes
- Deploy instant server-side cache revalidations via revalidatePath()
- Deliver a production-ready headless e-commerce storefront primed for Cloudflare Pages / Vercel

---

## Program: Fullstack E-Commerce Application with Server Actions Cart & Instant Revalidation

```tsx
// ============================================================================
// CAPSTONE PROJECT: NUSA FULLSTACK HEADLESS E-COMMERCE STOREFRONT
// ============================================================================
import { Suspense } from "react";
import Image from "next/image";
import { revalidatePath } from "next/cache";

// 1. Data Model Produk E-Commerce
interface ProdukStore {
  id: string;
  slug: string;
  nama: string;
  harga: number;
  kategori: string;
  gambarUrl: string;
  stok: number;
}

const KATALOG_DATABASE: ProdukStore[] = [
  {
    id: "prod-1",
    slug: "nusa-mechanical-keyboard",
    nama: "Nusa Pro Mechanical Keyboard 75%",
    harga: 1250000,
    kategori: "Hardware",
    gambarUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    stok: 12
  },
  {
    id: "prod-2",
    slug: "nusa-wireless-mouse",
    nama: "Nusa Ultra-Light Gaming Mouse",
    harga: 650000,
    kategori: "Hardware",
    gambarUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
    stok: 5
  }
];

// 2. Server Action: Tambah ke Keranjang Belanja Langsung di Server
async function tambahKeranjangAction(formData: FormData) {
  "use server";
  const produkId = formData.get("produkId") as string;
  console.log(`[Server Action] Menambahkan produk ID: ${produkId} ke keranjang belanja...`);
  
  // Revalidasi cache halaman storefront
  revalidatePath("/");
}

// 3. Komponen Server Utama (RSC)
export default async function CapstoneStorefrontPage() {
  return (
    <div style={{ maxWidth: "780px", margin: "24px auto", fontFamily: "system-ui, sans-serif", padding: "0 16px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #0f172a", paddingBottom: "16px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px" }}>Nusa Tech Storefront</h1>
          <small style={{ color: "#64748b" }}>Next.js 15 Fullstack App Router & Server Actions</small>
        </div>
        <div style={{ background: "#2563eb", color: "white", padding: "6px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "bold" }}>
          🛒 Keranjang Belanja
        </div>
      </header>

      <main style={{ marginTop: "24px" }}>
        <h2>Katalog Unggulan (Server Components)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {KATALOG_DATABASE.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                overflow: "hidden",
                background: "white",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "180px", background: "#f1f5f9" }}>
                <Image
                  src={item.gambarUrl}
                  alt={item.nama}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "bold" }}>
                    {item.kategori}
                  </span>
                  <h3 style={{ margin: "4px 0 8px 0", fontSize: "16px" }}>{item.nama}</h3>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#16a34a", marginBottom: "8px" }}>
                    Rp {item.harga.toLocaleString("id-ID")}
                  </div>
                  <small style={{ color: item.stok > 0 ? "#64748b" : "red" }}>
                    {item.stok > 0 ? `Tersedia: ${item.stok} unit` : "Stok Habis"}
                  </small>
                </div>

                <form action={tambahKeranjangAction} style={{ marginTop: "16px" }}>
                  <input type="hidden" name="produkId" value={item.id} />
                  <button
                    type="submit"
                    disabled={item.stok === 0}
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: item.stok > 0 ? "#0f172a" : "#cbd5e1",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: item.stok > 0 ? "pointer" : "not-allowed",
                      fontWeight: "bold"
                    }}
                  >
                    + Masukkan Keranjang
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
```

---

## Key Concepts

### Capstone Headless Storefront Architecture
This capstone demonstrates the full power of modern Next.js fullstack engineering:
1. **Server-First Rendering**: Product catalogs resolve and render strictly server-side. CMS secret keys and database pools remain protected within server memory.
2. **Zero-API Server Action Mutations**: "Add to Cart" interactions dispatch directly through `<form action={tambahKeranjangAction}>`, eliminating separate REST routes and client fetch boilerplate.
3. **Automated Visual Asset Pipelines**: Product imagery renders via `next/image` with adaptive `sizes`, ensuring zero Cumulative Layout Shift (CLS).
4. **Edge CDN Speeds with Targeted Invalidation**: When inventories update, `revalidatePath('/')` triggers background cache refreshes delivering live data with static speeds.

### Production Readiness
Congratulations! You have mastered the definitive fullstack React framework powering top-tier tech enterprises worldwide.

---

---

## Beginner Friendly Explanation

### Analogy: Automated High-Speed Supermarkets
This e-commerce application functions like an automated retail storefront:
1. **Server Components** are pristine pre-stocked shelves greeting shoppers the instant they enter the sliding glass doors (*instant initial visual render*).
2. **Server Actions** are automated conveyor belts: items place onto the belt, resolving inventories and transactions behind bulletproof partitions without manual paperwork.
3. **next/image** is intelligent store illumination: dynamically highlighting merchandise with perfect clarity without blinding passing shoppers.

## Experiments

- Click "+ Masukkan Keranjang" to observe the server console log Server Action execution in real time.
- Set product stock to 0 and verify the purchase button disables reactively.
- Inspect network tabs to view the internal RPC serialization payload generated by Server Actions.
- Deploy the project to Cloudflare Pages or Vercel and execute production Lighthouse audits.

---

## Challenge

Author a `processCouponAction(couponCode)` Server Action validating promo code "DISKON50", applying a 50% discount and issuing a targeted cache revalidation.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ NEXT.JS APP ROUTER ARCHITECTURE                          │
│                                                          │
│ [Server Component] (Default: Keamanan & DB Direct Access)│
│  • page.tsx / layout.tsx                                 │
│  • Fetch data di server tanpa CORS / Waterfalls          │
│       │                                                  │
│       ▼ Mengirim RSC Payload                             │
│ [Client Component] ('use client')                        │
│  • State lokal, onClick, animasi interaktif              │
│       │                                                  │
│       ▼ Server Actions ('use server')                    │
│  Mutasi langsung ke database & Revalidasi Path           │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `export default async function Page()`
- **Core Functionality:** Server Component asinkron bawaan.
- **Parameters / Attributes:** `Props (params, searchParams)`.
- **System Behavior & Return:** Merender halaman di server dengan akses database langsung tanpa paparan secret ke browser..
- **Practical Code Example:**
```typescript
export default async function Page() {
  const data = await db.query('SELECT * FROM items');
  return <main>{data.map(i => <p key={i.id}>{i.name}</p>)}</main>;
}
```
- **Expected Execution Output:**
```output
HTML statis siap saji dikirimkan ke peramban klien
```

### 2. `'use client'`
- **Core Functionality:** Direktif penanda Komponen Klien.
- **Parameters / Attributes:** `Ditulis di baris pertama`.
- **System Behavior & Return:** Mengizinkan penggunaan hook interaktif browser seperti `useState`, `useEffect`, dan event listener..
- **Practical Code Example:**
```typescript
'use client';
import { useState } from 'react';
export default function Counter() {
  const [val, setVal] = useState(0);
  return <button onClick={() => setVal(v => v + 1)}>{val}</button>;
}
```
- **Expected Execution Output:**
```output
Komponen interaktif beroperasi di browser klien
```

### 3. `'use server' (Server Actions)`
- **Core Functionality:** Mutasi data server langsung dari form.
- **Parameters / Attributes:** `Form data / arguments`.
- **System Behavior & Return:** Mengeksekusi mutasi database di sisi server langsung dari event form klien tanpa endpoint REST terpisah..
- **Practical Code Example:**
```typescript
async function createItem(formData: FormData) {
  'use server';
  const name = formData.get('name');
  await db.items.create({ name });
  revalidatePath('/items');
}
```
- **Expected Execution Output:**
```output
Data tersimpan di server dan halaman otomatis di-revalidasi
```

### 4. `<Link href="/dashboard">`
- **Core Functionality:** Navigasi halaman cepat tanpa reload.
- **Parameters / Attributes:** `href (Path route)`.
- **System Behavior & Return:** Melakukan pre-fetching rute di latar belakang dan transisi halaman instan (SPA feel)..
- **Practical Code Example:**
```typescript
import Link from 'next/link';
<Link href="/about" className="btn">Tentang Kami</Link>
```
- **Expected Execution Output:**
```output
Halaman berpindah instan tanpa muat ulang browser
```

---

## Common Pitfalls & Debugging Tips

### 1. Client Hooks in Server Components
- **Symptom / Issue:** Build error stating `useState can only be used in a Client Component`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Add the `'use client'` directive to the top of components requiring browser state.

### 2. Sequential Data Fetching Waterfalls
- **Symptom / Issue:** Significantly delays page render times by running independent requests one after another.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Run asynchronous fetches concurrently using `Promise.all([fetchA(), fetchB()])`.

### 3. Over-Aggressive Static Caching
- **Symptom / Issue:** Stale database content remains visible to users after updates.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Configure accurate revalidation: `fetch(url, { next: { revalidate: 60 } })` or `revalidatePath()`.

---

## Summary

Congratulations! You have completed the comprehensive Next.js curriculum from fundamental App Router mechanics to an enterprise-grade Headless E-Commerce Storefront.
