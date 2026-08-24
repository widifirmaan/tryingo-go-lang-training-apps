# Server & Client Components — Kitchen vs Table

> **Kategori:** Next.js | **Level:** Beginner | **Minggu 3:** Server & Client Components

## Learning Objectives

- Understand 2 kinds of Next.js components: **Server Component** (cook in kitchen, default) vs **Client Component** (at the table, needs `"use client"`)
- Know when to use which: Server for fetching & showing, Client for clicking, typing
- Golden rule: **Server can import Client, Client cannot import Server**
- Build a simple interactive component with `useState` without hurting performance
- Combine both: Server fetches products, Client filters search

---

## Why This Matters (Non-IT)

Imagine Siti's shop: **Kitchen (server)** cooks fried rice, **Table (browser)** where customer adds chili. If everything is cooked at the table, smoke everywhere. If everything in kitchen, customer can't adjust taste.

Next.js App Router **default = kitchen** (Server). Makes site fast & light (great for low-spec phones). Only interactive parts (button, input) move to table (`"use client"`). Wrong choice = slow site or `useState is not defined` error.

---

## Program: Product List + Search Box (Server + Client)

1 Server Component fetches data, 1 Client Component handles search.

```jsx
// ── app/products/page.js — SERVER COMPONENT (default, no "use client") ──
async function getProducts() {
  return [
    { id: "1", name: "Rice 5kg", price: 62000, category: "staple" },
    { id: "2", name: "Spinach", price: 5000, category: "vegetable" },
    { id: "3", name: "Eggs 1kg", price: 28000, category: "staple" },
    { id: "4", name: "Chili 250g", price: 15000, category: "vegetable" },
  ];
}

import SearchBox from "./SearchBox"; // Client imported in Server — OK

export default async function ProductsPage() {
  const products = await getProducts(); // direct await, no useEffect!

  return (
    <div>
      <h1>Shop Products</h1>
      <p style={{ color: "gray" }}>Fetched on server — fast & SEO-friendly</p>
      <SearchBox list={products} />
    </div>
  );
}

// ── app/products/SearchBox.js — CLIENT COMPONENT (interactive, in browser) ──
"use client";

import { useState } from "react";

export default function SearchBox({ list }) {
  const [query, setQuery] = useState("");
  const results = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search: rice, spinach..."
        style={{ padding: 8, width: "100%", maxWidth: 300, border: "1px solid #ccc", borderRadius: 8 }}
      />
      <p style={{ color: "gray" }}>Showing {results.length} of {list.length}</p>
      <ul>
        {results.map((p) => (
          <li key={p.id}>{p.name} — Rp {p.price.toLocaleString("en-US")} <span style={{ color: "gray" }}>({p.category})</span></li>
        ))}
      </ul>
      {results.length === 0 && <p style={{ color: "red" }}>No results for "{query}"</p>}
    </div>
  );
}
```

Rules:
- `page.js` **no** `"use client"` → stays Server → can `async/await`.
- `SearchBox.js` has `"use client"` on **line 1** → can use `useState`.

---

## Key Concepts

### Server Component (Default)
- **Where:** server (kitchen). No JS sent → light.
- **Can:** `await fetch()`, read DB, use `process.env`.
- **Cannot:** `useState`, `useEffect`, `onClick`, `window`.

### Client Component (`"use client"`)
- **Where:** browser (table). JS sent, interactive.
- **Can:** `useState`, `onClick`, `localStorage`.
- **Cost:** adds JS → use as small as possible (only SearchBox).

### Correct Composition
```
Server (page.js) 
  └─► Client (SearchBox.js)  ✅ OK
Client 
  └─► Server                 ❌ ERROR
```
Fix: Server passes data as `props` (`list={products}`).

### Common Beginner Mistakes (2025)
- Put `"use client"` on `page.js` to use `useState` → whole page heavy. **Don't.** Split small.
- Forget `"use client"` → `useState is not defined`.
- Use `useEffect` fetch in Client → Server could do `await fetch()` directly.

---

## Beginner Friendly Explanation

### Analogy: Kitchen & Table

- **Server = Kitchen**: cook fried rice (fetch), customer only sees plate (HTML).
- **Client = Table + Fork**: customer stirs chili (type), presses bell (click).
- **`"use client"` = "Touch Allowed" sticker**: without it, plate is display only.

### How the Computer Reads It

1. Browser asks `/products` → Server runs `ProductsPage()` → `await getProducts()` → HTML.
2. Server sees `SearchBox` is Client → sends HTML + small JS for SearchBox.
3. User types "rice" → `useState` in `SearchBox` updates → filter runs **in browser**, no server request → fast.

### 3 Must-Know Terms

1. **`"use client"`** = marker "this file lives in browser, interactive". Must be line 1.
2. **Props** = data parcel from Server to Client (`list={products}`)
3. **Server-First** = Next.js principle: assume server, move to client only if needs click/type.

---

## Experiments

- **Green:** Change placeholder, add new product in `getProducts()`.
- **Yellow:** Create second Client `CartButton.js` with `useState` counter, import in `page.js`.
- **Red:** Move `"use client"` from `SearchBox.js` to `page.js`. Check Network tab JS size increase. Revert.

---

## Challenge

**Pick one:**

**A. Shop Filter:** Add 2 category buttons in `SearchBox`: "All | Staple | Vegetable" — filter `results` again.

**B. Mini Dashboard:** Server fetches `[{name, score}]` students, Client shows search + average of filtered.

Done when: 1 Server file (`page.js` async), 1 Client file (`"use client"`), data via `props`.

---

## Mini Glossary

- **Server Component**: component on server, default
- **Client Component**: component in browser, needs `"use client"`
- **useState**: storage that changes on click/type (Client only)
- **props**: way to pass data parent → child

---

## Summary

Week 3 of 12: **Server & Client Components** (Level: Beginner). You learned **kitchen vs table**: Server cooks data (fast, safe), Client handles touch (search, click). Next week: **Styling & Optimization** — Tailwind & images that don't eat quota.
