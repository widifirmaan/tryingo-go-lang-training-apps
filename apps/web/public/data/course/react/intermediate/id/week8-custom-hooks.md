# Custom Hooks & Patterns

> **Kategori:** React | **Level:** Menengah | **Minggu 8:** Custom Hooks & Patterns

## Tujuan Pembelajaran

- Membuat custom hook dengan prefix "use"
- useLocalStorage: persist state ke localStorage
- useFetch: reusable data fetching logic
- useToggle: reusable toggle logic
- Kapan extract logic ke custom hook vs inline

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

## Konsep Kunci

### Custom Hook
Function dengan prefix "use" yang bisa pakai hooks lain.

### useLocalStorage
Baca initial dari localStorage, sync saat value berubah.

### useFetch
Return { data, loading, error }. Reusable untuk endpoint berbeda.

### Kapan Extract
- Logic dipakai 2+ komponen
- Terlalu banyak logic di component
- Ingin test logic terpisah

---

## Eksperimen

- Buat useDebounce hook
- Buat useMediaQuery hook
- Buat usePrevious hook
- Buat useOnlineStatus hook

---

## Tantangan

Buat useForm hook yang handle: values, errors, handleChange, handleSubmit, reset. Gunakan di 2 form berbeda.

---

## Ringkasan

Minggu 8 dari 12: **Custom Hooks & Patterns** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Advanced Patterns**.
