# Color Spaces Modern (OKLCH, P3) & Sistem Dark Mode

> **Kategori:** CSS3 | **Level:** Design System, Animasi & Fitur Mutakhir | **Minggu 8:** Color Spaces Modern (OKLCH, P3) & Sistem Dark Mode
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami keunggulan ruang warna modern OKLCH: keseragaman perseptual kecerahan manusia (perceptual uniformity)
- Memahami 3 komponen OKLCH: L (Lightness 0-1), C (Chroma kepekatan warna), dan H (Hue sudut warna 0-360)
- Membangun sistem tema Dark Mode yang bersih menggunakan variabel CSS dan atribut data-theme
- Menghubungkan tema aplikasi dengan preferensi sistem operasi menggunakan @media (prefers-color-scheme: dark)
- Mempertahankan rasio kontras teks minimum WCAG AA (4.5:1) di mode terang maupun gelap

---

## Program: Tema Warna Adaptif dengan Ruang Warna Persepsi OKLCH

```html
<!DOCTYPE html>
<html lang="id" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern OKLCH Colors & Dark Mode</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* 1. Design Tokens Berbasis OKLCH (Light Mode Default) */
    :root {
      /* oklch(Luminance Chroma Hue) */
      --color-brand: oklch(0.45 0.12 155);       /* Hijau Hutan Khas Tryngo */
      --color-brand-light: oklch(0.92 0.04 155);
      --color-accent: oklch(0.62 0.22 35);       /* Terracotta Oranye */
      --color-bg: oklch(0.97 0.01 95);           /* Warm Cream Off-White */
      --color-surface: oklch(1 0 0);             /* Pure White */
      --color-text-main: oklch(0.2 0.02 95);     /* Deep Charcoal */
      --color-text-muted: oklch(0.5 0.02 95);
      --color-border: oklch(0.88 0.01 95);
    }

    /* 2. Semantic Dark Mode Override via Data Attribute & OS Preference */
    [data-theme="dark"] {
      --color-brand: oklch(0.65 0.14 155);       /* Disesuaikan agar kontras tinggi di layar gelap */
      --color-brand-light: oklch(0.25 0.05 155);
      --color-bg: oklch(0.14 0.01 260);          /* Deep Obsidian */
      --color-surface: oklch(0.2 0.01 260);      /* Dark Slate Card */
      --color-text-main: oklch(0.96 0.01 95);    /* Crisp Light Gray */
      --color-text-muted: oklch(0.7 0.02 95);
      --color-border: oklch(0.3 0.01 260);
    }

    body {
      background-color: var(--color-bg);
      color: var(--color-text-main);
      font-family: system-ui, sans-serif;
      padding: 32px;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .theme-card {
      max-width: 520px;
      margin: 0 auto;
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }

    .theme-badge {
      display: inline-block;
      background: var(--color-brand-light);
      color: var(--color-brand);
      font-weight: 700;
      font-size: 0.8rem;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: 16px;
    }

    .theme-toggle-btn {
      background: var(--color-brand);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 24px;
    }
  </style>
</head>
<body>
  <div class="theme-card">
    <span class="theme-badge">Sistem Warna OKLCH</span>
    <h1>Arsitektur Desain Adaptif</h1>
    <p style="color: var(--color-text-muted); margin-top: 12px; line-height: 1.6;">
      Ruang warna OKLCH memisahkan tingkat terang (Luminance), kejenuhan (Chroma), dan rona (Hue) secara perseptual. Mengubah warna tidak lagi merusak rasio kontras aksesibilitas.
    </p>
    <button class="theme-toggle-btn" onclick="toggleTheme()">Alihkan Mode Gelap / Terang</button>
  </div>

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

### Mengapa OKLCH Menggantikan HEX dan HSL?
Format warna lama seperti `rgb()` dan `hsl()` memiliki kelemahan biologis: mata manusia melihat warna kuning jauh lebih terang daripada warna biru pada saturasi yang sama di HSL. 
Di **OKLCH (`Lightness`, `Chroma`, `Hue`)**:
- Tingkat **Lightness 0.7** memiliki kecerahan perseptual yang sama persis bagi mata manusia, baik warnanya biru, hijau, maupun kuning!
- Memudahkan desainer membuat palet warna aksesibel yang dijamin lolos uji kontras WCAG tanpa tebak-tebakan.
- Mendukung gamut warna modern Display-P3 yang lebih luas dan cerah di layar iPhone dan monitor modern.

### Arsitektur Dark Mode Terstruktur
Alih-alih menulis ulang ratusan warna di puluhan class, kita cukup mendefinisikan **Design Tokens Semantik** di `:root` dan menimpanya di selektor `[data-theme="dark"]`. Seluruh tombol, kartu, dan teks akan berganti kulit seketika tanpa duplikasi kode.

---

---

## Penjelasan untuk Pemula

### Analogi: Saklar Pengatur Kecerahan Lampu Rumah
1. **HSL tradisional** seperti saklar lampu rusak: jika diputar ke warna kuning lampunya menyilaukan mata, tapi jika diputar ke warna biru lampunya redup gelap gulita padahal saklarnya di angka yang sama.
2. **OKLCH** seperti sistem pencahayaan pintar: angka terang 70% menjamin cahaya yang dipancarkan ke mata Anda sama terangnya, apapun warna lampu yang dipilih.
3. **Sistem Dark Mode** seperti mengganti baju seragam kantor: di siang hari memakai kemeja putih katun sejuk, di malam hari berganti jaket hitam hangat, tanpa mengubah orang yang memakainya.

## Eksperimen

- Klik tombol alihkan tema dan amati transisi warna yang mulus di seluruh kartu dan teks.
- Coba ubah parameter Lightness pada warna brand dari 0.45 menjadi 0.75 dan amati perubahan terangnya warna hijau.
- Periksa rasio kontras teks menggunakan DevTools Color Picker dan pastikan status kepatuhan WCAG AA tetap centang hijau di kedua tema.
- Ubah data-theme di html menjadi tanpa atribut dan gunakan @media (prefers-color-scheme: dark) untuk mengikuti setelan Windows/Mac Anda.

---

## Tantangan

Buat palet 5 tingkatan warna token OKLCH untuk sistem UI perusahaan (Primary, Surface, Background, Danger, Success) lengkap dengan varian Dark Mode yang lulus uji kontras minimum 4.5:1 untuk teks biasa.

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
- **Fungsi Utama:** Kalkulasi Box Model presisi.
- **Parameter / Atribut:** `border-box | content-box`.
- **Perilaku & Efek Sistem:** Memasukkan padding dan border ke dalam total lebar elemen agar tidak merusak layout grid..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; color: white; }
    .box { width: 100%; padding: 20px; border: 4px solid #10b981; background: #1e293b; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="box">Total lebar pas 100% termasuk padding & border</div>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Elemen berukuran presisi tanpa kalkulasi manual
```

