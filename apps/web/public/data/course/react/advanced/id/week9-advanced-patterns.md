# Advanced Patterns — Pola Warung Rapi

> **Kategori:** React | **Level:** Lanjutan | **Minggu 9:** Advanced Patterns

## Tujuan Pembelajaran

- `Compound Components` — `Card.Header` + `Card.Body`, `Render Props` dan `HOC` — cetak biru rapi

---

## Program: Pola Compound

```jsx
function Card({ children }){ return <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>{children}</div>; }
Card.Header = ({ children }) => <h3>{children}</h3>;
Card.Body = ({ children }) => <p>{children}</p>;

export default function App(){
  return (
    <Card>
      <Card.Header>Beras 5kg</Card.Header>
      <Card.Body>Rp 62.000 — Stok 10</Card.Body>
    </Card>
  );
}
```

---

## Ringkasan

Minggu 9: **Pola Compound** — bagi kartu jadi Header/Body.
