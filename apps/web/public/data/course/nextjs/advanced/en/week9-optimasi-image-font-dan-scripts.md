# Performance Optimization: next/image, next/font & Core Web Vitals

> **Kategori:** Next.js | **Level:** Dynamic SEO, Optimizations & E-Commerce Capstone | **Minggu 9:** Performance Optimization: next/image, next/font & Core Web Vitals
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Google Core Web Vitals: Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP)
- Deploy the next/image component for automated format conversion (WebP/AVIF) and responsive srcset generation
- Eliminate Cumulative Layout Shift (CLS) by declaring intrinsic aspect ratios or fill properties
- Integrate next/font to hoist Google Fonts at build time with zero external network hops and zero FOYT/FOUT
- Audit production bundle distributions deploying @next/bundle-analyzer

---

## Program: E-Commerce Lighthouse Score Audit & Asset Optimization Engine

```tsx
// ============================================================================
// File: app/komponen/BannerHeroOptimasi.tsx (Demonstrasi next/image & next/font)
// ============================================================================
import Image from "next/image";

export default function BannerHeroOptimasi() {
  return (
    <section style={{ maxWidth: "680px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: "300px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#0f172a"
      }}>
        {/* next/image: Otomatis konversi WebP/AVIF, responsive srcset, pencegahan CLS, dan priority LCP */}
        <Image
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
          alt="Setup Meja Kerja Minimalis Developer"
          fill
          priority // Prioritaskan loading gambar ini karena merupakan elemen LCP terbesar di layar
          sizes="(max-width: 768px) 100vw, 680px"
          style={{ objectFit: "cover" }}
        />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "24px",
          color: "white"
        }}>
          <h2 style={{ margin: "0 0 8px 0" }}>Produktivitas Tanpa Batas 2026</h2>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: "14px" }}>
            Dioptimalkan dengan next/image: Zero Layout Shift & WebP Compression Otomatis.
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

## Key Concepts

### Why Native `<img>` Tags Fail Production Audits
Standard `<img>` tags load uncompressed heavy assets, trigger layout shifts when dimensions resolve late (*Cumulative Layout Shift*), and download desktop-sized assets on low-end cellular connections.

The **`next/image`** pipeline injects automated optimizations:
1. **Format Transcoding**: Automatically transcodes JPEGs into AVIF or WebP tailored to browser support headers, cutting network payloads by 70%.
2. **Zero Layout Shift (CLS Elimination)**: Mandating strict aspect ratios or `fill` envelopes ensures the browser reserves layout geometry before bytes stream in.
3. **Adaptive `srcset`**: Renders tailored image variants matching the device viewport.
4. **The `priority` Prop**: Flags critical above-the-fold hero imagery as Largest Contentful Paint (LCP) candidates, disabling lazy loading.

### `next/font`: Zero Layout Shift Typography
`next/font/google` downloads web font binaries at build time, colocating them alongside static assets.
Browsers never execute external round-trips to `fonts.googleapis.com`, eliminating Flash of Unstyled Text (FOUT).

---

---

## Beginner Friendly Explanation

### Analogy: Pre-Printed Photo Slots vs Loose Document Drops
1. **Standard `<img>` tags** are dropping heavy loose books onto someone's desk while they read: the paper below jerks abruptly (*jarring Cumulative Layout Shift*).
2. **`next/image`** is an engineered passport photo boundary: an exact geometric silhouette is etched into the paper in advance; when the photograph settles, adjacent text never shifts.
3. **WebP/AVIF Transcoding** is compressing a high-definition photograph into a microscopic microchip retaining perfect optical clarity.

## Experiments

- Inspect network image responses to verify Content-Type transcoded automatically to image/webp or image/avif.
- Remove the priority prop from the hero banner to trigger the Next.js LCP developer warning.
- Resize viewport widths to verify the browser requests smaller variants via responsive srcset.
- Execute a Google Lighthouse audit targeting a 95+ Performance score.

---

## Challenge

Configure the custom `Inter` typeface utilizing `next/font/google` inside `app/layout.tsx` applying Latin subsets and CSS variable bindings.

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
```text
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
```text
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
```text
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
```text
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

You have mastered next/image, next/font, Core Web Vitals, and asset delivery. Next week is our Capstone Project: Headless E-Commerce Storefront.
