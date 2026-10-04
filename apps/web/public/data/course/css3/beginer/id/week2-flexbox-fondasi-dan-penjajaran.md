# Flexbox: Sumbu Utama, Sumbu Silang & Penjajaran Presisi

> **Kategori:** CSS3 | **Level:** Pondasi Box Model & Flexbox | **Minggu 2:** Flexbox: Sumbu Utama, Sumbu Silang & Penjajaran Presisi
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep Sumbu Utama (Main Axis) dan Sumbu Silang (Cross Axis) pada Flexbox
- Mengontrol distribusi ruang di sumbu utama dengan justify-content (center, space-between, space-around)
- Mengatur perataan vertikal elemen anak dengan align-items dan align-self
- Menerapkan sifat responsive wrapping dengan flex-wrap: wrap dan properti modern gap
- Memahami rumus shorthand flex: flex-grow, flex-shrink, dan flex-basis

---

## Program: Bilah Navigasi Responsif & Deretan Kartu Fitur dengan Flexbox

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flexbox Alignment Mastery</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F8F9FA;
      --card-bg: #FFFFFF;
      --text: #212529;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 24px;
    }

    /* 1. Header dengan Flexbox Auto-Margin Spacing */
    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--card-bg);
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      margin-bottom: 32px;
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 24px;
      align-items: center;
    }

    .nav-links a {
      text-decoration: none;
      color: var(--text);
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .nav-links a:hover {
      color: var(--primary);
    }

    .btn-login {
      background: var(--primary);
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    /* 2. Flexbox Grid Pembungkus Kartu */
    .features-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
    }

    .feature-card {
      background: var(--card-bg);
      flex: 1 1 calc(33.333% - 20px);
      min-width: 260px;
      padding: 24px;
      border-radius: 12px;
      border-top: 4px solid var(--primary);
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .feature-card h3 { margin-bottom: 8px; font-size: 1.25rem; }
    .feature-card p { color: #6C757D; margin-bottom: 16px; flex-grow: 1; }
    .feature-card a { color: var(--primary); font-weight: 600; text-decoration: none; }
  </style>
</head>
<body>
  <header class="app-header">
    <div class="logo"><strong>Tryngo</strong> Platform</div>
    <ul class="nav-links">
      <li><a href="#">Katalog</a></li>
      <li><a href="#">Kurikulum</a></li>
      <li><a href="#">Roadmap</a></li>
    </ul>
    <button class="btn-login">Masuk Akun</button>
  </header>

  <main>
    <section class="features-container">
      <article class="feature-card">
        <h3>Eksekusi Kode WASM</h3>
        <p>Jalankan kode Go dan compiler modern langsung di dalam browser pengguna tanpa ketergantungan server.</p>
        <a href="#">Pelajari Selengkapnya &rarr;</a>
      </article>
      <article class="feature-card">
        <h3>Kurikulum Berbasis Produk</h3>
        <p>Setiap modul dirancang dari fundamental hingga menghasilkan produk perangkat lunak kelas produksi.</p>
        <a href="#">Pelajari Selengkapnya &rarr;</a>
      </article>
      <article class="feature-card">
        <h3>Kuis Interaktif Otomatis</h3>
        <p>Evaluasi pemahaman konsep dengan ribuan bank soal pilihan ganda dan validasi sintaks instan.</p>
        <a href="#">Pelajari Selengkapnya &rarr;</a>
      </article>
    </section>
  </main>
</body>
</html>
```

---

## Konsep Kunci

### Sumbu Utama (Main Axis) vs Sumbu Silang (Cross Axis)
Saat sebuah container diberi `display: flex`:
- Nilai default `flex-direction: row` menetapkan sumbu utama secara horizontal (kiri ke kanan) dan sumbu silang secara vertikal (atas ke bawah).
- Jika diubah ke `flex-direction: column`, arah sumbu tertukar: sumbu utama menjadi vertikal dan sumbu silang menjadi horizontal.

### Penjajaran Elemen
- `justify-content`: Mengatur posisi dan distribusi sisa ruang di sepanjang **sumbu utama** (misal `space-between` mendorong elemen ke ujung kiri dan kanan).
- `align-items`: Menyelaraskan seluruh elemen anak di sepanjang **sumbu silang** (misal `center` untuk menempatkan pas di tengah vertikal).
- `align-self`: Memungkinkan salah satu elemen anak memiliki perataan sumbu silang yang berbeda dari saudara-saudaranya.

### Shorthand flex: grow, shrink, basis
- `flex-grow`: Seberapa banyak elemen akan meregang untuk mengisi sisa ruang kosong jika ada (default 0).
- `flex-shrink`: Seberapa agresif elemen menyusut saat ruang sempit (default 1).
- `flex-basis`: Ukuran awal elemen sebelum sisa ruang didistribusikan (misal `calc(33.333% - 20px)`).

---

---

## Penjelasan untuk Pemula

### Analogi: Rak Keranjang Supermarket
1. **`display: flex`** seperti meletakkan satu baris keranjang belanja di ban berjalan kasir.
2. **`flex-direction: row`** menyusun keranjang berjejer ke samping, sedangkan `column` menumpuk keranjang ke atas.
3. **`justify-content: space-between`** seperti kasir yang mendorong barang pertama ke ujung depan dan barang terakhir ke ujung belakang ban berjalan.
4. **`align-items: center`** memastikan barang-barang belanjaan dengan tinggi berbeda (botol sirup dan kotak sabun) dijajarkan tepat di garis tengah ban berjalan.
5. **`gap: 20px`** adalah jarak aman antar barang agar telur tidak bertabrakan dengan semangka.

## Eksperimen

- Ubah justify-content: space-between pada header menjadi center, dan amati seluruh menu dan logo berkumpul di tengah layar.
- Hapus flex-wrap: wrap pada kontainer fitur, lalu kecilkan jendela browser untuk melihat kartu-kartu terhimpit sempit.
- Coba ubah align-items: center menjadi flex-start atau stretch dan amati perubahan tinggi visual antar komponen.
- Tambahkan margin-left: auto pada elemen navigasi untuk melihat trik legendaris mendorong elemen ke ujung kanan secara instan.

---

## Tantangan

Bangun bilah status pemutar musik (audio player bar) menggunakan Flexbox: di sisi kiri ada info lagu (cover thumbnail + judul), di tengah ada tombol kontrol (play, pause, next) di posisi pas tengah layar, dan di sisi kanan ada pengatur volume suara.

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
```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
- **Hasil Output yang Diharapkan:**
```text
Elemen berukuran presisi tanpa kalkulasi manual
```

### 2. `display: flex; justify-content: space-between; align-items: center;`
- **Fungsi Utama:** Penyusunan tata letak satu dimensi.
- **Parameter / Atribut:** `flex-direction, justify-content, align-items`.
- **Perilaku & Efek Sistem:** Mengatur perataan dan distribusi ruang kosong antar item anak secara fleksibel..
- **Contoh Penggunaan Praktis:**
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
- **Hasil Output yang Diharapkan:**
```text
Item navbar terdistribusi rapi di ujung kiri & kanan
```

### 3. `display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));`
- **Fungsi Utama:** Sistem kisi dua dimensi responsif.
- **Parameter / Atribut:** `grid-template-columns, gap`.
- **Perilaku & Efek Sistem:** Menyusun grid adaptif yang otomatis menyesuaikan jumlah kolom tanpa media query..
- **Contoh Penggunaan Praktis:**
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
```
- **Hasil Output yang Diharapkan:**
```text
Kolom grid otomatis menyusun sesuai lebar layar
```

### 4. `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
- **Fungsi Utama:** Animasi transisi status interaktif.
- **Parameter / Atribut:** `property, duration, timing-function`.
- **Perilaku & Efek Sistem:** Memberikan efek perubahan visual yang mulus saat elemen mengalami perubahan status..
- **Contoh Penggunaan Praktis:**
```css
.btn {
  transition: transform 0.2s ease;
}
.btn:hover {
  transform: translateY(-2px);
}
```
- **Hasil Output yang Diharapkan:**
```text
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

Kamu telah menguasai pengaturan sumbu, distribusi ruang, dan penjajaran presisi dengan Flexbox satu dimensi. Minggu depan kita akan mendalami pola tata letak dua dimensi tingkat lanjut dengan CSS Grid.
