# Media, Iframe, dan Aksesibilitas

> **Kategori:** HTML5 | **Level:** Form dan Interaksi | **Minggu 6:** Media, Iframe, dan Aksesibilitas
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Menyematkan pemutar audio dan video native menggunakan tag <audio> dan <video>
- Menyediakan subtitle dan teks transkrip menggunakan tag <track>
- Menyematkan konten eksternal atau peta menggunakan tag <iframe> dengan atribut sandbox dan loading="lazy"
- Menyisipkan grafis vektor tajam menggunakan elemen <svg>
- Menerapkan prinsip aksesibilitas dasar (WCAG 2.1 AA) dengan label ARIA dan atribut semantik

---

## 1. Pemutar Media: <video> dan <audio>

HTML5 mendukung pemutaran video dan audio secara native tanpa plugin pihak ketiga:
```html
<video controls width="640" poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track src="subtitle-id.vtt" kind="subtitles" srclang="id" label="Bahasa Indonesia">
  Browser Anda tidak mendukung pemutar video HTML5.
</video>
```
- **`controls`**: Menampilkan tombol play, pause, volume, dan timeline.
- **`poster`**: Gambar thumbnail yang tampil sebelum video diputar.
- **`<track>`**: Menyematkan file subtitle (*WebVTT* `.vtt`) demi aksesibilitas tunarungu.

---

## 2. Menyematkan Konten dengan <iframe>
Tag `<iframe>` menyematkan dokumen web lain ke dalam halaman Anda (misal Google Maps atau video):
```html
<iframe 
  src="https://maps.google.com/..." 
  title="Peta Lokasi Kantor Studio" 
  width="600" 
  height="450" 
  loading="lazy" 
  allowfullscreen>
</iframe>
```
- **`title`**: Wajib ada agar pembaca layar mengetahui isi iframe.
- **`loading="lazy"`**: Menunda pemuatan iframe hingga pengguna menggulir ke dekatnya (*menghemat bandwidth*).

---

## 3. Grafis Vektor (<svg>)
Tag `<svg>` memungkinkan Anda menggambar bentuk vektor atau ikon tajam langsung di HTML:
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <circle cx="12" cy="12" r="10" stroke-width="2"/>
</svg>
```

---

## 4. Aksesibilitas Web (WCAG dan ARIA)
Website yang baik dapat diakses oleh semua pengguna, termasuk penyandang disabilitas:
- **`aria-label="..."`**: Memberi nama label pada tombol yang hanya memiliki ikon tanpa teks.
- **`aria-hidden="true"`**: Menyembunyikan ikon dekoratif dari pembaca layar agar tidak dibaca bersuara.
- **Kontras Teks**: Pastikan teks mudah dibaca di atas warna latar belakang.

---

## Program: Penyematan Media Audio dan Iframe Peta Aksesibel

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Media dan Lokasi — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    .card { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .icon-box { display: flex; align-items: center; gap: 8px; font-weight: bold; color: #0f172a; margin-bottom: 12px; }
    svg { color: #0284c7; }
    audio { width: 100%; margin-top: 10px; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
      <a href="kontak.html">Kontak</a>
    </nav>
    <h1>Media Informasi dan Dokumentasi</h1>
  </header>

  <main>
    <section class="card">
      <div class="icon-box">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="10 8 16 12 10 16 10 8"/>
        </svg>
        <span>Rekaman Pengantar Proyek</span>
      </div>
      <p>Dengarkan penjelasan ringkas mengenai standar kode HTML yang kami terapkan:</p>
      
      <audio controls aria-label="Audio pengantar proyek pembuatan website">
        <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
        Browser Anda tidak mendukung pemutar audio bawaan.
      </audio>
    </section>

    <section class="card">
      <h2>Peta Lokasi Kantor</h2>
      <p>Kunjungi studio kerja kami untuk konsultasi langsung:</p>

      <iframe 
        src="https://www.openstreetmap.org/export/embed.html?bbox=106.8%2C-6.2%2C106.9%2C-6.1&amp;layer=mapnik" 
        title="Peta Lokasi Kantor Studio Alex Pratama" 
        width="100%" 
        height="260" 
        style="border: 1px solid #cbd5e1; border-radius: 6px;" 
        loading="lazy">
      </iframe>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Aksesibilitas Terverifikasi.</p>
  </footer>
</body>
</html>
```

---

## Bedah Detail Kode Program

- Line 26-29: `<svg>` menyajikan ikon play vektor dengan `aria-hidden="true"` agar tidak membingungkan screen reader.
- Line 33-36: `<audio controls>` menyajikan audio native dengan teks fallback.
- Line 43-50: `<iframe>` menyematkan peta interaktif dengan atribut wajib `title` dan `loading="lazy"`.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 6 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa memberikan atribut `title` pada tag `<iframe>` (pelanggaran standar aksesibilitas WCAG).
- Lupa menyertakan atribut `controls` pada tag `<video>` atau `<audio>` sehingga pengguna tidak bisa memutar media.
- Menggunakan autoplay audio dengan suara keras secara tiba-tiba tanpa izin pengguna.

---

## Ringkasan

- Modul Minggu 6 (Media, Iframe, dan Aksesibilitas) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
