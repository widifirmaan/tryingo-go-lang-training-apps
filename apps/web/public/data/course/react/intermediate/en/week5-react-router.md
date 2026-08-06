# React Router

> **Kategori:** React | **Level:** Intermediate | **Minggu 5:** React Router

## Learning Objectives

- Setup BrowserRouter and Routes/Route for routing
- Link component for navigation without page reload
- useParams to get dynamic route parameters
- useNavigate for programmatic navigation
- Nested routes and layout routes

---

## Program: Multi-Page App

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

## Key Concepts

### BrowserRouter
Wraps app for routing.

### Routes & Route
Route maps path to element.

### Dynamic Routes
useParams for URL parameters.

### Navigation
Link for SPA navigation, useNavigate for programmatic.

---

## Experiments

- Add 404 Not Found route
- Create nested routes with layout
- Implement route guards (protected routes)
- Add active link styling

---

## Challenge

Build a blog app with routing: Home, Post List, Post Detail (/post/:id), About. Use layout wrapper and active navigation.

---

## Summary

Week 5 of 12: **React Router** (Level: Intermediate). Multi-page navigation. Next week: **Context API**.
