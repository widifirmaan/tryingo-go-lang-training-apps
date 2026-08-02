# Lifting State Up

> React | State & Interaction | Lesson 7

## Learning Objectives

- Understand the 3-step lifting state up pattern
- Apply data flows down, actions flow up
- Create components controlled by their parent
- Use a single source of truth

---

## Program: Lifting State Up

```jsx
import { useState } from 'react';

const foods = ['Sate Ayam', 'Rendang', 'Gado-Gado', 'Nasi Goreng', 'Bakso', 'Soto'];

function SearchBar({ query, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search food..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', boxSizing: 'border-box' }}
    />
  );
}

function FoodList({ items }) {
  if (items.length === 0) return <p>No results found.</p>;
  return (
    <ul>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [text, setText] = useState('');
  const results = foods.filter((f) => f.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h1>Lifting State Up</h1>

      <h2>Search Bar (state di parent)</h2>
      <SearchBar query={query} onChange={setQuery} />
      <FoodList items={results} />

      <h2>Synced Inputs (satu state, dua input)</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="First input" />
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Second input" />
      <p>Kedua input selalu sinkron: "{text}"</p>
    </div>
  );
}

```

---

## Explanation

## When Lifting Is Needed
When two components must share the same data — e.g. SearchBar changes what FoodList shows. The state cannot live in either one; it must move up to the closest common parent.

## 3 Steps (react.dev)
1. Remove state from the child. 2. Accept data via props from the parent. 3. Add state to the common parent and pass data + event handlers down as props.

## Data Down, Actions Up
The golden rule: data flows down via props, actions flow up via callbacks. `onChange={setQuery}` — the parent passes the setter as a prop, the child calls it on input change.

## Controlled Components
A component that receives its value + handler from a parent is called controlled. The parent fully determines its behavior. This is the same pattern as controlled forms — just lifted to inter-component level.

---

## Experiments

1. **Kapan Lifting Diperlukan**
2. **3 Langkah (react.dev)**
3. **Data Down, Actions Up**
4. **Controlled Components**

---

## Challenge

Refactor App: create a FilterableProductList component with a SearchBar + product list (name, price, stock). Add a filter select (All/In Stock) — query and filter state live in its parent.

---

## Summary

Lifting state: state moves to the common parent, data flows down via props, actions flow up via callbacks. Single source of truth. Next: Todo App project.
