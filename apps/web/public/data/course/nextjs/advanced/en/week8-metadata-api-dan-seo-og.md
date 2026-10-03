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
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
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
