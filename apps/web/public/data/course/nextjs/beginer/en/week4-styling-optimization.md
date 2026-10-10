# Styling & Optimization

> **Kategori:** Next.js | **Level:** Beginner | **Minggu 4:** Styling & Optimization

## Learning Objectives

- CSS Modules for scoped styling
- Tailwind CSS integration in Next.js
- next/image: auto optimization (lazy, WebP, responsive)
- next/font: auto optimize Google Fonts
- Global CSS and CSS-in-JS options

---

## Program: CSS & Images

```jsx
// Next.js: styling dan optimasi built-in
// CSS Modules, Tailwind, Image optimization, Font optimization

// ── CSS Modules (ProductCard.module.css) ──
// .card { border: 1px solid #ddd; padding: 16px; border-radius: 8px; }
// .title { font-size: 1.25rem; font-weight: bold; }
// .price { color: #2E5B44; font-weight: 600; }

// ── components/ProductCard.jsx ──
// import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <div className="product-card" style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{product.name}</h3>
      <p style={{ color: "#2E5B44", fontWeight: 600 }}>
        Rp {product.price.toLocaleString("id-ID")}
      </p>
      {/* Next.js Image: auto optimasi, lazy loading */}
      {/* <Image src={product.image} alt={product.name} width={300} height={200} /> */}
    </div>
  );
}

// ── app/products/page.js ──
export default function ProductsPage() {
  const products = [
    { id: 1, name: "Laptop", price: 15000000 },
    { id: 2, name: "Mouse", price: 250000 },
    { id: 3, name: "Keyboard", price: 750000 },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Katalog Produk</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

// ── Font Optimization (app/layout.js) ──
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
// <body className={inter.className}>

console.log("Styling & Optimasi siap digunakan");
```

---

## Key Concepts

### CSS Modules
Scoped styles, no conflicts.

### Tailwind
Built-in support.

### next/image
Auto optimization.

### next/font
Self-hosted fonts.

### Best Practice
CSS Modules for components, Tailwind for utilities.

---

## Experiments

- Setup Tailwind CSS in project
- Create CSS Module for component
- Use next/image with remote images
- Implement dark mode with Tailwind

---

## Challenge

Build a landing page with Tailwind: Hero section, Feature grid, Testimonial cards, Footer. Use next/image for images.

---

## Summary

Week 4 of 12: **Styling & Optimization** (Level: Beginner). Beginner phase complete! Next week: **Data Fetching**.
