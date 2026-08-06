# Capstone: E-Commerce App

> **Kategori:** React | **Level:** Advanced | **Minggu 12:** Capstone: E-Commerce App

## Learning Objectives

- Combine routing, context, reducer, hooks in one project
- E-commerce domain: product list, cart, checkout flow
- State management: useReducer + Context for cart
- Performance: useMemo for total calculation
- Component composition: reusable ProductCard, Cart

---

## Program: Online Store

```jsx
// Capstone: E-Commerce App
// Menggabungkan semua konsep: routing, context, hooks, performance

import { useState, useReducer, createContext, useContext, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// ── Types ──
// Product: { id, name, price, image, category }
// CartItem: { product, quantity }

// ── Cart Context ──
const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.product.id === action.payload.id);
      if (existing) {
        return state.map((i) =>
          i.product.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { product: action.payload, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.product.id !== action.payload);
    case "TOTAL":
      return state.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );
  return (
    <CartContext.Provider value={{ items, dispatch, total }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

// ── Components ──
function ProductCard({ product }) {
  const { dispatch } = useCart();
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Rp {product.price.toLocaleString("id-ID")}</p>
      <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
        Tambah ke Keranjang
      </button>
    </div>
  );
}

function Cart() {
  const { items, dispatch, total } = useCart();
  return (
    <div>
      <h2>Keranjang ({items.length})</h2>
      {items.map((item) => (
        <div key={item.product.id}>
          <span>{item.product.name} x{item.quantity}</span>
          <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.product.id })}>
            Hapus
          </button>
        </div>
      ))}
      <p>Total: Rp {total.toLocaleString("id-ID")}</p>
    </div>
  );
}

function Home() {
  const products = [
    { id: 1, name: "Laptop", price: 15000000, category: "Elektronik" },
    { id: 2, name: "Buku", price: 85000, category: "Edukasi" },
    { id: 3, name: "Mouse", price: 250000, category: "Elektronik" },
  ];
  return (
    <div>
      <h1>Tryngo Store</h1>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <nav>
          <Link to="/">Beranda</Link>
          <Link to="/cart">Keranjang</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

console.log("E-Commerce App siap digunakan!");
```

---

## Key Concepts

### Architecture
Routing → Context → Reducer → Components.

### Cart Flow
Add item → update reducer → total auto-updates.

### Component Design
Reusable ProductCard, Cart consumes context.

### Best Practices
Separation of concerns, reusable components, performance.

---

## Experiments

- Add checkout page
- Implement wishlist
- Add filter and search
- Build test suite for cart reducer

---

## Challenge

Build a complete e-commerce app: product catalog, cart, checkout, order history. Use all React concepts learned.

---

## Summary

Week 12 of 12: **Capstone: E-Commerce App** (Level: Advanced). Complete! 🎉 You've mastered React from scratch to production-ready.
