# Proyek Akhir: Design System & E-Commerce Storefront Responsif

> **Kategori:** CSS3 | **Level:** Design System, Animasi & Fitur Mutakhir | **Minggu 10:** Proyek Akhir: Design System & E-Commerce Storefront Responsif
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh kurikulum CSS3: Box Model, Flexbox, Grid, Clamp, Positioning, dan Animasi
- Membangun sistem Design Tokens terpadu berbasis palet OKLCH dengan Dark Mode adaptif instan
- Menerapkan header sticky glassmorphic dengan backdrop-filter dan z-index terisolasi
- Menata grid kartu produk yang sepenuhnya responsif tanpa media queries kaku (auto-fit + minmax)
- Memberikan pengalaman mikro-interaksi tombol dan kartu yang mulus di 60 FPS menggunakan GPU transitions

---

## Program: Aplikasi Toko Online Responsif dengan Dark Mode & Desain Modular

```html
<!DOCTYPE html>
<html lang="id" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tryngo Artisan Storefront</title>
  <style>
    /* 1. Global Reset & Box Model */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* 2. Comprehensive Design Tokens (OKLCH Color Palette) */
    :root {
      --brand: oklch(0.45 0.12 155);
      --brand-hover: oklch(0.38 0.12 155);
      --bg: oklch(0.97 0.01 95);
      --surface: oklch(1 0 0);
      --text: oklch(0.2 0.02 95);
      --text-muted: oklch(0.55 0.02 95);
      --border: oklch(0.9 0.01 95);
      --radius-sm: 8px;
      --radius-md: 16px;
      --radius-full: 9999px;
      --shadow: 0 4px 20px rgba(0,0,0,0.06);
      --shadow-hover: 0 12px 32px rgba(0,0,0,0.12);
      --ease: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    [data-theme="dark"] {
      --brand: oklch(0.68 0.14 155);
      --brand-hover: oklch(0.75 0.14 155);
      --bg: oklch(0.13 0.01 260);
      --surface: oklch(0.18 0.01 260);
      --text: oklch(0.96 0.01 95);
      --text-muted: oklch(0.68 0.02 95);
      --border: oklch(0.28 0.01 260);
      --shadow: 0 4px 20px rgba(0,0,0,0.3);
      --shadow-hover: 0 12px 32px rgba(0,0,0,0.5);
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* 3. Sticky Glassmorphic Header */
    .site-header {
      position: sticky;
      top: 0;
      background: color-mix(in srgb, var(--surface) 85%, transparent);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      z-index: 50;
      padding: 16px 0;
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand-logo { font-size: 1.3rem; font-weight: 800; color: var(--brand); text-decoration: none; }

    .theme-btn {
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 8px 16px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s var(--ease);
    }
    .theme-btn:active { transform: scale(0.95); }

    /* 4. Hero Section dengan Fluid Typography */
    .hero-banner {
      padding: clamp(40px, 8vw, 96px) 0;
      text-align: center;
    }
    .hero-banner h1 {
      font-size: clamp(2.2rem, 1.5rem + 3.5vw, 4.2rem);
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
    }

    /* 5. Responsive Product Grid (Auto-Fit & Minmax) */
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 28px;
      margin-bottom: 64px;
    }

    .product-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      transition: transform 0.3s var(--ease), box-shadow 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-hover);
    }

    .product-thumb {
      width: 100%;
      aspect-ratio: 4 / 3;
      background: #CBD5E1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #475569;
    }

    .product-info {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .product-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; }
    .product-price { font-size: 1.4rem; font-weight: 800; color: var(--brand); margin-bottom: 16px; }

    .btn-cart {
      margin-top: auto;
      background: var(--brand);
      color: white;
      border: none;
      padding: 12px;
      border-radius: var(--radius-sm);
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.15s ease;
    }
    .btn-cart:hover { background: var(--brand-hover); }
    .btn-cart:active { transform: scale(0.98); }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container nav-inner">
      <a href="#" class="brand-logo">Nusa Storefront</a>
      <button class="theme-btn" onclick="toggleTheme()">Alihkan Mode Gelap</button>
    </div>
  </header>

  <main class="container">
    <section class="hero-banner">
      <h1>Koleksi Hardware Dev Terpilih</h1>
      <p style="color: var(--text-muted); font-size: 1.15rem; max-width: 600px; margin: 0 auto;">Peralatan komputasi ergonomis berkinerja tinggi untuk para software architect dan developer profesional.</p>
    </section>

    <section class="product-grid">
      <article class="product-card">
        <div class="product-thumb">Display 4K 144Hz</div>
        <div class="product-info">
          <h3 class="product-title">Monitor OLED Kalibrasi Pro</h3>
          <p class="product-price">Rp 12.499.000</p>
          <button class="btn-cart">Tambah ke Keranjang</button>
        </div>
      </article>

      <article class="product-card">
        <div class="product-thumb">Keyboard 75% Custom</div>
        <div class="product-info">
          <h3 class="product-title">Mechanical Keyboard Gasket</h3>
          <p class="product-price">Rp 2.899.000</p>
          <button class="btn-cart">Tambah ke Keranjang</button>
        </div>
      </article>

      <article class="product-card">
        <div class="product-thumb">Ergonomic Chair Pro</div>
        <div class="product-info">
          <h3 class="product-title">Kursi Kerja Lumbar Support</h3>
          <p class="product-price">Rp 6.250.000</p>
          <button class="btn-cart">Tambah ke Keranjang</button>
        </div>
      </article>
    </section>
  </main>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
  </script>
</body>
</html>
```

