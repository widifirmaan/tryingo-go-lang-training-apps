# Props & Data Flow

> **Kategori:** React | **Level:** Beginner | **Minggu 2:** Props & Data Flow

## Learning Objectives

- Receive and use props in function components
- Destructure props: { name, price } directly in parameters
- Props are read-only — cannot be changed by child components
- Pass props: strings, numbers, booleans, arrays, objects, functions
- Render lists with map() and key prop for performance

---

## Program: Product Card

```jsx
// Props = data yang diterima komponen dari parent (read-only)
// Data flow React = satu arah: parent → child

function ProductCard({ name, price, isAvailable, tags }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p className="price">Rp {price.toLocaleString("id-ID")}</p>
      <span className={isAvailable ? "in-stock" : "out-stock"}>
        {isAvailable ? "Tersedia" : "Habis"}
      </span>
      <div className="tags">
        {tags.map((tag, i) => (
          <span key={i} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

function App() {
  const products = [
    { name: "Laptop", price: 15000000, isAvailable: true, tags: ["Elektronik", "Kerja"] },
    { name: "Buku", price: 85000, isAvailable: false, tags: ["Edukasi"] },
  ];

  return (
    <div>
      {products.map((p, i) => (
        <ProductCard
          key={i}
          name={p.name}
          price={p.price}
          isAvailable={p.isAvailable}
          tags={p.tags}
        />
      ))}
    </div>
  );
}

console.log("App komponen siap digunakan");
```

---

## Key Concepts

### Props
Data from parent to child. Read-only.

### Destructuring
Extract fields directly in parameters.

### Data Flow
One-way: parent → child.

### Key Prop
Helps React identify list items. Use unique IDs.

---

## Experiments

- Add new prop: rating (1-5 stars)
- Change products data and observe automatic updates
- Create child component receiving callback as prop
- Try passing function as prop

---

## Challenge

Build a product catalog with components: ProductCard, ProductList, PriceFilter. Props for data and callback for filtering.

---

## Summary

Week 2 of 12: **Props & Data Flow** (Level: Beginner). Inter-component communication. Next week: **State & useState**.
