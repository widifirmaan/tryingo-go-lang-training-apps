# Performance — Shop Stays Fast

> **Kategori:** React | **Level:** Advanced | **Minggu 11:** Performance

## Learning Objectives

- `React.memo` skips re-render when props are equal, `useMemo` caches expensive calcs, `lazy` + `Suspense` lazy-loads

---

## Why This Matters (Non-IT)

A 1000-product list without `memo` → type 1 letter, 1000 cards re-render (gasping). With `memo` + `useMemo` + `lazy`, only changes. The difference shows on potato phones.

---

## Program

```jsx
import { memo, useMemo, lazy, Suspense } from "react";

const Card = memo(function Card({ name }){
  console.log("Render", name);
  return <div>{name}</div>;
});

function List({ list }){
  const total = useMemo(() => list.reduce((s,i)=>s+i.price,0), [list]);
  return <div>Total: {total}<Card name="Rice" /></div>;
}

const Heavy = lazy(() => import("./Heavy"));
export default function App(){
  return <Suspense fallback="Loading..."><Heavy /></Suspense>;
}
```


---

## Beginner Friendly Explanation

### Analogy: Energy-Saving Shop
- **1000 cards re-rendering per keystroke = 1000 waiters running per 1 coughing guest**: potato phones cry.
- **`memo` = chill waiter**: same props → silent. `useMemo` = expensive-calc cheat sheet. `lazy` = call waiters WHEN needed (not all standby)!

### Step 0 — Prepare Device
- Same as React W1: `npm run dev` on `5173` (+ `vitest` for W10).

### How the Computer Reads It
- `memo` wraps: same props → skip. `useMemo` remembers calcs. `lazy` downloads when needed.

### 3 Must-Know Terms
- 1. **memo/useMemo/lazy**: skip/remember/later

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 11: **Fast** — `memo`, `useMemo`, `lazy`.
