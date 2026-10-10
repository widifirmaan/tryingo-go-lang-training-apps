# Props & Data Flow

> **Kategori:** React | **Level:** Pemula | **Minggu 2:** Props & Data Flow

## Tujuan Pembelajaran

- Menerima dan menggunakan props di function component
- Destructuring props: { name, price } langsung di parameter
- Props read-only — tidak bisa diubah oleh child component
- Mengirim props: string, number, boolean, array, object, function
- Rendering list dengan map() dan key prop untuk performa

---

## Program: Kartu Produk

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

## Konsep Kunci

### Props
Data dari parent ke child. Read-only, tidak bisa diubah child.

### Destructuring
function Card({ name, price }) langsung ambil field yang dibutuhkan.

### Data Flow
Satu arah: parent → child. Child tidak mengubah parent langsung.

### Key Prop
Key membantu React identifikasi item saat update list. Gunakan ID unik, bukan index.

---

## Eksperimen

- Tambah prop baru: rating (1-5 bintang)
- Ubah data products dan lihat perubahan otomatis
- Buat komponen child yang menerima callback sebagai prop
- Coba kirim function sebagai prop

---

## Tantangan

Buat katalog produk dengan komponen: ProductCard, ProductList, PriceFilter. Props untuk data dan callback untuk filter.

---

## Ringkasan

Minggu 2 dari 12: **Props & Data Flow** (Level: Pemula). Komunikasi antar komponen. Minggu depan: **State & useState**.
