# App Router: React Server Components (RSC) vs Client Components ('use client')

> **Kategori:** Next.js | **Level:** App Router, RSC & Fondasi Streaming | **Minggu 1:** App Router: React Server Components (RSC) vs Client Components ('use client')

## Tujuan Pembelajaran

- Memahami evolusi Next.js dari Pages Router (getServerSideProps) ke App Router modern
- Memahami filosofi React Server Components (RSC): komponen berjalan di server dan mengirim HTML murni
- Mengetahui batas arsitektural: kapan menggunakan RSC secara default dan kapan menyematkan directive 'use client'
- Menjalankan query database dan akses secret environment variables langsung di dalam komponen async
- Mengurangi ukuran JavaScript bundle yang dikirim ke browser pengguna secara drastis (Zero-Bundle Cost)

---

## Program: Katalog Produk Server-Side dengan Keranjang Belanja Interaktif

```tsx
// ============================================================================
// File: app/page.tsx (React Server Component - Default, Zero Client JS Bundle!)
// ============================================================================
import TambahKeKeranjangTombol from "./components/TambahKeKeranjangTombol";

// Simulasi database query langsung di server (Aman: Kredensial tidak pernah bocor ke browser)
async function ambilKatalogProduk() {
  return [
    { id: "p1", nama: "Mechanical Keyboard 75%", harga: 1250000, stok: 8 },
    { id: "p2", nama: "Monitor Gaming 27\" 165Hz", harga: 3850000, stok: 4 },
    { id: "p3", nama: "Desk Mat Wool Felt Minimalist", harga: 275000, stok: 15 }
  ];
}

export default async function BerandaTokoPage() {
  // Data diambil langsung di server saat request datang
  const produkList = await ambilKatalogProduk();

  return (
    <main style={{ maxWidth: "680px", margin: "24px auto", fontFamily: "sans-serif" }}>
      <header style={{ borderBottom: "2px solid #0f172a", paddingBottom: "12px", marginBottom: "20px" }}>
        <h1 style={{ margin: 0 }}>Nusa Storefront • Next.js App Router</h1>
        <p style={{ color: "#64748b", margin: "4px 0 0" }}>
          Dirender 100% di Server (RSC) — Zero JavaScript dikirim ke browser untuk teks ini!
        </p>
      </header>

      <div style={{ display: "grid", gap: "16px" }}>
        {produkList.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "16px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 6px 0" }}>{item.nama}</h3>
              <div style={{ color: "#16a34a", fontWeight: "bold" }}>
                Rp {item.harga.toLocaleString("id-ID")}
              </div>
              <small style={{ color: "#64748b" }}>Sisa stok: {item.stok} unit</small>
            </div>

            {/* Komponen Client Interaktif disisipkan sebagai daun (Leaf Component) */}
            <TambahKeKeranjangTombol produk={item} />
          </div>
        ))}
      </div>
    </main>
  );
}
```

---

## Konsep Kunci

### Revolusi React Server Components (RSC)
Di React versi lama (CRA atau Pages Router), seluruh kode komponen dikirim ke browser pengguna dalam bentuk file JavaScript raksasa. Browser mengunduh JS, mem-parsingnya, lalu me-render HTML (*Client-Side Rendering*). Hal ini membuat loading awal lambat dan buruk untuk SEO.

Pada **Next.js App Router**, semua komponen di folder `app/` secara bawaan adalah **React Server Components (RSC)**:
1. Komponen dieksekusi di serverNode.js atau Edge runtime.
2. Komponen bisa bertipe `async` dan langsung melakukan `await db.query()` tanpa perlu membuat API endpoint perantara!
3. Hasilnya dikirim ke browser dalam bentuk HTML dan format streaming RSC Payload. **Nol kilobyte JavaScript dikirim untuk komponen server tersebut!**

### Kapan Menggunakan `'use client'`?
Anda hanya perlu menambahkan deklarasi `'use client'` di baris paling atas file jika komponen tersebut membutuhkan fitur browser interaktif:
- Hook state dan lifecycle (`useState`, `useEffect`, `useReducer`).
- Event listeners (`onClick`, `onChange`, `onSubmit`).
- Browser APIs (`localStorage`, `navigator.geolocation`, `window`).
**Praktik Terbaik Industri**: Buat halaman sebagai Server Component, dan isolasi tombol interaktif kecil (`<AddToCartButton />`) sebagai Client Component di tingkat daun terluar (*leaf components*).

---

---

## Penjelasan untuk Pemula

### Analogi: Dapur Restoran Bintang Lima vs Paket Bahan Masak
1. **React Lama (Client Rendering)** seperti restoran yang mengirimkan bahan mentah (beras mentah, ayam beku, bumbu) ke rumah Anda. Anda harus memasaknya sendiri di kompor rumah (*komputer browser bekerja keras dan lambat*).
2. **Next.js Server Components (RSC)** seperti koki restoran bintang lima yang memasak hidangan lezat di dapur restoran (*server super cepat*). Koki mengirimkan steak hangat siap santap langsung ke piring Anda (*HTML matang instan tanpa beban komputasi di ponsel pengguna*).
3. **`'use client'`** hanyalah garam dan merica di meja makan yang Anda taburkan sendiri sesuai selera.

## Eksperimen

- Buka Network Tab di browser dan perhatikan bahwa kode fungsi ambilKatalogProduk tidak pernah bocor ke client JS.
- Coba letakkan useState di dalam BerandaTokoPage tanpa 'use client' dan amati pesan eror eksplisit dari Next.js.
- Ubah data produk di fungsi server dan refresh halaman untuk melihat pembaruan instan.
- Gunakan kata kunci async pada komponen BerandaTokoPage dan pelajari bagaimana Next.js menanganinya secara native.

---

## Tantangan

Buat Client Component `KeranjangHeaderBadge` yang menyimpan jumlah item keranjang di state lokal, lalu buat komponen layout `app/layout.tsx` yang memuat badge ini bersama konten server lainnya.

---

## Ringkasan

Kamu telah menguasai arsitektur App Router, perbedaan RSC vs Client Components, dan prinsip Zero-Bundle Cost. Minggu depan kita mendalami Routing Dinamis dan Nested Layouts.
