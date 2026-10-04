# Streaming SSR, React Suspense & File loading.tsx

> **Kategori:** Next.js | **Level:** App Router, RSC & Fondasi Streaming | **Minggu 4:** Streaming SSR, React Suspense & File loading.tsx
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami masalah blocking SSR tradisional di mana request lambat menunda seluruh halaman
- Menggunakan file loading.tsx konvensional untuk membuat skeleton layar instan otomatis
- Menerapkan React <Suspense> untuk streaming komponen server secara granular
- Memahami cara HTTP chunked transfer encoding mengalirkan potongan HTML ke browser secara berkala
- Meningkatkan skor First Contentful Paint (FCP) dan Time to First Byte (TTFB) secara dramatis

---

## Program: Dashboard Analitik Multi-Widget dengan Streaming Progresif

```tsx
// ============================================================================
// File: app/dashboard/page.tsx (Demonstrasi Streaming SSR via React Suspense)
// ============================================================================
import { Suspense } from "react";

// Widget Cepat (Langsung siap dalam 100ms)
async function WidgetProfilBisnis() {
  return (
    <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
      <h3 style={{ margin: "0 0 6px 0" }}>Nusa Digital Corp</h3>
      <span style={{ color: "#16a34a", fontSize: "13px" }}>● Akun Terverifikasi Enterprise</span>
    </div>
  );
}

// Widget Lambat (Membutuhkan kalkulasi analitik database berat selama 2 detik)
async function WidgetLaporanPenjualanBerat() {
  // Simulasi query berat
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div style={{ padding: "16px", background: "#ecfdf5", borderRadius: "8px", border: "1px solid #a7f3d0", marginTop: "12px" }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#065f46" }}>Analitik Penjualan Bulan Ini</h3>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#047857" }}>Rp 485.250.000</div>
      <small style={{ color: "#059669" }}>+18.4% pertumbuhan dibanding kuartal lalu</small>
    </div>
  );
}

// Kerangka Skeleton Loading
function SkeletonWidget() {
  return (
    <div style={{ padding: "16px", background: "#f1f5f9", borderRadius: "8px", border: "1px dashed #cbd5e1", marginTop: "12px" }}>
      <div style={{ height: "18px", width: "50%", background: "#e2e8f0", borderRadius: "4px", marginBottom: "8px" }} />
      <div style={{ height: "28px", width: "75%", background: "#e2e8f0", borderRadius: "4px" }} />
      <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#94a3b8" }}>Sedang mengkalkulasi analitik di server...</p>
    </div>
  );
}

export default function DashboardStreamingPage() {
  return (
    <main style={{ maxWidth: "560px", margin: "24px auto", fontFamily: "sans-serif" }}>
      <h2>Dashboard Eksekutif (Streaming SSR)</h2>
      <p style={{ color: "#64748b", fontSize: "14px" }}>
        Header dan widget cepat muncul seketika! Widget berat di-stream menyusul via Suspense.
      </p>

      {/* Widget cepat dirender langsung */}
      <WidgetProfilBisnis />

      {/* Widget berat dibungkus Suspense: Bagian lain tidak terblokir! */}
      <Suspense fallback={<SkeletonWidget />}>
        <WidgetLaporanPenjualanBerat />
      </Suspense>
    </main>
  );
}
```

---

## Konsep Kunci

### Masalah SSR Tradisional: All-or-Nothing
Pada SSR tradisional, jika halaman Anda memiliki 5 widget cepat (100ms) dan 1 widget analitik yang lambat (2000ms):
**Server akan menahan seluruh halaman selama 2 detik penuh!**
Pengguna hanya melihat layar putih kosong (*blank screen*) dan browser memutar ikon loading tanpa kepastian.

### Solusi: Streaming SSR dengan React Suspense
Dengan **Streaming**, server Next.js langsung mengirimkan kerangka HTML dasar dan widget yang sudah siap dalam hitungan milidetik pertama (*sub-100ms*).
Komponen yang lambat dibungkus dengan `<Suspense fallback={<Skeleton />}>`:
1. Pengguna langsung melihat header, navigasi, dan animasi skeleton abu-abu.
2. Ketika query 2 detik selesai di server, Next.js **mengalirkan potongan HTML widget tersebut melalui koneksi HTTP yang sama (*chunked stream*)** dan menyisipkannya tepat di posisi skeleton tanpa reload halaman!

### loading.tsx vs <Suspense> Granular
- `loading.tsx`: Membungkus **seluruh halaman `page.tsx`** dalam Suspense secara otomatis.
- `<Suspense>`: Membungkus **bagian komponen tertentu saja**, memungkinkan halaman menampilkan data yang sudah siap sementara data lain masih diambil.

---

---

## Penjelasan untuk Pemula

### Analogi: Meja Makan Prasmanan Restoran
1. **SSR Tradisional** seperti pelayan yang menolak menyajikan makanan apapun sampai hidangan kambing guling 3 jam selesai dipanggang. Anda duduk kelaparan selama 3 jam di meja kosong.
2. **Streaming SSR** seperti restoran berkelas: pelayan langsung menyajikan air mineral dingin dan roti pembuka dalam 30 detik pertama (*layout & widget cepat*). Sementara Anda menikmati roti, pelayan membawa hidangan utama yang baru matang langsung ke meja (*streaming Suspense*).

## Eksperimen

- Buka halaman dan perhatikan bahwa WidgetProfilBisnis muncul instan, sementara skeleton berkedip selama 2 detik sebelum berganti angka penjualan.
- Buka tab Network di browser, periksa transfer-encoding: chunked pada response header.
- Tambahkan widget ketiga dengan delay 1 detik untuk melihat alur streaming bertahap (cascade).
- Buat file loading.tsx di folder rute dan amati perilakunya saat navigasi antar halaman.

---

## Tantangan

Rancang `WidgetReviewPelanggan` yang memiliki delay asinkron 1.5 detik. Bungkus dengan Suspense khusus dengan skeleton bintang ulasan sehingga tidak memblokir widget lain di layar.

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

Kamu telah menguasai Streaming SSR, React Suspense, loading.tsx, dan optimasi FCP/TTFB. Minggu depan kita memasuki Level 2: Server Actions dan Mutasi Data.
