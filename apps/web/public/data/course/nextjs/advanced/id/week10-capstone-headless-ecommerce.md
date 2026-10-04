# Capstone: Headless E-Commerce Storefront dengan App Router & Server Actions

> **Kategori:** Next.js | **Level:** SEO Dinamis, Optimasi & Capstone E-Commerce | **Minggu 10:** Capstone: Headless E-Commerce Storefront dengan App Router & Server Actions
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh pilar Next.js modern: App Router, RSC, Server Actions, dan Caching
- Menghubungkan mutasi formulir keranjang belanja menggunakan Server Actions murni
- Mengoptimalkan seluruh gambar katalog menggunakan next/image dengan properti sizes adaptif
- Menerapkan revalidasi instan server cache dengan revalidatePath()
- Menghasilkan arsitektur aplikasi e-commerce siap produksi untuk deployment Cloudflare Pages / Vercel

---

## Program: Aplikasi Toko Online Fullstack Lengkap dengan Keranjang & Checkout Server Actions

```tsx
// ============================================================================
// CAPSTONE PROJECT: NUSA FULLSTACK HEADLESS E-COMMERCE STOREFRONT
// ============================================================================
import { Suspense } from "react";
import Image from "next/image";
import { revalidatePath } from "next/cache";

// 1. Data Model Produk E-Commerce
interface ProdukStore {
  id: string;
  slug: string;
  nama: string;
  harga: number;
  kategori: string;
  gambarUrl: string;
  stok: number;
}

const KATALOG_DATABASE: ProdukStore[] = [
  {
    id: "prod-1",
    slug: "nusa-mechanical-keyboard",
    nama: "Nusa Pro Mechanical Keyboard 75%",
    harga: 1250000,
    kategori: "Hardware",
    gambarUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    stok: 12
  },
  {
    id: "prod-2",
    slug: "nusa-wireless-mouse",
    nama: "Nusa Ultra-Light Gaming Mouse",
    harga: 650000,
    kategori: "Hardware",
    gambarUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
    stok: 5
  }
];

// 2. Server Action: Tambah ke Keranjang Belanja Langsung di Server
async function tambahKeranjangAction(formData: FormData) {
  "use server";
  const produkId = formData.get("produkId") as string;
  console.log(`[Server Action] Menambahkan produk ID: ${produkId} ke keranjang belanja...`);
  
  // Revalidasi cache halaman storefront
  revalidatePath("/");
}

// 3. Komponen Server Utama (RSC)
export default async function CapstoneStorefrontPage() {
  return (
    <div style={{ maxWidth: "780px", margin: "24px auto", fontFamily: "system-ui, sans-serif", padding: "0 16px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #0f172a", paddingBottom: "16px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px" }}>Nusa Tech Storefront</h1>
          <small style={{ color: "#64748b" }}>Next.js 15 Fullstack App Router & Server Actions</small>
        </div>
        <div style={{ background: "#2563eb", color: "white", padding: "6px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "bold" }}>
          🛒 Keranjang Belanja
        </div>
      </header>

      <main style={{ marginTop: "24px" }}>
        <h2>Katalog Unggulan (Server Components)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {KATALOG_DATABASE.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                overflow: "hidden",
                background: "white",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "180px", background: "#f1f5f9" }}>
                <Image
                  src={item.gambarUrl}
                  alt={item.nama}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "bold" }}>
                    {item.kategori}
                  </span>
                  <h3 style={{ margin: "4px 0 8px 0", fontSize: "16px" }}>{item.nama}</h3>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#16a34a", marginBottom: "8px" }}>
                    Rp {item.harga.toLocaleString("id-ID")}
                  </div>
                  <small style={{ color: item.stok > 0 ? "#64748b" : "red" }}>
                    {item.stok > 0 ? `Tersedia: ${item.stok} unit` : "Stok Habis"}
                  </small>
                </div>

                <form action={tambahKeranjangAction} style={{ marginTop: "16px" }}>
                  <input type="hidden" name="produkId" value={item.id} />
                  <button
                    type="submit"
                    disabled={item.stok === 0}
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: item.stok > 0 ? "#0f172a" : "#cbd5e1",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: item.stok > 0 ? "pointer" : "not-allowed",
                      fontWeight: "bold"
                    }}
                  >
                    + Masukkan Keranjang
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
```

---

## Konsep Kunci

### Arsitektur Capstone Headless E-Commerce
Proyek capstone ini memadukan seluruh keunggulan arsitektur web modern Next.js:
1. **Server-First Rendering**: Halaman katalog diambil dan dirender langsung di server. Kredensial database atau CMS headless aman terlindungi tanpa pernah terekspos ke browser.
2. **Mutasi Data Bersih via Server Actions**: Tombol "Masukkan Keranjang" menggunakan `<form action={tambahKeranjangAction}>`. Tidak ada file API controller terpisah yang perlu dibuat, tidak ada dependensi Axios/Fetch di client.
3. **Optimasi Gambar Otomatis**: Foto produk di-host secara responsif menggunakan `next/image` dengan properti `fill` dan `sizes`, memastikan skor CLS (Cumulative Layout Shift) tetap 0.
4. **Kecepatan CDN dengan Revalidasi Cepat**: Saat stok barang berkurang atau harga berubah, pemanggilan `revalidatePath('/')` memastikan pengunjung berikutnya langsung mendapatkan data terbaru tanpa jeda kompilasi ulang.

### Siap Kerja di Industri Teknologi
Selamat! Anda kini telah menguasai salah satu framework fullstack paling dominan di dunia teknologi global modern.

---

---

