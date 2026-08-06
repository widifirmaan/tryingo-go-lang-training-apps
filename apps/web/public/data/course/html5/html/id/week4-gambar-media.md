# Gambar & Media

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 4:** Gambar & Media

## Tujuan Pembelajaran

- Elemen img: src, alt, width, height, loading
- Pentingnya alt text untuk aksesibilitas dan SEO
- Elemen figure dan figcaption untuk caption gambar
- Elemen picture untuk responsive images
- Atribut loading="lazy" untuk performa

---

## Program: Galeri Foto

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Galeri Foto</title>
</head>
<body>
    <h1>Galeri Foto</h1>

    <figure>
        <img src="https://picsum.photos/400/300?random=1"
             alt="Pemandangan gunung saat sunrise"
             width="400" height="300"
             loading="lazy">
        <figcaption>Pemandangan gunung saat sunrise</figcaption>
    </figure>

    <figure>
        <img src="https://picsum.photos/400/300?random=2"
             alt="Pantai tropis dengan pasir putih"
             width="400" height="300"
             loading="lazy">
        <figcaption>Pantai tropis dengan pasir putih</figcaption>
    </figure>

    <h2>Responsive Picture</h2>
    <picture>
        <source media="(min-width: 800px)" srcset="https://picsum.photos/800/400?random=3">
        <source media="(min-width: 400px)" srcset="https://picsum.photos/400/300?random=4">
        <img src="https://picsum.photos/300/200?random=5" alt="Gambar responsive">
    </picture>
</body>
</html>
```

---

## Konsep Kunci

### Elemen img
`<img src="url" alt="deskripsi">` — alt wajib untuk aksesibilitas.

### Figure & Figcaption
`<figure>` wrapper, `<figcaption>` caption. Lebih semantic dari caption biasa.

### Picture Element
`<picture>` dengan `<source>` untuk responsive images — browser pilih yang sesuai.

### Performa
`loading="lazy"` menunda load sampai gambar terlihat di viewport.

---

## Eksperimen

- Tambah 3 gambar dengan alt text berbeda
- Coba picture dengan 3 source berbeda
- Eksperimen dengan width dan height berbeda
- Buat galeri dengan figure dan figcaption
- Coba loading="eager" vs "lazy"

---

## Tantangan

Buat halaman portofolio dengan galeri foto responsive, figure + figcaption, dan lazy loading.

---

## Ringkasan

Minggu 4 dari 14: **Gambar & Media** (Level: HTML5 Lengkap). Visual yang powerful. Minggu depan: **List & Daftar**.
