# Loading & Error — Kerangka dan Alarm

> **Kategori:** Next.js | **Level:** Menengah | **Minggu 7:** Loading & Error UI
> **Prasyarat:** Minggu 6 — **Server Actions**.

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

## Eksperimen

- **Hijau:** Buka `/produk` → apa yang tampil? Coba ID lain → bedanya apa?
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Loading & Error di Warungmu:** pakai `/produk` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/produk`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Server Actions** (Minggu 6): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 7: **Kerangka & Alarm** — loading & error. Minggu depan: **Middleware**.
