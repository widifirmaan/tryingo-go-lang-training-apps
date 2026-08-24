# JSX & Komponen Dasar — Bata LEGO Website

> **Kategori:** React | **Level:** Pemula | **Minggu 1:** JSX & Komponen Dasar

## Tujuan Pembelajaran

- Memahami JSX: menulis HTML di dalam JavaScript (bukan file terpisah)
- Membuat komponen pertama — fungsi yang return JSX, nama huruf kapital
- Memakai `{}` untuk sisipkan data JavaScript di dalam HTML
- Aturan JSX: 1 bungkus utama atau Fragment `<>`, semua tag tutup, `className` bukan `class`
- Menjalankan proyek React pertama dengan Vite (`npm create vite@latest`)

---

## Kenapa Ini Penting Buat Kamu?

Warung, sekolah, UMKM — semua butuh halaman yang rapi dan bisa dipakai ulang. React = **sistem LEGO**: kamu bikin 1 bata `KartuProduk`, bisa pakai 100 kali dengan isi beda. Tidak copy-paste 100x.

Minggu ini kamu tidak hafal teori. Kamu akan **punya website React beneran** yang bisa di-klik di laptopmu, bukan hanya `console.log`.

---

## Program: Katalog Warung dengan Komponen

Bikin 1 komponen `KartuProduk` dan pakai ulang 3x dari `App`.

```jsx
// ── src/App.jsx — Aplikasi Utama ──
// 1 komponen = 1 fungsi yang return JSX (HTML di dalam JS)

// Komponen KartuProduk: 1 cetakan, dipakai banyak kali
function KartuProduk({ nama, harga }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, background: "white" }}>
      <h3>{nama}</h3>
      <p style={{ color: "#2E5B44", fontWeight: "bold" }}>
        Rp {harga.toLocaleString("id-ID")}
      </p>
      <span style={{ background: "#EFECE6", padding: "4px 8px", borderRadius: 8 }}>
        Stok: tersedia
      </span>
    </div>
  );
}

// Komponen Welcome: contoh conditional dengan {}
function Sapaan() {
  const nama = "Bu Siti";
  const jam = new Date().getHours();
  const sapaan = jam < 12 ? "Selamat pagi" : jam < 18 ? "Selamat siang" : "Selamat malam";

  return (
    <div style={{ background: "#2E5B44", color: "white", padding: 16, borderRadius: 12, marginBottom: 16 }}>
      <h1>{sapaan}, {nama}! 👋</h1>
      <p>Mode: {jam < 18 ? "Toko Buka" : "Toko Tutup"}</p>
    </div>
  );
}

// App: susun LEGO
export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, background: "#FBF9F5", minHeight: "100vh" }}>
      <Sapaan />

      <h2>Produk Hari Ini</h2>
      {/* 1 komponen, 3 isi berbeda — seperti 1 cetakan kue, 3 rasa */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        <KartuProduk nama="Beras 5kg" harga={62000} />
        <KartuProduk nama="Bayam" harga={5000} />
        <KartuProduk nama="Telur 1kg" harga={28000} />
      </div>

      <p style={{ marginTop: 16, color: "gray" }}>
        Tips: Ubah angka harga di atas, simpan — langsung berubah di browser (hot reload)
      </p>
    </div>
  );
}
```

> Jalankan: lihat **Penjelasan Pemula → Langkah 1-3**.

---

## Konsep Kunci

### JSX = HTML di Dalam JavaScript
Dulu HTML, CSS, JS pisah file. Di React, **logika & tampilan satu tempat** (fungsi). JSX terlihat seperti HTML tapi di-compile jadi JavaScript. Bisa sisipkan variabel: `<p>{nama}</p>`.

### Komponen = Fungsi yang Return JSX
- Nama **huruf kapital** (`KartuProduk`, bukan `kartuProduk`) — aturan React untuk bedakan dari tag HTML.
- Bisa dipakai ulang: `<KartuProduk />` 3x = 3 kartu berbeda.

### Aturan JSX (3 saja)
1. **1 bungkus**: `return ( <div> <h1/> <p/> </div> )` atau `<> <h1/> <p/> </>` (Fragment tanpa div ekstra).
2. **Tag tutup**: `<img />` dan `<br />` harus ada `/`.
3. **camelCase**: `class` → `className`, `for` → `htmlFor`, `stroke-width` → `strokeWidth`.

