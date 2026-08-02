# Testing & Performance

> React | Global State & Advanced | Lesson 15

## Learning Objectives

- Write basic tests with React Testing Library
- Apply memo to prevent unnecessary re-renders
- Use useMemo for expensive calculations
- Understand when optimization is needed

---

## Program: Testing & Performance

```jsx
import { memo, useMemo, useState } from 'react';

const products = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: 'Product ' + (i + 1),
  price: 50000 + i * 25000,
}));

const ProductRow = memo(function ProductRow({ product, onSelect }) {
  return (
    <li style={{ border: '1px solid #eee', borderRadius: 10, padding: '0.6rem', margin: '0.3rem 0' }}>
      <button onClick={() => onSelect(product)} style={{ border: 'none', background: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}>
        <strong>{product.name}</strong> — Rp {product.price.toLocaleString('id-ID')}
      </button>
    </li>
  );
});

export default function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  // useMemo: only recompute when 'query' changes (60 items filtered per keystroke otherwise)
  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div>
      <h1>Testing & Performance</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter products..."
        style={{ width: '100%', boxSizing: 'border-box' }}
      />

      <p style={{ color: '#666' }}>{filtered.length} of {products.length} shown · ProductRow is memoized</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map((p) => (
          <ProductRow key={p.id} product={p} onSelect={setSelected} />
        ))}
      </ul>

      {selected && (
        <p><strong>Selected:</strong> {selected.name} — Rp {selected.price.toLocaleString('id-ID')}</p>
      )}
    </div>
  );
}

```

---

## Explanation

## React Testing Library
Tests mimic how users interact: render a component, find elements, fire events, assert results. `getByPlaceholderText`, `fireEvent.change`, `expect(...).toBeInTheDocument()`. The example test file is in `src/App.test.jsx` (run with Vitest + jsdom in your own project).

## memo
`memo` makes a component re-render only when its props change. Great for large lists whose items rarely change — prevents the whole list from re-rendering when the parent changes.

## useMemo
`useMemo` caches a computed result and recomputes only when dependencies change. For filtering 60 items per keystroke, this avoids recomputation on unrelated renders.

## Don't Optimize Prematurely
Rule of thumb (react.dev): profile first, optimize only when there is a real problem. memo/useMemo are not defaults for every component — use them for large lists and expensive calculations.

---

## Experiments

1. **React Testing Library**
2. **memo**
3. **useMemo**
4. **Jangan Prematur**

---

## Challenge

Add a new test in App.test.jsx: clicking a product shows "Selected:" (use fireEvent.click + getByText). In the component: add a stock badge to ProductRow and compute the total list price with useMemo.

---

## Summary

Testing = simulating user interaction. memo/useMemo optimize lists & calculations — measure before optimizing. Next: final project.
