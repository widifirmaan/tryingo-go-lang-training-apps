# Custom Hooks & Patterns

> **Kategori:** React | **Level:** Intermediate | **Minggu 8:** Custom Hooks & Patterns

## Learning Objectives

- Build custom hooks with the "use" prefix
- useLocalStorage: persist state to localStorage
- useFetch: reusable data fetching logic
- useToggle: reusable toggle logic
- When to extract logic to a custom hook vs inline

---

## Why This Matters (Non-IT)

Without custom hooks, `useState + useEffect fetch` is written in 10 components (duplicates!). With `useProducts()` once, 10 use it.

---

## Program: useFetch & useLocalStorage

```jsx
// Custom hooks = extract reusable logic into their own function
// Convention: "use" prefix (React convention)

import { useState, useEffect } from "react";

// Custom hook: useLocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Custom hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Simulated fetch
    setTimeout(() => {
      setData([{ id: 1, name: "Item A" }, { id: 2, name: "Item B" }]);
      setLoading(false);
    }, 1000);
  }, [url]);

  return { data, loading, error };
}

// Custom hook: useToggle
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}

function App() {
  const [name, setName] = useLocalStorage("username", "");
  const [isOpen, toggle] = useToggle(false);
  const { data, loading } = useFetch("/api/items");

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <p>Hello, {name || "Guest"}!</p>
      <button onClick={toggle}>{isOpen ? "Tutup" : "Buka"}</button>
      {loading && <p>Loading...</p>}
      {data && data.map((item) => <p key={item.id}>{item.name}</p>)}
    </div>
  );
}

console.log("Custom hooks ready to use");
```

---

## Key Concepts

### Custom Hook
Function with the "use" prefix that can use other hooks.

### useLocalStorage
Reads initial from localStorage, syncs when value changes.

### useFetch
Returns { data, loading, error }. Reusable for different endpoints.

### When to Extract
- Logic used by 2+ components
- Too much logic in a component
- Want to test logic separately

---

## Experiments

- Build a useDebounce hook
- Build a useMediaQuery hook
- Build a usePrevious hook
- Build a useOnlineStatus hook

---

## Challenge

Build a useForm hook handling: values, errors, handleChange, handleSubmit, reset. Use in 2 different forms.


---

## Beginner Friendly Explanation

### Analogy: Own Kitchen Recipes
- **Copy-pasting `useState+useEffect` 10x = 10 photocopied recipes**: 1 wrong, all wrong.
- **Custom hook = own recipe**: write `useFetch()` 1x → 10 components use it. Rule: names MUST be `use...` (React recognizes!) + call at TOP level (never in if/loops!).

### Step 0 — Prepare Device
- Same as this track's W1 (see week 1 for install).

### How the Computer Reads It
- `function useProducts() { ... return { data } }` — a hook = a function using other hooks.

### 3 Must-Know Terms
- 1. **Custom hook/use**: recipe/use

## Summary

Week 8 of 12: **Custom Hooks & Patterns** (Level: Intermediate). Intermediate phase done! Next: **Advanced Patterns**.
