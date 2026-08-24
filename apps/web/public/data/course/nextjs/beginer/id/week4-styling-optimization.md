# Styling & Optimasi — Bikin Cantik Tanpa Bikin Lemot

> **Kategori:** Next.js | **Level:** Pemula | **Minggu 4:** Styling & Optimasi

## Tujuan Pembelajaran

- Memahami 3 cara styling di Next.js: **Global CSS**, **CSS Modules**, **Tailwind CSS** — dan kapan pakai mana (warung kecil vs mall)
- Menggunakan **Tailwind** (sudah terinstall dari `create-next-app`) untuk styling cepat tanpa bikin file CSS baru
- Menggunakan **`next/image`** untuk gambar otomatis kecil & `next/font` untuk font tanpa kedip
- Memahami kenapa optimasi penting untuk HP kentang & kuota terbatas
- Membuat grid katalog cantik yang responsif (HP 1 kolom, laptop 3 kolom)

---

## Kenapa Ini Penting Buat Kamu?

Warung Bu Siti tadi jalan, tapi masih polos — seperti ruko tanpa cat. Pelanggan butuh **foto produk jernih tapi tidak berat**. Jika foto 3MB, pembeli di desa dengan sinyal lemot langsung kabur. `next/image` = **tukang foto otomatis**: ubah 3MB jadi 80KB, format WebP, lazy load (load saat discroll). `next/font` = **tukang huruf** yang pasang font tanpa kedip.

Minggu ini kamu ubah warung polos jadi etalase cantik, tetap cepat.

---

## Program: Katalog Cantik Responsif

Kita akan pakai Tailwind (sudah ada) + `next/image`. Tidak perlu install lagi.

```jsx
// ── app/produk/page.js (Server Component, sudah ada data) ──
import Image from "next/image";
import { Inter } from "next/font/google";

// Font otomatis, tidak kedip (font-display: swap sudah diatur Next.js)
const inter = Inter({ subsets: ["latin"] });

async function ambilProduk() {
  return [
    { id: "1", nama: "Beras 5kg", harga: 62000, gambar: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400" },
    { id: "2", nama: "Bayam", harga: 5000, gambar: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400" },
    { id: "3", nama: "Telur 1kg", harga: 28000, gambar: "https://images.unsplash.com/photo-1482049016688-2d3e1b31122b?w=400" },
  ];
}

function KartuProduk({ produk }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
      {/* next/image = otomatis optimasi, wajib width & height */}
      <Image
        src={produk.gambar}
        alt={produk.nama}
        width={300}
        height={200}
        className="rounded-lg object-cover w-full h-32"
      />
      <h3 className="font-bold text-lg mt-3">{produk.nama}</h3>
      <p className="text-[#2E5B44] font-semibold">Rp {produk.harga.toLocaleString("id-ID")}</p>
      <button className="mt-2 w-full bg-[#2E5B44] text-white py-2 rounded-lg hover:bg-[#234535]">
        + Keranjang
      </button>
    </div>
  );
}

export default async function ProdukPage() {
  const produk = await ambilProduk();
  return (
    <div className={inter.className}>
      <h1 className="text-3xl font-bold mb-2">Katalog Warung</h1>
      <p className="text-gray-600 mb-6">Foto otomatis kecil, font tidak kedip, grid rapi di HP & laptop</p>

      {/* Grid: HP 1 kolom, tablet 2, laptop 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {produk.map((p) => (
          <KartuProduk key={p.id} produk={p} />
        ))}
      </div>
    </div>
  );
}

// ── next.config.js — izinkan gambar dari luar (wajib untuk next/image) ──
// Tambahkan ini jika gambar tidak muncul:
/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: { remotePatterns: [{ hostname: "images.unsplash.com" }] },
// };
// export default nextConfig;
```

**Cara pakai:**
1. Jika `next/image` dengan link luar error `hostname not configured` → buka `next.config.mjs` di root, tambah `remotePatterns` seperti komentar di atas, restart `npm run dev`.
2. Semua `className="..."` adalah Tailwind — sudah aktif karena kamu pilih `--tailwind` saat create.

---

## Konsep Kunci

### 3 Cara Styling — Pilih Sesuai Warung
- **Global CSS** (`app/globals.css`) = **cat seluruh ruko** — untuk reset, font dasar. Dipakai sekali di `layout.js`.
- **CSS Modules** (`Kartu.module.css`) = **cat per ruangan** — `import styles from "./Kartu.module.css"` → tidak bentrok antar komponen. Cocok jika tidak pakai Tailwind.
- **Tailwind CSS** = **palet stiker** — `className="border p-4 rounded-xl"` langsung jadi. Tidak bikin file baru. **Rekomendasi untuk pemula** karena cepat & responsif (`sm:`, `lg:`).

