# useReducer & Custom Hooks

> React | Global State & Advanced | Lesson 14

## Learning Objectives

- Understand useReducer for complex state
- Write pure reducers with action types
- Create custom hooks to wrap logic
- Combine reducers + derived state

---

## Program: useReducer & Custom Hooks

```jsx
import { useReducer } from 'react';

const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000 },
  { id: 2, name: '27-inch Monitor', price: 3200000 },
  { id: 3, name: 'USB-C Hub', price: 250000 },
];

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const item = state.find((i) => i.id === action.product.id);
      return item
        ? state.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { ...action.product, qty: 1 }];
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  return { cart, total, count, add: (p) => dispatch({ type: 'add', product: p }), remove: (id) => dispatch({ type: 'remove', id }), clear: () => dispatch({ type: 'clear' }) };
}

export default function App() {
  const { cart, total, count, add, remove, clear } = useCart();

  return (
    <div>
      <h1>useReducer & Custom Hooks</h1>

      <h2>Products</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
            <span>{p.name} — Rp {p.price.toLocaleString('id-ID')}</span>
            <button onClick={() => add(p)}>Add</button>
          </li>
        ))}
      </ul>

      <h2>Cart ({count} items)</h2>
      {cart.length === 0 && <p>Cart is empty.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((i) => (
          <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0' }}>
            <span>{i.name} x{i.qty}</span>
            <button onClick={() => remove(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p><strong>Total: Rp {total.toLocaleString('id-ID')}</strong></p>
      {cart.length > 0 && <button onClick={clear}>Clear cart</button>}
    </div>
  );
}

```

---

## Explanation

## useReducer
For state with many related transitions (add/update/remove), useReducer centralizes update logic in one pure function: `(state, action) => newState`. Actions are descriptive objects: `{ type: 'add', product }`.

## Pure Reducers
Reducers must be pure: output depends only on (state, action), no side effects. This makes transitions easy to test and predict — the reason Redux/Zustand use this pattern under the hood.

## Custom Hooks
`useCart` wraps the reducer + derived state (total, count) + actions (add, remove, clear) into one clean API. Components use `const { cart, total, add } = useCart()` — logic is tested separately, components stay clean.

## Reducer vs useState
Simple transitions (one setter) -> useState. Many related transitions or complex object state -> useReducer. Both needed -> reducer inside context (final pattern in the next project).

---

## Experiments

1. **useReducer**
2. **Reducer Murni**
3. **Custom Hooks**
4. **Kapan Reducer vs useState**

---

## Challenge

Refactor: move useCart into a CartContext (Provider + useContext) so the Header (item count badge) and other pages can read the cart. Add +/- quantity buttons per cart item (inc/dec actions).

---

## Summary

useReducer centralizes state transitions, custom hooks wrap logic into clean APIs. Next: testing & performance.
