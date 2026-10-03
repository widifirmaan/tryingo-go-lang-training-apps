# Modern Box Model, Spesifisitas & CSS Custom Properties

> **Kategori:** CSS3 | **Level:** Pondasi Box Model & Flexbox | **Minggu 1:** Modern Box Model, Spesifisitas & CSS Custom Properties

## Tujuan Pembelajaran

- Menerapkan universal reset box-sizing: border-box untuk mencegah pertambahan ukuran elemen tak terduga
- Memahami anatomi 4 lapisan Box Model: Content, Padding, Border, dan Margin (beserta margin collapsing)
- Mendefinisikan dan mengonsumsi CSS Custom Properties (Variables) di tingkat :root
- Menghitung dimensi dan jarak dinamis menggunakan fungsi kalkulasi calc()
- Memahami rumus kalkulasi spesifisitas selektor CSS (Inline > ID > Class/Attr/Pseudo > Elemen)

---

## Program: Kartu Komponen UI dengan Perhitungan Dimensi Presisi

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pondasi Box Model & Variabel CSS</title>
  <style>
    /* 1. Global Reset & Box Sizing */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* 2. Design Tokens via Custom Properties (:root) */
    :root {
      --color-brand-primary: #2E5B44;
      --color-brand-accent: #E34F26;
      --color-surface-bg: #F4F2ED;
      --color-surface-card: #FFFFFF;
      --color-text-main: #1A1A1A;
      --color-text-muted: #666666;
      --radius-md: 16px;
      --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.08);
      --space-unit: 8px;
    }

    body {
      background-color: var(--color-surface-bg);
      color: var(--color-text-main);
      font-family: system-ui, -apple-system, sans-serif;
      padding: calc(var(--space-unit) * 4);
    }

    /* 3. Komponen Card dengan Box Model Terkendali */
    .pricing-card {
      background-color: var(--color-surface-card);
      border: 2px solid var(--color-brand-primary);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      max-width: 360px;
      padding: calc(var(--space-unit) * 3); /* 24px */
    }

    .pricing-badge {
      display: inline-block;
      background-color: var(--color-brand-primary);
      color: #FFFFFF;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: calc(var(--space-unit) * 2);
    }

    .pricing-card h2 {
      font-size: 1.5rem;
      margin-bottom: var(--space-unit);
    }

    .pricing-price {
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-brand-primary);
      margin-bottom: calc(var(--space-unit) * 2);
    }

    .pricing-btn {
      display: block;
      width: 100%;
      background-color: var(--color-brand-primary);
      color: #FFFFFF;
      border: none;
      padding: 12px 20px;
      font-weight: 600;
      border-radius: calc(var(--radius-md) / 2);
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="pricing-card">
    <span class="pricing-badge">Paket Pro</span>
    <h2>Pengembangan Web</h2>
    <p class="pricing-price">Rp 499.000<small>/bln</small></p>
    <p style="color: var(--color-text-muted); margin-bottom: 24px;">Akses penuh ke seluruh 28 kurikulum teknologi dan lingkungan playground interaktif.</p>
    <button class="pricing-btn">Mulai Belajar Sekarang</button>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Revolusi box-sizing: border-box
Secara default, browser menggunakan `content-box`, di mana padding dan border akan **ditambahkan** ke lebar elemen (elemen dengan width 100px + padding 20px + border 2px akan menjadi 144px). Dengan `box-sizing: border-box`, lebar elemen terkunci tepat sesuai nilai `width` yang ditentukan, dan padding/border dihitung ke arah dalam.

### Anatomi 4 Lapisan Box Model
1. **Content**: Area inti tempat teks, gambar, atau elemen anak ditampilkan.
2. **Padding**: Ruang transparan di dalam elemen yang memisahkan konten dari border.
3. **Border**: Garis tepi luar yang membingkai elemen dan padding.
4. **Margin**: Ruang kosong transparan di luar border yang memisahkan elemen ini dari elemen tetangganya. *Catatan:* Margin vertikal pada elemen bertetangga dapat mengalami *margin collapsing* (hanya margin terbesar yang berlaku).

### CSS Custom Properties (:root)
Variabel CSS dideklarasikan dengan awalan dua tanda minus (misal `--color-brand-primary: #2E5B44`). Menempatkannya di pseudo-class `:root` membuatnya dapat diakses secara global di seluruh dokumen melalui fungsi `var(--nama-variabel)`.

---

---

## Penjelasan untuk Pemula

### Analogi: Mengemas Bingkai Foto
Bayangkan elemen HTML seperti lukisan berbingkai:
1. **Content** adalah kanvas lukisannya sendiri.
2. **Padding** adalah bingkai karton putih (*matting*) yang mengelilingi lukisan agar lukisan terlihat lega.
3. **Border** adalah bingkai kayu keras di sekelilingnya.
4. **Margin** adalah jarak kosong di dinding tembok antara bingkai lukisan Anda dengan lukisan tetangga di sebelahnya.
5. **`border-box`** seperti memesan bingkai dengan ukuran pas pigura luar: jika pigura 30x30 cm, maka kayu dan karton dihitung ke dalam, bukan membengkak jadi 40x40 cm.

## Eksperimen

- Hapus aturan global box-sizing: border-box dan amati bagaimana lebar tombol atau kartu melompat bertambah besar dari nilai aslinya.
- Ubah nilai --color-brand-primary di :root menjadi warna biru (#1572B6) dan saksikan seluruh komponen berubah serentak dalam satu detik.
- Tempatkan dua paragraf bertetangga dengan margin-bottom: 30px dan margin-top: 20px, lalu ukur jarak antar paragraf (hanya 30px karena margin collapse).
- Beri nilai fallback pada variabel: var(--warna-palsu, #333333) dan amati bagaimana browser menggunakan warna cadangan.

---

## Tantangan

Rancang sistem kartu metrik analitik dashboard: buat variabel untuk warna teks, latar belakang, dan border di `:root`. Terapkan `box-sizing: border-box`, padding 20px, border-radius 12px, serta gunakan `calc()` untuk menghitung margin dinamis.

---

## Ringkasan

Kamu telah menguasai model kotak browser modern, eliminasi bug kalkulasi dimensi, dan pengelolaan variabel desain CSS. Minggu depan kita akan mempelajari Flexbox untuk penataan tata letak satu dimensi.
