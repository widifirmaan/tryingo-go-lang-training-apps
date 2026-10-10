# useEffect & Lifecycle

> **Kategori:** React | **Level:** Pemula | **Minggu 4:** useEffect & Lifecycle

## Tujuan Pembelajaran

- useEffect untuk side effects: fetch, subscribe, timer
- Dependency array: [] = sekali mount, [dep] = saat dep berubah
- Cleanup function: return () => { ... } untuk unsubscribe
- Loading state pattern: tampilkan loading saat fetch data
- Mengapa fetch di useEffect, bukan langsung di body component

---

## Program: Fetch Data & Timer

```jsx
// useEffect = side effects: fetch data, subscribe, timer, DOM manipulation
// Dependency array: [] = mount only, [dep] = when dep changes

import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id); // cleanup
  }, []);

  return <p>Waktu: {seconds} detik</p>;
}

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch data
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Budi" },
        { id: 2, name: "Siti" },
        { id: 3, name: "Andi" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p>Memuat...</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div>
      <Timer />
      <UserList />
    </div>
  );
}

console.log("Timer & UserList siap digunakan");
```

---

## Konsep Kunci

### useEffect
Jalankan side effect setelah render. Dependency array kontrol kapan jalan.

### Dependency Array
- [] = sekali saat mount
- [count] = saat count berubah
- Tidak ada = setiap render

### Cleanup
Return function untuk cleanup: unsubscribe, clear timer.

### Fetch Pattern
Set loading true → fetch → set data → set loading false.

---

## Eksperimen

- Buat efek yang jalan saat prop berubah
- Buat fetch dengan error handling
- Implementasikan debounce search input
- Buat efek cleanup yang berbeda

---

## Tantangan

Buat aplikasi cuaca: fetch data dari API (simulasi), tampilkan loading/error, auto-refresh setiap 30 detik.

---

## Ringkasan

Minggu 4 dari 12: **useEffect & Lifecycle** (Level: Pemula). Selesai fase Beginner! Minggu depan: **React Router**.
