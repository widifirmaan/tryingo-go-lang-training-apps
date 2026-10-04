# Dynamic Metadata API, OpenGraph Generation & Structured SEO

> **Kategori:** Next.js | **Level:** Dynamic SEO, Optimizations & E-Commerce Capstone | **Minggu 8:** Dynamic Metadata API, OpenGraph Generation & Structured SEO
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master modern technical SEO architecture: Static Metadata vs Dynamic generateMetadata()
- Configure OpenGraph tags and Twitter Cards for rich social media link previews
- Generate dynamic social preview cards on-the-fly deploying Edge Image Generation (@vercel/og)
- Embed Schema.org Structured Data (JSON-LD) unlocking Google Rich Search Results
- Generate sitemap.xml and robots.txt indexes programmatically at the route layer

---

## Program: Automated OpenGraph Social Card Generator & JSON-LD Schema Pipeline

```tsx
// ============================================================================
// File: app/produk/[slug]/page.tsx (Metadata API Dinamis untuk Mesin Pencari & Medsos)
// ============================================================================
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. generateMetadata: Dieksekusi otomatis oleh Next.js untuk menyuntikkan tag <head> dinamis
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Simulasi fetch judul dan gambar produk dari database
  const namaProduk = slug === "mechanical-keyboard-75" ? "Mechanical Keyboard 75%" : "Produk Pilihan Nusa";
  const harga = 1250000;
  const deskripsi = `Beli ${namaProduk} terbaik dengan harga Rp ${harga.toLocaleString("id-ID")}. Garansi resmi 2 tahun.`;

  return {
    title: `${namaProduk} | Nusa Storefront`,
    description: deskripsi,
    openGraph: {
      title: `${namaProduk} - Diskon Spesial`,
      description: deskripsi,
      url: `https://store.nusa.dev/produk/${slug}`,
      siteName: "Nusa Storefront",
      images: [
        {
          url: `https://store.nusa.dev/api/og?judul=${encodeURIComponent(namaProduk)}`,
          width: 1200,
          height: 630,
          alt: namaProduk
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: namaProduk,
      description: deskripsi
    }
  };
}

export default async function HalamanProdukSEO({ params }: PageProps) {
  const { slug } = await params;

  // 2. Structured Data (JSON-LD) untuk Google Rich Snippets (Bintang rating & harga di hasil pencarian)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Mechanical Keyboard 75%",
    description: "Switch tactile gateron pro yellow, gasket mount, RGB.",
    offers: {
      "@type": "Offer",
      price: "1250000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock"
    }
  };

  return (
    <article style={{ maxWidth: "560px", margin: "24px auto", fontFamily: "sans-serif" }}>
      {/* Sisipkan JSON-LD ke dalam script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1>{slug}</h1>
      <p>Halaman ini dilengkapi Dynamic OpenGraph dan Skema Mesin Pencari Google Resmi!</p>
    </article>
  );
}
```

---

## Key Concepts

### Why the Next.js Metadata API Transforms Technical SEO
In traditional SPAs, `<head>`, `<title>`, and `<meta>` tags are rendered asynchronously via client JavaScript. Social crawler bots (WhatsApp, Facebook, Twitter, Slack) do not execute heavy client hydration passes, resulting in broken preview cards.
The **Next.js Metadata API** solves this natively:
1. Export static `metadata` or dynamic `generateMetadata()`.
2. Next.js **injects verified meta tags into the initial streaming HTML response**, guaranteeing crawlers parse rich cards on arrival.

### Dynamic Edge OpenGraph Images (`@vercel/og`)
Rather than manually authoring thousands of promotional banner graphics in design tools, Next.js enables generating dynamic 1200x630 PNG images on-the-fly using standard HTML and JSX styling at edge speed.

### Google Rich Snippets via JSON-LD
Injecting `schema.org` JSON-LD payloads instructs search engine algorithms to decorate search listings with verified star ratings, price badges, and in-stock badges, dramatically boosting organic Click-Through Rates (CTR).

---

---

## Beginner Friendly Explanation

### Analogy: Embossed Business Cards & Window Displays
1. **Metadata API** is an embossed executive business card: when handed to prospective partners (*sharing a link on WhatsApp*), they read your brand name and logo immediately without opening an application.
2. **JSON-LD** is an illuminated storefront display: pedestrians walking along the sidewalk (*searchers on Google*) immediately discern prices and in-stock status without stepping inside the shop.

## Experiments

- View page source in browser DevTools to verify <title> and OpenGraph meta tags populate in raw HTML.
- Validate the URL via Facebook Sharing Debugger or Twitter Card preview tools.
- Evaluate your JSON-LD block using the Google Rich Results Test utility.
- Author an app/sitemap.ts generating dynamic URL collections from product databases.

---

## Challenge

Author an `app/api/og/route.tsx` endpoint deploying `ImageResponse` from `next/og` rendering dynamic titles over modern gradient cards.

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

You have mastered Dynamic Metadata API, OpenGraph previews, and JSON-LD schemas. Next week, we examine next/image and Core Web Vitals.
