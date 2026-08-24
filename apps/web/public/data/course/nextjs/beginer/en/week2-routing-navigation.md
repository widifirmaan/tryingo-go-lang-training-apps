# Routing & Navigation — Automatic Shop Addresses

> **Kategori:** Next.js | **Level:** Beginner | **Minggu 2:** Routing & Navigation

## Learning Objectives

- Understand file-based routing: **1 folder = 1 address** — create pages without router config
- Create dynamic pages `[id]` — 1 template for 100 products (like 1 form for all hotel room numbers)
- Use `<Link>` from `next/link` for navigation without reload (faster than `<a>`)
- Understand nested `layout.js` — special frame for a section (e.g., all `/products` share a sidebar)
- Get URL params via `params` (in Server Components)

---

## Why This Matters (Non-IT)

Last week you had 2 addresses: `/` and `/about`. Imagine your shop has 50 products. Create 50 folders manually? **Dynamic routing** = 1 stamp template (`[id]`), Next.js fills the number. Like a **rubber stamp**: 1 stamp, 100 papers with different numbers.

Without this, you duplicate endlessly. With it, 1 file serves all.

---

## Program: Multi-Page Catalog

We build 3 addresses: product list, product detail, and category.

```jsx
// ── app/layout.js (same, add nav) ──
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", margin: 0 }}>
        <nav style={{ background: "#2E5B44", padding: 12, display: "flex", gap: 16 }}>
          <Link href="/" style={{ color: "white", fontWeight: "bold" }}>Home</Link>
          <Link href="/products" style={{ color: "white" }}>Products</Link>
          <Link href="/about" style={{ color: "white" }}>About</Link>
        </nav>
        <main style={{ padding: 24 }}>{children}</main>
      </body>
    </html>
  );
}

// ── app/products/page.js — LIST (address: /products) ──
import Link from "next/link";

const LIST = [
  { id: "1", name: "Rice 5kg", price: 62000 },
  { id: "2", name: "Cooking Oil 2L", price: 34000 },
  { id: "3", name: "Eggs 1kg", price: 28000 },
];

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <p>Click for detail:</p>
      <ul>
        {LIST.map((p) => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <Link href={`/products/${p.id}`} style={{ color: "#2E5B44" }}>
              {p.name} — Rp {p.price.toLocaleString("en-US")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── app/products/[id]/page.js — DYNAMIC DETAIL (address: /products/1, /products/2, ...) ──
export default function ProductDetail({ params }) {
  const { id } = params;

  const DATA = {
    "1": { name: "Rice 5kg", price: 62000, desc: "Fluffy rice for daily meals." },
    "2": { name: "Cooking Oil 2L", price: 34000, desc: "Clear palm oil, 2 liters." },
    "3": { name: "Eggs 1kg", price: 28000, desc: "Fresh eggs, ~16 pcs." },
  };

  const product = DATA[id];
  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
        <Link href="/products">← Back to list</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p style={{ fontSize: 20, fontWeight: "bold" }}>Rp {product.price.toLocaleString("en-US")}</p>
      <p>{product.desc}</p>
      <p style={{ color: "gray" }}>ID: {id}</p>
      <Link href="/products">← Back</Link>
    </div>
  );
}

// ── app/products/layout.js — SPECIAL FRAME FOR PRODUCTS (optional, nested) ──
export default function ProductsLayout({ children }) {
  return (
    <div style={{ border: "2px solid #EFECE6", borderRadius: 12, padding: 16 }}>
      <p style={{ color: "#2E5B44", fontWeight: "bold" }}>📦 Products Section</p>
      {children}
    </div>
  );
}
```

---

## Key Concepts

### File-Based Routing = Automatic Blueprint
No `if URL == "/products" show this`. Just **create a file** in the right place. `app` = ground floor, subfolders = rooms.

### Dynamic Route `[id]` = One Mold, Many Fills
`[]` means "variable, fill later". `[id]` can be `1`, `2`, `abc`. Access via `function Page({ params }) { const { id } = params }`. In Next.js 15+, `params` is a Promise → `await params` (keep simple this week).

### `<Link>` vs `<a>`
- `<a>` = **rebuild house** — full reload, slow.
- `<Link>` = **sliding door** — swap content only, fast, header doesn't blink. **Always use `Link` inside.** Use `<a>` only for outside links.

### Nested Layout = Frame Inside Frame
`app/layout.js` wraps all. `app/products/layout.js` wraps only `/products/*`. Great for sidebars.

---

## Beginner Friendly Explanation

### Analogy: Hotel Room Numbers

- **`/products`** = **hotel lobby** — list of all rooms.
- **`/products/1`** = **room 1** — all rooms same shape (1 bed, 1 AC), only guest differs. That's `[id]`: **1 design, many contents**.
- **`<Link>`** = **express elevator** — direct to floor without exiting building. `<a>` = exit building, re-enter (slow).

### How the Computer Reads It

1. User clicks `<Link href="/products/2">` → Next.js sees `/products/2`
2. Finds `app/products`? Yes. Finds `[id]` inside? Yes (dynamic). Match `2` as `id`.
3. Calls `ProductDetail({ params: { id: "2" } })` → render HTML.

### 3 Must-Know Terms

1. **Dynamic Route** = address with variable `[id]`. 1 file, many URLs.
2. **params** = envelope from Next.js with URL variables.
3. **Nested Layout** = layout inside layout.

---

## Experiments

- **Green:** Add 2 more products to `LIST` (id 4, 5).
- **Yellow:** Add `image: "https://..."` field and show `<img src={product.image} width={200} />`.
- **Red:** Change `href={`/products/${p.id}`}` to `href="/products/p.id"` (literal string). All links go to `/products/p.id` → not found. Fix it.

---

## Challenge

**Pick one:**

**A. Full Shop:** Add `/products/category/[name]` — e.g., `/products/category/vegetables` shows only vegetables.

**B. Simple Blog:** `/blog` (3 posts), `/blog/[slug]` (detail), and `/blog/layout.js` showing "✍️ Shop Blog" above each post.

Done when 3 levels work: `/` → `/products` → `/products/2`, and `Link` is used.

---

## Mini Glossary

- **Route**: URL address
- **Dynamic Route**: variable route (`[id]`)
- **Link**: Next.js fast navigation component
- **params**: object with dynamic URL values
- **Nested Layout**: subfolder layout adding a frame

---

## Summary

Week 2 of 12: **Routing & Navigation** (Level: Beginner). You learned automatic blueprint (folder=URL) and made **1 mold for 100 products** (`[id]`). Next week: **Server & Client Components** — why some components live on the server (fast, safe) and some in the browser (clickable), and when to use `"use client"`.
