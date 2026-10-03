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

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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
