# Performance Optimization

> **Kategori:** React | **Level:** Advanced | **Minggu 11:** Performance Optimization

## Learning Objectives

- React.memo: skip re-render if props unchanged
- useMemo: cache expensive computation results
- useCallback: stabilize function reference for children
- React.lazy + Suspense: code splitting and lazy loading
- When to optimize vs premature optimization

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

## Key Concepts

### React.memo
Shallow compare props, skip re-render.

### useMemo
Cache computation results.

### useCallback
Stabilize function references.

### Code Splitting
lazy + Suspense for on-demand loading.

### When Optimize
Large lists, expensive computation, unnecessary re-renders.

---

## Experiments

- Compare re-renders with and without memo
- Create 1000-item list with useMemo filter
- Implement virtualized list
- Analyze bundle with webpack-bundle-analyzer

---

## Challenge

Optimize e-commerce app: memo for product list, useMemo for filter/sort, useCallback for event handlers, lazy for detail page.

---

## Summary

Week 11 of 12: **Performance Optimization** (Level: Advanced). Fast and efficient apps. Next week: **Capstone Project**!
