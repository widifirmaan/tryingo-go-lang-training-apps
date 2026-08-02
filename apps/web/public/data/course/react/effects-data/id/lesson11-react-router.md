# React Router v6

> React | Efek & Data | Pelajaran 11

## Tujuan Pembelajaran

- Memahami SPA routing dengan React Router
- Membuat route dan navigasi dengan Link
- Menggunakan dynamic segments dengan useParams
- Membuat 404 page dan useNavigate

---

## Program: React Router v6

```jsx
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000 },
  { id: 2, name: '27-inch Monitor', price: 3200000 },
  { id: 3, name: 'USB-C Hub', price: 250000 },
];

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Selamat datang di toko kita. Pilih produk dari menu Products.</p>
    </div>
  );
}

function Products() {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={'/products/' + p.id}>{p.name} — Rp {p.price.toLocaleString('id-ID')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const navigate = useNavigate();
  if (!product) return <p>Product not found.</p>;
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Rp {product.price.toLocaleString('id-ID')}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Halaman tidak ditemukan.</p>
      <Link to="/">Go home</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '1rem', padding: '0.8rem 0', borderBottom: '2px solid #2E5B44', marginBottom: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

```

---

## Penjelasan

## SPA Routing
React Router mengganti view tanpa reload penuh. URL adalah bagian dari state aplikasi: `/products/2` = produk id 2 — bisa di-share dan di-bookmark.

## Routes & Route
`<Routes>` mencocokkan URL ke elemen. `path="*"` menangkap semua URL yang tidak cocok (404). Order penting: route spesifik dulu, catch-all terakhir.

## Link vs <a>
`<Link>` melakukan navigasi client-side tanpa reload — berbeda dari `<a href>` yang memuat ulang halaman. Gunakan Link untuk semua navigasi internal.

## Dynamic Segments
`/products/:id` menangkap nilai di posisi `:id`, diakses via `useParams()`. Konversi tipe perlu manual: `Number(id)`. `useNavigate()` untuk navigasi programatik (tombol Back).

---

## Eksperimen

1. **SPA Routing**
2. **Routes & Route**
3. **Link vs <a>**
4. **Dynamic Segments**

---

## Tantangan

Tambah halaman Checkout dengan form (nama, alamat, metode bayar) di route /checkout, halaman About, dan layout NavigasiBar dengan NavLink (style aktif). Gunakan nested routes dengan Outlet.

---

## Ringkasan

React Router v6: Routes/Route, Link, useParams, useNavigate, 404. URL = state aplikasi. Lanjut: project Recipe App.
