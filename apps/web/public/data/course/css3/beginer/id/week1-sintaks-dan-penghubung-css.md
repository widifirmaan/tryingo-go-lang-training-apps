# Pengenalan CSS dan Penghubung Stylesheet

> **Kategori:** CSS3 | **Level:** Dasar CSS & Model Kotak | **Minggu 1:** Pengenalan CSS dan Penghubung Stylesheet
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami peran CSS (Cascading Style Sheets) dalam memisahkan struktur (HTML) dari tampilan visual
- Menguasai anatomi aturan sintaks CSS: selector, property, value, dan tanda kurung kurawal
- Mengenal 3 metode penyisipan CSS: external stylesheet, internal style, dan inline style
- Menerapkan struktur file proyek web standar (index.html dan styles.css)
- Membuat CSS Reset dasar menggunakan universal selector (*) dan box-sizing

---

## 1. Apa Itu CSS dan Anatomi Sintaksnya?

CSS (**Cascading Style Sheets**) adalah bahasa aturan deklaratif yang menginstruksikan browser cara merender dan memberi gaya pada elemen HTML.

Setiap deklarasi CSS memiliki struktur baku:

```text
   Selector       Declaration Block
   ┌──────┐  ┌─────────────────────────┐
   h1        { color: #2E5B44; font-size: 24px; }
               └─────────────┘ └──────────────┘
                  Property          Value
```

- **Selector**: Menunjuk elemen HTML mana yang hendak dihias (misal: `h1`, `p`, `.kartu`).
- **Property**: Aspek gaya yang ingin diatur (misal: `color`, `font-size`, `background`).
- **Value**: Nilai spesifik untuk properti tersebut (misal: `#2E5B44`, `16px`).
- **Declaration Block**: Blok kurung kurawal `{ ... }` yang mengelompokkan satu atau lebih deklarasi yang dipisahkan oleh tanda titik koma (`;`).

---

## 2. Struktur File Proyek dan 3 Cara Menghubungkan CSS

Dalam pengembangan proyek nyata, struktur direktori standar memisahkan kode markup dan styling:

```text
my-css-project/
├── index.html       # Struktur konten HTML
├── styles.css       # Seluruh aturan presentasi visual
└── images/          # Aset visual pendukung
```

Ada 3 metode untuk menerapkan CSS ke halaman HTML:

### A. External Stylesheet (Rekomendasi Standar)
File CSS disimpan terpisah dalam file `styles.css` dan dihubungkan pada bagian `<head>` dokumen HTML:
```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```
*Kelebihan:* File dapat di-cache oleh browser dan digunakan ulang di puluhan halaman sekaligus.

### B. Internal Style
Ditulis langsung di dalam tag `<style>` di dalam elemen `<head>`:
```html
<head>
  <style>
    body { background-color: #F8FAF9; }
  </style>
</head>
```
*Kelebihan:* Cocok untuk prototipe satu halaman atau preview langsung di editor.

### C. Inline Style
Ditulis langsung pada atribut `style` milik elemen:
```html
<p style="color: #2E5B44; font-weight: bold;">Teks bergaya langsung</p>
```
*Catatan:* Hindari inline style untuk proyek skala besar karena mencampur aduk markup dan styling serta sulit dirawat.

---

## 3. CSS Reset Dasar
Browser bawaan (Chrome, Safari, Firefox) menyertakan stylesheet bawaan (*User Agent Stylesheet*) yang memiliki margin dan padding default tidak seragam. Untuk menyamakan tampilan, setiap proyek profesional diawali dengan CSS Reset:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

---

## Program: Struktur Proyek CSS Pertama dengan Reset dan Header Banner

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Langkah Pertama CSS</title>
  <style>
    /* 1. CSS Reset Dasar */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* 2. Styling Elemen Body */
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F4F6F4;
      color: #2D3748;
      line-height: 1.6;
      padding: 24px;
    }

    /* 3. Header Banner */
    .header-banner {
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: 32px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 24px;
    }

    .header-banner h1 {
      font-size: 28px;
      margin-bottom: 8px;
    }

    .header-banner p {
      font-size: 16px;
      opacity: 0.9;
    }

    /* 4. Kontainer Konten */
    .konten-box {
      background-color: #FFFFFF;
      padding: 24px;
      border-radius: 8px;
      border: 1px solid #E2E8F0;
    }

    .konten-box h2 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 12px;
    }
  </style>
</head>
<body>

  <header class="header-banner">
    <h1>Studio Web Mandiri</h1>
    <p>Membangun antarmuka terstruktur dengan standar CSS3 murni.</p>
  </header>

  <main class="konten-box">
    <h2>Langkah 1: Memisahkan Struktur dan Gaya</h2>
    <p>HTML menyediakan kerangka semantik, sementara CSS bertugas mengatur tata letak, jarak, tipografi, dan warna dokumen.</p>
  </main>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `* { margin: 0; padding: 0; box-sizing: border-box; }`: Reset universal untuk menghapus jarak bawaan browser dan memastikan perhitungan ukuran elemen akurat.
- `body { font-family: ...; line-height: 1.6; }`: Mengatur jenis huruf sistem yang bersih dan keterbacaan baris teks di seluruh dokumen.
- `.header-banner`: Class selector untuk membuat kartu header berwarna hijau `#2E5B44` dengan sudut membulat `border-radius: 12px`.
- `.konten-box`: Komponen kartu konten berwarna putih dengan garis tepi tipis `#E2E8F0` sebagai batas visual.
- `padding` vs `margin`: Padding memberi ruang bernapas di dalam kotak, sementara margin memberi jarak pemisah antar elemen luar.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 1 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa tanda titik koma (;): Setiap deklarasi properti wajib diakhiri dengan titik koma, jika tertinggal maka deklarasi berikutnya akan diabaikan oleh browser.
- Menulis inline style berlebihan: Mencampur styling di atribut tag HTML membuat pemeliharaan kode sangat sulit saat halaman bertambah banyak.
- Lupa menyertakan rel="stylesheet" pada tag <link>: Jika atribut rel tertinggal, browser tidak akan memuat file CSS eksternal.
- Salah penulisan kurung kurawal: Seluruh properti wajib berada di dalam blok { } penutup yang cocok.

---

## Ringkasan

- Modul Minggu 1 (Pengenalan CSS dan Penghubung Stylesheet) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
