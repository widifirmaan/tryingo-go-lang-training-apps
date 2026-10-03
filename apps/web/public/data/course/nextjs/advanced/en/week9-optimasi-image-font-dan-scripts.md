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

You have mastered next/image, next/font, Core Web Vitals, and asset delivery. Next week is our Capstone Project: Headless E-Commerce Storefront.
