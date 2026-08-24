# useEffect & Lifecycle — Auto Alarm & Fetch

> **Kategori:** React | **Level:** Beginner | **Minggu 4:** useEffect & Lifecycle

## Learning Objectives

- Understand `useEffect`: **code running after render** — for fetch, timer, subscribe
- Dependency array: `[]` = once on open, `[value]` = when value changes, no array = every render
- Cleanup: `return () => clearInterval(id)` — turn off alarm when leaving (prevent leak)
- Loading pattern: `loading true → fetch → loading false`
- Why not fetch directly in component body (would loop)

---

## Why This Matters (Non-IT)

Shop opens at 7 — **alarm must ring on time**, product list must appear when shop opens, not when customer asks and you panic. `useEffect` = **alarm & auto assistant**: fetch when page opens, update tab title, run timer, clean up when closing.

Without it, fetch in body → every re-render fetches again → infinite loop, quota gone.

---

## Program: Timer & User List (Fetch Simulation)

```jsx
import { useState, useEffect } from "react";

function ShopClock() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
      <h3>⏰ Shop Clock: {seconds}s since open</h3>
      <button onClick={() => setRunning(!running)}>{running ? "Pause" : "Play"}</button>
      <button onClick={() => setSeconds(0)} style={{ marginLeft: 8 }}>Reset</button>
      <p style={{ color: "gray", fontSize: 12 }}>useEffect with [running] → interval created/removed on toggle</p>
    </div>
  );
}

function CustomerList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setData([
        { id: 1, name: "Budi Santoso" },
        { id: 2, name: "Siti Aminah" },
        { id: 3, name: "Andi Wijaya" },
        { id: 4, name: "Dewi Lestari" },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  const results = data.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
  if (loading) return <p>⏳ Loading customers...</p>;

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
      <h3>Customers ({results.length})</h3>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name..." style={{ padding: 8, width: "100%", maxWidth: 300, border: "1px solid #ccc", borderRadius: 8 }} />
      <ul>{results.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
      {results.length === 0 && <p style={{ color: "red" }}>No results</p>}
    </div>
  );
}

export default function App() {
  const [showClock, setShowClock] = useState(true);
  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, background: "#FBF9F5", minHeight: "100vh", display: "grid", gap: 16 }}>
      <h1>Shop — useEffect Demo</h1>
      <button onClick={() => setShowClock(!showClock)}>{showClock ? "Hide Clock" : "Show Clock"}</button>
      {showClock && <ShopClock />}
      <CustomerList />
    </div>
  );
}
```

- `useEffect(() => { fetch }, [])` → once
- `useEffect(() => { timer }, [running])` → when `running` changes
- `return () => clearInterval(id)` → clean before next effect or unmount.

---

## Key Concepts

### `useEffect` = After Render, Do This
`useEffect(() => { ... }, [dep])` — React renders first, then runs effect. For **outside React**: API, timer, `document.title`, `localStorage`.

### Dependency Array = Trigger List
- `[]` → **once** on mount (open shop).
- `[query]` → **when `query` changes**.
- **no array** → **every render** (rare, danger loop).

### Cleanup = Turn Off Before Leaving
`return () => clearInterval(id)` → called before next effect or unmount. Without, timer runs behind → leak.

### Fetch Pattern
```js
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  fetch(url).then(r => r.json()).then(d => { setData(d); setLoading(false); });
}, []);
if (loading) return <p>Loading...</p>;
```

---

## Beginner Friendly Explanation

### Analogy: Alarm & Shop Opening

- **`useEffect([], ...)` = open shop at 7**: alarm set once on open, not per customer.
- **`useEffect([running], ...)` = light switch**: light on/off when `running` switch flipped.
- **Cleanup = turn off stove when leaving**: forget → stove on overnight → danger (memory leak).

### How the Computer Reads It

1. Render `CustomerList` first → `loading=true`
2. After render, `useEffect` runs → `setTimeout` 1s → `setData([...])` + `setLoading(false)` → re-render → show list.
3. User types `query` → `setQuery` → re-render, **effect not re-run** (because `[]`), only filter updates.

If fetch placed directly in body:
```
function App() { fetch(...).then(setData) } // every render fetches → setData → render → fetch → loop!
```

### 3 Must-Know Terms

1. **Side effect**: work outside React (API, timer).
2. **Dependency array**: list watched, if changes effect re-runs.
3. **Cleanup**: clean-up before next effect.

### Common Mistakes

- Forget `[]` → fetch every render → infinite loop, hang.
- Forget `clearInterval` → timer runs after component gone → `setSeconds` error.
- Write `useEffect(async () => { await fetch })` → effect cannot be async directly. Use `useEffect(() => { async function load(){...}; load(); }, [])`.

---

## Experiments

- **Green:** Change `1000` interval to `500` → clock faster. Change `setTimeout` 1s to 2s → longer loading.
- **Yellow:** In `CustomerList`, add `useEffect(() => { document.title = `Customers: ${results.length}` }, [results.length])` → tab title changes on filter.
- **Red:** Remove `return () => clearInterval(id)` then click `Hide Clock` → open console → warning? Timer still runs behind. Put back.

---

## Challenge

**Pick one:**

**A. Auto Search (Debounce):** Input that fetches simulation only after user stops typing 500ms. Use `useEffect` with `setTimeout` and cleanup `clearTimeout`.

**B. Digital Clock + Auto Fetch:** Show `new Date().toLocaleTimeString()` updating every second, and product list fetched once on mount. 2 different effects: 1 for clock, 1 for data `[]`.

Done: 1 effect with `[]`, 1 effect with `[value]`, and 1 correct cleanup.

---

## Mini Glossary

- **useEffect**: hook for side effect after render
- **Dependency array**: trigger for when effect runs
- **Cleanup**: function to turn off old effect
- **Lifecycle**: mount (born) → update (change) → unmount (gone)

---

## Summary

Week 4 of 12: **useEffect & Lifecycle** (Level: Beginner). You set auto alarm (fetch once) and timer that can be turned off. **Beginner React phase done!** Next: **React Router / Next.js routing & data fetching** — move pages without reload.
