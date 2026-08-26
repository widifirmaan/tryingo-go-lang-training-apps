# Loading & Error — Kerangka dan Alarm

> **Kategori:** Next.js | **Level:** Menengah | **Minggu 7:** Loading & Error UI

## Tujuan Pembelajaran

- `loading.js` kerangka (skeleton) saat `await fetch`, `error.js` alarm jika `throw`, `not-found.js` 404
- `error.js` harus `"use client"` karena butuh `reset()` tombol coba lagi

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `loading.js`, layar putih 2 detik. Dengan skeleton, pelanggan lihat "memuat" — tidak kabur. Tanpa `error.js`, jika API mati → layar putih.

---

## Program: Kerangka & Alarm

```jsx
// app/produk/loading.js — kerangka
export default function Loading() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ height: 20, background: "#eee", borderRadius: 8 }} />
      <div style={{ height: 20, background: "#eee", borderRadius: 8 }} />
    </div>
  );
}

// app/produk/error.js — alarm (wajib "use client")
"use client";
export default function Error({ error, reset }) {
  return (
    <div style={{ border: "1px solid red", padding: 16 }}>
      <p>❌ Gagal: {error.message}</p>
      <button onClick={() => reset()}>Coba Lagi</button>
    </div>
  );
}

// app/produk/not-found.js — 404
export default function NotFound() {
  return <p>Produk tidak ada — <a href="/produk">kembali</a></p>;
}

// Di page.js: if (!produk) notFound();
```

---

## Konsep Kunci

### `loading.js` = Kerangka
Next.js bungkus `page.js` dengan `Suspense` otomatis → tampil `loading.js` saat `await`.

### `error.js` = Alarm
Tangkap `throw` di `page.js` atau `fetch` gagal. Harus `use client` karena `reset()` interaktif.

---

## Ringkasan

Minggu 7: **Kerangka & Alarm** — loading & error. Minggu depan: **Middleware**.