---

## Konsep Kunci

### Anatomi Sistem Desain Produksi
Proyek capstone ini mendemonstrasikan bagaimana seluruh prinsip CSS modern bersatu menjadi sebuah produk komersial yang indah, tangguh, dan sangat cepat:
1. **Design Tokens Terpusat**: Seluruh variabel warna, radius sudut, bayangan elevasi, dan kurva pegas dideklarasikan di `:root`.
2. **Kesesuaian Ruang Warna Modern**: Penggunaan `oklch()` menjamin kontras warna teks terhadap background selalu konsisten di mode terang maupun gelap.
3. **Arsitektur Grid Elastis**: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` menjamin kartu tertata rapi di ponsel layar sempit 360px hingga layar desktop 4K tanpa kode bercabang.
4. **Performa Animasi Maksimal**: Transisi hover pada kartu (`translateY` dan `box-shadow`) berjalan pada thread GPU Composite tanpa memicu layout reflow.

---

---

## Penjelasan untuk Pemula

### Analogi: Toko Butik Mewah
Capstone storefront ini seperti mendirikan toko butik fisik kelas dunia:
- Fondasinya kokoh dan lantainya rata sempurna (**Box Model**).
- Penataan etalase barang rapi dan mudah dijangkau (**Flexbox & CSS Grid**).
- Tulisan papan nama toko proporsional dan mudah dibaca dari kejauhan maupun dekat (**Fluid Typography**).
- Lampu toko otomatis redup hangat saat malam tiba tanpa harus mengganti perabotannya (**OKLCH Dark Mode**).
- Pintunya terbuka mulus tanpa suara saat didorong pelanggan (**60 FPS Animations**).

## Eksperimen

- Buka storefront ini di browser, alihkan tema ke Dark Mode, dan nikmati palet warna malam yang elegan dan nyaman di mata.
- Ubah ukuran layar dari ponsel ke desktop untuk melihat kartu produk otomatis menata diri dari 1 kolom, 2 kolom, hingga 4 kolom.
- Hover mouse di atas kartu produk dan perhatikan elevasi bayangan serta pergeseran posisi kartu yang sangat halus.
- Coba ubah warna --brand di :root dan perhatikan seluruh tombol, logo, dan harga berganti tema secara instan.

---

## Tantangan

Tambahkan laci keranjang belanja geser (Shopping Bag Drawer) ke storefront ini: gunakan `position: fixed; right: 0; top: 0; bottom: 0; width: min(400px, 100%); z-index: 100` dengan transisi `transform: translateX(100%)` saat tertutup dan `translateX(0)` saat dibuka.

---

## Model Mental & Diagram Alur Visual

![Diagram CSS Box Model (Margin, Border, Padding, Content)](/diagrams/box-model.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ MARGIN (Jarak Luar Transparan)                           │
│   ┌──────────────────────────────────────────────────┐   │
│   │ BORDER (Garis Tepi & Bingkai)                    │   │
│   │   ┌──────────────────────────────────────────┐   │   │
│   │   │ PADDING (Ruang Bantalan Internal)        │   │   │
│   │   │   ┌──────────────────────────────────┐   │   │   │
│   │   │   │ CONTENT (Lebar x Tinggi Teks/UI) │   │   │   │
│   │   │   └──────────────────────────────────┘   │   │   │
│   │   └──────────────────────────────────────────┘   │   │
│   └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `box-sizing: border-box;`
- **Fungsi Utama:** Pengubah kalkulasi Box Model universal.
- **Parameter / Atribut:** `border-box | content-box`.
- **Perilaku & Efek Sistem:** Memasukkan padding dan border ke dalam kalkulasi total lebar (width) elemen sehingga elemen tidak meluap keluar kontainer.
- **Contoh Penggunaan Praktis:**
```javascript
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
- **Hasil Output yang Diharapkan:**
```text
Elemen berukuran presisi tanpa kalkulasi manual tambahan
```