### Kurawal `{}` = Pintu ke JavaScript
Di dalam JSX, `{}` buka pintu ke JS: `{nama}`, `{harga * 1.1}`, `{isBuka ? "Buka" : "Tutup"}`, `{produk.map(p => <li>{p.nama}</li>)}`.

---

## Penjelasan untuk Pemula

### Analogi: LEGO

- **Komponen = bata LEGO**: 1 bata pintu, bisa pakai di 10 rumah. `KartuProduk` = bata kartu.
- **`App` = denah rumah**: susun bata jadi rumah. `App` susun `Sapaan` + 3 `KartuProduk`.
- **Props (minggu depan) = stiker di bata**: sama bata, stiker beda (nama/harga beda).

### Langkah 0-3 — Buat Proyek React (5 Menit)

**0. Siapkan Node.js & VS Code** (jika sudah dari Next.js, skip): `nodejs.org` LTS, `code.visualstudio.com`.

**1. Buat proyek Vite:**
Buka PowerShell, ketik baris per baris:
```
npm create vite@latest toko-react -- --template react
cd toko-react
npm install
npm run dev
```
Pilih `React` → `JavaScript` saat ditanya. Tunggu, lalu `npm run dev` akan muncul `Local: http://localhost:5173`.

**2. Buka di browser:** `http://localhost:5173` → lihat logo React berputar. Berarti listrik nyala.

**3. Ganti isi:**
- Buka `toko-react` di VS Code
- Buka `src/App.jsx` → **hapus semua**, tempel kode Program di atas
- Simpan (`Ctrl+S`) → browser otomatis reload, lihat katalog warung!

**Jika error merah:** baca baris pertama error. Sering: lupa tutup tag atau `class` bukan `className`. Ganti jadi `className`.

### Cara Komputer Membaca

1. `npm run dev` → Vite nyalakan server lokal (5173).
2. Browser minta `/` → Vite kirim `App.jsx` → React ubah JSX jadi HTML nyata.
3. Kamu ubah `harga={62000}` jadi `70000` → Vite deteksi file berubah → kirim update tanpa reload penuh (HMR).

### 3 Istilah Wajib

1. **Komponen**: fungsi yang return tampilan (JSX).
2. **JSX**: HTML di dalam JS, pakai `{}` untuk data.
3. **Fragment `<>`**: bungkus tanpa nambah div di HTML.

---

## Eksperimen

- **Hijau:** Ubah `nama="Beras 5kg"` jadi nama tokomu, ubah harga → simpan.
- **Kuning:** Buat komponen baru `LencanaStok({ ada })` yang return `"Tersedia"` / `"Habis"` pakai ternary `{ada ? "Tersedia" : "Habis"}`.
- **Merah:** Sengaja tulis `class="card"` (bukan `className`), lihat warning React di console. Perbaiki → warning hilang.

---

## Tantangan

**Pilih satu:**

**A. Katalog Warung Lengkap:** Tambah komponen `Header` (judul + jam buka) dan `Footer` (WA). Susun di `App`: `Header` → `Sapaan` → 6 `KartuProduk` (data hardcode) → `Footer`.

**B. Profil Guru:** Komponen `Avatar` (foto bulat), `InfoGuru` (nama/mapel), `DaftarJadwal` (map array hari). Render di `App`.

Kriteria: `npm run dev` tanpa error, dan 1 komponen dipakai minimal 3x dengan data beda.

---

## Glosarium Mini

- **JSX**: syntax HTML di JS
- **Komponen**: fungsi pembuat UI
- **Fragment**: bungkus transparan `<>`
- **Vite**: alat pembuat proyek React super cepat
- **HMR**: reload otomatis tanpa refresh manual

---

## Ringkasan

Minggu 1 dari 12: **JSX & Komponen Dasar** (Level: Pemula). Kamu sudah paham LEGO React: 1 bata (`KartuProduk`) → pakai 3x. Minggu depan: **Props & Data Flow** — cara kirim data dari induk ke anak (seperti amplop dari bos ke staf).
