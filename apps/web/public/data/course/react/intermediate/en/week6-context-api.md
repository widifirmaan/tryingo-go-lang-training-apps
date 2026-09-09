# Context API — Shared Shop Warehouse

> **Kategori:** React | **Level:** Intermediate | **Minggu 6:** Context API & useReducer
> **Prerequisites:** Week 5 — **React Router**.

## Learning Objectives

- `createContext` + `Provider` = shared warehouse, `useContext` takes — no 5-level `props`
- `useReducer` for complex carts (add/remove/clear)

---

## Why This Matters (Non-IT)

A shop with 10 components needing `cart` — passing via 5-level props = exhausting relay. Context = **warehouse in the middle**, everyone takes directly.

---

## Program: Cart Warehouse

```jsx
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

function cartReducer(state, action){
  if(action.type === "add") return [...state, action.item];
  if(action.type === "remove") return state.filter(i => i.id !== action.id);
  if(action.type === "clear") return [];
  return state;
}

function CartProvider({ children }){
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function Product(){
  const { dispatch } = useContext(CartContext);
  return <button onClick={() => dispatch({ type: "add", item: { id: Date.now(), name: "Rice" } })}>Add Rice</button>;
}

function Show(){
  const { cart } = useContext(CartContext);
  return <p>Items: {cart.length} | {cart.map(i=>i.name).join(", ")}</p>;
}

export default function App(){
  return <CartProvider><Product /><Show /></CartProvider>;
}
```

---

## Key Concepts

### `createContext` + `Provider` = Warehouse
Wrap `App` with `Provider value={{ cart, dispatch }}`, all children `useContext` take without props.

### `useReducer` = Rule Cashier
`dispatch({type:"add"})` → `reducer` decides how to change.

---

## Beginner Friendly Explanation

### Analogy: Central Warehouse
- **Props drilling = relay race** passing the box 5 runners. **Context = central warehouse**, everyone picks up directly.

### Step 0 — Prepare Device
- Vite React project, paste program, add from `Product`, watch `Show` update.

### How the Computer Reads It
1. `dispatch({type:"add"})` → `cartReducer(state, action)` → new array.
2. New array → all `useContext` consumers re-render.

### 3 Must-Know Terms
1. **Context/Provider/dispatch**: warehouse/door/order

---

## Experiments

- **Green:** Add 3 items → `Show` lists all?
- **Yellow:** `dispatch({type:"clear"})` → cart empties?
- **Red:** `useContext` outside `Provider` → `undefined` crash? Wrap it.

---

## Challenge

**Warehouse Cart:** `add` + `remove` by id + `clear` + count + total price via `useReducer` + 2 components sharing.
- **Link-up (Week 5 — React Router):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Context/reducer**: warehouse/cashier

---

## Summary

Week 6: **Shared Warehouse** — Context without relay. Next: **Forms**.
