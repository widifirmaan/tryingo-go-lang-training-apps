# Bulma: Layout Kolom dan Komponen

> **Kategori:** HTML5 | **Level:** Framework UI | **Minggu 10:** Bulma: Layout Kolom dan Komponen
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami filosofi Bulma sebagai framework CSS murni berbasis Flexbox tanpa JavaScript
- Memasang Bulma via CDN link CSS di dalam <head>
- Menguasai sistem kolom Flexbox: .columns dan .column (is-half, is-one-third, is-centered)
- Menggunakan sintaks class ramah manusia: .is-primary, .has-text-centered, dan .is-rounded
- Menerapkan komponen Bulma: .hero, .box, .button, dan .navbar

---

## 1. Filosofi Bulma (CSS Murni Tanpa JavaScript)

Bulma adalah framework CSS modern yang **100% tidak memerlukan JavaScript**. Keunggulannya:
- **Sangat Ringan:** Tidak ada file JS pihak ketiga yang memperlambat browser.
- **Sintaks Ramah Manusia:** Nama class ditulis seperti kalimat bahasa Inggris alami (`.is-primary`, `.has-text-centered`, `.is-large`).

### Pemasangan via CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
```

---

## 2. Sistem Kolom Flexbox Bulma
Tidak perlu menghitung angka 12 seperti Bootstrap. Cukup gunakan `.columns` dan `.column`:
- **Ukuran Otomatis:** Setiap `.column` di dalam `.columns` akan otomatis berbagi lebar secara rata!
- **Ukuran Tertentu:**
  - `.is-half`: Lebar 50%
  - `.is-one-third`: Lebar 33.3%
  - `.is-one-quarter`: Lebar 25%

```html
<div class="columns">
  <div class="column is-half">Kolom 50%</div>
  <div class="column">Kolom Otomatis</div>
</div>
```

---

## 3. Komponen Utama Bulma
- **Hero Banner:** `<section class="hero is-primary is-medium">` untuk header besar.
- **Box Kontainer:** `<div class="box">` untuk kotak berbayang halus.
- **Tombol:** `<button class="button is-primary is-rounded">`.

---

## Program: Penerapan Hero, Flexbox Columns, dan Box Komponen Bulma

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Portofolio Bulma — Alex Pratama</title>
  <!-- Bulma CSS CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
</head>
<body>

  <!-- HERO SECTION BULMA -->
  <section class="hero is-dark is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Studio Web Alex Pratama</h1>
        <p class="subtitle">Antarmuka Bersih Menggunakan Framework CSS Bulma</p>
      </div>
    </div>
  </section>

  <!-- KOLOM FLEXBOX & BOX -->
  <main class="section">
    <div class="container">
      <h2 class="title is-4 has-text-centered mb-5">Spesialisasi Teknis</h2>

      <div class="columns is-multiline">
        <div class="column is-one-third">
          <div class="box">
            <h3 class="title is-5 has-text-primary">HTML5 Semantik</h3>
            <p>Struktur dokumen yang mematuhi standar web resmi, mudah diindeks Google, dan ramah pembaca layar.</p>
          </div>
        </div>

        <div class="column is-one-third">
          <div class="box">
            <h3 class="title is-5 has-text-primary">Flexbox Layout</h3>
            <p>Tata letak kolom modern berbasis CSS murni yang fleksibel menyesuaikan berbagai resolusi layar.</p>
          </div>
        </div>

        <div class="column is-one-third">
          <div class="box">
            <h3 class="title is-5 has-text-primary">Performa Cepat</h3>
            <p>Tanpa pustaka JavaScript eksternal yang membebani kecepatan rendering awal dokumen.</p>
          </div>
        </div>
      </div>

      <div class="has-text-centered mt-4">
        <button class="button is-primary is-medium is-rounded">Mulai Diskusi Proyek</button>
      </div>
    </div>
  </main>

  <!-- FOOTER BULMA -->
  <footer class="footer">
    <div class="content has-text-centered">
      <p>&copy; 2026 Alex Pratama. Dibangun dengan HTML5 dan Bulma CSS.</p>
    </div>
  </footer>

</body>
</html>
```

---

## Bedah Detail Kode Program

- Line 7: Memuat stylesheet Bulma murni dari CDN tanpa memerlukan file JavaScript pendukung.
- Line 11-19: Komponen `.hero` dengan modifier `.is-dark` dan `.is-bold` menyajikan banner pembuka.
- Line 26-48: Komponen `.columns` membagi 3 kotak `.column .is-one-third` secara fleksibel.
- Line 51: Komponen tombol `.button` dengan modifier `.is-primary`, `.is-medium`, dan `.is-rounded`.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 10 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Mencari file JavaScript Bulma (Bulma adalah 100% CSS murni tanpa file JS bawaan).
- Lupa menulis tag pembungkus `.columns` sebelum mendeklarasikan elemen `.column`.
- Salah eja modifier Bulma (misal: menulis `primary` alih-alih `is-primary`).

---

## Ringkasan

- Modul Minggu 10 (Bulma: Layout Kolom dan Komponen) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
