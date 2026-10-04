# Optimasi Performa: next/image, next/font & Metrik Core Web Vitals (LCP, CLS, INP)

> **Kategori:** Next.js | **Level:** SEO Dinamis, Optimasi & Capstone E-Commerce | **Minggu 9:** Optimasi Performa: next/image, next/font & Metrik Core Web Vitals (LCP, CLS, INP)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami 3 metrik krusial Google Core Web Vitals: LCP (Loading), CLS (Stabilitas), dan INP (Responsivitas)
- Menggunakan komponen next/image untuk kompresi otomatis (WebP/AVIF) dan pembuatan responsive srcset
- Mencegah Cumulative Layout Shift (CLS) dengan mendefinisikan prop width/height atau prop fill
- Menggunakan next/font untuk mengunduh Google Fonts pada waktu build (Zero Layout Shift font)
- Menganalisis ukuran bundle JavaScript produksi menggunakan @next/bundle-analyzer

---

## Program: Audit & Optimasi Skor Lighthouse Toko E-Commerce

```tsx
// ============================================================================
// File: app/komponen/BannerHeroOptimasi.tsx (Demonstrasi next/image & next/font)
// ============================================================================
import Image from "next/image";

export default function BannerHeroOptimasi() {
  return (
    <section style={{ maxWidth: "680px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: "300px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#0f172a"
      }}>
        {/* next/image: Otomatis konversi WebP/AVIF, responsive srcset, pencegahan CLS, dan priority LCP */}
        <Image
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
          alt="Setup Meja Kerja Minimalis Developer"
          fill
          priority // Prioritaskan loading gambar ini karena merupakan elemen LCP terbesar di layar
          sizes="(max-width: 768px) 100vw, 680px"
          style={{ objectFit: "cover" }}
        />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "24px",
          color: "white"
        }}>
          <h2 style={{ margin: "0 0 8px 0" }}>Produktivitas Tanpa Batas 2026</h2>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: "14px" }}>
            Dioptimalkan dengan next/image: Zero Layout Shift & WebP Compression Otomatis.
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

## Konsep Kunci

### Mengapa Tag `<img>` Biasa Dilarang di Next.js?
Tag `<img>` HTML biasa mengunduh file asli berukuran megabyte, tidak melakukan kompresi modern, dan menyebabkan layar melompat-lompat saat gambar selesai dimuat (*Cumulative Layout Shift*).

Komponen **`next/image`** memberikan optimasi otomatis bertaraf enterprise:
1. **Modern Format Optimization**: Mengonversi gambar JPEG/PNG menjadi WebP atau AVIF secara dinamis berdasarkan dukungan browser pengguna (menghemat bandwidth hingga 70%).
2. **Pencegahan CLS (Zero Layout Shift)**: Memaksa pengembang menentukan dimensi atau `fill`, sehingga browser mereservasi ruang kosong sebelum gambar tiba.
3. **Responsive Sizes**: Menghasilkan atribut `srcset` sehingga ponsel kecil tidak mengunduh gambar beresolusi 4K.
4. **Prop `priority`**: Menandai elemen gambar terbesar di layar (*Largest Contentful Paint - LCP*) agar dimuat terlebih dahulu tanpa lazy loading.

### `next/font`: Hilangkan Lonjakan Font (Zero FOIT/FOUT)
Dengan `next/font/google`, Next.js mengunduh file font langsung pada waktu build dan menyimpannya bersama aset statis aplikasi Anda.
Browser tidak perlu lagi melakukan handshake DNS ke `fonts.googleapis.com` saat pengguna membuka web Anda!

---

---

## Penjelasan untuk Pemula

### Analogi: Foto Paspor Terpasang vs Foto Lepas di Meja
1. **Tag `<img>` biasa** seperti menaruh kartu tebal di atas tumpukan dokumen yang sedang Anda baca: saat kartu ditaruh tiba-tiba, seluruh tulisan di bawahnya bergeser turun (*Cumulative Layout Shift* yang menjengkelkan).
2. **`next/image`** seperti bingkai foto di paspor: sudah ada kotak kosong bergaris dengan ukuran pas sejak awal, jadi saat fotonya ditempelkan, tidak ada dokumen lain yang tergeser sedikit pun.
3. **Format WebP** seperti mengompres foto berukuran poster menjadi perangko mini yang tetap tajam tanpa pecah.

## Eksperimen

- Buka tab Network di browser dan perhatikan bahwa format gambar yang diunduh adalah image/webp atau image/avif, bukan jpg asli.
- Hapus prop priority pada gambar hero di atas dan perhatikan peringatan LCP di terminal konsol Next.js.
- Coba ubah ukuran jendela browser dari desktop ke mobile dan perhatikan browser meminta resolusi gambar yang lebih kecil berkat srcset.
- Jalankan audit Lighthouse di Chrome DevTools dan targetkan skor Performance 95+.

---

## Tantangan

Konfigurasikan font kustom `Inter` menggunakan `next/font/google` di `app/layout.tsx` dengan subset latin dan terapkan variabel CSS ke seluruh body dokumen.

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

Kamu telah menguasai next/image, next/font, Core Web Vitals (LCP, CLS), dan optimasi aset. Minggu depan adalah Capstone Final: Headless E-Commerce Storefront.
