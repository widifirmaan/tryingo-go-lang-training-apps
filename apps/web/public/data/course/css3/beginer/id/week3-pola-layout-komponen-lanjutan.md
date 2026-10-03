# Pola Tata Letak Komponen: Sticky, Aspect-Ratio & Flexbox Bertingkat

> **Kategori:** CSS3 | **Level:** Pondasi Box Model & Flexbox | **Minggu 3:** Pola Tata Letak Komponen: Sticky, Aspect-Ratio & Flexbox Bertingkat
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai position: sticky dan memahami syarat induk kontainer (align-items: flex-start)
- Mempertahankan rasio aspek gambar/video tanpa lonjakan layout menggunakan aspect-ratio
- Menyusun struktur tata letak bertingkat (nested flexbox) untuk UI aplikasi nyata
- Menghindari jebakan overflow: hidden pada kontainer induk yang membatalkan efek sticky
- Membuat sidebar e-commerce yang tetap terlihat selama pengguna membaca deskripsi produk

---

## Program: Halaman Detail Produk E-Commerce dengan Sidebar Sticky

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Detail Produk — Nusa Store</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F4F2ED;
      --surface: #FFFFFF;
      --border: #E5E5E5;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      padding: 32px 16px;
    }

    /* Layout 2 Kolom dengan Flexbox */
    .product-page-layout {
      max-width: 1080px;
      margin: 0 auto;
      display: flex;
      gap: 32px;
      align-items: flex-start; /* Syarat mutlak agar sticky berfungsi */
    }

    /* Kolom Utama Konten */
    .main-gallery {
      flex: 1 1 65%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .image-placeholder {
      width: 100%;
      aspect-ratio: 16 / 9; /* Menjaga proporsi visual modern */
      background: #D9D9D9;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #666;
    }

    .product-description {
      background: var(--surface);
      padding: 28px;
      border-radius: 16px;
      line-height: 1.6;
    }

    /* Kolom Sidebar Ringkasan Pembelian Sticky */
    .sticky-checkout-sidebar {
      flex: 1 1 35%;
      position: sticky;
      top: 24px; /* Menempel saat scroll mencapai 24px dari atas */
      background: var(--surface);
      padding: 28px;
      border-radius: 16px;
      border: 1px solid var(--border);
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    }

    .sticky-checkout-sidebar h2 { font-size: 1.4rem; margin-bottom: 8px; }
    .price-tag { font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 20px; }

    .btn-buy {
      display: block;
      width: 100%;
      background: var(--primary);
      color: white;
      text-align: center;
      padding: 14px;
      font-weight: 700;
      border-radius: 10px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="product-page-layout">
    <div class="main-gallery">
      <div class="image-placeholder">Foto Produk Utama (16:9 Aspect Ratio)</div>
      <div class="product-description">
        <h1>Laptop Rekayasa Ultralight Pro 14"</h1>
        <p>Dirancang khusus untuk software developer: prosesor 12-core, RAM 32GB LPDDR5X, layar OLED kalibrasi warna 100% DCI-P3, dan bobot hanya 1.1 kilogram.</p>
        <p style="margin-top: 16px;">Sasis aluminium unibody dengan manajemen termal dua kipas mikro untuk pendinginan stabil saat kompilasi proyek besar berlangsung.</p>
      </div>
      <div class="image-placeholder">Foto Detail Port & Keyboard Ergonomis</div>
      <div class="product-description">
        <h3>Ulasan Benchmark</h3>
        <p>Waktu kompilasi Linux kernel 40% lebih kencang dibanding generasi sebelumnya dengan daya tahan baterai hingga 14 jam kerja aktif.</p>
      </div>
    </div>

    <aside class="sticky-checkout-sidebar">
      <h2>Ringkasan Pesanan</h2>
      <div class="price-tag">Rp 19.999.000</div>
      <p style="color: #666; margin-bottom: 24px;">Stok tersedia di gudang Jakarta. Garansi resmi 2 tahun servis dan penggantian suku cadang.</p>
      <a href="#" class="btn-buy">Beli Sekarang</a>
    </aside>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Cara Kerja position: sticky
Elemen dengan `position: sticky` berperilaku seperti `position: relative` di dalam alur normal halaman, sampai scroll jendela mencapai batas offset yang ditentukan (`top: 24px`), di mana elemen tersebut berubah menjadi seperti `fixed` di dalam batas kontainer induknya.

### Syarat Wajib Sticky Berfungsi
1. Harus ada nilai offset, minimal `top`, `bottom`, `left`, atau `right`.
2. Kontainer induk harus memiliki tinggi yang lebih besar dari elemen sticky.
3. Pada flex container, nilai default `align-items: stretch` membuat semua kolom sama tinggi sehingga sticky tidak punya ruang geser. Developer harus menyetel `align-items: flex-start`.
4. Tidak boleh ada elemen leluhur dengan `overflow: hidden`, `overflow: auto`, atau `overflow: scroll`.

### Properti aspect-ratio Modern
Properti `aspect-ratio: 16 / 9` memungkinkan elemen mempertahankan rasio aspek lebarnya secara otomatis tanpa trik padding-top persentase jadul.

---

---

## Penjelasan untuk Pemula

### Analogi: Magnet Kulkas pada Papan Tulis
1. **`position: sticky`** seperti menempelkan magnet memo belanjaan di papan tulis: saat Anda menggulir kertas papan tulis ke atas, magnet akan diam terbawa sampai menyentuh batas atas bingkai mata Anda, lalu menempel diam di situ selama kertas masih ada di bawahnya.
2. **`aspect-ratio: 16 / 9`** seperti layar televisi bioskop: berapapun lebar tembok kamar Anda, tinggi layar selalu otomatis menyesuaikan proporsional agar gambar tidak gepeng atau lonjong.

## Eksperimen

- Hapus align-items: flex-start pada .product-page-layout dan amati mengapa sidebar sticky mendadak berhenti menempel saat di-scroll.
- Ubah nilai top: 24px menjadi top: 0, lalu perhatikan bagaimana sidebar menempel pas di bibir paling atas layar.
- Coba ubah aspect-ratio: 16 / 9 menjadi 1 / 1 (bujur sangkar) dan perhatikan placeholder gambar yang langsung menjadi kotak persegi.
- Beri overflow: hidden pada body dan amati bagaimana efek sticky seketika lumpuh total.

---

## Tantangan

Buat layout artikel blog: di sisi kiri terdapat artikel panjang dengan beberapa gambar, dan di sisi kanan terdapat bilah "Daftar Isi" (Table of Contents) yang menempel menggunakan `position: sticky; top: 32px` dengan tombol kembali ke atas.

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

Kamu telah menguasai pola komponen lanjutan, aspek rasio modern, dan mekanisme sticky. Minggu depan kita memasuki Level 2: arsitektur tata letak dua dimensi tingkat lanjut dengan CSS Grid.
