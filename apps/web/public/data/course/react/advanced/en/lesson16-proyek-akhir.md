# Final Project: Shopping Cart

> React | Global State & Advanced | Lesson 16

## Learning Objectives

- Build a complete app with all React concepts
- Combine reducer + context for global state
- Compute derived state (total, count)
- Organize code into clear components

---

## Program: Final Project: Shopping Cart

```jsx
import { createContext, useContext, useReducer, useState } from 'react';

const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000, category: 'Accessories' },
  { id: 2, name: '27-inch Monitor', price: 3200000, category: 'Displays' },
  { id: 3, name: 'USB-C Hub', price: 250000, category: 'Accessories' },
  { id: 4, name: 'Webcam 1080p', price: 450000, category: 'Accessories' },
  { id: 5, name: 'Ergonomic Chair', price: 1500000, category: 'Furniture' },
  { id: 6, name: 'Desk Lamp', price: 300000, category: 'Furniture' },
];

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state.some((i) => i.id === action.product.id)
        ? state.map((i) => (i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { ...action.product, qty: 1 }];
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

function Header({ cart, total, count }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #2E5B44', paddingBottom: '0.8rem', marginBottom: '1rem' }}>
      <h1 style={{ margin: 0 }}>Tryngo Store</h1>
      <span style={{ background: '#e7f5ee', color: '#2E5B44', borderRadius: 999, padding: '0.3rem 0.9rem', fontWeight: 'bold' }}>
        {count} items · Rp {total.toLocaleString('id-ID')}
      </span>
    </header>
  );
}

function ProductCard({ product, add }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <h3 style={{ margin: 0 }}>{product.name}</h3>
      <p style={{ margin: 0, color: '#666' }}>{product.category}</p>
      <p style={{ margin: 0 }}><strong>Rp {product.price.toLocaleString('id-ID')}</strong></p>
      <button onClick={() => add(product)} style={{ background: '#2E5B44', color: '#fff', border: 'none' }}>Add to Cart</button>
    </div>
  );
}

function CartList({ cart, remove, clear }) {
  if (cart.length === 0) return <p>Cart is empty — add products from the grid.</p>;
  return (
    <div>
      <h2>Your Cart</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((i) => (
          <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '0.4rem 0' }}>
            <span>{i.name} x{i.qty}</span>
            <button onClick={() => remove(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clear}>Clear cart</button>
    </div>
  );
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <div>
        <Header cart={cart} total={total} count={count} />
        <h2>Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.8rem', marginBottom: '1.5rem' }}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} add={(product) => dispatch({ type: 'add', product })} />
          ))}
        </div>
        <CartList cart={cart} remove={(id) => dispatch({ type: 'remove', id })} clear={() => dispatch({ type: 'clear' })} />
        {checkoutDone && <p style={{ color: '#2E5B44', fontWeight: 'bold' }}>Order placed — thank you!</p>}
        {cart.length > 0 && (
          <button style={{ background: '#2E5B44', color: '#fff', border: 'none' }} onClick={() => { dispatch({ type: 'clear' }); setCheckoutDone(true); }}>
            Checkout (Rp {total.toLocaleString('id-ID')})
          </button>
        )}
      </div>
    </CartContext.Provider>
  );
}

```

---

## Explanation

## What This Project Proves
This project proves the whole curriculum: components + props, lists/keys, state, controlled inputs, lifting, useEffect/fetch, and now reducer + context. Capstone-style projects like this are the standard closer for every bootcamp (Udacity, Odin, Meta).

## Architecture
CartContext (context) + cartReducer (useReducer) = a common production pattern: centralized global state, pure testable transitions, any component reads via useContext. Header and CartList stay separate from data.

## Derived State
`total` and `count` are computed each render from cart — not stored. Single source of truth: cart. The UI is always consistent.

## Next Steps
Extend this project with: React Router (product + checkout pages), React Query/TanStack for server state, Tailwind + a component library, then deploy to Vercel/Netlify. That is the standard industry career map (roadmap.sh).

---

## Experiments

1. **Yang Diuji di Project Ini**
2. **Arsitektur**
3. **Derived State**
4. **Langkah Berikutnya**

---

## Challenge

Polish the project: (1) add React Router: /products, /cart, /checkout with an address form; (2) persist the cart to localStorage via useEffect so it survives refresh; (3) show an "added" notification when clicking Add to Cart; (4) deploy the result.

---

## Summary

Capstone done: reducer + context + derived state in one app. Next: routing, server state (React Query), styling, deployment — the standard React career path.
