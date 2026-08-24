# Setup & Konsep Dasar — Website Pertamamu dengan Next.js

> **Kategori:** Next.js | **Level:** Pemula | **Minggu 1:** Setup & Konsep Dasar

## Tujuan Pembelajaran

- Memahami Next.js dengan analogi: React = bata, Next.js = rumah jadi dengan listrik & pipa sudah terpasang
- Menginstall Node.js, VS Code, dan membuat proyek pertama dengan `create-next-app` (tanpa skip langkah)
- Menjalankan website di `localhost:3000` dan melihat perubahan langsung
- Memahami denah folder `app/` — folder = alamat URL, file `page.js` = halamannya
- Memahami `layout.js` (bingkai yang membungkus semua halaman) dan `metadata` (judul tab browser untuk Google)

---

## Kenapa Ini Penting Buat Kamu (Non-IT)?

Kamu tidak perlu jadi programmer untuk butuh website. Warung butuh katalog online, guru butuh halaman nilai, UMKM butuh landing page produk. Next.js adalah **toko bangunan lengkap**: kalau React hanya memberi bata (komponen), Next.js sudah memberi denah (routing), instalasi listrik (server), dan dekorasi (optimasi) — jadi kamu tinggal isi perabot.

Minggu ini kamu **tidak menghafal teori**. Kamu akan **punya website beneran** yang bisa dibuka di HP-mu sendiri.

---

## Program: Website Warung Pertama

Salin semua file di bawah ke proyekmu (langkah instal ada di Penjelasan Pemula). Ini adalah website 2 halaman yang **bisa langsung jalan**.

```jsx
// ── app/layout.js — BINGKAI UTAMA (seperti kusen rumah, membungkus semua halaman) ──
export const metadata = {
  title: "Warung Bu Siti — Katalog Online",
  description: "Katalog produk segar Warung Bu Siti, buka tiap hari 07.00-20.00",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ fontFamily: "sans-serif", margin: 0 }}>
        <header style={{ background: "#2E5B44", color: "white", padding: 16 }}>
          <strong>Warung Bu Siti</strong> — Jl. Melati No. 12
        </header>
        <main style={{ padding: 24 }}>{children}</main>
        <footer style={{ background: "#EFECE6", padding: 16, textAlign: "center" }}>
          © 2026 Warung Bu Siti — WA 0812-3456-7890
        </footer>
      </body>
    </html>
  );
}

// ── app/page.js — HALAMAN UTAMA (alamat: / ) ──
export default function HomePage() {
  return (
    <div>
      <h1>Selamat Datang di Warung Bu Siti 🥬</h1>
      <p>Sayur segar, antar gratis untuk RW 01-03.</p>
      <a href="/about" style={{ color: "#2E5B44", fontWeight: "bold" }}>
        → Lihat Tentang Kami
      </a>

      <h2 style={{ marginTop: 24 }}>Produk Hari Ini</h2>
      <ul>
        <li>Bayam — Rp 5.000 / ikat</li>
        <li>Telur Ayam — Rp 28.000 / kg</li>
        <li>Beras 5kg — Rp 62.000</li>
      </ul>
    </div>
  );
}

// ── app/about/page.js — HALAMAN TENTANG (alamat: /about) ──
export default function AboutPage() {
  return (
    <div>
      <h1>Tentang Kami</h1>
      <p>Warung Bu Siti buka sejak 2018. Pesan via WA, bayar COD / Transfer.</p>
      <p>Jam buka: 07.00 — 20.00 WIB</p>
      <a href="/">← Kembali ke Beranda</a>
    </div>
  );
}
```

> Cara menjalankan: lihat **Penjelasan untuk Pemula → Langkah 1-4** di bawah. Setelah `npm run dev`, buka `http://localhost:3000` dan klik linknya.

---

## Konsep Kunci

### Next.js = Rumah Jadi, React = Bata Saja
React mengharuskan kamu pasang router, atur server, optimasi gambar sendiri. Next.js sudah menyertakan semua — kamu fokus isi konten.

### App Router: Folder = Alamat URL
Ini aturan emas yang harus diingat:
- `app/page.js` → alamat `/` (beranda)
- `app/about/page.js` → alamat `/about`
- `app/produk/[id]/page.js` → alamat `/produk/123` (dinamis, minggu depan)

Ganti nama folder = ganti alamat. Tidak perlu config router.

### layout.js vs page.js
- `layout.js` = **kusen & dinding** — membungkus, tidak ganti saat pindah halaman (header/footer tetap).
- `page.js` = **isi ruangan** — yang ganti tiap alamat.
- `metadata` = **papan nama di depan toko** — dibaca Google dan tampil di tab browser.

### Server Component (Default)
Semua file di `app/` adalah Server Component: dirender di server, lebih ringan, lebih cepat untuk SEO. Tidak perlu `useState` minggu ini. Interaktif (`"use client"`) baru minggu 3.

---

## Penjelasan untuk Pemula (Wajib Baca Jika Baru Pertama Kali Coding)

### Analogi: Membangun Ruko

- **Node.js** = **listrik & air** — tanpa ini, alat bangunan (Next.js) tidak bisa nyala. Install sekali.
- **npm** = **toko bahan bangunan** — tempat ambil bata, cat (library) dengan perintah `npm install`.
- **Terminal / PowerShell** = **walkie-talkie ke tukang** — kamu ketik perintah teks, komputer kerjakan.
- **VS Code** = **meja gambar arsitek** — tempat kamu tulis & edit denah (kode).
- **`npx create-next-app`** = **pesan ruko jadi** — Next.js sudah bikinkan pondasi, denah, instalasi. Kamu tinggal isi etalase.

