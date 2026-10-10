# Display dan Positioning

> **Kategori:** CSS3 | **Level:** Tata Letak & Desain Responsif | **Minggu 6:** Display dan Positioning
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami 4 nilai display dasar: block, inline, inline-block, dan none
- Menguasai 5 skema posisi CSS: static, relative, absolute, fixed, dan sticky
- Menggunakan koordinat top, right, bottom, left untuk penempatan presisi
- Memahami mekanisme z-index dan cara terbentuknya Stacking Context
- Membangun komponen navigasi sticky dan tombol mengambang (floating action button)

---

## 1. Tipe-Tipe Display

Properti `display` menentukan perilaku kotak elemen dalam alur dokumen:

- **`block`**: Menempati lebar penuh kontainer (100%), memaksa elemen berikutnya turun ke baris baru. Menerima aturan `width`, `height`, `margin`, `padding` (contoh: `div`, `p`, `section`).
- **`inline`**: Hanya memakan lebar sebesar kontennya, mengalir bersama teks dalam baris yang sama. **Tidak** menerima `width`, `height`, maupun margin/padding vertikal (contoh: `span`, `a`).
- **`inline-block`**: Mengalir horizontal berdampingan seperti inline, namun **menerima** pengaturan `width`, `height`, padding, dan margin seperti elemen block.
- **`none`**: Menghilangkan elemen sepenuhnya dari dokumen (tidak memakan ruang apa pun). Berbeda dengan `visibility: hidden` yang menyembunyikan elemen tetapi tetap menyisakan ruang kosongnya.

---

## 2. Skema Nilai Properti 'position'

```text
┌───────────┬──────────────────────────────────────────────────────────────┐
│ Position  │ Karakteristik & Perilaku Alur Dokumen                        │
├───────────┼──────────────────────────────────────────────────────────────┤
│ static    │ Bawaan normal. Mengikuti alur dokumen alami (top/left mati). │
│ relative  │ Bergeser relatif dari posisi aslinya, menyisakan ruang asal. │
│ absolute  │ Keluar dari alur dokumen, menempel pada leluhur non-static. │
│ fixed     │ Keluar dari alur dokumen, menempel absolut pada viewport.    │
│ sticky    │ Mengalir normal, lalu mengunci posisi saat di-scroll.        │
└───────────┴──────────────────────────────────────────────────────────────┘
```

### Hubungan Erat: relative & absolute
Pola paling umum dalam antarmuka adalah menetapkan `position: relative` pada elemen induk, dan `position: absolute` pada elemen anak:

```css
.induk {
  position: relative; /* Menjadi jangkar koordinat untuk anak */
}
.anak {
  position: absolute;
  top: 10px;
  right: 10px;        /* Berada di pojok kanan atas elemen induk */
}
```

---

## 3. z-index dan Stacking Context

`z-index` mengontrol tumpukan kedalaman elemen pada sumbu Z (depan-belakang).
- `z-index` **hanya berfungsi** pada elemen yang memiliki posisi selain `static` (`relative`, `absolute`, `fixed`, `sticky`).
- Nilai yang lebih tinggi akan tampil di depan elemen dengan nilai lebih rendah.

---

## Program: Navigasi Sticky, Badge Pojok Absolute, dan Tombol Fixed

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Display dan Positioning</title>
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
      min-height: 140vh; /* Memberi ruang scroll untuk mendemonstrasikan sticky & fixed */
    }

    /* 1. Header dengan Posisi Sticky */
    .navbar-sticky {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .navbar-sticky .brand {
      font-weight: 700;
      font-size: 18px;
    }

    .main-content {
      max-width: 600px;
      margin: 32px auto;
      padding: 0 20px;
    }

    /* 2. Kartu dengan Posisi Relative sebagai Jangkar */
    .card-relative {
      position: relative;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 28px;
      margin-bottom: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    /* 3. Badge dengan Posisi Absolute */
    .badge-absolute {
      position: absolute;
      top: 16px;
      right: 16px;
      background-color: #E2F2E9;
      color: #2E5B44;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 9999px;
      border: 1px solid #C6E6D5;
    }

    .card-relative h3 {
      font-size: 20px;
      color: #1A202C;
      margin-bottom: 12px;
    }

    .card-relative p {
      font-size: 15px;
      line-height: 1.6;
      color: #4A5568;
    }

    /* 4. Tombol Aksi Mengambang (Fixed) */
    .btn-fixed-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99;
      background-color: #2E5B44;
      color: #FFFFFF;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      font-size: 24px;
      font-weight: bold;
      box-shadow: 0 8px 16px rgba(46, 91, 68, 0.3);
      transition: transform 0.2s ease, background-color 0.2s ease;
    }

    .btn-fixed-fab:hover {
      background-color: #234634;
      transform: scale(1.08);
    }
  </style>
</head>
<body>

  <!-- Navigasi Sticky -->
  <header class="navbar-sticky">
    <div class="brand">Tryngo Portal</div>
    <span>Menu Navigasi</span>
  </header>

  <main class="main-content">
    <div class="card-relative">
      <span class="badge-absolute">Aktif</span>
      <h3>Materi Positioning Terstruktur</h3>
      <p>Gulir halaman ke bawah untuk melihat bagaimana navbar di atas tetap mengunci posisinya (sticky) dan tombol aksi bundar di pojok kanan bawah tetap menempel pada layar (fixed).</p>
    </div>

    <div class="card-relative">
      <h3>Pengujian Scroll Layar</h3>
      <p>Elemen berposisi sticky menyatu secara alami di dalam dokumen hingga batas viewport atas tercapai, lalu beralih fungsi menjadi semacam posisi fixed.</p>
    </div>
  </main>

  <!-- Tombol Mengambang (Floating Action Button) -->
  <a href="#" class="btn-fixed-fab" title="Pesan Baru">+</a>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `position: sticky; top: 0; z-index: 100`: Mengunci navbar pada posisi paling atas layar saat halaman digulir.
- `.card-relative { position: relative; }`: Menetapkan kontainer kartu sebagai titik acuan koordinat (0,0) bagi elemen anak berposisi absolute.
- `.badge-absolute { position: absolute; top: 16px; right: 16px; }`: Menempatkan badge status secara presisi di sudut kanan atas kartu.
- `.btn-fixed-fab { position: fixed; bottom: 24px; right: 24px; }`: Mengunci tombol mengambang pada sudut kanan bawah viewport browser tanpa terpengaruh pergerakan scroll.
- `z-index: 100` vs `z-index: 99`: Memastikan navbar selalu bertengger di lapisan paling atas melintasi elemen-elemen di bawahnya.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 6 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa memberikan position: relative pada elemen induk: Elemen anak dengan position: absolute akan melompat keluar dan menempel ke elemen <html> atau <body>.
- Sticky tidak berfungsi karena overflow: hidden pada elemen induk: Jika ada elemen pembungkus yang memiliki overflow: hidden/auto, posisi sticky tidak akan pernah aktif.
- Lupa menentukan nilai top pada position: sticky: Properti sticky wajib memiliki nilai ambang batas (seperti top: 0), jika tidak ia hanya bertindak sebagai static.
- Menggunakan z-index pada elemen static: Menulis z-index: 999 pada elemen tanpa position tidak akan memberikan efek tumpukan apa pun.

---

## Ringkasan

- Modul Minggu 6 (Display dan Positioning) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
