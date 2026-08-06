# Styling & Optimasi

> **Kategori:** Next.js | **Level:** Pemula | **Minggu 4:** Styling & Optimasi

## Tujuan Pembelajaran

- CSS Modules untuk scoped styling
- Tailwind CSS integration di Next.js
- next/image: optimasi otomatis (lazy, WebP, responsive)
- next/font: auto optimize Google Fonts
- Global CSS dan CSS-in-JS options

---

## Program: CSS & Image

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

## Konsep Kunci

### CSS Modules
File.module.css → scoped otomatis. Tidak bentrok.

### Tailwind
Built-in support. className langsung di JSX.

### next/image
Auto: lazy loading, WebP, responsive sizes, blur placeholder.

### next/font
Auto host Google Fonts. Tidak layout shift.

### Best Practice
- CSS Modules untuk component-specific
- Tailwind untuk utility-first

---

## Eksperimen

- Setup Tailwind CSS di proyek
- Buat CSS Module untuk komponen
- Gunakan next/image dengan remote images
- Implementasikan dark mode dengan Tailwind

---

## Tantangan

Buat landing page dengan Tailwind: Hero section, Feature grid, Testimonial cards, Footer. Gunakan next/image untuk gambar.

---

## Ringkasan

Minggu 4 dari 12: **Styling & Optimasi** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Data Fetching**.
