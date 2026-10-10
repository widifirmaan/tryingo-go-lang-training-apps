# React Router

> **Kategori:** React | **Level:** Menengah | **Minggu 5:** React Router

## Tujuan Pembelajaran

- Setup BrowserRouter dan Routes/Route untuk routing
- Link component untuk navigasi tanpa page reload
- useParams untuk ambil dynamic route parameters
- useNavigate untuk programmatic navigation
- Nested routes dan layout routes

---

## Program: Multi-Halaman

```jsx
// React Router = routing SPA (Single Page Application)
// BrowserRouter, Routes, Route, Link, useParams, useNavigate

import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Beranda</h1>
      <p>Selamat datang di Tryngo App</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>Tentang Kami</h1>
      <p>Platform pembelajaran coding interaktif</p>
    </div>
  );
}

function User() {
  const { id } = useParams();
  return (
    <div>
      <h1>Profil Pengguna</h1>
      <p>ID: {id}</p>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate("/")}>Kembali</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Beranda</Link>
        <Link to="/about">Tentang</Link>
        <Link to="/user/123">User 123</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

console.log("React Router App siap digunakan");
```

---

## Konsep Kunci

### BrowserRouter
Wrap seluruh app untuk enable routing.

### Routes & Route
Route = path → element. Routes = container.

### Dynamic Routes
/path/:id → useParams() untuk ambil id.

### Navigation
Link = anchor tag SPA. useNavigate() = programmatic.

---

## Eksperimen

- Tambah route 404 Not Found
- Buat nested route dengan layout
- Implementasikan route guard (protected route)
- Tambah active link styling

---

## Tantangan

Buat blog app dengan routing: Home, Post List, Post Detail (/post/:id), About. Gunakan layout wrapper dan active navigation.

---

## Ringkasan

Minggu 5 dari 12: **React Router** (Level: Menengah). Navigasi multi-halaman. Minggu depan: **Context API**.
