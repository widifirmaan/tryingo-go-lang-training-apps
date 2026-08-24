# Styling & Optimization — Pretty Without Slow

> **Kategori:** Next.js | **Level:** Beginner | **Minggu 4:** Styling & Optimization

## Learning Objectives

- Understand 3 styling ways in Next.js: **Global CSS**, **CSS Modules**, **Tailwind CSS** — when to use which
- Use **Tailwind** (already installed) for fast styling without new CSS files
- Use **`next/image`** for auto-small images & `next/font` for no-flash fonts
- Understand why optimization matters for low-spec phones & limited data
- Build a responsive catalog grid (phone 1 col, laptop 3 cols)

---

## Why This Matters (Non-IT)

Your shop works but looks plain — like an unpainted store. Customers need **clear product photos but not heavy**. A 3MB photo makes buyers on slow signal leave. `next/image` = **auto photographer**: 3MB → 80KB, WebP, lazy load. `next/font` = fonts without flash.

This week you turn a plain store into a pretty, fast showcase.

---

## Program: Pretty Responsive Catalog

Tailwind (already there) + `next/image`. No install needed.

```jsx
// ── app/products/page.js (Server Component) ──
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

async function getProducts() {
  return [
    { id: "1", name: "Rice 5kg", price: 62000, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400" },
    { id: "2", name: "Spinach", price: 5000, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400" },
    { id: "3", name: "Eggs 1kg", price: 28000, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b31122b?w=400" },
  ];
}

function ProductCard({ product }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
      <Image src={product.image} alt={product.name} width={300} height={200} className="rounded-lg object-cover w-full h-32" />
      <h3 className="font-bold text-lg mt-3">{product.name}</h3>
      <p className="text-[#2E5B44] font-semibold">Rp {product.price.toLocaleString("en-US")}</p>
      <button className="mt-2 w-full bg-[#2E5B44] text-white py-2 rounded-lg hover:bg-[#234535]">+ Cart</button>
    </div>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className={inter.className}>
      <h1 className="text-3xl font-bold mb-2">Shop Catalog</h1>
      <p className="text-gray-600 mb-6">Auto-small photos, no-flash font, neat grid on phone & laptop</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

// ── next.config.js — allow outside images (required for next/image) ──
// const nextConfig = {
//   images: { remotePatterns: [{ hostname: "images.unsplash.com" }] },
// };
// export default nextConfig;
```

1. If `next/image` with outside link errors `hostname not configured` → open `next.config.mjs`, add `remotePatterns`, restart `npm run dev`.
2. All `className="..."` is Tailwind — already active.

---

## Key Concepts

### 3 Styling Ways
- **Global CSS** (`app/globals.css`) = paint whole building — reset, base font. Used once in `layout.js`.
- **CSS Modules** (`Card.module.css`) = wallpaper per room — `import styles` → no clash.
- **Tailwind CSS** = sticker palette — `className="border p-4 rounded-xl"` instant. **Recommended for beginners** fast & responsive (`sm:`, `lg:`).

### `next/image` — Smart Photo
- Requires `width` & `height` (or `fill` + parent `relative`)
- Auto: WebP, lazy, responsive. 70% faster than `<img>`.
- Outside images need `hostname` in `next.config.mjs`.

### `next/font` — No-Flash Letters
- `import { Inter } from "next/font/google"` → Next.js hosts itself → no flash.

### Responsive = Smart Grid
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` = phone 1 col, tablet 2, laptop 3.

---

## Beginner Friendly Explanation

### Analogy: Decorating a Store

- **Global CSS** = exterior paint.
- **CSS Modules** = per-room wallpaper.
- **Tailwind** = IKEA stickers — stick `p-4`, instantly padded.
- **`next/image`** = photo printed in 3 sizes (small for phone, big for laptop) — phone not forced to download giant.
- **`next/font`** = letters carved in wood, not stickers applied on open.

### How It Works

1. You write `className="grid grid-cols-1 lg:grid-cols-3"` → Tailwind turns to final CSS on `npm run dev`.
2. You use `<Image width={300} height={200}>` → Next.js builds 3 versions + WebP on `npm run build`.
3. Phone asks image → server sends 300w only → saves data.

### 3 Must-Know Terms

1. **Tailwind** = utility CSS with ready classes
2. **Responsive** = adapts to screen width
3. **Lazy loading** = images below not loaded until scrolled

---

## Experiments

- **Green:** Change `bg-[#2E5B44]` to `bg-red-600`, `grid-cols-3` to `grid-cols-4`.
- **Yellow:** Add `hover:scale-105 transition` to `ProductCard`.
- **Red:** Replace `<Image>` with `<img>` with 3MB original, open Network (F12) → 3MB vs 80KB. Revert.

---

## Challenge

**Pick one:**

**A. Shop Landing:** `/` with: Hero (big image + title + WA button), Feature Grid (3 cards: Free Delivery, Fresh, COD), Footer. Use Tailwind + `next/image` + `next/font`.

**B. Aesthetic Catalog:** Make `/products` 3-col pretty, add `Discount 10%` badge with `className="bg-red-500 text-white px-2 py-1 rounded-full text-xs"`.

Done when: phone 1 col, laptop 3 cols (resize browser), and `next/image` used (not `<img>`).

---

## Mini Glossary

- **Tailwind**: utility CSS without new files
- **next/image**: smart image component
- **next/font**: no-flash font loader
- **Grid**: box layout
- **Responsive**: adapts to phone/laptop

---

## Summary

Week 4 of 12: **Styling & Optimization** (Level: Beginner). You painted the store (Tailwind), added light photos (`next/image`), and no-flash letters (`next/font`). **Beginner phase done!** Next: **Data Fetching** — real data from API / DB, not hardcode array.
