# Server & Client Components — Dapur vs Meja Pelanggan

> **Kategori:** Next.js | **Level:** Pemula | **Minggu 3:** Server & Client Components

## Tujuan Pembelajaran

- Memahami 2 jenis komponen Next.js: **Server Component** (masak di dapur, default) vs **Client Component** (di meja pelanggan, butuh `"use client"`)
- Tahu kapan pakai mana: Server untuk ambil data & tampil, Client untuk klik, ketik, hitung
- Memahami aturan emas: **Server boleh import Client, Client tidak boleh import Server** (seperti dapur boleh antar ke meja, meja tidak bisa masuk dapur)
- Membuat komponen interaktif sederhana dengan `useState` tanpa merusak performa
- Menggabungkan keduanya: Server ambil daftar produk, Client saring pencarian

---

## Kenapa Ini Penting Buat Kamu?

Bayangkan warung Bu Siti: **Dapur (server)** masak nasi goreng, **Meja pelanggan (browser)** tempat pelanggan tambah sambal, pesan es teh. Jika semua masak di meja, warung penuh asap. Jika semua di dapur, pelanggan tidak bisa atur rasa.

Next.js App Router **default = dapur** (Server). Ini bikin website cepat & hemat kuota (cocok HP kentang di desa). Hanya yang perlu interaksi (tombol, input) yang pindah ke meja (`"use client"`). Salah pilih = website lemot atau error `useState is not defined`.

---

## Program: Daftar Produk + Kotak Cari (Gabungan Server & Client)

Kita buat 1 Server Component yang ambil data, dan 1 Client Component untuk kotak pencarian.

```jsx
// ── app/produk/page.js — SERVER COMPONENT (default, tanpa "use client") ──
// Tugas: ambil data (seperti ambil stok dari gudang) — aman, cepat, tidak dikirim ke browser

// Simulasi ambil data dari database / API (di server)
async function ambilProduk() {
  // Nanti bisa diganti: await fetch("https://api.warung.com/produk")
  return [
    { id: "1", nama: "Beras 5kg", harga: 62000, kategori: "sembako" },
    { id: "2", nama: "Bayam", harga: 5000, kategori: "sayur" },
    { id: "3", nama: "Telur 1kg", harga: 28000, kategori: "sembako" },
    { id: "4", nama: "Cabai 250g", harga: 15000, kategori: "sayur" },
  ];
}

import KotakCari from "./KotakCari"; // Client Component di-import di Server — BOLEH

export default async function ProdukPage() {
  const produk = await ambilProduk(); // ← boleh await langsung, tidak perlu useEffect!

  return (
    <div>
      <h1>Produk Warung</h1>
      <p style={{ color: "gray" }}>Data diambil di server — cepat & SEO-friendly</p>
      {/* KotakCari adalah Client, ProdukList adalah Server */}
      <KotakCari daftar={produk} />
    </div>
  );
}

// ── app/produk/KotakCari.js — CLIENT COMPONENT (interaktif, di browser) ──
"use client"; // ← WAJIB baris pertama, tanpa ini useState error

import { useState } from "react";

export default function KotakCari({ daftar }) {
  const [cari, setCari] = useState("");

  // Filter di browser, tanpa minta server lagi
  const hasil = daftar.filter((p) =>
    p.nama.toLowerCase().includes(cari.toLowerCase())
  );

  return (
    <div>
      <input
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        placeholder="Cari: beras, bayam..."
        style={{ padding: 8, width: "100%", maxWidth: 300, border: "1px solid #ccc", borderRadius: 8 }}
      />
      <p style={{ color: "gray" }}>Menampilkan {hasil.length} dari {daftar.length} produk</p>

      <ul>
        {hasil.map((p) => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            {p.nama} — Rp {p.harga.toLocaleString("id-ID")} <span style={{ color: "gray" }}>({p.kategori})</span>
          </li>
        ))}
      </ul>

      {hasil.length === 0 && <p style={{ color: "red" }}>Tidak ada hasil untuk "{cari}"</p>}
    </div>
  );
}
```

**Aturan yang baru kamu pakai:**
- `app/produk/page.js` **tidak** pakai `"use client"` → tetap Server → boleh `async/await`.
- `KotakCari.js` pakai `"use client"` di **baris 1** → boleh `useState`, `onChange`, `onClick`.
- Server `import` Client = boleh. Sebaliknya = error!

---

## Konsep Kunci

### Server Component (Default)
- **Dimana:** di server (dapur). Tidak dikirim JS ke browser → ringan.
- **Bisa:** `await fetch()`, baca database, pakai `process.env` (API key aman).
- **Tidak bisa:** `useState`, `useEffect`, `onClick`, `window`.

