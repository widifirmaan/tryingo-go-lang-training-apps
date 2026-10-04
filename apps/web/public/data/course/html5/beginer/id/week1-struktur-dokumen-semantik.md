# Struktur Dokumen Standar & Metadata Head

> **Kategori:** HTML5 | **Level:** Struktur & Semantik Web | **Minggu 1:** Struktur Dokumen Standar & Metadata Head
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami deklarasi <!DOCTYPE html> dan perannya mencegah quirks mode pada browser
- Mengatur elemen root <html lang="id"> untuk mesin pencari dan teknologi pembaca layar (screen reader)
- Mengonfigurasi meta charset UTF-8 dan meta viewport untuk rendering responsif di perangkat mobile
- Memanfaatkan Open Graph metadata untuk optimasi berbagi tautan di media sosial
- Menggunakan elemen landmark dasar: <header>, <main>, <article>, dan <footer>

---

## Program: Dokumen HTML5 Pertama yang Valid dan Terstruktur

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portal profil perusahaan resmi PT Nusa Digital Teknologi. Solusi transformasi digital terpercaya.">
  <meta name="author" content="Tim Rekayasa Perangkat Lunak Nusa Digital">
  <meta property="og:title" content="Nusa Digital — Solusi Transformasi Digital">
  <meta property="og:description" content="Layanan rekayasa software enterprise dan cloud computing berkinerja tinggi.">
  <meta property="og:type" content="website">
  <title>Nusa Digital — Solusi Transformasi Digital</title>
</head>
<body>
  <header>
    <h1>Nusa Digital Solusindo</h1>
    <p>Membangun infrastruktur software berkinerja tinggi untuk ekosistem industri modern.</p>
  </header>

  <main>
    <article>
      <h2>Komitmen Rekayasa Kami</h2>
      <p>Kami menerapkan prinsip clean architecture, keamanan data ketat, dan performa web optimal sejak baris kode pertama.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 PT Nusa Digital Teknologi. Hak cipta dilindungi undang-undang.</p>
  </footer>
