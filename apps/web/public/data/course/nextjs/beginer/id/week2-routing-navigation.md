# Routing & Navigation

> **Kategori:** Next.js | **Level:** Pemula | **Minggu 2:** Routing & Navigation

## Tujuan Pembelajaran

- File-based routing: app/folder/page.js = /folder route
- Dynamic routes: [id], [slug] untuk parameter
- Link component untuk navigasi tanpa reload
- Nested layouts dan shared UI
- useParams, useSearchParams untuk ambil parameter

---

## Program: Multi-Halaman

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

## Konsep Kunci

### File-based Routing
Folder = route. page.js = halaman yang dirender.

### Dynamic Routes
[id] = parameter dinamis. Akses via params prop.

### Link vs <a>
Link = client-side navigation (SPA). Lebih cepat.

### Layout Nesting
Setiap folder bisa punya layout.js sendiri.

---

## Eksperimen

- Buat catch-all route [...slug]
- Tambah search params filter
- Buat loading.js untuk setiap route
- Implementasikan parallel routes

---

## Tantangan

Buat blog dengan routing: Home, Posts, Post Detail (/post/[slug]), Category (/category/[name]). Gunakan dynamic routes.

---

## Ringkasan

Minggu 2 dari 12: **Routing & Navigation** (Level: Pemula). Navigasi file-based. Minggu depan: **Server & Client Components**.