### Client Component (`"use client"`)
- **Dimana:** di browser (meja pelanggan). Dikirim JS, bisa interaktif.
- **Bisa:** `useState`, `onClick`, `onChange`, akses `localStorage`.
- **Biaya:** menambah beban JS → pakai seperlunya, sekecil mungkin (hanya KotakCari, bukan seluruh halaman).

### Komposisi yang Benar
```
Server (page.js) 
  └─► Client (KotakCari.js)  ✅ BOLEH
Client 
  └─► Server                 ❌ TIDAK BOLEH (akan error)
```
Solusi jika butuh: pisah — Server kirim data sebagai `props` (seperti di atas: `daftar`).

### Kesalahan Pemula Paling Sering (2025)
- Taruh `"use client"` di `page.js` karena "biar bisa pakai useState" → seluruh halaman jadi berat. **Jangan.** Pisah komponen kecil saja.
- Lupa `"use client"` → error `useState is not defined`. Tambah di baris 1 file yang butuh interaktif.
- Pakai `useEffect` untuk fetch di Client → padahal bisa `await fetch()` langsung di Server (lebih cepat, tidak blink loading).

---

## Penjelasan untuk Pemula

### Analogi: Dapur & Meja

- **Server Component = Dapur**: masak nasi goreng (fetch data) di belakang, pelanggan hanya lihat piring jadi (HTML). Tidak perlu lihat kompor.
- **Client Component = Meja + Garpu**: pelanggan aduk sambal sendiri (ketik cari), tekan bel panggil pelayan (klik). Butuh tangan (browser).
- **`"use client"` = Stiker "Boleh Disentuh Pelanggan"**: tanpa stiker, piring hanya pajangan (tidak bisa diklik). Ditempel di file yang butuh disentuh saja, bukan seluruh restoran.

### Cara Komputer Membaca

1. Browser minta `/produk` → Server jalankan `ProdukPage()` → `await ambilProduk()` → dapat 4 item → render HTML.
2. Server lihat `KotakCari` adalah Client → kirim HTML + sedikit JS untuk KotakCari saja.
3. Di browser, user ketik "beras" → `useState` di `KotakCari` ubah `cari` → filter jalan **di browser**, tanpa minta server lagi → cepat.

### 3 Istilah Wajib

1. **`"use client"`** = penanda "file ini hidup di browser, boleh interaktif". Harus baris pertama.
2. **Props** = bungkusan data dari Server ke Client (`daftar={produk}`) — seperti dapur titip piring ke pelayan.
3. **Server-First** = prinsip Next.js: anggap semua di server, pindah ke client hanya jika butuh klik/ketik.

---

## Eksperimen

- **Hijau:** Ganti placeholder jadi `"Cari sayur..."` dan tambah produk baru di `ambilProduk()` → lihat filter otomatis ikut.
- **Kuning:** Buat komponen Client kedua `TombolHitung.js` dengan `useState` untuk hitung total belanja (klik +1). Import di `page.js` — cek tetap ringan.
- **Merah:** Pindahkan `"use client"` dari `KotakCari.js` ke `page.js`. Jalankan → lihat: halaman tetap jalan tapi bundle lebih besar (di Network tab, JS lebih berat). Kembalikan lagi ke kecil.

---

## Tantangan

**Pilih satu:**

**A. Warung Filter:** Tambah 2 tombol filter kategori di `KotakCari`: "Semua | Sembako | Sayur" — klik tombol saring `hasil` lagi.

**B. Dashboard Mini:** Server ambil daftar `[{nama, nilai}]` siswa, Client tampilkan input cari nama + tampilkan rata-rata nilai hasil filter.

Kriteria: 1 file Server (`page.js` async), 1 file Client (`"use client"`), dan data mengalir via `props` (bukan fetch ulang di Client).

---

## Glosarium Mini

- **Server Component**: komponen di server, default Next.js
- **Client Component**: komponen di browser, perlu `"use client"`
- **useState**: kotak penyimpanan yang bisa berubah saat diklik/diketik (hanya di Client)
- **props**: cara kirim data dari induk ke anak

---

## Ringkasan

Minggu 3 dari 12: **Server & Client Components** (Level: Pemula). Kamu sudah paham **dapur vs meja**: Server masak data (cepat, aman), Client tangani sentuhan (cari, klik). Minggu depan: **Styling & Optimasi** — bikin cantik dengan Tailwind & gambar yang tidak bikin kuota jebol.
