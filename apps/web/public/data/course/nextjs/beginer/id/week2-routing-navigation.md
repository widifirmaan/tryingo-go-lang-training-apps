# Routing & Navigation — Alamat Toko yang Otomatis

> **Kategori:** Next.js | **Level:** Pemula | **Minggu 2:** Routing & Navigation

## Tujuan Pembelajaran

- Memahami file-based routing: **1 folder = 1 alamat** — buat halaman baru tanpa setting router
- Membuat halaman dinamis `[id]` — 1 template untuk 100 produk (seperti 1 formulir untuk semua nomor kamar hotel)
- Menggunakan `<Link>` dari `next/link` untuk pindah halaman tanpa reload (lebih cepat dari `<a>`)
- Memahami `layout.js` bersarang — bingkai khusus untuk bagian toko (misal: semua halaman `/produk` punya sidebar)
- Mengambil parameter URL dengan `params` (di Server Component)

---

## Kenapa Ini Penting Buat Kamu?

Minggu lalu kamu punya 2 alamat: `/` dan `/about`. Bayangkan warungmu punya 50 produk. Masa bikin 50 folder manual? **Routing dinamis** = kamu bikin 1 cetakan (`[id]`), lalu Next.js otomatis isi sesuai nomor produk. Seperti **cap stempel**: 1 stempel, bisa cap 100 kertas dengan nomor berbeda.

Tanpa ini, kamu akan capek duplikasi. Dengan ini, 1 file melayani semua.

---

## Program: Katalog Produk Multi-Halaman

Kita akan buat 3 alamat: daftar produk, detail produk, dan kategori.

```jsx
// ── app/layout.js (tetap sama, tambah navigasi) ──
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ fontFamily: "sans-serif", margin: 0 }}>
        <nav style={{ background: "#2E5B44", padding: 12, display: "flex", gap: 16 }}>
          <Link href="/" style={{ color: "white", fontWeight: "bold" }}>Beranda</Link>
          <Link href="/produk" style={{ color: "white" }}>Produk</Link>
          <Link href="/about" style={{ color: "white" }}>Tentang</Link>
        </nav>
        <main style={{ padding: 24 }}>{children}</main>
      </body>
    </html>
  );
}

// ── app/produk/page.js — DAFTAR (alamat: /produk) ──
import Link from "next/link";

const DAFTAR = [
  { id: "1", nama: "Beras 5kg", harga: 62000 },
  { id: "2", nama: "Minyak 2L", harga: 34000 },
  { id: "3", nama: "Telur 1kg", harga: 28000 },
];

export default function ProdukPage() {
  return (
    <div>
      <h1>Daftar Produk</h1>
      <p>Klik produk untuk lihat detail:</p>
      <ul>
        {DAFTAR.map((p) => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <Link href={`/produk/${p.id}`} style={{ color: "#2E5B44" }}>
              {p.nama} — Rp {p.harga.toLocaleString("id-ID")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── app/produk/[id]/page.js — DETAIL DINAMIS (alamat: /produk/1, /produk/2, ...) ──
// File ini SATU saja, tapi melayani semua ID produk
export default function DetailProduk({ params }) {
  const { id } = params; // Next.js isi otomatis dari URL

  const DATA = {
    "1": { nama: "Beras 5kg", harga: 62000, deskripsi: "Beras pulen, cocok untuk nasi harian." },
    "2": { nama: "Minyak 2L", harga: 34000, deskripsi: "Minyak sawit jernih, 2 liter." },
    "3": { nama: "Telur 1kg", harga: 28000, deskripsi: "Telur segar, isi ~16 butir." },
  };

  const produk = DATA[id];

  // Jika ID tidak ada (misal /produk/999), tampilkan pesan
  if (!produk) {
    return (
      <div>
        <h1>Produk tidak ditemukan</h1>
        <Link href="/produk">← Kembali ke daftar</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{produk.nama}</h1>
      <p style={{ fontSize: 20, fontWeight: "bold" }}>Rp {produk.harga.toLocaleString("id-ID")}</p>
      <p>{produk.deskripsi}</p>
      <p style={{ color: "gray" }}>ID Produk: {id}</p>
      <Link href="/produk">← Kembali</Link>
    </div>
  );
}

// ── app/produk/layout.js — BINGKAI KHUSUS PRODUK (opsional, bersarang) ──
export default function ProdukLayout({ children }) {
  return (
    <div style={{ border: "2px solid #EFECE6", borderRadius: 12, padding: 16 }}>
      <p style={{ color: "#2E5B44", fontWeight: "bold" }}>📦 Bagian Produk</p>
      {children}
    </div>
  );
}
```

**Cara coba:**
1. Letakkan file sesuai jalur di atas (`src/app/produk/page.js`, `src/app/produk/[id]/page.js`, `src/app/produk/layout.js`)
2. Buka `/produk` → klik salah satu → URL berubah jadi `/produk/2` **tanpa kedip layout utama** (karena `RootLayout` tidak re-render).
3. Coba ketik manual `/produk/999` → lihat pesan "tidak ditemukan".

---

## Konsep Kunci

