# React Router — Shop Map Without Reload

> **Kategori:** React | **Level:** Intermediate | **Minggu 5:** React Router
> **Prerequisites:** Week 4 — **useEffect & Lifecycle**.

## Learning Objectives

- Install `npm install react-router-dom`, wrap `BrowserRouter`, `Routes` + `Route` = map
- `Link` sliding door (no reload) vs `a` teardown, `useParams` reads `id` from URL

---

## Why This Matters (Non-IT)

A 3-page shop without a router = 1 giant file of manual `if`s. Router = **map**: `/` → Home, `/products/1` → Detail — move without reloading the header.

---

## Program: 3-Page Store

```bash
npm install react-router-dom
```

```jsx
// App.jsx
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function Home(){ return <h1>Shop Home</h1>; }
function List(){
  return <div><h1>List</h1><Link to="/products/1">Rice</Link> | <Link to="/products/2">Spinach</Link></div>;
}
function Detail(){
  const { id } = useParams(); // read :id from URL
  return <div><h1>Detail {id}</h1><Link to="/products">Back</Link></div>;
}

export default function App(){
  return (
    <BrowserRouter>
      <nav><Link to="/">Home</Link> | <Link to="/products">Products</Link></nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<List />} />
        <Route path="/products/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Key Concepts

### `BrowserRouter` = Building
Wraps everything, provides the map.

### `Routes` + `Route` = Map
`path="/products/:id"` `:id` variable, `element={<Detail />}` what shows.

### `Link` vs `a`
`Link` slides, `a` tears down.

### `useParams` = Envelope
`const {id} = useParams()` takes `1` from `/products/1`.

---

## Beginner Friendly Explanation

### Analogy: Mall Map
- **`BrowserRouter` = mall building**, **`Routes` = map board**, **`Link` = express lift**.

### Step 0 — Prepare Device
- Vite React project + `npm install react-router-dom`, click links, watch URL vs reload.

### How the Computer Reads It
1. Click `<Link to="/products/1">` → URL changes, matching `Route` renders, no reload.
2. `useParams()` in `Detail` → `{ id: "1" }`.

### 3 Must-Know Terms
1. **Router/Route/Link**: map/pin/slide

---

## Experiments

- **Green:** Replace `Link` with `a` → full reload (header blinks)? Restore `Link`.
- **Yellow:** Visit `/nope` → blank? Add `path="*"` NotFound.
- **Red:** `useParams` outside `BrowserRouter` → crash? Keep inside.

---

## Challenge

**3-Page Store:** `Home`, `Products` list with `Link`s to `ProductDetail/:id` using `useParams`, + `NotFound` `path="*"`.

---

## Mini Glossary

- **Router/Link/params**: map/slide/envelope

---

## Summary

Week 5: **Shop Map** — Router without reload. Next: **Context** — shared warehouse.