### 2. `display: flex; justify-content: space-between; align-items: center;`
- **Fungsi Utama:** Penyusunan tata letak satu dimensi (Flexbox).
- **Parameter / Atribut:** `flex-direction, justify-content, align-items`.
- **Perilaku & Efek Sistem:** Mengatur perataan dan distribusi ruang kosong antar item anak secara fleksibel di sumbu utama dan sumbu silang.
- **Contoh Penggunaan Praktis:**
```javascript
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
```
- **Hasil Output yang Diharapkan:**
```text
Item navbar terdistribusi rapi di ujung kiri dan kanan
```

### 3. `display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`
- **Fungsi Utama:** Sistem kisi dua dimensi responsif.
- **Parameter / Atribut:** `grid-template-columns, gap`.
- **Perilaku & Efek Sistem:** Menyusun grid adaptif yang otomatis menyesuaikan jumlah kolom berdasarkan lebar layar tanpa media query.
- **Contoh Penggunaan Praktis:**
```javascript
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
```
- **Hasil Output yang Diharapkan:**
```text
Kartu otomatis menyusun 1, 2, atau 3 kolom sesuai layar
```

### 4. `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
- **Fungsi Utama:** Animasi transisi status interaktif.
- **Parameter / Atribut:** `property, duration, timing-function`.
- **Perilaku & Efek Sistem:** Memberikan efek perubahan visual yang mulus saat elemen mengalami perubahan status (misal hover/focus).
- **Contoh Penggunaan Praktis:**
```javascript
.btn {
  background-color: #2E5B44;
  transition: transform 0.2s ease, background 0.2s ease;
}
.btn:hover {
  transform: translateY(-2px);
  background-color: #1f3d2e;
}
```
- **Hasil Output yang Diharapkan:**
```text
Tombol terangkat halus 2px saat kursor mouse diarahkan
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Masalah Box Model: Padding Menambah Lebar Elemen
- **Gejala / Masalah:** Elemen melebar melebihi kontainer induk dan merusak grid.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `box-sizing: border-box;` secara global di selector `*`.

### 2. Specificity War (!important overuse)
- **Gejala / Masalah:** CSS sulit di-override dan kode menjadi rapuh saat aplikasi bertambah besar.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Patuhi metodologi BEM atau gunakan selector class sederhana, hindari chaining ID selector dan `!important`.

### 3. Z-Index Tidak Bekerja
- **Gejala / Masalah:** Elemen tetap berada di bawah elemen lain meski z-index sudah disetel ke 9999.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pastikan elemen memiliki properti `position: relative`, `absolute`, atau `fixed` untuk membentuk Stacking Context.

---

## Ringkasan

Selamat! Kamu telah menyelesaikan seluruh kurikulum CSS3 dari nol hingga menghasilkan sistem desain e-commerce kelas produksi. Kamu kini siap melangkah ke Tailwind CSS atau JavaScript untuk menambahkan interaktivitas dinamis!
