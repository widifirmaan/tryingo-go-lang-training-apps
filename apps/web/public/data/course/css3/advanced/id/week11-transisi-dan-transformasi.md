# Transisi dan Transformasi

> **Kategori:** CSS3 | **Level:** Sistem CSS, Animasi & Proyek Akhir | **Minggu 11:** Transisi dan Transformasi
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami 4 sub-properti transisi: property, duration, timing-function, dan delay
- Menguasai fungsi kurva waktu: ease, linear, ease-in, ease-out, dan cubic-bezier
- Menerapkan fungsi transformasi 2D: translate(), rotate(), scale(), dan skew()
- Mengombinasikan transisi dengan pseudo-class :hover dan :active untuk umpan balik taktil
- Memahami performa rendering: transform dan opacity vs reflow layout

---

## 1. Anatomi Properti Transition

Transisi memungkinkan perubahan nilai CSS terjadi secara halus selama durasi waktu tertentu alih-alih melompat secara instan:

```css
/* Shorthand: transition: property duration timing-function delay; */
.tombol {
  background-color: #2E5B44;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.tombol:hover {
  background-color: #234634;
  transform: translateY(-2px);
}
```

- **`transition-property`**: Properti mana yang dianimasikan (misal: `transform`, `opacity`). Hindari `transition: all` demi performa.
- **`transition-duration`**: Durasi waktu berlangsung (misal: `0.2s` atau `200ms`).
- **`transition-timing-function`**: Kurva akselerasi (`ease`, `linear`, `cubic-bezier(0.4, 0, 0.2, 1)`).

---

## 2. Fungsi Transformasi 2D

Properti `transform` mengubah bentuk atau posisi elemen secara visual tanpa mengganggu elemen lain di sekitarnya:

- **`translate(x, y)`**: Menggeser posisi elemen (contoh: `translateY(-4px)` untuk efek melayang).
- **`scale(faktor)`**: Memperbesar atau memperkecil ukuran elemen (contoh: `scale(1.05)` memperbesar 5%).
- **`rotate(sudut)`**: Memutar elemen (contoh: `rotate(45deg)`).
- **`skew(sudut)`**: Memiringkan sudut elemen.

---

## 3. Aturan Emas Performa Animasi 60 FPS

Untuk animasi yang mulus dan bebas lag (60 frame per detik), **hanya animasikan 2 properti**:
1. **`transform`** (translate, scale, rotate)
2. **`opacity`** (transparansi)

Mengapa? Kedua properti ini diproses langsung oleh kartu grafis (GPU) pada lapisan komposit (*Compositor layer*), tanpa memicu proses kalkulasi ulang tata letak (*Reflow / Layout*) yang lambat seperti saat mengubah `width`, `height`, atau `margin`.

---

## Program: Kartu Interaktif dengan Efek Melayang dan Tombol Taktil

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Transisi dan Transformasi</title>
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
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      gap: 24px;
      flex-wrap: wrap;
    }

    /* 1. Kartu Interaktif */
    .interactive-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      width: 280px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04);
      /* Menetapkan transisi pada properti transform dan box-shadow */
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
      cursor: pointer;
    }

    .interactive-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 12px 20px -4px rgba(46, 91, 68, 0.15);
      border-color: #C6E6D5;
    }

    .icon-box {
      width: 44px;
      height: 44px;
      background-color: #E2F2E9;
      color: #2E5B44;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin-bottom: 16px;
      transition: transform 0.3s ease;
    }

    .interactive-card:hover .icon-box {
      transform: rotate(15deg) scale(1.1);
    }

    .interactive-card h3 {
      font-size: 18px;
      color: #1A202C;
      margin-bottom: 8px;
    }

    .interactive-card p {
      font-size: 13px;
      color: #718096;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    /* 2. Tombol Aksi Taktil */
    .btn-tactile {
      display: inline-block;
      width: 100%;
      background-color: #2E5B44;
      color: #FFFFFF;
      text-align: center;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      text-decoration: none;
      transition: background-color 0.15s ease, transform 0.1s ease;
    }

    .btn-tactile:hover {
      background-color: #234634;
    }

    .btn-tactile:active {
      transform: scale(0.97); /* Umpan balik klik seperti tombol fisik */
    }
  </style>
</head>
<body>

  <div class="interactive-card">
    <div class="icon-box">✦</div>
    <h3>Transformasi 2D</h3>
    <p>Arahkan kursor untuk melihat animasi pengangkatan kartu dan rotasi ikon secara mulus.</p>
    <a href="#" class="btn-tactile">Klik Tombol</a>
  </div>

  <div class="interactive-card">
    <div class="icon-box">⚡</div>
    <h3>Umpan Balik Taktil</h3>
    <p>Klik tombol di bawah untuk merasakan efek penekanan fisik menggunakan transform scale.</p>
    <a href="#" class="btn-tactile">Tekan Sekarang</a>
  </div>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `transition: transform 0.2s cubic-bezier(...), box-shadow 0.2s ease`: Menentukan transisi spesifik dengan kurva percepatan responsif yang natural.
- `.interactive-card:hover`: Mengombinasikan `translateY(-6px)` (terangkat) dan `scale(1.02)` (membesar halus) saat kursor melayang.
- `.interactive-card:hover .icon-box`: Memicu transformasi ikon anak (`rotate(15deg)`) saat kontainer kartu induk di-hover.
- `.btn-tactile:active { transform: scale(0.97); }`: Memberikan sensasi taktil seperti menekan tombol fisik saat tombol diklik.
- Performa optimal: Menggunakan transform dan opacity menjamin pergerakan animasi berjalan mulus pada 60fps tanpa memicu reflow layout.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 11 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menggunakan transition: all: Menyebabkan browser mengamati semua properti sekaligus, memperlambat rendering jika ada banyak elemen.
- Menganimasikan properti layout seperti width atau margin: Memicu reflow layout di setiap frame yang menyebabkan lag atau gerakan tersendat.
- Durasi transisi terlalu lambat: Menyetel durasi lebih dari 0.4 detik untuk interaksi tombol membuat aplikasi terasa lambat dan tidak responsif.
- Lupa menentukan state awal: Jika elemen tidak memiliki state awal yang jelas, transisi bisa melompat secara tiba-tiba.

---

## Ringkasan

- Modul Minggu 11 (Transisi dan Transformasi) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
