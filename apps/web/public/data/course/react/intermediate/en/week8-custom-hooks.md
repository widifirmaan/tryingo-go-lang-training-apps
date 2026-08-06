# Custom Hooks & Patterns

> **Kategori:** React | **Level:** Intermediate | **Minggu 8:** Custom Hooks & Patterns

## Learning Objectives

- Create custom hooks with "use" prefix
- useLocalStorage: persist state to localStorage
- useFetch: reusable data fetching logic
- useToggle: reusable toggle logic
- When to extract logic to custom hook vs inline

---

## Program: useFetch & useLocalStorage

```jsx
// Custom hooks = extract reusable logic ke function sendiri
// Convention: prefix "use" (React convention)

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
    // Simulasi fetch
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
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama" />
      <p>Halo, {name || "Guest"}!</p>
      <button onClick={toggle}>{isOpen ? "Tutup" : "Buka"}</button>
      {loading && <p>Loading...</p>}
      {data && data.map((item) => <p key={item.id}>{item.name}</p>)}
    </div>
  );
}

console.log("Custom hooks siap digunakan");
```

---

## Key Concepts

### Custom Hook
Function with "use" prefix using other hooks.

### useLocalStorage
Read initial from localStorage, sync on change.

### useFetch
Return { data, loading, error }.

### When Extract
- Logic used in 2+ components
- Too much logic in component
- Want to test logic separately

---

## Experiments

- Create useDebounce hook
- Create useMediaQuery hook
- Create usePrevious hook
- Create useOnlineStatus hook

---

## Challenge

Build useForm hook handling: values, errors, handleChange, handleSubmit, reset. Use in 2 different forms.

---

## Summary

Week 8 of 12: **Custom Hooks & Patterns** (Level: Intermediate). Intermediate phase complete! Next week: **Advanced Patterns**.