</body>
</html>
```

---

## Konsep Kunci

### Deklarasi <!DOCTYPE html>
Deklarasi doctype di baris pertama memberi instruksi kepada browser untuk merender dokumen menggunakan standar HTML5 modern. Tanpa deklarasi ini, browser akan masuk ke *quirks mode* yang menyebabkan inkonsistensi rendering layout lama.

### Metadata Head & Viewport
Elemen `<head>` memuat data tentang dokumen yang tidak ditampilkan langsung di layar pengguna:
- `<meta charset="UTF-8">`: Memastikan encoding karakter mendukung seluruh abjad internasional, simbol matematika, dan emoji.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Menetapkan lebar viewport mengikuti lebar layar fisik perangkat dengan skala awal 1:1, syarat mutlak web responsif.
- `<meta name="description">`: Ringkasan konten halaman yang ditampilkan di hasil pencarian Google.

### Landmark Semantik Dasar
- `<header>`: Memuat pengantar atau navigasi situs.
- `<main>`: Memuat konten utama yang unik untuk halaman ini (hanya boleh ada satu `<main>` per dokumen).
- `<article>`: Bagian konten independen yang dapat didistribusikan atau digunakan kembali secara mandiri.
- `<footer>`: Catatan kaki berisi hak cipta, kontak, atau tautan legalitas.

---

---

## Penjelasan untuk Pemula

### Analogi: Surat Resmi Perusahaan
Bayangkan dokumen HTML seperti surat resmi bisnis:
1. **`<!DOCTYPE html>`** adalah stempel cap resmi bahwa surat ini ditulis sesuai format baku kantor pos modern.
2. **`<head>`** adalah amplop surat: berisi alamat tujuan, nomor resi, stiker pengiriman, dan nama pengirim (orang tidak membaca ini saat membaca isi surat, tapi pos dan kurir membutuhkannya).
3. **`<body>`** adalah lembaran kertas isi surat yang dibaca oleh penerima.
4. **`<header>`, `<main>`, `<footer>`** adalah kepala surat, isi pesan utama, dan tanda tangan penutup di bagian bawah.

## Eksperimen

- Hapus baris meta viewport, buka di ponsel atau ubah ukuran jendela browser, dan amati teks yang mengecil seperti halaman desktop versi 90-an.
- Ubah nilai atribut lang="id" menjadi lang="en", lalu periksa bagaimana browser menawarkan fitur terjemahan otomatis.
- Tambahkan meta tag og:image dengan URL gambar dummy, kemudian amati peran tag tersebut dalam kartu pratinjau media sosial.
- Coba letakkan teks di luar elemen <body> dan periksa bagaimana browser secara otomatis memperbaiki penempatan DOM di tab Elements Developer Tools.

---

## Tantangan

Buat kerangka dokumen HTML5 lengkap untuk beranda "Klinik Sehat Bersama". Sertakan meta charset, viewport, meta description medis yang meyakinkan, serta elemen landmark `<header>`, `<main>`, `<article>` tentang layanan rawat jalan, dan `<footer>` lengkap dengan jam operasional.

---

## Model Mental & Diagram Alur Visual

![Diagram Struktur DOM Tree HTML5](/diagrams/dom-tree.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│                   <!DOCTYPE html>                        │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ <html lang="id">                                     │ │
│ │  ┌─────────────────────────┐ ┌─────────────────────┐ │ │
│ │  │ <head> (Metadata)       │ │ <body> (Tampilan)   │ │ │
│ │  │ • <meta charset="UTF-8">│ │ • <header>          │ │ │
│ │  │ • <title>Judul Web</title>│ • <main>            │ │ │
│ │  │ • <meta name="viewport">│ │ • <footer>          │ │ │
│ │  └─────────────────────────┘ └─────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `<!DOCTYPE html>`
- **Fungsi Utama:** Deklarasi standar dokumen HTML5 modern.
- **Parameter / Atribut:** `Wajib di baris paling pertama`.
- **Perilaku & Efek Sistem:** Mengaktifkan rendering Standard Mode pada peramban web modern..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html lang="id">
  <head><title>Tryngo Web</title></head>
</html>
```
- **Hasil Output yang Diharapkan:**
```text
Halaman dirender sesuai standar W3C
```

### 2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Fungsi Utama:** Pengaturan dimensi dan skala layar mobile.
- **Parameter / Atribut:** `name='viewport', content='...'`.
- **Perilaku & Efek Sistem:** Menyesuaikan skala tampilan 1:1 dengan lebar fisik perangkat agar tidak mengecil di ponsel..
- **Contoh Penggunaan Praktis:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- **Hasil Output yang Diharapkan:**
```text
Tampilan responsif di seluruh layar ponsel
```

### 3. `<header>, <main>, <footer>`
- **Fungsi Utama:** Struktur landmark semantik aksesibilitas.
- **Parameter / Atribut:** `Global attributes (class, id, lang)`.
- **Perilaku & Efek Sistem:** Membagi dokumen menjadi banner navigasi, konten unik utama, dan informasi penutup..
- **Contoh Penggunaan Praktis:**
```html
<header><h1>Portal</h1></header>
<main><p>Artikel utama.</p></main>
<footer>&copy; 2026</footer>
```
- **Hasil Output yang Diharapkan:**
```text
Terbaca jelas oleh screen reader & mesin pencari
```

### 4. `<form action="/api" method="POST">`
- **Fungsi Utama:** Kontainer pengumpulan data pengguna.
- **Parameter / Atribut:** `action (URL), method (GET/POST)`.
- **Perilaku & Efek Sistem:** Menyediakan wadah terstruktur untuk memvalidasi dan mengirimkan data input ke server..
- **Contoh Penggunaan Praktis:**
```html
<form action="/submit" method="POST">
  <input type="text" name="user" required />
  <button type="submit">Kirim</button>
</form>
```
- **Hasil Output yang Diharapkan:**
```text
Formulir interaktif siap dikirim
```

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

Kamu telah menguasai anatomi dokumen HTML5 yang valid, konfigurasi viewport mobile, metadata SEO, serta landmark semantik dasar. Minggu depan kita akan mempelajari hierarki teks, daftar terstruktur, dan navigasi multi-halaman.
