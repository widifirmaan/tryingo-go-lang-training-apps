# Dynamic Metadata API, OpenGraph Image Generation & SEO Terstruktur

> **Kategori:** Next.js | **Level:** SEO Dinamis, Optimasi & Capstone E-Commerce | **Minggu 8:** Dynamic Metadata API, OpenGraph Image Generation & SEO Terstruktur
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami pentingnya SEO teknis modern: Metadata Statis vs Dynamic generateMetadata()
- Mengonfigurasi OpenGraph tags dan Twitter Cards untuk preview tautan media sosial yang memikat
- Menghasilkan gambar pratinjau sosial dinamis menggunakan Edge Image Generation (@vercel/og)
- Menyematkan Structured Data (JSON-LD) untuk mendapatkan Google Rich Results (harga, stok, rating)
- Membuat file sitemap.xml dan robots.txt dinamis secara terprogram

---

## Program: Generator Kartu Media Sosial Otomatis & Skema JSON-LD

```tsx
// ============================================================================
// File: app/produk/[slug]/page.tsx (Metadata API Dinamis untuk Mesin Pencari & Medsos)
// ============================================================================
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. generateMetadata: Dieksekusi otomatis oleh Next.js untuk menyuntikkan tag <head> dinamis
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Simulasi fetch judul dan gambar produk dari database
  const namaProduk = slug === "mechanical-keyboard-75" ? "Mechanical Keyboard 75%" : "Produk Pilihan Nusa";
  const harga = 1250000;
  const deskripsi = `Beli ${namaProduk} terbaik dengan harga Rp ${harga.toLocaleString("id-ID")}. Garansi resmi 2 tahun.`;

  return {
    title: `${namaProduk} | Nusa Storefront`,
    description: deskripsi,
    openGraph: {
      title: `${namaProduk} - Diskon Spesial`,
      description: deskripsi,
      url: `https://store.nusa.dev/produk/${slug}`,
      siteName: "Nusa Storefront",
      images: [
        {
          url: `https://store.nusa.dev/api/og?judul=${encodeURIComponent(namaProduk)}`,
          width: 1200,
          height: 630,
          alt: namaProduk
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: namaProduk,
      description: deskripsi
    }
  };
}

export default async function HalamanProdukSEO({ params }: PageProps) {
  const { slug } = await params;

  // 2. Structured Data (JSON-LD) untuk Google Rich Snippets (Bintang rating & harga di hasil pencarian)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Mechanical Keyboard 75%",
    description: "Switch tactile gateron pro yellow, gasket mount, RGB.",
    offers: {
      "@type": "Offer",
      price: "1250000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock"
    }
  };

  return (
    <article style={{ maxWidth: "560px", margin: "24px auto", fontFamily: "sans-serif" }}>
      {/* Sisipkan JSON-LD ke dalam script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1>{slug}</h1>
      <p>Halaman ini dilengkapi Dynamic OpenGraph dan Skema Mesin Pencari Google Resmi!</p>
    </article>
  );
}
```

---

## Konsep Kunci

### Mengapa Next.js Metadata API Luar Biasa?
Di React tradisional, tag `<head>`, `<title>`, dan `<meta name="description">` sulit dikelola dan sering tidak terbaca oleh bot perayap media sosial (Facebook, WhatsApp, Twitter) yang tidak mengeksekusi JavaScript.
Next.js memiliki **Metadata API bawaan**:
1. Anda mengekspor objek `metadata` atau fungsi asinkron `generateMetadata()`.
2. Next.js **menyuntikkan tag meta langsung ke dalam dokumen HTML mentah pertama**, menjamin 100% perayap WhatsApp, Telegram, dan Googlebot membaca kartu preview secara sempurna!

### OpenGraph Images Dinamis (`@vercel/og`)
Daripada mendesain 1.000 gambar banner di Photoshop untuk 1.000 produk Anda, Next.js memungkinkan Anda membuat file `app/api/og/route.tsx` menggunakan JSX/HTML dan mengubahnya menjadi gambar PNG 1200x630 pixel secara instan di edge server!

### Rich Snippets dengan JSON-LD
Dengan menyisipkan skema `schema.org` bertipe `Product`, Google akan menampilkan bintang ulasan, harga barang, dan status "Tersedia" langsung di halaman pencarian Google, meningkatkan persentase klik (*Click-Through Rate*) hingga 35%.

---

---

## Penjelasan untuk Pemula

### Analogi: Kartu Nama Mengkilap & Etalase Kaca Toko
1. **Metadata API** seperti kartu nama bisnis yang dicetak di atas kertas tebal: begitu Anda menyerahkannya ke calon klien (*bagikan link di WhatsApp*), mereka langsung membaca nama perusahaan dan logo Anda dengan jelas tanpa harus membuka laptop mereka.
2. **JSON-LD Structured Data** seperti plang label harga resmi di kaca etalase toko: orang yang hanya lewat di trotoar (*Google search results*) langsung tahu barang tersebut harganya berapa dan masih ada stok atau tidak.

## Eksperimen

- Buka Source Code halaman (View Page Source) dan buktikan bahwa tag <title> dan <meta property="og:title"> sudah tercetak di HTML mentah.
- Bagikan URL ke debugger resmi (misal: Facebook Sharing Debugger atau Twitter Card Validator).
- Uji skema JSON-LD menggunakan Google Rich Results Test online tool.
- Buat file app/sitemap.ts yang mengembalikan daftar URL dinamis dari seluruh database produk.

---

## Tantangan

Buat endpoint `app/api/og/route.tsx` menggunakan `ImageResponse` dari `next/og` yang merender teks judul produk di atas background gradien bergaya kartu modern.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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

Kamu telah menguasai Dynamic Metadata API, OpenGraph previews, dan JSON-LD Structured Data. Minggu depan kita mempelajari Optimasi next/image dan Core Web Vitals.