### `next/image` — Foto Pintar
- Wajib `width` & `height` (atau `fill` + parent `relative`) — kalau tidak, gambar 0px.
- Otomatis: ubah ke WebP, lazy load, responsive size. Lebih cepat 70% dari `<img>`.
- Gambar luar wajib daftar `hostname` di `next.config.mjs`.

### `next/font` — Huruf Anti Kedip
- `import { Inter } from "next/font/google"` → Next.js download & host sendiri, tidak minta Google tiap load → tidak ada "kedip ganti font".
- Pakai di `layout.js`: `<body className={inter.className}>`.

### Responsif = Grid yang Pintar
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` = HP 1 kolom, tablet 2, laptop 3. Tidak perlu media query manual.

---

## Penjelasan untuk Pemula

### Analogi: Dekorasi Ruko

- **Global CSS** = cat tembok luar — semua lihat sama.
- **CSS Modules** = wallpaper per kamar — kamar A biru, kamar B hijau, tidak campur.
- **Tailwind** = stiker IKEA — tempel `p-4` (padding), `rounded-xl` (sudut tumpul), langsung jadi tanpa potong triplek.
- **`next/image`** = foto produk yang dicetak 3 ukuran (kecil untuk HP, besar untuk laptop) — pelanggan HP tidak dipaksa download foto raksasa.
- **`next/font`** = huruf yang sudah diukir di kayu, bukan stiker yang baru ditempel saat buka pintu (makanya tidak kedip).

### Cara Komputer Membaca

1. Kamu tulis `className="grid grid-cols-1 lg:grid-cols-3"` → Tailwind ubah jadi CSS final saat `npm run dev`.
2. Kamu pakai `<Image width={300} height={200}>` → Next.js saat `npm run build` buat 3 versi gambar (300w, 600w, 1200w) + WebP.
3. Browser HP minta gambar → server kirim yang 300w saja → hemat kuota.

### 3 Istilah Wajib

1. **Tailwind** = framework CSS pakai class siap pakai, tidak tulis CSS manual.
2. **Responsive** = tampilan menyesuaikan lebar layar (HP vs laptop).
3. **Lazy loading** = gambar di bawah tidak di-load sampai di-scroll → cepat di awal.

### Kesalahan Umum

- Lupa `width`/`height` di `next/image` → gambar tidak muncul (0px).
- Lupa `remotePatterns` → error `Invalid src prop`.
- Pakai `class` bukan `className` di JSX → React protes, harus `className`.

---

## Eksperimen

- **Hijau:** Ganti `bg-[#2E5B44]` jadi `bg-red-600`, `grid-cols-3` jadi `grid-cols-4` → lihat perubahan langsung.
- **Kuning:** Tambah `hover:scale-105 transition` di `KartuProduk` → kartu membesar saat hover.
- **Merah:** Ganti `<Image>` jadi `<img>` biasa dengan foto 3MB asli, buka tab Network (F12) → lihat size 3MB vs `next/image` 80KB. Kembalikan ke `Image`.

---

## Tantangan

**Pilih satu:**

**A. Landing Page Warung:** Buat halaman `/` dengan: Hero (gambar besar + judul + tombol WA), Grid Fitur (3 kartu: Gratis Antar, Segar, Bayar COD), Footer. Pakai Tailwind + `next/image` + `next/font`.

**B. Katalog Estetik:** Ubah `/produk` jadi 3 kolom cantik, tambah badge `Diskon 10%` dengan `className="bg-red-500 text-white px-2 py-1 rounded-full text-xs"`.

Kriteria: HP 1 kolom, laptop 3 kolom (cek dengan kecilkan browser), dan `next/image` dipakai (bukan `<img>`).

---

## Glosarium Mini

- **Tailwind**: utility CSS tanpa bikin file
- **next/image**: komponen gambar pintar Next.js
- **next/font**: loader font tanpa kedip
- **Grid**: tata letak kotak-kotak
- **Responsive**: menyesuaikan HP/laptop

---

## Ringkasan

Minggu 4 dari 12: **Styling & Optimasi** (Level: Pemula). Kamu sudah cat ruko (Tailwind), pasang foto ringan (`next/image`), dan huruf anti-kedip (`next/font`). **Selesai fase Pemula!** Minggu depan naik ke Menengah: **Data Fetching** — ambil data beneran dari API / database, bukan array hardcode.
