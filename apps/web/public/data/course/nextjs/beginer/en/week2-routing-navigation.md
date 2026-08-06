# Routing & Navigation

> **Kategori:** Next.js | **Level:** Beginner | **Minggu 2:** Routing & Navigation

## Learning Objectives

- File-based routing: app/folder/page.js = /folder route
- Dynamic routes: [id], [slug] for parameters
- Link component for navigation without reload
- Nested layouts and shared UI
- useParams, useSearchParams to get parameters

---

## Program: Multi-Page App

```jsx
// Next.js App Router = file-based routing
// Link component untuk client-side navigation

// ── app/layout.js ──
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <nav>
          <a href="/">Beranda</a>
          <a href="/products">Produk</a>
          <a href="/products/1">Detail</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
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
    <div>
      <h1>Daftar Produk</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <a href={"/products/" + p.id}>
              {p.name} — Rp {p.price.toLocaleString("id-ID")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── app/products/[id]/page.js ──
export default function ProductDetail({ params }) {
  const { id } = params;
  const products = {
    "1": { name: "Laptop", price: 15000000, desc: "Laptop gaming high-end" },
    "2": { name: "Mouse", price: 250000, desc: "Mouse wireless ergonomis" },
    "3": { name: "Keyboard", price: 750000, desc: "Keyboard mechanical RGB" },
  };

  const product = products[id];

  if (!product) return <p>Produk tidak ditemukan</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Rp {product.price.toLocaleString("id-ID")}</p>
      <p>{product.desc}</p>
      <a href="/products">Kembali</a>
    </div>
  );
}

console.log("Routing & navigation siap digunakan");
```

---

## Key Concepts

### File-based Routing
Folder = route. page.js = rendered page.

### Dynamic Routes
[id] = dynamic parameter. Access via params.

### Link vs <a>
Link = client-side navigation.

### Layout Nesting
Each folder can have its own layout.

---

## Experiments

- Create catch-all route [...slug]
- Add search params filter
- Create loading.js for each route
- Implement parallel routes

---

## Challenge

Build a blog with routing: Home, Posts, Post Detail (/post/[slug]), Category (/category/[name]). Use dynamic routes.

---

## Summary

Week 2 of 12: **Routing & Navigation** (Level: Beginner). File-based navigation. Next week: **Server & Client Components**.