## Penjelasan untuk Pemula

### Analogi: Supermarket Modern Berkecepatan Cahaya
Aplikasi e-commerce ini seperti supermarket futuristik:
1. **Server Component** adalah etalase kaca yang sudah tertata rapi dan bersih saat Anda melangkahkan kaki masuk (*buka web langsung tampil*).
2. **Server Action** adalah kasir otomatis: Anda meletakkan barang belanjaan di atas sabuk pemindai, kasir memverifikasi harga dan memproses pembayaran tanpa Anda perlu mengisi lembaran kertas registrasi manual.
3. **next/image** adalah lampu sorot etalase pintar yang langsung menyesuaikan kecerahan agar barang terlihat menarik tanpa menyilaukan mata pembeli.

## Eksperimen

- Klik tombol "+ Masukkan Keranjang" dan amati terminal server mencatat eksekusi Server Action secara real-time.
- Ubah stok salah satu item menjadi 0 dan buktikan tombol otomatis dinonaktifkan (disabled).
- Periksa tab Network untuk melihat rute RPC internal yang dibuat oleh Next.js untuk Server Action.
- Deploy aplikasi ke Cloudflare Pages atau Vercel dan uji performa Google Lighthouse di lingkungan produksi.

---

## Tantangan

Tambahkan Server Action `prosesCheckoutKuponAction(kodeKupon)` yang memvalidasi apakah kupon "DISKON50" valid, lalu potong total harga belanjaan sebesar 50% dengan revalidasi path.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ NEXT.JS APP ROUTER ARCHITECTURE                          │
│                                                          │
│ [Server Component] (Default: Keamanan & DB Direct Access)│
│  • page.tsx / layout.tsx                                 │
│  • Fetch data di server tanpa CORS / Waterfalls          │
│       │                                                  │
│       ▼ Mengirim RSC Payload                             │
│ [Client Component] ('use client')                        │
│  • State lokal, onClick, animasi interaktif              │
│       │                                                  │
│       ▼ Server Actions ('use server')                    │
│  Mutasi langsung ke database & Revalidasi Path           │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `export default async function Page()`
- **Fungsi Utama:** Server Component asinkron bawaan.
- **Parameter / Atribut:** `Props (params, searchParams)`.
- **Perilaku & Efek Sistem:** Merender halaman di server dengan akses database langsung tanpa paparan secret ke browser..
- **Contoh Penggunaan Praktis:**
```typescript
export default async function Page() {
  const data = await db.query('SELECT * FROM items');
  return <main>{data.map(i => <p key={i.id}>{i.name}</p>)}</main>;
}
```
- **Hasil Output yang Diharapkan:**
```output
HTML statis siap saji dikirimkan ke peramban klien
```

### 2. `'use client'`
- **Fungsi Utama:** Direktif penanda Komponen Klien.
- **Parameter / Atribut:** `Ditulis di baris pertama`.
- **Perilaku & Efek Sistem:** Mengizinkan penggunaan hook interaktif browser seperti `useState`, `useEffect`, dan event listener..
- **Contoh Penggunaan Praktis:**
```typescript
'use client';
import { useState } from 'react';
export default function Counter() {
  const [val, setVal] = useState(0);
  return <button onClick={() => setVal(v => v + 1)}>{val}</button>;
}
```
- **Hasil Output yang Diharapkan:**
```output
Komponen interaktif beroperasi di browser klien
```

### 3. `'use server' (Server Actions)`
- **Fungsi Utama:** Mutasi data server langsung dari form.
- **Parameter / Atribut:** `Form data / arguments`.
- **Perilaku & Efek Sistem:** Mengeksekusi mutasi database di sisi server langsung dari event form klien tanpa endpoint REST terpisah..
- **Contoh Penggunaan Praktis:**
```typescript
async function createItem(formData: FormData) {
  'use server';
  const name = formData.get('name');
  await db.items.create({ name });
  revalidatePath('/items');
}
```
- **Hasil Output yang Diharapkan:**
```output
Data tersimpan di server dan halaman otomatis di-revalidasi
```

### 4. `<Link href="/dashboard">`
- **Fungsi Utama:** Navigasi halaman cepat tanpa reload.
- **Parameter / Atribut:** `href (Path route)`.
- **Perilaku & Efek Sistem:** Melakukan pre-fetching rute di latar belakang dan transisi halaman instan (SPA feel)..
- **Contoh Penggunaan Praktis:**
```typescript
import Link from 'next/link';
<Link href="/about" className="btn">Tentang Kami</Link>
```
- **Hasil Output yang Diharapkan:**
```output
Halaman berpindah instan tanpa muat ulang browser
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Menggunakan Hook Browser di Server Component
- **Gejala / Masalah:** Error kompilasi `useState can only be used in a Client Component`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tambahkan direktif `'use client'` di baris paling atas berkas komponen yang memerlukan interaktivitas browser.

### 2. Waterfalls Fetching Data yang Tidak Perlu
- **Gejala / Masalah:** Loading halaman menjadi sangat lambat karena request dilakukan berurutan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `Promise.all([fetchA(), fetchB()])` untuk menjalankan pemanggilan API secara paralel di server.

### 3. Caching yang Terlalu Agresif
- **Gejala / Masalah:** Data baru di database tidak muncul di browser pengguna.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tentukan revalidasi yang tepat via `fetch(url, { next: { revalidate: 60 } })` atau panggil `revalidatePath()`.

---

## Ringkasan

Selamat! Kamu telah menyelesaikan seluruh kurikulum Next.js dari App Router dasar hingga Headless E-Commerce Storefront berstandar enterprise.
