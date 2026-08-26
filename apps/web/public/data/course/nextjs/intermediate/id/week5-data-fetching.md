# Data Fetching — Ambil Stok dari Gudang

> **Kategori:** Next.js | **Level:** Menengah | **Minggu 5:** Data Fetching

## Tujuan Pembelajaran

- `async` Server Component `await fetch()` langsung — tanpa `useEffect`
- `fetch` cache: `force-cache` (stok jarang berubah) vs `no-store` (stok live) vs `revalidate: 60` (update tiap menit)
- `loading.js` skeleton saat tunggu

---

## Kenapa Ini Penting Buat Kamu?

Daftar produk jika `fetch` di `useEffect` → blink loading tiap buka. Server Component `await fetch()` di server → HTML sudah isi, cepat & SEO.

---

## Program: Daftar dari API

```jsx
// app/produk/page.js — Server Component
async function ambilProduk() {
  const res = await fetch("https://api.warung.com/produk", {
    next: { revalidate: 60 } // cache 60 detik, lalu segar
  });
  if (!res.ok) throw new Error("Gagal ambil");
  return res.json();
}

export default async function ProdukPage() {
  const produk = await ambilProduk(); // langsung await, tidak useEffect
  return (
    <ul>
      {produk.map(p => (
        <li key={p.id}>{p.nama} — Rp {p.harga.toLocaleString("id-ID")}</li>
      ))}
    </ul>
  );
}

// app/produk/loading.js — skeleton saat fetch
export default function Loading() {
  return <p>⏳ Memuat produk...</p>;
}
```

**Pilihan cache:**
- `cache: "force-cache"` — stok katalog (jarang berubah)
- `cache: "no-store"` — stok live (selalu baru)
- `next: { revalidate: 60 }` — tengah

---

## Konsep Kunci

### Server `await fetch` vs Client `useEffect`
Server: `await fetch` di `page.js` → HTML jadi sebelum kirim. Client: `useEffect` → kosong dulu baru isi.

### Cache
`force-cache` hemat, `no-store` segar, `revalidate` tengah.

---

## Ringkasan

Minggu 5: **Ambil Stok** — Server fetch + cache. Minggu depan: **Server Actions** — kirim form.
