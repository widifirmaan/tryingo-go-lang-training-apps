# Performance Optimization

> **Kategori:** React | **Level:** Lanjutan | **Minggu 11:** Performance Optimization

## Tujuan Pembelajaran

- React.memo: skip re-render jika props tidak berubah
- useMemo: cache hasil computation expensive
- useCallback: stabilkan function reference untuk child
- React.lazy + Suspense: code splitting dan lazy loading
- Kapan optimize vs premature optimization

---

## Program: Memo & Code Splitting

```jsx
// Performance: React.memo, useMemo, useCallback, lazy, Suspense
// Optimasi re-render dan bundle size

import { useState, useMemo, useCallback, memo, lazy, Suspense } from "react";

// ── React.memo: skip re-render jika props sama ──
const ExpensiveList = memo(function ExpensiveList({ items }) {
  console.log("Rendering ExpensiveList");
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

// ── useMemo: cache expensive computation ──
function FilteredList({ items, query }) {
  const filtered = useMemo(() => {
    console.log("Filtering...");
    return items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  return <ExpensiveList items={filtered} />;
}

// ── useCallback: stable function reference ──
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, name: "Belajar React", done: false },
    { id: 2, name: "Buat Proyek", done: false },
  ]);
  const [count, setCount] = useState(0);

  const addTodo = useCallback((name) => {
    setTodos((prev) => [...prev, { id: Date.now(), name, done: false }]);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <FilteredList items={todos} query="" />
    </div>
  );
}

// ── Code Splitting: lazy + Suspense ──
const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HeavyComponent />
    </Suspense>
  );
}

console.log("Performance optimizations siap digunakan");
```

---

## Konsep Kunci

### React.memo
HOC yang shallow compare props. Skip re-render jika sama.

### useMemo
Cache hasil function. Re-compute saat dependency berubah.

### useCallback
Stabilkan reference function. Penting untuk memo child.

### Code Splitting
lazy() + Suspense = load component saat dibutuhkan. Kurangi initial bundle.

### Kapan Optimize
- List besar
- Computation expensive
- Child sering re-render tidak perlu

---

## Eksperimen

- Bandingkan re-render dengan dan tanpa memo
- Buat list 1000 item dengan useMemo filter
- Implementasikan virtualized list
- Analisis bundle dengan webpack-bundle-analyzer

---

## Tantangan

Optimisasi aplikasi e-commerce: memo untuk product list, useMemo untuk filter/sort, useCallback untuk event handlers, lazy untuk halaman detail.

---

## Ringkasan

Minggu 11 dari 12: **Performance Optimization** (Level: Lanjutan). Aplikasi cepat dan efisien. Minggu depan: **Capstone Project**!
