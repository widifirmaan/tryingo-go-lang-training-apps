# State & useState — Box That Changes on Click

> **Kategori:** React | **Level:** Beginner | **Minggu 3:** State & useState

## Learning Objectives

- Understand state: **internal data that can change** (like number on cashier screen)
- `useState` → `const [value, setValue] = useState(0)` — value + changer
- State triggers re-render: call `setValue`, React redraws automatically
- Controlled component: input locked to state (`value` + `onChange`)
- Events: `onClick`, `onChange`, `onSubmit` + `e.preventDefault()`

---

## Why This Matters (Non-IT)

Last week catalog was poster only. Customer couldn't type search, add to cart. **State = component memory**. Without state, `+` doesn't add. With `useState`, click = number changes, type = list filters.

This makes site **alive**, not poster.

---

## Program: Cart & Form

Counter, form, simple cart — all with `useState`.

```jsx
// ── src/App.jsx ──
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12, textAlign: "center" }}>
      <h3>Count: {count} sacks</h3>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button onClick={() => setCount(count - 1)} disabled={count <= 0}>−</button>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      <p style={{ color: "gray", fontSize: 12 }}>Click + → setCount(count+1) → React re-renders → number up</p>
    </div>
  );
}

function CustomerForm() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setList([...list, { id: Date.now(), name: name.trim() }]);
    setName("");
  }
  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
      <h3>Shop Customers</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer name" style={{ flex: 1, padding: 8, border: "1px solid #ccc", borderRadius: 8 }} />
        <button type="submit">Add</button>
      </form>
      <ul>{list.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
      {list.length === 0 && <p style={{ color: "gray" }}>No customers yet</p>}
    </div>
  );
}

function Cart() {
  const [cart, setCart] = useState([
    { id: 1, name: "Rice", price: 62000, qty: 1 },
    { id: 2, name: "Spinach", price: 5000, qty: 2 },
  ]);
  function add(id) { setCart(cart.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item)); }
  function remove(id) { setCart(cart.filter((item) => item.id !== id)); }
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
      <h3>Cart</h3>
      {cart.map((item) => (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span>{item.name} x{item.qty}</span>
          <span>Rp {(item.price * item.qty).toLocaleString("en-US")}</span>
          <span style={{ display: "flex", gap: 4 }}><button onClick={() => add(item.id)}>+</button><button onClick={() => remove(item.id)}>Remove</button></span>
        </div>
      ))}
      <hr />
      <p style={{ fontWeight: "bold" }}>Total: Rp {total.toLocaleString("en-US")}</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, background: "#FBF9F5", minHeight: "100vh", display: "grid", gap: 16 }}>
      <h1>Shop — State Demo</h1>
      <Counter />
      <CustomerForm />
      <Cart />
    </div>
  );
}
```

- `useState(0)` → `[count, setCount]`
- Input: `value={name}` + `onChange={e => setName(e.target.value)}` — **controlled**.
- Array: don't `list.push()`! Use `setList([...list, new])` or `filter/map` returning new array.

---

## Key Concepts

### `useState` = Component Memory
`const [value, setValue] = useState(0)` → `value` = display, `setValue` = remote. Initial `0`.

### Re-render = Auto Redraw
Call `setCount(5)` → React remembers new value → calls component again → shows `5`.

### Controlled Input
`<input value={name} onChange={e => setName(e.target.value)} />` — input value **always** equals state.

### Don't Mutate Directly
- ❌ `cart.push(item)` → React not aware → no re-render.
- ✅ `setCart([...cart, item])` → new array → re-render.

---

## Beginner Friendly Explanation

### Analogy: Cashier Screen

- **State = number on cashier screen**: starts `0`, cashier presses `+` → screen `1`.
- **`useState` = magic box**: you put `0`, it gives 2 things: `count` (screen) + `setCount` (button).
- **Re-render = cashier reprints receipt**: each number change, receipt reprinted automatically.
- **Controlled input = locked notebook**: you don't write directly, tell secretary (`setName`) → secretary writes → you see `value`.

### How the Computer Reads It

1. Click `+` → `onClick={() => setCount(count+1)}` → `setCount(1)`
2. React: "state changed 0→1, schedule re-render"
3. React calls `Counter()` again, `count` now `1` → return `<h3>Count: 1</h3>` → browser updates.

### 3 Must-Know Terms

1. **State**: changeable data in component.
2. **setState**: only way to change state (not `state = new`).
3. **Controlled component**: input whose value comes from state.

---

## Experiments

- **Green:** Make `−` DISABLED when `count <= 0` (already `disabled={count <=0}`).
- **Yellow:** In `CustomerForm`, add second input `phone`, save as `{ name, phone }` array.
- **Red:** Try `cart.push({name:"Coffee"})` then `setCart(cart)` → list not update. Change to `setCart([...cart, {name:"Coffee"}])` → updates.

---

## Challenge

**Pick one:**

**A. Daily Todo:** Input + Add, each todo can `Remove` and `Done` (strike). State `todos = [{id, text, done}]`. Show `Remaining: 3`.

**B. Delivery Calculator:** Inputs `weight` (kg) and `distance` (km), state `cost = weight*1000 + distance*2000` auto shows on type (no button).

Done: ≥2 `useState`, 1 controlled input, and array update via spread/filter (not push).

---

## Mini Glossary

- **State**: changeable component memory
- **useState**: hook to create state
- **Re-render**: React redraws when state changes
- **Controlled input**: input controlled by state
- **onClick/onChange**: click/type events

---

## Summary

Week 3 of 12: **State & useState** (Level: Beginner). You made magic box changing on click/type. Next week: **useEffect & Lifecycle** — automatic alarm, fetch on open, cleanup timer on leave.
