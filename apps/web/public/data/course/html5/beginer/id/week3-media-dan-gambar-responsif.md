# Media Responsif: Elemen Picture, Gambar Srcset & Multimedia

> **Kategori:** HTML5 | **Level:** Struktur & Semantik Web | **Minggu 3:** Media Responsif: Elemen Picture, Gambar Srcset & Multimedia
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menulis tag <img> dengan atribut wajib alt yang deskriptif dan informatif
- Mencegah Cumulative Layout Shift (CLS) dengan selalu menyertakan atribut width dan height
- Menggunakan elemen <picture> beserta tag <source> untuk penyajian format WebP/AVIF modern
- Mengaktifkan pemuatan bertahap native dengan loading="lazy" dan decoding="async"
- Menyematkan media <video> dan <audio> native lengkap dengan fallback dan subtitle WebVTT (<track>)

---

## Program: Penyajian Gambar Adaptif & Audio-Video HTML5 Native

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aset Multimedia — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Pusat Dokumentasi Media & Galeri Infrastruktur</h1>

      <section>
        <h2>1. Server Data Center Utama (Format Gambar Modern)</h2>
        <p>Arsitektur penyajian gambar multi-resolusi untuk menghemat bandwidth seluler:</p>

        <!-- Elemen picture untuk art direction dan format next-gen -->
        <picture>
          <source media="(min-width: 1024px)" srcset="datacenter-large.webp" type="image/webp">
          <source media="(min-width: 640px)" srcset="datacenter-medium.webp" type="image/webp">
          <source srcset="datacenter-small.webp" type="image/webp">
          <img src="datacenter-fallback.jpg" 
               alt="Rak server enterprise Nusa Digital dengan indikator LED aktif di ruang kontrol berpendingin presisi"
               width="800" 
               height="450" 
               loading="lazy" 
               decoding="async">
        </picture>
        <p><small>Gambar di atas otomatis menyajikan WebP untuk browser modern dan fallback JPEG untuk kompatibilitas lama.</small></p>
      </section>

      <section>
        <h2>2. Video Pengenalan Fasilitas</h2>
        <video controls width="640" height="360" poster="video-cover.jpg" preload="metadata">
          <source src="nusa-overview.mp4" type="video/mp4">
          <source src="nusa-overview.webm" type="video/webm">
          <track kind="subtitles" src="subtitles-id.vtt" srclang="id" label="Bahasa Indonesia" default>
          <track kind="subtitles" src="subtitles-en.vtt" srclang="en" label="English">
          Browser Anda tidak mendukung pemutaran video HTML5 native.
        </video>
      </section>

      <section>
        <h2>3. Podcast Rekayasa Perangkat Lunak</h2>
        <audio controls preload="none">
          <source src="episode-01.mp3" type="audio/mpeg">
          <source src="episode-01.ogg" type="audio/ogg">
          Browser Anda tidak mendukung elemen audio HTML5.
        </audio>
      </section>
    </article>
  </main>
</body>
</html>
```

---

## Konsep Kunci

### Atribut Alt dan Pencegahan CLS
Atribut `alt` sangat krusial: jika gambar gagal dimuat atau dibaca oleh tuna netra, teks ini menjelaskan konteks visual gambar. Atribut `width` dan `height` memberitahu browser aspek rasio gambar sebelum file selesai diunduh, mencegah lonjakan layout mendadak (*Cumulative Layout Shift*).

### Elemen <picture> vs <img> dengan srcset
Elemen `<picture>` memberikan kendali penuh kepada developer (*Art Direction* dan format negosiasi):
- Tag `<source type="image/webp">` menyajikan format modern berukuran lebih kecil.
- Tag `<img src="...">` di bagian paling bawah berfungsi sebagai *fallback* mutlak untuk browser lawas.

### Native Lazy Loading
Menambahkan `loading="lazy"` menginstruksikan browser untuk menunda pengunduhan gambar di luar layar (*below the fold*) sampai pengguna mendekati posisi scroll gambar tersebut, menghemat memori dan mempercepat waktu muat awal halaman.

### Aksesibilitas Multimedia (<track>)
Tag `<track kind="subtitles">` menyertakan file WebVTT (.vtt) agar dialog video dapat dibaca oleh penyandang tunarungu atau pengguna di lingkungan bising tanpa suara.

---

---

## Penjelasan untuk Pemula

### Analogi: Pelayan Restoran dan Ukuran Meja
1. **`width` & `height` pada gambar** seperti menelepon restoran memesan meja: "Saya datang 4 orang". Pelayan langsung menyisihkan meja berkapasitas 4 orang. Tanpa reservasi ukuran, piring makanan datang tiba-tiba dan meja harus digeser dadakan (itulah yang disebut CLS).
2. **`<picture>`** seperti menu restoran bilingual: pelayan melihat tamu, jika tamu berbahasa Indonesia disodorkan buku menu bahasa Indonesia, jika turis disodorkan bahasa Inggris.
3. **`<track>` subtitle** seperti teks terjemahan di bioskop saat film asing ditayangkan.

## Eksperimen

- Sengaja rusak nama file gambar di atribut src dan periksa teks alternatif apa yang ditampilkan di layar pengganti.
- Hapus atribut width dan height pada koneksi internet lambat (DevTools Slow 3G) lalu amati bagaimana teks di bawah gambar melompat turun saat gambar selesai dimuat.
- Coba buka video tanpa tag <track> dan amati ketiadaan tombol closed-caption (CC) pada pemutar video native browser.
- Ubah preload="none" menjadi preload="auto" pada elemen audio dan amati aktivitas tab Network browser saat halaman pertama kali dibuka.

---

## Tantangan

Bangun modul galeri produk untuk "Toko Jam Tangan Mahakarya". Gunakan elemen `<picture>` dengan 3 variasi ukuran sumber gambar (mobile, tablet, desktop) dan WebP, sertakan width/height, pemuatan `loading="lazy"`, serta pemutar video review produk lengkap dengan 1 trek subtitle WebVTT bahasa Indonesia.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Tag bersarang tidak tertutup (Unclosed/Mismatched Tags)
- **Gejala / Masalah:** Tata letak halaman rusak atau elemen inline menelan elemen block.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu tutup tag berpasangan dan manfaatkan validator HTML5 atau auto-closing tag di VS Code.

### 2. Penggunaan tag <div> berlebihan (Div Soup)
- **Gejala / Masalah:** Website sulit diakses pembaca layar (screen reader) dan skor SEO menurun drastis.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan tag semantik seperti <header>, <nav>, <main>, <article>, dan <footer>.

### 3. Lupa atribut 'alt' pada <img> dan 'for' pada <label>
- **Gejala / Masalah:** Skor aksesibilitas (a11y) merah dan form sulit diklik pada perangkat layar sentuh.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu sertakan deskripsi alt yang bermakna dan hubungkan label dengan id input terkait.

---

## Ringkasan

Kamu telah menguasai optimasi gambar adaptif, pencegahan pergeseran tata letak (CLS), dan implementasi media audio-video aksesibel. Minggu depan kita akan mempelajari penyajian data tabular yang terstruktur.
