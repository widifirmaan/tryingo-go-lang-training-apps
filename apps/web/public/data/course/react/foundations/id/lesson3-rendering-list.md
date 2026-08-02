# Rendering List & Kondisi

> React | Foundasi | Pelajaran 3

## Tujuan Pembelajaran

- Merender list dengan array.map()
- Menggunakan key yang unik dan stabil
- Rendering kondisional dengan ternary dan &&
- Menggabungkan data + UI dari array objek

---

## Program: Rendering List & Kondisi

```jsx
const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000, inStock: true },
  { id: 2, name: '27-inch Monitor', price: 3200000, inStock: false },
  { id: 3, name: 'USB-C Hub', price: 250000, inStock: true },
  { id: 4, name: 'Webcam', price: 450000, inStock: true },
];

export default function App() {
  return (
    <div>
      <h1>Product Catalog</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={{ border: '1px solid #eee', borderRadius: 10, padding: '0.8rem', margin: '0.4rem 0' }}>
            <strong>{p.name}</strong> — Rp {p.price.toLocaleString('id-ID')}{' '}
            {p.inStock ? <span style={{ color: '#2E5B44', fontWeight: 'bold' }}>(In stock)</span>
                      : <span style={{ color: '#b00020', fontWeight: 'bold' }}>(Sold out)</span>}
          </li>
        ))}
      </ul>
      <p>Total: {products.length} products · {products.filter((p) => p.inStock).length} in stock</p>
      {products.length === 0 && <p>Catalog is empty.</p>}
    </div>
  );
}

```

---

## Penjelasan

## map() untuk List
Untuk merender array, gunakan `.map()` yang mengembalikan array JSX. React me-render setiap elemen array secara berurutan. Ini pola paling umum di aplikasi React.

## Key
Setiap item list butuh `key` unik dan stabil (biasanya id). Key membantu React melacak item saat list berubah — menambah/menghapus tanpa merender ulang seluruh list. Jangan gunakan index sebagai key jika list bisa berubah urutan.

## Kondisional
Gunakan `ternary` (`cond ? A : B`) untuk dua cabang, `&&` untuk render "kondisi benar saja" (misal pesan kosong), dan `||` untuk nilai fallback.

## Data-Driven UI
List + kondisi adalah jantung UI data-driven: data array + fungsi render = tampilan yang selalu sinkron dengan data.

---

## Eksperimen

1. **map() untuk List**
2. **Key**
3. **Kondisional**
4. **Data-Driven UI**

---

## Tantangan

Ubah data products menjadi 6 item dengan field baru category. Render heading per kategori dan hanya tampilkan produk dengan price di atas 300.000. Tambahkan pesan khusus saat tidak ada produk.

---

## Ringkasan

map() merender list, key membuat list efisien, ternary/&& untuk kondisi. UI selalu sinkron dengan data. Lanjut: project halaman produk statis.
