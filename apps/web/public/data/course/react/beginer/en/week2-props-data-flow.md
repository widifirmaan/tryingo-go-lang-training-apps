# Props & Data Flow — Envelope from Boss to Staff

> **Kategori:** React | **Level:** Beginner | **Minggu 2:** Props & Data Flow

## Learning Objectives

- Understand props: **data sent parent → child** (like task envelope)
- Destructuring `function Card({ name, price })` — open envelope directly
- Props are **read-only**: child cannot change, only read
- Send many types: string, number, boolean, array, object, even function
- Render list with `map()` and `key` (ID so React doesn't confuse)

---

## Why This Matters (Non-IT)

Last week `ProductCard` was hard-coded `<ProductCard name="Rice" />`. With 50 products, write 50 lines? **Props + `map()` = 1 line for 50 cards**. Boss (App) hands envelopes to 50 staff (Cards) at once.

Without props, duplication. With props, 1 component serves all.

---

## Program: Dynamic Catalog with Props

Parent `App` holds data, child `ProductCard` only displays.

```jsx
// ── src/App.jsx ──
function ProductCard({ name, price, inStock, tags }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, background: inStock ? "white" : "#FFF5F5" }}>
      <h3>{name}</h3>
      <p style={{ color: "#2E5B44", fontWeight: "bold" }}>Rp {price.toLocaleString("en-US")}</p>
      <span style={{ background: inStock ? "#E6F4EA" : "#FEE2E2", color: inStock ? "#137333" : "#C53030", padding: "4px 8px", borderRadius: 8, fontSize: 12 }}>
        {inStock ? "✅ In stock" : "❌ Out"}
      </span>
      <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tags.map((t) => <span key={t} style={{ background: "#EFECE6", padding: "2px 6px", borderRadius: 6, fontSize: 11 }}>{t}</span>)}
      </div>
    </div>
  );
}

function DiscountBadge({ percent }) {
  if (!percent) return null;
  return <span style={{ background: "#C53030", color: "white", padding: "4px 8px", borderRadius: 8 }}>Off {percent}%</span>;
}

export default function App() {
  const list = [
    { id: 1, name: "Rice 5kg", price: 62000, inStock: true, tags: ["Staple", "Basic"], discount: 10 },
    { id: 2, name: "Spinach", price: 5000, inStock: true, tags: ["Vegetable", "Fresh"] },
    { id: 3, name: "Eggs 1kg", price: 28000, inStock: false, tags: ["Protein"] },
  ];

  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, background: "#FBF9F5", minHeight: "100vh" }}>
      <h1>Shop Catalog — Props Demo</h1>
      <p style={{ color: "gray" }}>App sends props → ProductCard displays. Change array, cards auto follow.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {list.map((p) => (
          <div key={p.id} style={{ position: "relative" }}>
            <ProductCard name={p.name} price={p.price} inStock={p.inStock} tags={p.tags} />
            <div style={{ position: "absolute", top: 8, right: 8 }}><DiscountBadge percent={p.discount} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- `App` → `ProductCard` via `name={p.name}` (envelope)
- `tags.map(t => <span key={t}>)` — each tag needs unique `key`
- `p.id` as `key` in list — don't use index `i` if data can add/remove.

---

## Key Concepts

### Props = Read-Only Envelope
Parent writes, child reads. Child **cannot** `props.name = "new"` — React philosophy. To change, parent changes then re-sends (week 3 with state).

### Destructuring = Open Envelope Directly
`function Card({ name, price })` equals `function Card(props) { const name = props.name }` but shorter.

### One-Way Data Flow: Parent → Child
Like waterfall: from `App` to `ProductCard` to `DiscountBadge`. Child doesn't send back (except via function props, week 3).

### `key` = ID for List
When `map()`, React needs `key` to know which added/removed/moved. Use `id` from data. Don't use index `i` if order can change — inputs will swap.

---

## Beginner Friendly Explanation

### Analogy: Task Envelope

- **Parent `App` = shop boss**: writes 50 envelopes (name, price, stock) → gives to 50 staff.
- **Child `ProductCard` = staff**: receives 1 envelope, displays at shelf. Cannot scribble envelope.
- **`map()` = photocopier**: 1 card template photocopied 50x with different envelope contents.
- **`key` = staff ID**: without ID, boss confused who resigned.

### How the Computer Reads It

1. `list.map(p => <ProductCard key={p.id} name={p.name} ... />)` → loop 3x
2. Each loop: make props object `{ name: "Rice", price: 62000, ... }` → call `ProductCard(props)`
3. `ProductCard` returns JSX → React → HTML → 3 cards.

### 3 Must-Know Terms

1. **Props**: data parent→child.
2. **Destructuring**: open props directly `{ name, price }`.
3. **key**: unique ID for each `map()` item.

---

## Experiments

- **Green:** Add 2 products to `list` (coffee, sugar). New cards appear without new JSX.
- **Yellow:** Send new prop `unit="kg"` to `ProductCard` and show `Rp 62.000 / kg`.
- **Red:** Use `key={index}` then add delete-middle button (need state next week, try) — see swap bug.

---

## Challenge

**Pick one:**

**A. Full Catalog:** Add `FilterOptions` component that receives `category` and shows only that category (hardcode filter first, not yet interactive).

**B. Student List:** `StudentCard` receives `{ name, score, passed }` → green if passed, red if not. Render 10 via `map()`.

Done: 1 parent holds array, 1 child receives props via destructuring, and `map()` uses `key={id}` (not index).

---

## Mini Glossary

- **Props**: data envelope parent→child
- **Destructuring**: open envelope `{ name }`
- **key**: list ID so React not confused
- **map()**: loop to make many components from array

---

## Summary

Week 2 of 12: **Props & Data Flow** (Level: Beginner). You can now hand tasks via envelope (props) and photocopy cards (`map()`). Next week: **State & useState** — box that changes on click (counter, form).
