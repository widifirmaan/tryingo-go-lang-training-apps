# JSX & Basic Components — LEGO Bricks

> **Kategori:** React | **Level:** Beginner | **Minggu 1:** JSX & Komponen Dasar

## Learning Objectives

- Understand JSX: writing HTML inside JavaScript
- Create first component — function returning JSX, capitalized name
- Use `{}` to embed JavaScript inside HTML
- JSX rules: 1 wrapper or Fragment `<>`, close all tags, `className` not `class`
- Run first React project with Vite (`npm create vite@latest`)

---

## Why This Matters (Non-IT)

Shops, schools, small businesses need neat reusable pages. React = **LEGO system**: build 1 `ProductCard` brick, reuse 100x with different content. No 100x copy-paste.

This week you will **own a real React site** on your laptop, not just `console.log`.

---

## Program: Shop Catalog with Components

One `ProductCard` template reused 3x from `App`.

```jsx
// ── src/App.jsx ──
function ProductCard({ name, price }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, background: "white" }}>
      <h3>{name}</h3>
      <p style={{ color: "#2E5B44", fontWeight: "bold" }}>Rp {price.toLocaleString("en-US")}</p>
      <span style={{ background: "#EFECE6", padding: "4px 8px", borderRadius: 8 }}>In stock</span>
    </div>
  );
}

function Greeting() {
  const name = "Siti";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return (
    <div style={{ background: "#2E5B44", color: "white", padding: 16, borderRadius: 12, marginBottom: 16 }}>
      <h1>{greeting}, {name}! 👋</h1>
      <p>Status: {hour < 18 ? "Open" : "Closed"}</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, background: "#FBF9F5", minHeight: "100vh" }}>
      <Greeting />
      <h2>Today's Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        <ProductCard name="Rice 5kg" price={62000} />
        <ProductCard name="Spinach" price={5000} />
        <ProductCard name="Eggs 1kg" price={28000} />
      </div>
    </div>
  );
}
```

---

## Key Concepts

### JSX = HTML Inside JavaScript
Logic & view together (function). JSX looks like HTML but compiles to JS. Embed variables: `<p>{name}</p>`.

### Component = Function Returning JSX
- Capitalized (`ProductCard`) to distinguish from HTML.
- Reusable: `<ProductCard />` 3x = 3 cards.

### JSX Rules (3)
1. **1 wrapper**: `<div><h1/><p/></div>` or `<> <h1/><p/> </>` (Fragment)
2. **Close tags**: `<img />`, `<br />` need `/`.
3. **camelCase**: `class` → `className`, `for` → `htmlFor`.

### Braces `{}` = Door to JavaScript
Inside JSX, `{}` opens JS: `{name}`, `{price * 1.1}`, `{isOpen ? "Open" : "Closed"}`, `{products.map(p => <li>{p.name}</li>)}`.

---

## Beginner Friendly Explanation

### Analogy: LEGO

- **Component = LEGO brick**: 1 door brick used in 10 houses. `ProductCard` = card brick.
- **`App` = house blueprint**: arrange bricks into house. `App` arranges `Greeting` + 3 `ProductCard`.
- **Props (next week) = stickers on bricks**: same brick, different stickers.

### Steps 0-3 — Create React Project (5 min)

**0. Node.js & VS Code** (skip if done for Next.js): `nodejs.org` LTS, `code.visualstudio.com`.

**1. Create Vite project:**
```
npm create vite@latest my-shop -- --template react
cd my-shop
npm install
npm run dev
```
Pick `React` → `JavaScript`. Then `npm run dev` shows `Local: http://localhost:5173`.

**2. Open browser:** `http://localhost:5173` → spinning React logo. Power on.

**3. Replace content:**
- Open `my-shop` in VS Code
- Open `src/App.jsx` → delete all, paste Program above
- Save → browser auto-reloads, see shop catalog!

### How the Computer Reads It

1. `npm run dev` → Vite starts local server (5173).
2. Browser asks `/` → Vite sends `App.jsx` → React turns JSX to real HTML.
3. Change `price={62000}` to `70000` → Vite detects change → hot reload.

### 3 Must-Know Terms

1. **Component**: function returning view (JSX).
2. **JSX**: HTML inside JS, use `{}` for data.
3. **Fragment `<>`**: wrapper without extra div.

---

## Experiments

- **Green:** Change `name="Rice 5kg"` to your shop name, change price.
- **Yellow:** Create new `StockBadge({ inStock })` returning `"In stock"` / `"Out"` with ternary.
- **Red:** Write `class="card"` (not `className`), see React warning. Fix it.

---

## Challenge

**Pick one:**

**A. Full Shop Catalog:** Add `Header` (title + hours) and `Footer` (WA). Arrange in `App`: `Header` → `Greeting` → 6 `ProductCard` → `Footer`.

**B. Teacher Profile:** `Avatar` (round photo), `TeacherInfo` (name/subject), `ScheduleList` (map array days). Render in `App`.

Done when `npm run dev` no error, and 1 component reused ≥3x with different data.

---

## Mini Glossary

- **JSX**: HTML-like syntax in JS
- **Component**: UI-building function
- **Fragment**: transparent wrapper `<>`
- **Vite**: super-fast React project builder
- **HMR**: auto reload without manual refresh

---

## Summary

Week 1 of 12: **JSX & Basic Components** (Level: Beginner). You learned React LEGO: 1 brick (`ProductCard`) → use 3x. Next week: **Props & Data Flow** — passing data parent → child (like envelope from boss to staff).
