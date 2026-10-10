# Warna, Background, dan Border

> **Kategori:** CSS3 | **Level:** Dasar CSS & Model Kotak | **Minggu 5:** Warna, Background, dan Border
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Menguasai sistem format warna: Hex, RGB, RGBA (transparansi), dan HSL
- Menerapkan background gradasi linier (linear-gradient) dan radial
- Mengatur gambar latar belakang dengan background-size: cover dan background-position
- Mengontrol sudut membulat dengan border-radius (termasuk bentuk pil dan lingkaran)
- Membuat efek kedalaman visual realistis menggunakan box-shadow berlapis (Level 1 Capstone)

---

## 1. Format Warna dalam CSS

CSS mendukung beberapa format representasi warna:

- **Hexadecimal (`#RRGGBB`)**: Format paling umum, misal `#2E5B44`.
- **RGB / RGBA**: `rgb(46, 91, 68)` atau dengan kanal transparansi alpha `rgba(46, 91, 68, 0.8)`.
- **HSL**: `hsl(147, 33%, 27%)` (Hue, Saturation, Lightness). Sangat intuitif saat ingin membuat variasi warna yang lebih terang atau gelap.

---

## 2. Background: Warna, Gambar, dan Gradasi

CSS memungkinkan pengaturan latar belakang yang sangat fleksibel:

### A. Gradasi Linier (`linear-gradient`)
```css
.banner {
  background: linear-gradient(135deg, #2E5B44 0%, #1A3427 100%);
}
```

### B. Gambar Background dengan Kontrol Ukuran
```css
.hero {
  background-image: url('pemandangan.jpg');
  background-size: cover;     /* Menutup seluruh kontainer tanpa distorsi */
  background-position: center; /* Titik fokus gambar selalu di tengah */
  background-repeat: no-repeat;
}
```

---

## 3. Sudut Membulat (`border-radius`) dan Bayangan (`box-shadow`)

### A. Pola Border Radius
- Sudut lembut kartu: `border-radius: 12px;`
- Bentuk pil (tombol kapsul): `border-radius: 9999px;`
- Lingkaran avatar (jika width & height sama): `border-radius: 50%;`

### B. Anatomi Box Shadow Berlapis
```text
box-shadow: offset-x offset-y blur-radius spread-radius color;
```

Untuk efek bayangan yang halus dan realistis, gabungkan dua lapisan bayangan:
```css
.card {
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 20px -5px rgba(0, 0, 0, 0.08);
}
```

---

## Program: Kartu Produk Interaktif dengan Gradasi dan Bayangan Bertingkat

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Warna dan Bayangan</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F0F4F2;
      color: #1F2937;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    /* Kartu Produk Utama */
    .product-card {
      background: #FFFFFF;
      width: 100%;
      max-width: 340px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #E2E8F0;
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.05),
        0 10px 15px -3px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 
        0 10px 20px -3px rgba(46, 91, 68, 0.12),
        0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    /* Header Banner dengan Gradasi Linier */
    .card-banner {
      background: linear-gradient(135deg, #2E5B44 0%, #1C3829 100%);
      color: #FFFFFF;
      padding: 32px 24px;
      text-align: center;
      position: relative;
    }

    /* Badge Bentuk Kapsul/Pil */
    .badge-status {
      display: inline-block;
      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(4px);
      color: #E2F2E9;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 8px;
    }

    .card-banner h3 {
      font-size: 20px;
      font-weight: 700;
    }

    /* Konten Body Kartu */
    .card-body {
      padding: 24px;
    }

    .card-body p {
      font-size: 14px;
      color: #4B5563;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .price-tag {
      font-size: 24px;
      font-weight: 800;
      color: #2E5B44;
      margin-bottom: 20px;
      display: block;
    }

    /* Tombol Pembelian */
    .btn-buy {
      display: block;
      width: 100%;
      background-color: #2E5B44;
      color: #FFFFFF;
      text-align: center;
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      text-decoration: none;
      transition: background-color 0.15s ease;
    }

    .btn-buy:hover {
      background-color: #234634;
    }
  </style>
</head>
<body>

  <div class="product-card">
    <div class="card-banner">
      <span class="badge-status">Edisi Terbatas</span>
      <h3>Paket Pelatihan Web</h3>
    </div>
    
    <div class="card-body">
      <p>Kuasai teknik penyusunan antarmuka web mulai dari sintaks dasar hingga tata letak profesional tanpa framework.</p>
      <span class="price-tag">Rp 249.000</span>
      <a href="#" class="btn-buy">Daftar Sekarang</a>
    </div>
  </div>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `background: linear-gradient(135deg, #2E5B44 0%, #1C3829 100%)`: Menghasilkan gradasi warna miring 135 derajat yang memberikan efek pencahayaan dinamis.
- `border-radius: 9999px`: Pola untuk membuat elemen kapsul/pil lonjong sempurna pada `.badge-status`.
- `box-shadow`: Penggunaan dua lapis bayangan lembut dengan transparansi rgba untuk kedalaman visual realistis tanpa efek kotor.
- `.product-card:hover`: Efek transisi halus mengangkat kartu sejauh `translateY(-4px)` saat kursor melayang.
- `overflow: hidden`: Memastikan latar belakang gradasi pada `.card-banner` terpotong rapi mengikuti lekukan `border-radius: 16px` kartu induk.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 5 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Bayangan terlalu pekat: Menggunakan bayangan hitam solid seperti rgba(0,0,0,0.8) membuat antarmuka terlihat kotor dan kuno.
- Lupa overflow: hidden saat menggunakan border-radius: Elemen anak di pojok atas/bawah akan menabrak keluar sudut membulat kontainer induk jika overflow tidak dipotong.
- Abaikan kontras teks di atas gradasi: Memilih warna teks yang tidak kontras dengan gradasi latar belakang membuat tulisan tidak terbaca.
- Nilai blur-radius terlalu kecil: Menyebabkan bayangan terlihat kaku seperti garis tebal biasa daripada efek kedalaman tiga dimensi yang lembut.

---

## Ringkasan

- Modul Minggu 5 (Warna, Background, dan Border) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
