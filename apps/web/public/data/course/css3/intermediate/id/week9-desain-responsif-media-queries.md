# Desain Responsif dan Media Queries

> **Kategori:** CSS3 | **Level:** Tata Letak & Desain Responsif | **Minggu 9:** Desain Responsif dan Media Queries
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami filosofi pendekatan Mobile-First dalam arsitektur CSS
- Memverifikasi peran tag <meta name="viewport"> untuk rendering mobile
- Menguasai sintaks media query @media (min-width: ...) dan breakpoint standar
- Menerapkan fungsi tipografi lentur: clamp(), min(), dan max()
- Membangun halaman responsif multi-kolom yang beradaptasi halus dari layar ponsel ke desktop (Level 2 Capstone)

---

## 1. Filosofi Mobile-First

Pendekatan **Mobile-First** berarti menulis CSS dasar di luar media query untuk tampilan layar ponsel yang sempit (1 kolom sederhana), kemudian menambahkan `@media (min-width: ...)` untuk memperkaya tata letak saat layar semakin lebar.

```text
Alur Mobile-First:
┌─────────────────┐       ┌───────────────────────┐       ┌────────────────────────────────┐
│ Layar Ponsel    │  ──►  │ Tablet (@media 768px) │  ──►  │ Layar Desktop (@media 1024px) │
│ 1 Kolom Ringkas │       │ 2 Kolom Berdampingan  │       │ 3-4 Kolom Penuh                │
└─────────────────┘       └───────────────────────┘       └────────────────────────────────┘
```

Mengapa Mobile-First unggul?
1. Ponsel memproses CSS lebih cepat karena tidak perlu membaca aturan desktop yang tidak terpakai.
2. Desain mobile lebih minimalis, menjamin prioritas konten utama tampil terlebih dahulu.

---

## 2. Sintaks Media Query dan Breakpoint Standar

```css
/* 1. Aturan Dasar untuk Mobile (< 768px) */
.layout {
  display: block;
}

/* 2. Tablet (>= 768px) */
@media (min-width: 768px) {
  .layout {
    display: flex;
    gap: 20px;
  }
}

/* 3. Desktop (>= 1024px) */
@media (min-width: 1024px) {
  .layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
```

---

## 3. Tipografi Lentur dengan `clamp()`

Hindari mengubah `font-size` berulang-ulang di setiap media query. Gunakan fungsi `clamp(min, preferred, max)`:

```css
h1 {
  /* Ukuran font minimal 1.5rem, idealnya 4vw (skala lebar layar), maksimal 2.5rem */
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}
```

---

## Program: Halaman Responsif Adaptif Mobile ke Desktop

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desain Responsif</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 20px;
      line-height: 1.6;
    }

    .container {
      max-width: 960px;
      margin: 0 auto;
    }

    /* 1. Header Responsif dengan clamp() */
    .hero-banner {
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: clamp(24px, 5vw, 48px);
      border-radius: 12px;
      text-align: center;
      margin-bottom: 24px;
    }

    .hero-banner h1 {
      font-size: clamp(1.5rem, 4vw, 2.25rem);
      font-weight: 800;
      margin-bottom: 8px;
    }

    .hero-banner p {
      font-size: clamp(0.875rem, 2vw, 1.125rem);
      opacity: 0.9;
    }

    /* 2. Grid Responsif: Default Mobile 1 Kolom */
    .responsive-grid {
      display: grid;
      grid-template-columns: 1fr; /* 1 kolom penuh di layar ponsel */
      gap: 16px;
    }

    .card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 20px;
    }

    .card h3 {
      color: #2E5B44;
      font-size: 18px;
      margin-bottom: 8px;
    }

    .card p {
      color: #4A5568;
      font-size: 14px;
    }

    /* 3. Media Query Tablet (>= 640px): Beralih ke 2 Kolom */
    @media (min-width: 640px) {
      .responsive-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }

    /* 4. Media Query Desktop (>= 1024px): Beralih ke 3 Kolom */
    @media (min-width: 1024px) {
      .responsive-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
      body {
        padding: 40px;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <header class="hero-banner">
      <h1>Tata Letak Responsif Mandiri</h1>
      <p>Ubah ukuran lebar jendela browser untuk melihat perubahan kolom secara langsung.</p>
    </header>

    <main class="responsive-grid">
      <div class="card">
        <h3>Layar Ponsel (< 640px)</h3>
        <p>Tampilan mengalir dalam 1 kolom vertikal yang ramah ibu jari dan mudah digulir.</p>
      </div>

      <div class="card">
        <h3>Layar Tablet (>= 640px)</h3>
        <p>Media query mengaktifkan 2 kolom sejajar untuk memanfaatkan lebar layar tablet.</p>
      </div>

      <div class="card">
        <h3>Layar Desktop (>= 1024px)</h3>
        <p>Di layar monitor lebar, tata letak otomatis berkembang menjadi 3 kolom yang lapang.</p>
      </div>
    </main>
  </div>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Deklarasi wajib di bagian head HTML yang memberitahu browser mobile untuk merender halaman sesuai lebar fisik layar perangkat.
- `font-size: clamp(1.5rem, 4vw, 2.25rem)`: Tipografi lentur yang membesar dan mengecil secara proporsional dengan lebar layar tanpa perlu breakpoint terpisah.
- `grid-template-columns: 1fr`: Aturan mobile-first dasar yang menyusun kartu dalam 1 kolom bertumpuk di ponsel.
- `@media (min-width: 640px)`: Breakpoint tablet yang mengubah layout menjadi 2 kolom saat lebar layar minimal 640px.
- `@media (min-width: 1024px)`: Breakpoint desktop yang memperluas layout menjadi 3 kolom saat lebar layar minimal 1024px.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 9 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa tag meta viewport: Tanpa tag ini di <head>, browser ponsel akan merender halaman seolah-olah di layar desktop 980px lalu mengecilkannya hingga teks tidak terbaca.
- Menggunakan max-width untuk media query saat menulis mobile-first: Mencampur max-width dan min-width menyebabkan aturan saling bertabrakan dan sulit dilacak.
- Terlalu banyak breakpoint yang tidak perlu: Menyetel breakpoint untuk setiap tipe ponsel (iPhone, Samsung, Pixel) membuat kode berantakan. Cukup gunakan 3 breakpoint standar (640px, 768px, 1024px).
- Mengabaikan overflow horizontal: Menggunakan lebar statis seperti width: 800px di dalam elemen anak akan merusak layout responsif di layar ponsel.

---

## Ringkasan

- Modul Minggu 9 (Desain Responsif dan Media Queries) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
