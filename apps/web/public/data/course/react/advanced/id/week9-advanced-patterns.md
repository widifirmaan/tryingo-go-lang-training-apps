# Advanced Patterns — Pola Warung Rapi

> **Kategori:** React | **Level:** Lanjutan | **Minggu 9:** Advanced Patterns
> **Prasyarat:** Minggu 8 — **Custom Hooks & Patterns**.

## Tujuan Pembelajaran

- `Compound Components` — `Card.Header` + `Card.Body`, `Render Props` dan `HOC` — cetak biru rapi

---

## Kenapa Ini Penting Buat Kamu?

Tanpa pola, `Card` 5 varian = 5 file duplikat 80%. Dengan Compound (`Card.Header`), 1 kartu + susun bebas. Render Props/HOC bagi logika tanpa duplikat.

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

## Penjelasan untuk Pemula

### Analogi: Lego Technic
- **5 varian Card = 5 file 80% sama**: ubah border → ubah 5 tempat, lupa 1 = beda.
- **Compound (`Card.Header`) = LEGO Technic**: 1 set bata + susun bebas per halaman. Render Props/HOC = pinjam mesin tanpa fotokopi kode!

### Langkah 0 — Siapkan Device
- Sama React W1: `npm run dev` di `5173` (+ `vitest` untuk W10).

### Cara Komputer Membaca
- `Card.Header = ...` tempel sub-komponen ke induk; `children` isi lubang.

### 3 Istilah Wajib
- 1. **Compound/children**: susun/lubang

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 9: **Pola Compound** — bagi kartu jadi Header/Body. Minggu depan: **Testing React**.
