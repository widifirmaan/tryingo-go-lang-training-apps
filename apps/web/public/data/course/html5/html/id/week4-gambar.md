# Gambar & Figure

> HTML5 | Modul 4

## Tujuan Pembelajaran

- Menampilkan gambar dengan tag img dan atribut alt
- Menggunakan figure dan figcaption untuk konteks
- Memahami format gambar web: JPEG, PNG, WebP, SVG
- Menerapkan responsive images dengan srcset dan sizes
- Menggunakan picture element untuk art direction

---

## Program: Galeri Foto

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Galeri Foto</title>
</head>
<body>
  <h1>Galeri Wisata Alam</h1>

  <figure>
    <img src="https://placehold.co/600x400/2E5B44/fff?text=Gunung" alt="Pemandangan gunung dengan latar langit biru" width="600" height="400" loading="lazy">
    <figcaption>Pemandangan Gunung Bromo saat matahari terbit</figcaption>
  </figure>

  <figure>
    <img src="https://placehold.co/600x400/1572B6/fff?text=Pantai" alt="Pantai dengan pasir putih dan air jernih" width="600" height="400" loading="lazy">
    <figcaption>Pantai Kuta, Bali</figcaption>
  </figure>

  <figure>
    <img src="https://placehold.co/600x400/E34F26/fff?text=Hutan" alt="Hutan tropis yang lebat" width="600" height="400" loading="lazy">
    <figcaption>Hutan Hujan Tropis Kalimantan</figcaption>
  </figure>

  <figure>
    <picture>
      <source srcset="https://placehold.co/800x400/333/fff?text=Desktop" media="(min-width: 800px)">
      <source srcset="https://placehold.co/400x400/666/fff?text=Mobile" media="(max-width: 799px)">
      <img src="https://placehold.co/600x400/999/fff?text=Default" alt="Contoh responsive image dengan picture element" style="max-width:100%;height:auto">
    </picture>
    <figcaption>Gambar ini menyesuaikan ukuran layar (responsive image)</figcaption>
  </figure>

  <p>Format gambar yang didukung: JPEG, PNG, WebP, dan SVG.</p>
</body>
</html>
```

---

## Penjelasan

Berikut penjelasan detail materi:

### Tag Img
`<img src="url" alt="deskripsi">` — void element (tanpa tag penutup). `alt` penting untuk aksesibilitas dan SEO.

### Figure & Figcaption
`<figure>` mengelompokkan konten media. `<figcaption>` memberikan keterangan. Lebih semantic daripada div biasa.

### Format Gambar
**JPEG** — foto, gradasi warna. **PNG** — transparansi, diagram. **WebP** — kompresi lebih baik dari JPEG/PNG. **SVG** — vektor, responsif.

### Responsive Images
`srcset` — daftar gambar dengan lebar berbeda. `sizes` — aturan ukuran berdasarkan viewport. `<picture>` — art direction (gambar berbeda untuk layar berbeda).

---

## Eksperimen

Ganti URL gambar placeholder dengan gambar dari internet,Tambah gambar SVG menggunakan tag img,Buat figure dengan multiple gambar dalam satu figure,Implementasi picture element dengan 3 source

---

## Tantangan

Buat galeri portofolio dengan: 6 gambar dalam grid 3x2, masing-masing dengan figure dan figcaption, satu gambar menggunakan picture element dengan 3 ukuran layar, dan gambar SVG inline. Gunakan loading lazy untuk performa.

---

## Ringkasan

Gambar membuat halaman web lebih menarik dan informatif. Dengan alt text, figure, responsive images, dan picture element, Anda bisa menyajikan visual yang optimal di semua perangkat. Modul selanjutnya: **List & Table** — cara mengorganisir data dalam daftar dan tabel.
