# Proyek: Halaman Produk Statis

> React | Foundasi | Pelajaran 4

## Tujuan Pembelajaran

- Membangun halaman lengkap dari komponen kecil
- Memisahkan data dari tampilan
- Menerapkan komposisi header/grid/footer
- Merender grid produk dari array data

---

## Program: Proyek: Halaman Produk Statis

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

## Penjelasan

## Struktur Komponen
Halaman dipecah menjadi komponen fokus-tunggal: Header, ProductCard, ProductGrid, Footer. Setiap komponen kecil mudah dipahami, diuji, dan dipakai ulang.

## Data Terpusat
Data products didefinisikan di satu tempat (atas file). Tampilan hanya membaca — tidak menduplikasi. Saat data berubah, seluruh UI otomatis sinkron karena React me-render ulang.

## Grid dengan CSS
Gunakan CSS grid (`repeat(auto-fill, minmax(220px, 1fr))`) agar responsif tanpa media query — kartu otomatis menyesuaikan kolom berdasarkan lebar layar.

## Review
Ini pola "static first": sebelum belajar state, pastikan struktur komponen dan alur data sudah benar. Bootcamp profesional (Scrimba, Odin) selalu memulai dari halaman statis seperti ini.

---

## Eksperimen

1. **Struktur Komponen**
2. **Data Terpusat**
3. **Grid dengan CSS**
4. **Review**

---

## Tantangan

Tambah komponen SearchBar (input statis), FeaturedSection yang menampilkan 2 produk termahal, dan tombol "Add to Cart" di ProductCard. Struktur tetap komponen kecil.

---

## Ringkasan

Halaman = komposisi komponen kecil. Data terpusat, UI sinkron otomatis. Selesai fondasi statis — lanjut: state & interaksi.
