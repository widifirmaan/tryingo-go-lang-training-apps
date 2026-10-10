# useEffect & Lifecycle

> **Kategori:** React | **Level:** Beginner | **Minggu 4:** useEffect & Lifecycle

## Learning Objectives

- useEffect for side effects: fetch, subscribe, timers
- Dependency array: [] = mount once, [dep] = when dep changes
- Cleanup function: return () => { ... } for unsubscription
- Loading state pattern: show loading while fetching data
- Why fetch in useEffect, not directly in component body

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

## Key Concepts

### useEffect
Run side effects after render.

### Dependency Array
Controls when effect runs.

### Cleanup
Return cleanup function.

### Fetch Pattern
Loading → fetch → set data → done.

---

## Experiments

- Create effect that runs when prop changes
- Create fetch with error handling
- Implement debounce search input
- Create different cleanup effects

---

## Challenge

Build a weather app: fetch data from API (simulated), show loading/error, auto-refresh every 30 seconds.

---

## Summary

Week 4 of 12: **useEffect & Lifecycle** (Level: Beginner). Beginner phase complete! Next week: **React Router**.
