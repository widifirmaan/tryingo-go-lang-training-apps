# Transisi Halus, Kurva Cubic-Bezier & Animasi Keyframes 60fps

> **Kategori:** CSS3 | **Level:** Design System, Animasi & Fitur Mutakhir | **Minggu 7:** Transisi Halus, Kurva Cubic-Bezier & Animasi Keyframes 60fps
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai aturan emas performa animasi 60 FPS: hanya transform dan opacity yang diakselerasi GPU (Composite only)
- Membuat kurva pergerakan alami elastis menggunakan cubic-bezier kustom alih-alih linear yang kaku
- Menulis animasi berkelanjutan dan terprogram menggunakan aturan @keyframes
- Mengontrol timing animasi dengan properti animation-fill-mode (forwards, backwards, both)
- Menghormati preferensi pengguna dengan media query @media (prefers-reduced-motion: reduce)

---

## Program: Tombol Interaktif dengan Efek Ripple & Spinner Pemuat Data

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>60fps CSS Transitions & Keyframes</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --primary-hover: #234735;
      --bg: #F8FAFC;
      --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 32px;
    }

    /* 1. Tombol Interaktif dengan Transform GPU & Spring Easing */
    .btn-action {
      background: var(--primary);
      color: white;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      padding: 14px 28px;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(46, 91, 68, 0.2);
      /* Hanya animasikan transform dan opacity untuk 60fps */
      transition: transform 0.25s var(--ease-spring), box-shadow 0.25s ease, background 0.2s ease;
      will-change: transform;
    }

    .btn-action:hover {
      background: var(--primary-hover);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 24px rgba(46, 91, 68, 0.3);
    }

    .btn-action:active {
      transform: translateY(1px) scale(0.98);
      box-shadow: 0 2px 6px rgba(46, 91, 68, 0.2);
    }

    /* 2. Indikator Loading Spinner dengan Keyframes Murni */
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #E2E8F0;
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* 3. Badge Denyut (Pulse Ping) */
    .status-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #334155;
    }

    .dot-ping {
      width: 10px;
      height: 10px;
      background: #10B981;
      border-radius: 50%;
      position: relative;
    }

    .dot-ping::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: #10B981;
      opacity: 0.75;
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    @keyframes ping {
      0%   { transform: scale(0.8); opacity: 0.8; }
      80%, 100% { transform: scale(2.4); opacity: 0; }
    }

    /* Aksesibilitas: Hormati Pengguna Sensitif Animasi */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <button class="btn-action">Jalankan Kompilasi</button>
  <div class="spinner" aria-label="Memuat data"></div>
  <div class="status-badge">
    <span class="dot-ping"></span>
    Cluster Server Aktif
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Mengapa Hanya Transform & Opacity (60 FPS)?
Rendering browser melewati 3 tahap: **Layout (Reflow)** $
ightarrow$ **Paint (Repaint)** $
ightarrow$ **Composite**.
- Menganimasikan properti seperti `width`, `height`, `margin`, atau `top` memaksa browser menghitung ulang layout seluruh halaman (sangat boros CPU, menyebabkan patah-patah/*jank*).
- Menganimasikan `color` atau `background` memicu tahap Paint.
- Menganimasikan `transform` (translate, scale, rotate) dan `opacity` dilempar langsung ke GPU pada tahap **Composite**. Animasi berjalan mulus di 60-120 FPS tanpa membebani thread utama.

### Kurva Cubic-Bezier
Fungsi bawaan seperti `ease` atau `linear` sering terasa kaku seperti robot. Fungsi `cubic-bezier(0.34, 1.56, 0.64, 1)` mensimulasikan hukum fisika pegas nyata di mana tombol sedikit "membal" (*overshoot*) sebelum kembali tenang.

### Aksesibilitas: prefers-reduced-motion
Beberapa pengguna memiliki gangguan vestibular di mana animasi berkedip atau meluncur di layar dapat memicu pusing atau mual. Query `@media (prefers-reduced-motion: reduce)` mendeteksi setelan aksesibilitas sistem operasi pengguna dan wajib digunakan untuk menonaktifkan atau mempercepat animasi secara instan.

---

---

## Penjelasan untuk Pemula

### Analogi: Menggambar Ulang Buku vs Memutar Proyektor
1. **Menganimasikan `width` atau `margin`** seperti menyuruh pelukis menggambar ulang seluruh halaman koran dari awal setiap 1 milidetik: pelukis kelelahan dan gambarnya jadi tersendat-sendat.
2. **Menganimasikan `transform: translate()`** seperti menyorotkan proyektor ke dinding: proyektor hanya perlu digeser sedikit sudutnya oleh GPU tanpa perlu mengecat ulang temboknya sama sekali.
3. **`cubic-bezier`** seperti melempar bola bekel karet ke lantai: bola memantul elastis beberapa kali sebelum berhenti, tidak seperti batu bata yang jatuh gedebuk kaku.

## Eksperimen

- Ubah transisi tombol untuk menganimasikan width alih-alih transform, buka Performance monitor di DevTools, dan amati lonjakan Rendering Layout Reflow.
- Coba ubah timing-function tombol menjadi linear dan rasakan betapa kaku gerakannya dibanding cubic-bezier spring.
- Ubah durasi animasi spinner dari 0.8s menjadi 0.2s untuk melihat efek putaran sangat cepat.
- Aktifkan emulasi "prefers-reduced-motion: reduce" di panel DevTools Rendering dan perhatikan bagaimana semua animasi langsung berhenti total.

---

## Tantangan

Bangun kartu produk interaktif: saat kartu di-hover, kartu terangkat perlahan (`transform: translateY(-8px)`), bayangan membesar lembut, dan tombol keranjang di dalamnya muncul dengan efek fade-in slide-up menggunakan transisi GPU murni.

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

Kamu telah menguasai rekayasa animasi performa tinggi 60 FPS dan kurva fisika cubic-bezier. Minggu depan kita akan mendalami ruang warna modern OKLCH dan sistem Dark Mode arsitektural.
