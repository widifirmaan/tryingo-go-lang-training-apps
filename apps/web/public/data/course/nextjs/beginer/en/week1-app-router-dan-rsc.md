# App Router: React Server Components (RSC) vs Client Components ('use client')

> **Kategori:** Next.js | **Level:** App Router, RSC & Streaming Foundations | **Minggu 1:** App Router: React Server Components (RSC) vs Client Components ('use client')
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Trace the evolution of Next.js from legacy Pages Router to the modern App Router architecture
- Master React Server Components (RSC): executing strictly server-side and emitting zero client JS
- Establish strict architectural boundaries: defaulting to RSC and isolating 'use client' leaves
- Execute direct database queries and environment secret consumption within async component bodies
- Dramatically shrink client-side JavaScript bundle footprints toward Zero-Bundle-Size baselines

---

## Program: Server-Side Product Catalog with Interactive Client Cart Trigger

```tsx
// ============================================================================
// File: app/page.tsx (React Server Component - Default, Zero Client JS Bundle!)
// ============================================================================
import TambahKeKeranjangTombol from "./components/TambahKeKeranjangTombol";

// Simulasi database query langsung di server (Aman: Kredensial tidak pernah bocor ke browser)
async function ambilKatalogProduk() {
  return [
    { id: "p1", nama: "Mechanical Keyboard 75%", harga: 1250000, stok: 8 },
    { id: "p2", nama: "Monitor Gaming 27\" 165Hz", harga: 3850000, stok: 4 },
    { id: "p3", nama: "Desk Mat Wool Felt Minimalist", harga: 275000, stok: 15 }
  ];
}

export default async function BerandaTokoPage() {
  // Data diambil langsung di server saat request datang
  const produkList = await ambilKatalogProduk();

  return (
    <main style={{ maxWidth: "680px", margin: "24px auto", fontFamily: "sans-serif" }}>
      <header style={{ borderBottom: "2px solid #0f172a", paddingBottom: "12px", marginBottom: "20px" }}>
        <h1 style={{ margin: 0 }}>Nusa Storefront • Next.js App Router</h1>
        <p style={{ color: "#64748b", margin: "4px 0 0" }}>
          Dirender 100% di Server (RSC) — Zero JavaScript dikirim ke browser untuk teks ini!
        </p>
      </header>

      <div style={{ display: "grid", gap: "16px" }}>
        {produkList.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "16px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 6px 0" }}>{item.nama}</h3>
              <div style={{ color: "#16a34a", fontWeight: "bold" }}>
                Rp {item.harga.toLocaleString("id-ID")}
              </div>
              <small style={{ color: "#64748b" }}>Sisa stok: {item.stok} unit</small>
            </div>

            {/* Komponen Client Interaktif disisipkan sebagai daun (Leaf Component) */}
            <TambahKeKeranjangTombol produk={item} />
          </div>
        ))}
      </div>
    </main>
  );
}
```

---

## Key Concepts

### The React Server Components (RSC) Paradigm Shift
In traditional React (SPA / Pages Router), entire component trees compile into colossal client JavaScript bundles. The browser downloads megabytes of script, parses it, and hydrates the DOM (*Client-Side Rendering*). This penalizes initial page loads and hurts SEO.

Within the **Next.js App Router**, all components under `app/` default strictly to **React Server Components (RSC)**:
1. Components execute purely on the server runtime.
2. Components can be declared `async`, awaiting database drivers directly (`await db.query()`) without writing intermediate REST controllers!
3. Output streams to the client as lightweight HTML and RSC virtual wire frames. **Zero kilobytes of component JS are sent to the client!**

### When to Declare `'use client'`
Append the `'use client'` boundary directive only when a component requires client-side browser semantics:
- State and lifecycle hooks (`useState`, `useEffect`, `useReducer`).
- DOM event handlers (`onClick`, `onChange`, `onSubmit`).
- Client browser APIs (`localStorage`, `window`, Web Audio).
**Production Best Practice**: Keep pages as Server Components, pushing `'use client'` directives down to atomic interactive leaf nodes (`<AddToCartButton />`).

---

---

## Beginner Friendly Explanation

### Analogy: Executive Chef Delivery vs Raw Meal-Kit Deliveries
1. **Legacy Client React** is a raw meal kit: shipping uncooked meat and vegetables to your doorstep, forcing your home kitchen stove to prepare the meal (*client device cpu burns battery to hydrate DOM*).
2. **Next.js Server Components (RSC)** is an executive restaurant kitchen: master chefs prepare the dish on industrial stoves (*high-speed servers*), delivering a hot plated banquet (*ready-to-eat HTML with zero compute burden on user devices*).
3. **`'use client'`** is the tabletop salt shaker: an interactive touchpoint manipulated by the diner.

## Experiments

- Inspect DevTools Network payloads to verify ambilKatalogProduk server code is completely omitted from browser bundles.
- Inject useState inside BerandaTokoPage without 'use client' to witness the instructional compiler diagnostic.
- Modify server catalog data and refresh to verify immediate server-rendered updates.
- Embrace the async component signature on BerandaTokoPage observing native promise resolution.

---

## Challenge

Author a Client Component `CartHeaderBadge` managing local cart badge count, and embed it inside a root `app/layout.tsx` Server Component layout.

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

You have mastered App Router architecture, RSC vs Client boundaries, and Zero-Bundle costs. Next week, we examine Dynamic Routes and Nested Layouts.
