# Pengenalan CSS dan Penghubung Stylesheet

> **Kategori:** CSS3 | **Level:** Pemula | **Seri:** Dasar CSS & Model Kotak | **Minggu 1:** Pengenalan CSS dan Penghubung Stylesheet
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Kenapa Materi Ini Penting

CSS mengatur seluruh tampilan web yang Anda lihat setiap hari — dari warna tombol sampai layout dashboard. Bedanya website terlihat murah dan profesional nyaris selalu ada di CSS, bukan di framework.

Di minggu ke-1 — bertajuk **"Pengenalan CSS dan Penghubung Stylesheet"** — program latihan utamanya adalah *"Struktur Proyek CSS Pertama dengan Reset dan Header Banner"*. Kerjakan programnya di Playground dulu, ubah sedikit demi sedikit, lalu baca penjelasan konsepnya.


## Tujuan Pembelajaran

- Memahami peran CSS (Cascading Style Sheets) dalam memisahkan struktur (HTML) dari tampilan visual
- Menguasai anatomi aturan sintaks CSS: selector, property, value, dan tanda kurung kurawal
- Mengenal 3 metode penyisipan CSS: external stylesheet, internal style, dan inline style
- Menerapkan struktur file proyek web standar (index.html dan styles.css)
- Membuat CSS Reset dasar menggunakan universal selector (*) dan box-sizing


## Fondasi: Sebelum Menulis Kode

Bagian ini untuk Anda yang **benar-benar baru** belajar coding. Konsepnya sama di semua bahasa — dibutuhkan sekali paham, dipakai selamanya.

- **File & folder = tempat program tinggal.** Program hanyalah teks biasa yang disimpan dalam file (contoh: `belajar.md`). File punya **ekstensi** yang menunjukkan bahasanya: `.md`, `.go`, `.py`, `.html`. Satu folder berisi semua file program disebut **project**.
- **Terminal / command line.** Jendela hitam tempat kita mengetik perintah teks: `cd folder` (pindah folder), `ls` / `dir` (lihat isi folder), `go run main.go` (jalankan program). Program dijalankan dari folder tempat file-nya berada.
- **Compiled vs interpreted.** Bahasa **compiled** (Go, Rust, C#) diterjemahkan dulu seluruh program menjadi instruksi mesin sebelum jalan — cepat, tapi harus "di-build" dulu. Bahasa **interpreted** (Python, PHP, JavaScript) dieksekusi baris per baris langsung — cocok untuk belajar & prototipe cepat. Playground di website ini mengeksekusi kode **di browser**, jadi Anda bisa mencoba materi tanpa install apa pun.
- **Statically typed vs dynamically typed.** Bahasa **statically typed** (Go, Rust, TypeScript) mewajibkan/mengecek tipe data (angka, teks) saat ditulis — error tertangkap lebih awal. Bahasa **dynamically typed** (Python, PHP, JavaScript) cek tipe saat program berjalan — lebih longgar, error baru muncul saat runtime.
- **Cara membaca pesan error.** Baca baris paling bawah dulu: jenis error + penjelasan singkatnya, lalu cari **nomor baris** yang disebut. Error bukan tragis — itulah cara komputer memberi tahu ada yang perlu diperbaiki.
- **REPL / playground.** REPL (Read-Eval-Print Loop) = "kalkulator" kode: ketik satu baris, langsung terlihat hasilnya. Tombol **Coba di Playground** di setiap blok kode memungkinkan Anda mengubah kode dan menjalankannya langsung — inilah cara tercepat belajar: ubah sedikit, jalankan, lihat bedanya.

> **Catatan penting:** playground di browser memiliki batasan — tidak menerima input keyboard interaktif (stdin). Jika sebuah tantangan meminta "input dari pengguna", cukup tulis nilainya langsung ke variabel (contoh: `let nama = "Budi"`; `rupiah = 250000`), lalu jalankan.

---

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

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

> **⚡ Coba dulu di browser — tanpa install!** Semua blok kode di materi ini punya tombol **Coba di Playground** dan bisa langsung dijalankan di tab ini. Langkah instalasi lokal di bawah ini opsional — lakukan nanti saat Anda sudah siap ngoding di editor sendiri (VS Code/IDE) atau mengerjakan proyek nyata.

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-css-project && cd my-css-project
touch index.html styles.css
```
- **Keterangan:** Buat file HTML dan hubungkan file stylesheet styles.css.
- **Pindah ke direktori project:**
```bash
cd my-css-project
```

---

### 2. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
Buka file index.html langsung di browser (klik dua kali)
```
Akses di browser atau terminal: `file:///my-css-project/index.html`

> ℹ️ Browser merender layout Flexbox dan warna tema secara instan.

**File Titik Masuk Utama (`styles.css`):**
```css
:root {
  --primary-color: #2E5B44;
  --bg-color: #F8FAF9;
  --text-color: #1A202C;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  max-width: 400px;
  border: 1px solid #E2E8F0;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}
```
Styling tata letak kartu menggunakan CSS Variables, Flexbox, dan efek transisi hover.

---

### 3. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-css-project/
├── index.html       # Markup halaman
└── styles.css       # Aturan tata letak & warna
```
Pemisahan struktur (HTML) dan presentasi visual (CSS).

---

### 4. Tips & Best Practice untuk Pemula
- Gunakan CSS Variables (`--var-name`) untuk kemudahan penerapan Dark Mode dan palet warna konsisten.
- Prioritaskan Mobile-First design dengan media queries `@media (min-width: 768px)`.

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
      color: #2D3748;
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