### Langkah 0 — Siapkan Alat (5 Menit, Sekali Saja)

1. **Install Node.js LTS**: Buka `nodejs.org`, klik tombol hijau **LTS** (bukan Current), download `.msi`, klik Next → Next → Install. Nanti cek: buka **Terminal** (Windows: tekan `Win` + ketik `PowerShell`) lalu ketik:
   ```
   node -v
   npm -v
   ```
   Jika muncul angka `v22.x` dan `10.x` berarti berhasil. Jika `not recognized`, tutup Terminal dan buka lagi.

2. **Install VS Code**: Buka `code.visualstudio.com` → Download → Install.

### Langkah 1 — Buat Proyek (2 Menit)

Di PowerShell, ketik **baris per baris**, tekan Enter setiap baris:
```
npx create-next-app@latest warung-bu-siti --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
- Saat ditanya `Use Turbopack?` → pilih **No** (untuk pemula lebih stabil) atau Yes tidak apa.
- Tunggu 1-2 menit sampai selesai.

```
cd warung-bu-siti
npm run dev
```
Jika berhasil, akan muncul: `Ready on http://localhost:3000`

### Langkah 2 — Buka Website

Buka browser Chrome → ketik `http://localhost:3000` → kamu akan lihat halaman default Next.js. Berarti **listrik sudah nyala**.

### Langkah 3 — Ganti Isi (Seperti Ganti Spanduk Toko)

1. Buka folder `warung-bu-siti` di VS Code: `File → Open Folder`
2. Buka file `src/app/page.tsx` (atau `src/app/page.js` jika pilih JS), **hapus semua isinya**, tempel kode `HomePage` dari Program di atas.
3. Buka `src/app/layout.tsx`, ganti isinya dengan kode `RootLayout` di atas.
4. Buat folder `src/app/about`, buat file `page.tsx` di dalamnya, tempel kode `AboutPage`.
5. Kembali ke browser → otomatis reload! Klik link → pindah halaman tanpa reload penuh.

**Jika error merah**: baca pesan — biasanya typo. `console.log` tidak dibutuhkan minggu ini, cukup lihat browser.

### Cara Komputer Membaca (Trace Singkat)

1. Kamu ketik `npm run dev` → Node.js menyalakan server kecil di laptopmu (port 3000).
2. Browser minta `/` → Next.js cari `app/page.js` → render `RootLayout` (bingkai) + `HomePage` (isi).
3. Browser minta `/about` → Next.js cari `app/about/page.js` → render `RootLayout` yang SAMA + `AboutPage`.

Itulah kenapa header/footer tidak kedip saat pindah halaman — **layout tidak di-render ulang**.

### 3 Istilah Wajib (Hafalkan Ini Saja)

1. **Route** = alamat. `/` dan `/about` adalah dua route. Di Next.js, **folder = route**.
2. **Layout** = bingkai tetap. Sekali tulis, dipakai semua halaman.
3. **Metadata** = judul & deskripsi untuk Google. Ditulis sebagai `export const metadata = { title: ... }`.

---

## Eksperimen (Coba Satu Persatu, Jangan Sekaligus)

- **Hijau (Aman):** Ubah teks `Warung Bu Siti` jadi nama tokomu, ubah harga produk, simpan → lihat browser berubah.
- **Kuning (Coba):** Buat halaman baru: folder `src/app/kontak` + file `page.tsx` berisi `<h1>Hubungi Kami</h1>`. Buka `/kontak` — langsung jadi!
- **Merah (Debug):** Sengaja hapus `export default` di `page.js` dan lihat error: `The default export is not a React Component`. Pasang lagi → error hilang. Ini cara paham kenapa export penting.

---

## Tantangan

**Pilih salah satu (jangan dua-duanya):**

**A. Katalog Warung (UMKM):** Buat 3 halaman: Beranda (sambutan + 3 produk), Produk (`/produk` daftar 6 produk), Kontak (`/kontak` alamat + WA). Semua pakai `RootLayout` yang sama.

**B. Profil Guru:** Beranda (foto + nama), Jadwal (`/jadwal` tabel Senin-Jumat), Kontak. Gunakan `metadata` berbeda tiap halaman untuk SEO.

Kriteria selesai: `npm run dev` tanpa error merah, dan 3 route bisa diklik bolak-balik.

---

## Glosarium Mini

- **Node.js**: mesin yang menjalankan JavaScript di luar browser (di laptop/server)
- **npm**: toko untuk download kode orang lain
- **Terminal**: kotak hitam untuk ketik perintah
- **localhost:3000**: alamat website yang hanya hidup di laptopmu sendiri
- **App Router**: sistem denah Next.js modern (folder = URL), pengganti Pages Router lama

---

## Ringkasan

Minggu 1 dari 12: **Setup & Konsep Dasar** (Level: Pemula). Kamu sudah menyalakan listrik (Node.js), memesan ruko jadi (create-next-app), dan mengisi 2 ruangan (route `/` dan `/about`). Minggu depan: **Routing & Navigation** — bikin alamat dinamis seperti `/produk/123` untuk tiap produk tanpa bikin 100 folder manual.
