# Loading & Error — Skeletons and Alarms

> **Kategori:** Next.js | **Level:** Intermediate | **Minggu 7:** Loading & Error UI
> **Prerequisites:** Week 6 — **Server Actions**.

## Learning Objectives

- `loading.js` skeleton while `await fetch`, `error.js` alarm on `throw`, `not-found.js` 404
- `error.js` must be `"use client"` because it needs the `reset()` retry button

---

## Why This Matters (Non-IT)

Without `loading.js`, white screen for 2 seconds. With a skeleton, customers see "loading" — they don't leave. Without `error.js`, dead API → white screen.

---

## Program: Skeletons & Alarms

```jsx
// app/products/loading.js — skeleton
export default function Loading() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ height: 20, background: "#eee", borderRadius: 8 }} />
      <div style={{ height: 20, background: "#eee", borderRadius: 8 }} />
    </div>
  );
}

// app/products/error.js — alarm (must be "use client")
"use client";
export default function Error({ error, reset }) {
  return (
    <div style={{ border: "1px solid red", padding: 16 }}>
      <p>❌ Failed: {error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}

// app/products/not-found.js — 404
export default function NotFound() {
  return <p>Product missing — <a href="/products">back</a></p>;
}

// In page.js: if (!product) notFound();
```

---

## Key Concepts

### `loading.js` = Skeleton
Next.js wraps `page.js` with automatic `Suspense` → shows `loading.js` during `await`.

### `error.js` = Alarm
Catches `throw` in `page.js` or failed `fetch`. Must be `use client` since `reset()` is interactive.

---

## Beginner Friendly Explanation

### Analogy: Shop Under Renovation
- **`loading.js` = "renovation" curtain** (customers wait patiently), **`error.js` = fire alarm + reset button**.

### Step 0 — Prepare Device
- Next.js project, throttle network to Slow 3G, watch skeleton → content.

### How the Computer Reads It
1. `await fetch` slow → `loading.js` shows automatically.
2. `throw` → nearest `error.js` renders with `reset()`.

### 3 Must-Know Terms
1. **loading/error/not-found**: curtain/alarm/404

---

## Experiments

- **Green:** Slow 3G → skeleton visible?
- **Yellow:** `throw new Error("x")` in page → `error.js` shows + retry works?
- **Red:** `error.js` without `"use client"` → build error? Add directive.

---

## Challenge

**Resilient Page:** `loading.js` + `error.js` with retry + `not-found.js` + test each state (slow/fail/missing).
- **Link-up (Week 6 — Server Actions):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **loading/error**: curtain/alarm

---

## Summary

Week 7: **Skeletons & Alarms** — loading & error. Next: **Middleware**.
