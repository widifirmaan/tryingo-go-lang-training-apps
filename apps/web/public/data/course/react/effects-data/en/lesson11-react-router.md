# React Router v6

> React | Effects & Data | Lesson 11

## Learning Objectives

- Understand SPA routing with React Router
- Create routes and navigation with Link
- Use dynamic segments with useParams
- Build a 404 page and useNavigate

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

## Explanation

## SPA Routing
React Router swaps views without a full reload. The URL is part of app state: `/products/2` = product id 2 — shareable and bookmarkable.

## Routes & Route
`<Routes>` matches URLs to elements. `path="*"` catches any unmatched URL (404). Order matters: specific routes first, catch-all last.

## Link vs <a>
`<Link>` navigates client-side without reload — unlike `<a href>` which reloads the page. Use Link for all internal navigation.

## Dynamic Segments
`/products/:id` captures the value at the `:id` position, accessed via `useParams()`. Type conversion is manual: `Number(id)`. `useNavigate()` for programmatic navigation (Back button).

---

## Experiments

1. **SPA Routing**
2. **Routes & Route**
3. **Link vs <a>**
4. **Dynamic Segments**

---

## Challenge

Add a Checkout page with a form (name, address, payment method) at /checkout, an About page, and a NavBar layout with NavLink (active styles). Use nested routes with Outlet.

---

## Summary

React Router v6: Routes/Route, Link, useParams, useNavigate, 404. The URL is app state. Next: Recipe App project.
