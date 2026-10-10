# CSS Grid: Tata Letak Dua Dimensi

> **Kategori:** CSS3 | **Level:** Tata Letak & Desain Responsif | **Minggu 8:** CSS Grid: Tata Letak Dua Dimensi
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami arsitektur dua dimensi CSS Grid (baris dan kolom simultan)
- Menguasai unit pecahan fr (fractional unit) dan fungsi repeat()
- Menggunakan minmax() bersama auto-fit untuk grid responsif otomatis tanpa media query
- Menguasai grid-column dan grid-row untuk penggabungan sel (spanning)
- Menerapkan grid-template-areas untuk rancangan tata letak halaman yang mudah dipahami

---

## 1. Flexbox vs CSS Grid

- **Flexbox**: Spesialis tata letak **satu dimensi** (baris *atau* kolom). Sangat ideal untuk komponen kecil seperti navbar, form input dengan tombol, atau deretan tag.
- **CSS Grid**: Spesialis tata letak **dua dimensi** (baris *dan* kolom sekaligus). Sangat ideal untuk struktur halaman menyeluruh (*macro layout*) seperti dashboard atau galeri kartu.

---

## 2. Unit Pecahan 'fr' dan Pengulangan 'repeat()'

CSS Grid memperkenalkan unit `fr` (*fractional unit*) yang merepresentasikan bagian dari sisa ruang yang tersedia di kontainer:

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Kolom tengah 2x lebih lebar dari kolom samping */
  gap: 20px;
}
```

Fungsi `repeat()` mempermudah pendefinisian kolom seragam:
```css
/* Membuat 4 kolom dengan lebar sama persis */
grid-template-columns: repeat(4, 1fr);
```

---

## 3. Pola Grid Responsif Otomatis: `auto-fit` & `minmax()`

Anda dapat menciptakan grid kartu yang otomatis menyesuaikan jumlah kolom di setiap ukuran layar tanpa menulis satu baris pun media query:

```css
.kartu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
```

- **`auto-fit`**: Browser menghitung berapa banyak kolom selebar minimal 260px yang muat di kontainer.
- **`minmax(260px, 1fr)`**: Setiap kolom lebarnya minimal 260px, dan jika ada ruang sisa, kolom akan membesar seimbang mengisi layar.

---

## 4. Tata Letak Semantik dengan `grid-template-areas`

```css
.layout-dashboard {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main  "
    "footer  footer";
  grid-template-columns: 240px 1fr;
}
```

---

## Program: Dashboard Analitik Lengkap dengan CSS Grid Blueprint

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>CSS Grid Layout</title>
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
      padding: 24px;
    }

    /* 1. Tata Letak Makro Grid dengan Template Areas */
    .dashboard-container {
      display: grid;
      grid-template-areas:
        "nav    nav    nav"
        "side   stat1  stat2"
        "side   main   main";
      grid-template-columns: 200px 1fr 1fr;
      grid-template-rows: auto auto 1fr;
      gap: 16px;
      max-width: 840px;
      margin: 0 auto;
      min-height: 480px;
    }

    .box {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 20px;
    }

    /* 2. Menghubungkan Area Grid */
    .grid-nav {
      grid-area: nav;
      background-color: #2E5B44;
      color: #FFFFFF;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
    }

    .grid-sidebar {
      grid-area: side;
      background-color: #F0F4F2;
      border-color: #DDE5E1;
    }

    .grid-sidebar ul {
      list-style: none;
      margin-top: 12px;
    }

    .grid-sidebar li {
      padding: 8px 0;
      font-size: 14px;
      font-weight: 600;
      color: #2E5B44;
      border-bottom: 1px solid #E2E8F0;
    }

    .grid-stat {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .grid-stat1 { grid-area: stat1; }
    .grid-stat2 { grid-area: stat2; }

    .stat-label {
      font-size: 12px;
      color: #718096;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 800;
      color: #2E5B44;
    }

    .grid-main {
      grid-area: main;
    }

    .grid-main h3 {
      font-size: 18px;
      color: #1A202C;
      margin-bottom: 10px;
    }

    .grid-main p {
      font-size: 14px;
      line-height: 1.6;
      color: #4A5568;
    }
  </style>
</head>
<body>

  <div class="dashboard-container">
    <header class="box grid-nav">
      <strong>Panel Statistik Studio</strong>
      <span style="font-size: 13px;">Online: 48 Pengguna</span>
    </header>

    <aside class="box grid-sidebar">
      <strong>Navigasi</strong>
      <ul>
        <li>Ringkasan</li>
        <li>Laporan Proyek</li>
        <li>Pengaturan</li>
      </ul>
    </aside>

    <div class="box grid-stat grid-stat1">
      <span class="stat-label">Total Kunjungan</span>
      <span class="stat-value">12.480</span>
    </div>

    <div class="box grid-stat grid-stat2">
      <span class="stat-label">Tingkat Retensi</span>
      <span class="stat-value">84,6%</span>
    </div>

    <main class="box grid-main">
      <h3>Analisis Performa Kuartal</h3>
      <p>CSS Grid memberikan kendali presisi atas baris dan kolom sekaligus. Dalam layout ini, sidebar membentang di samping widget metrik dan panel utama secara bersamaan tanpa perlu pembungkus bertingkat.</p>
    </main>
  </div>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `grid-template-areas`: Membuat peta cetak biru dua dimensi yang memetakan posisi header, sidebar, statistik, dan main secara visual langsung di kode CSS.
- `grid-template-columns: 200px 1fr 1fr`: Membagi kolom menjadi lebar tetap 200px untuk sidebar, dan dua kolom fleksibel dengan lebar terbagi sama rata (`1fr`).
- `.grid-sidebar { grid-area: side; }`: Mengaitkan elemen sidebar ke area `side` yang membentang di 2 baris vertikal sekaligus.
- `.grid-main { grid-area: main; }`: Menempatkan panel konten utama membentang di bawah kedua widget statistik (`stat1` dan `stat2`).
- `gap: 16px`: Mengatur jarak pemisah seragam antar seluruh sel grid secara simultan.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 8 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menulis nama area tidak konsisten di grid-template-areas: Jika jumlah kolom pada salah satu baris string tidak sama persis dengan baris lain, seluruh grid akan gagal dirender.
- Membuat pembungkus div berlebihan: Sering kali pemula membungkus sidebar dan main ke dalam div lain, padahal CSS Grid bekerja paling baik saat anak langsung diletakkan di grid induk.
- Lupa memberikan display: grid pada kontainer: Mendefinisikan grid-template-columns tanpa display: grid tidak akan berpengaruh apa pun.
- Kebingungan antara auto-fit dan auto-fill: auto-fit merentangkan kartu yang ada untuk memenuhi baris, sedangkan auto-fill menyisakan kolom kosong di ujung kanan.

---

## Ringkasan

- Modul Minggu 8 (CSS Grid: Tata Letak Dua Dimensi) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
