# Lists & Conditional Rendering

> React | Foundations | Lesson 3

## Learning Objectives

- Render lists with array.map()
- Use unique and stable keys
- Conditional rendering with ternary and &&
- Combine data + UI from an array of objects

---

## Program: Lists & Conditional Rendering

```jsx
const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000, inStock: true },
  { id: 2, name: '27-inch Monitor', price: 3200000, inStock: false },
  { id: 3, name: 'USB-C Hub', price: 250000, inStock: true },
  { id: 4, name: 'Webcam', price: 450000, inStock: true },
];

export default function App() {
  return (
    <div>
      <h1>Product Catalog</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={{ border: '1px solid #eee', borderRadius: 10, padding: '0.8rem', margin: '0.4rem 0' }}>
            <strong>{p.name}</strong> — Rp {p.price.toLocaleString('id-ID')}{' '}
            {p.inStock ? <span style={{ color: '#2E5B44', fontWeight: 'bold' }}>(In stock)</span>
                      : <span style={{ color: '#b00020', fontWeight: 'bold' }}>(Sold out)</span>}
          </li>
        ))}
      </ul>
      <p>Total: {products.length} products · {products.filter((p) => p.inStock).length} in stock</p>
      {products.length === 0 && <p>Catalog is empty.</p>}
    </div>
  );
}

```

---

## Explanation

## map() for Lists
To render an array, use `.map()` which returns an array of JSX. React renders each element in order. This is the most common pattern in React apps.

## Keys
Every list item needs a unique, stable `key` (usually an id). Keys let React track items when the list changes — adding/removing without re-rendering the whole list. Avoid index as key when list order can change.

## Conditionals
Use `ternary` (`cond ? A : B`) for two branches, `&&` to render "only if true" (e.g. empty message), and `||` for fallback values.

## Data-Driven UI
Lists + conditions are the heart of data-driven UI: data array + render function = a view always in sync with data.

---

## Experiments

1. **map() untuk List**
2. **Key**
3. **Kondisional**
4. **Data-Driven UI**

---

## Challenge

Change products to 6 items with a new category field. Render a heading per category and only show products above 300,000. Add a special message when no products match.

---

## Summary

map() renders lists, keys keep lists efficient, ternary/&& handle conditions. UI stays in sync with data. Next: static product page project.
