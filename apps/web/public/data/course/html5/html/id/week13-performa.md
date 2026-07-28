# Performa & Best Practices

> HTML5 | Modul 13

## Tujuan Pembelajaran

- Menerapkan lazy loading pada gambar dan iframe
- Menggunakan resource hints: preload, prefetch, preconnect
- Mengoptimalkan gambar dengan format modern dan responsive
- Memvalidasi HTML dengan W3C Validator
- Mengaudit aksesibilitas dan performa halaman

---

## Program: Audit Halaman

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Performa HTML</title>
  <link rel="preconnect" href="https://placehold.co">
  <link rel="dns-prefetch" href="//placehold.co">
</head>
<body>
  <h1>Performa & Best Practices HTML</h1>

  <section>
    <h2>1. Resource Hints</h2>
    <p>Gunakan <code>&lt;link rel="preconnect"&gt;</code> untuk mempercepat koneksi ke server eksternal.</p>
    <p>Lihat di <code>&lt;head&gt;</code> halaman ini untuk contoh preconnect dan dns-prefetch.</p>
  </section>

  <section>
    <h2>2. Lazy Loading</h2>
    <p>Gambar di bawah ini menggunakan <code>loading="lazy"</code>:</p>
    <img src="https://placehold.co/300x200/2E5B44/fff?text=Gambar+Lazy" alt="Contoh lazy loading" loading="lazy" width="300" height="200">
    <img src="https://placehold.co/300x200/1572B6/fff?text=Lazy+2" alt="Contoh lazy loading kedua" loading="lazy" width="300" height="200">
  </section>

  <section>
    <h2>3. Responsive Images</h2>
    <img src="https://placehold.co/800x200/E34F26/fff?text=Responsive" alt="Contoh responsive image"
         srcset="https://placehold.co/400x200/E34F26/fff?text=400w 400w,
                 https://placehold.co/800x200/E34F26/fff?text=800w 800w"
         sizes="(max-width: 600px) 400px, 800px"
         style="max-width:100%;height:auto">

    <h2>4. Dekoding Async</h2>
    <img src="https://placehold.co/300x200/666/fff?text=Async+Decode" alt="Async decoding" decoding="async" width="300" height="200">

    <h2>5. Elemen Semantic</h2>
    <p>Gunakan <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code> untuk struktur yang jelas.</p>

    <h2>6. Validasi W3C</h2>
    <p>Selalu validasi HTML Anda di <a href="https://validator.w3.org" target="_blank">W3C Validator</a>.</p>

    <h2>7. Aksesibilitas</h2>
    <p>Tambahkan <code>alt</code> pada semua gambar, gunakan <code>label</code> untuk form.</p>

    <h2>8. Minimalisir HTTP Request</h2>
    <p>Gabungkan file CSS/JS, gunakan sprite untuk ikon kecil, dan manfaatkan cache browser.</p>
  </section>

  <footer>
    <p><small>&copy; 2026 Tryngo — Best Practices HTML5</small></p>
  </footer>
</body>
</html>
```

---

## Penjelasan

Berikut penjelasan detail materi:

### Lazy Loading
`loading="lazy"` — gambar dimuat saat mendekati viewport. Menghemat bandwidth dan mempercepat initial load. `loading="eager"` — muat segera.

### Resource Hints
`preconnect` — buka koneksi awal ke origin. `dns-prefetch` — resolve DNS awal. `preload` — muat resource penting lebih awal. `prefetch` — muat resource untuk halaman berikutnya.

### Responsive Images
Gunakan `srcset` + `sizes` untuk mengirim gambar sesuai ukuran layar. `picture` element untuk art direction. Format WebP dengan fallback JPEG/PNG.

### Dekoding
`decoding="async"` — dekoding gambar asynchronous, tidak memblokir rendering. `decoding="sync"` — default.

### Validasi
W3C Validator — cek kesalahan HTML. Lighthouse — audit performa, aksesibilitas, SEO. axe DevTools — audit aksesibilitas mendalam.

---

## Eksperimen

Ukur performa halaman dengan Lighthouse di DevTools,Tambah preload untuk font atau gambar hero,Buat gambar dengan format WebP (konversi online),Implementasi lazy loading pada iframe

---

## Tantangan

Audit halaman HTML Anda menggunakan Lighthouse dan W3C Validator. Catat skor dan perbaiki minimal 3 isu. Implementasi: lazy loading pada 3 gambar, preconnect ke Google Fonts, responsive images dengan srcset, dan minimal 2 resource hints. Laporkan perbaikan skor sebelum dan sesudah.

---

## Ringkasan

Performa dan best practices adalah yang membedakan developer biasa dari developer profesional. Lazy loading, resource hints, responsive images, dan validasi memastikan website Anda cepat, efisien, dan berkualitas. Modul selanjutnya: **Proyek Akhir** — gabungkan semua konsep dalam portofolio lengkap.
