# Modern Box Model, Spesifisitas & CSS Custom Properties

> **Kategori:** CSS3 | **Level:** Pondasi Box Model & Flexbox | **Minggu 1:** Modern Box Model, Spesifisitas & CSS Custom Properties
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

Kamu telah menguasai model kotak browser modern, eliminasi bug kalkulasi dimensi, dan pengelolaan variabel desain CSS. Minggu depan kita akan mempelajari Flexbox untuk penataan tata letak satu dimensi.
