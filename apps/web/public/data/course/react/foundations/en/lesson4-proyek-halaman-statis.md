# Project: Static Product Page

> React | Foundations | Lesson 4

## Learning Objectives

- Build a complete page from small components
- Separate data from presentation
- Apply header/grid/footer composition
- Render a product grid from a data array

---

## Program: Project: Static Product Page

```jsx
const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000, category: 'Accessories' },
  { id: 2, name: '27-inch Monitor', price: 3200000, category: 'Displays' },
  { id: 3, name: 'USB-C Hub', price: 250000, category: 'Accessories' },
  { id: 4, name: 'Webcam 1080p', price: 450000, category: 'Accessories' },
  { id: 5, name: 'Ergonomic Chair', price: 1500000, category: 'Furniture' },
  { id: 6, name: 'Desk Lamp', price: 300000, category: 'Furniture' },
];

function Header() {
  return (
    <header style={{ borderBottom: '2px solid #2E5B44', paddingBottom: '0.8rem', marginBottom: '1rem' }}>
      <h1>Tryngo Store</h1>
      <p>Komponen reusable, data terpusat.</p>
    </header>
  );
}

function ProductCard({ name, price, category }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1rem' }}>
      <h3>{name}</h3>
      <p style={{ margin: '0.2rem 0' }}>Rp {price.toLocaleString('id-ID')}</p>
      <span style={{ background: '#e7f5ee', color: '#2E5B44', borderRadius: 999, padding: '0.1rem 0.6rem', fontSize: '0.8rem' }}>{category}</span>
    </div>
  );
}

function ProductGrid() {
  return (
    <section>
      <h2>Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.8rem' }}>
        {products.map((p) => <ProductCard key={p.id} name={p.name} price={p.price} category={p.category} />)}
      </div>
    </section>
  );
}

function Footer() {
  return <footer style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '0.8rem', color: '#666' }}>Tryngo Store 2026 — built with React components.</footer>;
}

export default function App() {
  return (
    <div>
      <Header />
      <ProductGrid />
      <Footer />
    </div>
  );
}

```

---

## Explanation

## Component Structure
The page is split into single-purpose components: Header, ProductCard, ProductGrid, Footer. Small components are easy to understand, test, and reuse.

## Centralized Data
The products data lives in one place (top of file). The view only reads — no duplication. When data changes, the whole UI stays in sync because React re-renders.

## Grid with CSS
Use CSS grid (`repeat(auto-fill, minmax(220px, 1fr))`) for responsiveness without media queries — cards automatically adjust columns to the viewport.

## Review
This is the "static first" pattern: before learning state, make sure the component structure and data flow are correct. Professional bootcamps (Scrimba, Odin) always start with static pages like this.

---

## Experiments

1. **Struktur Komponen**
2. **Data Terpusat**
3. **Grid dengan CSS**
4. **Review**

---

## Challenge

Add a SearchBar component (static input), a FeaturedSection showing the 2 most expensive products, and an "Add to Cart" button in ProductCard. Keep small components.

---

## Summary

A page = composition of small components. Centralized data, auto-synced UI. Static foundations done — next: state & interaction.