### File-Based Routing = Denah Otomatis
Kamu tidak tulis `if URL == "/produk" tampilkan ini`. Cukup **bikin file** di tempat yang benar, Next.js yang urus pemetaan. Salah taruh file = salah alamat. Mudah dihafal: `app` = lantai dasar, folder di dalamnya = ruangan.

### Dynamic Route `[id]` = Cetakan Serbaguna
Tanda kurung siku `[]` artinya "ini variabel, isi nanti". `[id]` bisa jadi `1`, `2`, `abc`. Di dalam kode, kamu ambil via `function Page({ params }) { const { id } = params }`. Di Next.js 15+, `params` adalah Promise → tulis `await params` (tapi untuk minggu ini, pakai `params` biasa dulu agar tidak bingung; upgrade nanti).

### `<Link>` vs `<a>`
- `<a href="/produk">` = **bongkar pasang rumah** — browser reload full, lambat, state hilang.
- `<Link href="/produk">` = **pintu geser** — Next.js ganti isi saja, cepat, header tidak kedip. **Selalu pakai `Link` untuk navigasi internal.** Pakai `<a>` hanya untuk link ke luar (google.com).

### Layout Bersarang = Bingkai di Dalam Bingkai
`app/layout.js` bungkus semua. `app/produk/layout.js` hanya bungkus yang di dalam `/produk/*`. Cocok untuk sidebar kategori, breadcrumb, dll. Tidak perlu tulis ulang navigasi tiap halaman.

---

## Penjelasan untuk Pemula

### Analogi: Nomor Kamar Hotel

- **Alamat `/produk`** = **lobi hotel** — daftar semua kamar.
- **Alamat `/produk/1`** = **kamar nomor 1** — semua kamar bentuknya sama (1 tempat tidur, 1 AC), hanya penghuninya beda. Itulah `[id]`: **1 desain, banyak isi**.
- **`<Link>`** = **lift ekspres** — langsung ke lantai tujuan tanpa keluar gedung (tanpa reload). `<a>` = keluar gedung, masuk lagi lewat pintu depan (lambat).

### Cara Komputer Membaca

1. User klik `<Link href="/produk/2">` → Next.js lihat `href` = `/produk/2`
2. Next.js cari: ada folder `app/produk`? Ya. Ada folder `[id]` di dalamnya? Ya (artinya dinamis). Cocokkan `2` sebagai `id`.
3. Next.js panggil `DetailProduk({ params: { id: "2" } })` → render HTML → kirim ke browser.

Jika kamu pakai `<a>` biasa, langkah 1 jadi `browser minta server reload full` — lebih lambat, lampu header kedip.

### 3 Istilah Wajib

1. **Dynamic Route** = alamat dengan variabel `[id]`. 1 file, banyak URL.
2. **params** = amplop yang dikirim Next.js berisi variabel URL (`{ id: "2" }`).
3. **Nested Layout** = layout di dalam layout. Induk tetap, anak tambah bingkai.

### Kesalahan Umum Pemula (Biar Tidak Panik)

- **Lupa `Link` import** → `Link is not defined`. Solusi: `import Link from "next/link"` di atas.
- **Salah eja folder** → `app/produk/[id]/page.js` harus huruf kecil, `[id]` pakai kurung siku.
- **Pakai `href="/produk/ " + id` dengan spasi** → URL jadi `%20`. Tulis `href={`/produk/${p.id}`}` tanpa spasi.

---

## Eksperimen

- **Hijau:** Tambah 2 produk lagi di `DAFTAR` (id 4, 5). Klik → cek apakah detail otomatis muncul? Ya, karena 1 template.
- **Kuning:** Ganti `DATA` di detail dengan foto: tambah field `gambar: "https://..."` dan tampilkan `<img src={produk.gambar} width={200} />`.
- **Merah:** Sengaja ganti `href={`/produk/${p.id}`}` jadi `href="/produk/p.id"` (string literal, bukan template). Klik → semua link ke `/produk/p.id` dan tampil "tidak ditemukan". Perbaiki lagi.

---

## Tantangan

**Pilih satu:**

**A. Warung Lengkap:** Tambah rute `/produk/kategori/[nama]` — misal `/produk/kategori/sayur` tampil hanya produk sayur. Gunakan folder `kategori` + `[nama]` dinamis ke-2.

**B. Blog Sederhana:** Buat `/blog` (daftar 3 post), `/blog/[slug]` (detail), dan `/blog/layout.js` yang menampilkan "✍️ Blog Warung" di atas setiap post.

Kriteria: 3 level alamat jalan: `/` → `/produk` → `/produk/2`, dan `Link` dipakai (bukan `<a>`).

---

## Glosarium Mini

- **Route**: alamat URL (`/produk/2`)
- **Dynamic Route**: route variabel (`[id]`)
- **Link**: komponen Next.js untuk navigasi cepat
- **params**: objek berisi nilai URL dinamis
- **Nested Layout**: layout di subfolder yang menambah bingkai

---

## Ringkasan

Minggu 2 dari 12: **Routing & Navigation** (Level: Pemula). Kamu sudah paham denah otomatis (folder=URL) dan bikin **1 cetakan untuk 100 produk** (`[id]`). Minggu depan: **Server & Client Components** — kenapa ada komponen yang di server (cepat, aman) dan ada yang di browser (bisa diklik), dan kapan pakai `"use client"`.
