# Routing Berbasis Berkas: Dynamic Segments ([slug]), Nested Layouts & Not-Found

> **Kategori:** Next.js | **Level:** App Router, RSC & Fondasi Streaming | **Minggu 2:** Routing Berbasis Berkas: Dynamic Segments ([slug]), Nested Layouts & Not-Found
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami sistem file-system routing di Next.js: folder mendefinisikan rute URL
- Menggunakan Dynamic Route Segments ([slug], [id]) untuk halaman dinamis berparameter
- Menangani Promise params pada Next.js versi 15+ sesuai standar asinkron terbaru
- Mengimplementasikan halaman layout bersarang (Nested Layouts) yang mempertahankan state navigasi
- Memanfaatkan fungsi notFound() dan file not-found.tsx untuk penanganan 404 terstruktur

---

## Program: Halaman Detail Produk Dinamis & Penanganan 404 Terpersonalisasi

```tsx
// ============================================================================
// File: app/produk/[slug]/page.tsx (Dynamic Route Segment)
// ============================================================================
import { notFound } from "next/navigation";

// Kamus data produk berbasis slug unik
const DATABASE_PRODUK: Record<string, { nama: string; harga: number; deskripsi: string; rating: number }> = {
  "mechanical-keyboard-75": {
    nama: "Mechanical Keyboard 75% Wireless",
    harga: 1250000,
    deskripsi: "Switch tactile gateron pro yellow, gasket mount, RGB south-facing.",
    rating: 4.9
  },
  "monitor-gaming-27": {
    nama: "Monitor Gaming 27\" Fast IPS 165Hz",
    harga: 3850000,
    deskripsi: "Resolusi 2K QHD, 1ms response time, 99% sRGB color gamut.",
    rating: 4.8
  }
};

interface HalamanDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function HalamanDetailProduk({ params }: HalamanDetailProps) {
  // Pada Next.js 15+, params adalah Promise yang wajib di-await
  const { slug } = await params;
  const produk = DATABASE_PRODUK[slug];

  // Jika slug tidak ditemukan di database, picu notFound() otomatis
  if (!produk) {
    notFound();
  }

  return (
    <article style={{ maxWidth: "560px", margin: "24px auto", fontFamily: "sans-serif" }}>
      <a href="/" style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>← Kembali ke Katalog</a>
      <h1 style={{ margin: "16px 0 8px 0" }}>{produk.nama}</h1>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold", color: "#16a34a" }}>
          Rp {produk.harga.toLocaleString("id-ID")}
        </span>
        <span style={{ background: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "4px", fontSize: "13px" }}>
          ★ {produk.rating} / 5.0
        </span>
      </div>
      <p style={{ lineHeight: "1.6", color: "#334155" }}>{produk.deskripsi}</p>
    </article>
  );
}
```

---

## Konsep Kunci

### Routing Berbasis Folder di App Router
Di Next.js App Router, Anda tidak perlu mengonfigurasi router library seperti `react-router`.
Struktur folder Anda secara otomatis menjadi URL:
- `app/page.tsx` -> `/`
- `app/tentang/page.tsx` -> `/tentang`
- `app/produk/[slug]/page.tsx` -> `/produk/mechanical-keyboard-75`

### Konvensi Berkas Khusus App Router
Setiap folder rute dapat memiliki file-file khusus yang dipahami otomatis oleh Next.js:
1. `page.tsx`: Komponen halaman utama rute.
2. `layout.tsx`: Membungkus halaman dan anak-anaknya. Layout **tidak pernah di-re-render ulang saat user berpindah halaman di dalam segmen yang sama** (*state preservation*).
3. `loading.tsx`: Tampilan skeleton instan saat data halaman sedang diambil.
4. `not-found.tsx`: Tampilan 404 khusus jika fungsi `notFound()` dipanggil.
5. `error.tsx`: Error boundary otomatis untuk menangkap kegagalan runtime.

### Penanganan Halaman Tidak Ditemukan (`notFound()`)
Jika pengguna mengakses slug acak seperti `/produk/baju-alien`, jangan tampilkan layar kosong! Panggil `notFound()`. Next.js akan langsung menghentikan render dan menampilkan antarmuka `not-found.tsx` terdekat dengan status code HTTP 404 yang benar untuk mesin pencari Google.

---

---

## Penjelasan untuk Pemula

### Analogi: Lemari Arsip Berlabel & Nomor Kamar Hotel
1. **Dynamic Segment `[slug]`** seperti nomor kamar hotel `/kamar/[nomor]`: pihak hotel tidak membangun pintu berbeda untuk setiap tamu, melainkan satu pintu standar yang kuncinya disesuaikan dengan nomor kamar yang dipesan.
2. **Layout** seperti lobi dan koridor hotel: koridor tetap sama dan tidak dihancurkan saat Anda berjalan dari kamar 101 ke kamar 102.
3. **notFound()** seperti resepsionis yang berkata: "Maaf kamar 999 tidak terdaftar di denah hotel kami", lalu mengarahkan Anda ke ruang tunggu informasi.

## Eksperimen

- Buka URL /produk/monitor-gaming-27 dan verifikasi detail produk berhasil dimuat dari database simulasi.
- Coba buka URL dengan slug asal-asalan seperti /produk/kucing-terbang dan amati tampilan 404 terpanggil.
- Buat file app/produk/layout.tsx yang menambahkan banner "Promo Diskon Akhir Pekan" di atas seluruh halaman produk.
- Gunakan fungsi generateStaticParams() untuk melakukan pre-render HTML statis pada waktu build (SSG).

---

## Tantangan

Implementasikan file `app/produk/[slug]/not-found.tsx` khusus yang menampilkan pesan hangat "Produk ini telah habis atau ditarik dari katalog" dilengkapi tombol kembali ke beranda.

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
```text
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
```text
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
```text
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
```text
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

Kamu telah menguasai file-system routing, dynamic segments [slug], nested layouts, dan notFound boundary. Minggu depan kita mempelajari Data Fetching dan Caching mendalam.
