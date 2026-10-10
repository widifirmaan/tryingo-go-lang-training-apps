# Tipografi dan Format Teks

> **Kategori:** CSS3 | **Level:** Dasar CSS & Model Kotak | **Minggu 4:** Tipografi dan Format Teks
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami pemilihan font-family dan fallback stack sistem operasi
- Menguasai unit ukuran tipografi: px vs rem (root em) vs em untuk aksesibilitas
- Mengatur ritme vertikal bacaan menggunakan line-height dan letter-spacing
- Mengontrol ketebalan teks (font-weight) dan perataan teks (text-align)
- Membangun hierarki artikel yang nyaman dibaca dengan rasio perbandingan ukuran yang konsisten

---

## 1. Pemilihan Font Family & Fallback Stack

Ketika menentukan `font-family`, selalu sertakan daftar cadangan (*font stack*) dari yang paling spesifik ke kategori generik:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
```

- Jika San Francisco (Apple) tidak tersedia, browser mencoba Segoe UI (Windows), lalu Roboto (Android), dan terakhir `sans-serif` generik.

---

## 2. Unit Ukuran: Mengapa 'rem' Lebih Unggul dari 'px'?

- **`px` (Pixel)**: Ukuran statis absolut. Jika pengguna mengubah ukuran teks default di pengaturan browser (misal untuk alasan gangguan penglihatan), teks dengan `px` **tidak akan membesar**.
- **`rem` (Root EM)**: Ukuran relatif terhadap ukuran font elemen root (`<html>`).
  - Secara default pada hampir semua browser: `1rem = 16px`.
  - `1.5rem = 24px`
  - `2rem = 32px`
- **`em`**: Relatif terhadap ukuran font elemen induknya (*parent element*). Hati-hati dengan compounding effect saat elemen bersarang bertingkat.

---

## 3. Ritme Vertikal: line-height & letter-spacing

Kenyamanan membaca teks artikel sangat ditentukan oleh dua properti:

```css
p {
  font-size: 1rem;       /* 16px */
  line-height: 1.6;      /* Rasio jarak antar baris 1.6x ukuran font */
  letter-spacing: -0.01em; /* Mengatur kerapatan spasi antar huruf */
  color: #374151;        /* Hindari hitam pekat #000 untuk teks panjang */
}
```

- Gunakan angka tanpa unit untuk `line-height` (misal: `1.5` atau `1.6`), bukan piksel, agar proporsinya otomatis menyesuaikan ukuran font.

---

## Program: Tata Letak Tipografi Artikel dengan Skala Hierarki Jelas

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Spesimen Tipografi</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #FAFAFA;
      color: #1F2937;
      padding: 40px 20px;
    }

    .article-container {
      max-width: 640px;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 40px;
      border-radius: 8px;
      border: 1px solid #E5E7EB;
    }

    .category-tag {
      font-size: 0.75rem; /* 12px */
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #2E5B44;
      margin-bottom: 8px;
      display: inline-block;
    }

    h1 {
      font-size: 2rem; /* 32px */
      line-height: 1.25;
      font-weight: 800;
      color: #111827;
      letter-spacing: -0.025em;
      margin-bottom: 16px;
    }

    .lead-paragraph {
      font-size: 1.125rem; /* 18px */
      line-height: 1.6;
      color: #4B5563;
      margin-bottom: 24px;
    }

    h2 {
      font-size: 1.375rem; /* 22px */
      line-height: 1.35;
      font-weight: 700;
      color: #1F2937;
      margin-top: 32px;
      margin-bottom: 12px;
      letter-spacing: -0.015em;
    }

    p {
      font-size: 1rem; /* 16px */
      line-height: 1.7;
      color: #374151;
      margin-bottom: 16px;
    }

    blockquote {
      border-left: 4px solid #2E5B44;
      padding-left: 16px;
      margin: 24px 0;
      font-style: italic;
      color: #4B5563;
    }
  </style>
</head>
<body>

  <article class="article-container">
    <span class="category-tag">Arsitektur Desain Web</span>
    <h1>Pondasi Tipografi yang Nyaman di Mata Pembaca</h1>
    
    <p class="lead-paragraph">
      Tipografi yang tertata rapi bukan sekadar memilih jenis huruf yang menarik, melainkan membangun hierarki ukuran dan jarak baca yang proporsional.
    </p>

    <h2>Mengapa Rasio Ukuran Penting?</h2>
    <p>
      Mata manusia membutuhkan pembeda visual yang tegas antara judul, subjudul, dan isi paragraf. Penggunaan rasio terukur menggunakan satuan rem membantu pembaca memindai konten dengan cepat.
    </p>

    <blockquote>
      "Desain yang baik membuat teks terasa tidak terlihat, pembaca hanya menikmati informasinya."
    </blockquote>

    <p>
      Hindari penggunaan warna hitam murni (#000000) pada latar belakang putih terang karena menimbulkan kontras berlebih yang melelahkan mata pembaca dalam durasi panjang.
    </p>
  </article>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `font-size: 2rem` vs `1.125rem` vs `1rem`: Skala modular berbasis `rem` yang memberikan hierarki kontras yang jelas antara judul, teks pengantar, dan paragraf biasa.
- `line-height: 1.7`: Jarak vertikal yang lapang pada teks paragraf untuk mencegah mata pembaca salah membaca baris saat berpindah kalimat.
- `letter-spacing: -0.025em`: Sedikit merapatkan jarak antar huruf pada judul berukuran besar agar terlihat lebih padat dan tegas.
- `.category-tag`: Menggunakan `text-transform: uppercase` dan `letter-spacing: 0.1em` untuk badge kategori yang rapi.
- `blockquote`: Kutipan dengan aksen garis kiri `border-left: 4px solid #2E5B44` dan gaya miring `font-style: italic`.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 4 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Line-height terlalu rapat: Menyetel line-height: 1.0 pada paragraf panjang membuat baris teks bertumpuk dan sangat sulit dibaca.
- Menggunakan piksel (px) statis untuk semua teks: Menghilangkan kemampuan scaling browser saat pengguna memperbesar ukuran teks demi keterbacaan.
- Kontras teks terlalu rendah: Menggunakan abu-abu terlalu terang (misal: #CCCCCC di atas putih) melanggar standar aksesibilitas WCAG karena teks sulit terbaca.
- Terlalu banyak variasi font: Menggunakan lebih dari 2 jenis font family dalam satu halaman membuat desain terlihat kacau dan memperlambat loading situs.

---

## Ringkasan

- Modul Minggu 4 (Tipografi dan Format Teks) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
