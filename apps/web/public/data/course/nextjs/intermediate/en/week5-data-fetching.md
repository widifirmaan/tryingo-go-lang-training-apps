# Data Fetching — Fetch Stock from Warehouse

> **Kategori:** Next.js | **Level:** Intermediate | **Minggu 5:** Data Fetching
> **Prerequisites:** Week 4 — **Styling & Optimization**.

## Learning Objectives

- `async` Server Component `await fetch()` directly — no `useEffect`
- `fetch` cache: `force-cache` (rarely-changing stock) vs `no-store` (live stock) vs `revalidate: 60` (updates every minute)
- `loading.js` skeleton while waiting

---

## Why This Matters (Non-IT)

A product list `fetch`ed in `useEffect` → loading blink on every open. Server Component `await fetch()` on the server → HTML arrives filled, fast & SEO.

---

## Program: List from API

```jsx
// app/products/page.js — Server Component
async function getProducts() {
  const res = await fetch("https://api.shop.com/products", {
    next: { revalidate: 60 } // cache 60s, then fresh
  });
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts(); // direct await, no useEffect
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name} — Rp {p.price.toLocaleString("en-US")}</li>
      ))}
    </ul>
  );
}

// app/products/loading.js — skeleton during fetch
export default function Loading() {
  return <p>⏳ Loading products...</p>;
}
```

**Cache choices:**
- `cache: "force-cache"` — catalog stock (rarely changes)
- `cache: "no-store"` — live stock (always fresh)
- `next: { revalidate: 60 }` — middle ground

---

## Key Concepts

### Server `await fetch` vs Client `useEffect`
Server: `await fetch` in `page.js` → HTML done before sending. Client: `useEffect` → empty first, then filled.

### Cache
`force-cache` thrifty, `no-store` fresh, `revalidate` middle.

---

## Beginner Friendly Explanation

### Analogy: Warehouse Phone Order
- **Server fetch = warehouse packs before delivery** (HTML arrives full). **`useEffect` = empty box delivered, filled later**.

### Step 0 — Prepare Device
- Next.js project (`npx create-next-app`), run dev, compare server vs client fetch.

### How the Computer Reads It
1. `await fetch(...)` in Server Component → runs on server → HTML filled.
2. `revalidate: 60` → cached copy served for 60s, then refreshed.

### 3 Must-Know Terms
1. **Server/Client/cache**: warehouse/shop/copies

---

## Experiments

- **Green:** `revalidate: 60` → `0` → always fresh?
- **Yellow:** `no-store` → network tab fetches every visit?
- **Red:** `fetch` in Client Component without `useEffect` → infinite loop? Move to server.

---

## Challenge

**Cached Catalog:** Server `page.js` with `revalidate: 60` + `loading.js` skeleton + try all 3 cache modes.
- **Link-up (Week 4 — Styling & Optimization):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **fetch/cache/revalidate**: order/copies/refresh

---

## Summary

Week 5: **Fetch Stock** — Server fetch + cache. Next: **Server Actions** — submit forms.