### 2. `display: flex; justify-content: space-between; align-items: center;`
- **Fungsi Utama:** Penyusunan tata letak satu dimensi.
- **Parameter / Atribut:** `flex-direction, justify-content, align-items`.
- **Perilaku & Efek Sistem:** Mengatur perataan dan distribusi ruang kosong antar item anak secara fleksibel..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }
    .navbar { display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 16px 24px; border-radius: 12px; }
    .brand { font-weight: bold; color: #10b981; font-size: 18px; }
    .menu { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <nav class="navbar">
    <span class="brand">Tryngo</span>
    <ul class="menu"><li>Beranda</li><li>Kursus</li><li>Profil</li></ul>
  </nav>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Item navbar terdistribusi rapi di ujung kiri & kanan
```

### 3. `display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));`
- **Fungsi Utama:** Sistem kisi dua dimensi responsif.
- **Parameter / Atribut:** `grid-template-columns, gap`.
- **Perilaku & Efek Sistem:** Menyusun grid adaptif yang otomatis menyesuaikan jumlah kolom tanpa media query..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }
    .grid-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
    .card { background: #1e293b; padding: 20px; border-radius: 10px; border: 1px solid #334155; }
  </style>
</head>
<body>
  <div class="grid-container">
    <div class="card">Kartu Responsif 1</div>
    <div class="card">Kartu Responsif 2</div>
    <div class="card">Kartu Responsif 3</div>
  </div>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Kolom grid otomatis menyusun sesuai lebar layar
```

### 4. `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
- **Fungsi Utama:** Animasi transisi status interaktif.
- **Parameter / Atribut:** `property, duration, timing-function`.
- **Perilaku & Efek Sistem:** Memberikan efek perubahan visual yang mulus saat elemen mengalami perubahan status..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 40px; background: #0f172a; text-align: center; }
    .btn { display: inline-block; padding: 12px 28px; background: #10b981; color: #022c22; font-weight: bold; border-radius: 8px; border: none; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .btn:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3); }
  </style>
</head>
<body>
  <button class="btn">Arahkan Kursor ke Sini</button>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Tombol terangkat halus 2px saat kursor diarahkan
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

Kamu telah menguasai ruang warna modern OKLCH dan arsitektur tema Dark Mode sistemik. Minggu depan kita akan mendalami fitur mutakhir CSS: Container Queries dan Subgrid!
