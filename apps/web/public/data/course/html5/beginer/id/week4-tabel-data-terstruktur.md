# Tabel Data Terstruktur: Thead, Tbody, Scope & Keterangan Aksesibel

> **Kategori:** HTML5 | **Level:** Struktur & Semantik Web | **Minggu 4:** Tabel Data Terstruktur: Thead, Tbody, Scope & Keterangan Aksesibel
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami bahwa elemen <table> hanya boleh digunakan untuk data tabular, bukan untuk layout tampilan
- Menyediakan judul dan konteks tabel menggunakan elemen <caption>
- Menyusun pemisahan struktural data: <thead>, <tbody>, dan <tfoot>
- Menghubungkan sel header dengan sel data menggunakan atribut scope="col" dan scope="row"
- Memahami teknik penggabungan sel baris dan kolom dengan colspan dan rowspan secara tepat

---

## Program: Penyajian Tabel Laporan Keuangan Semantik

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan Kinerja Keuangan — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Transparansi Kinerja Keuangan Perusahaan</h1>
      <p>Data audit keuangan tahun berjalan yang telah diverifikasi oleh akuntan publik independen.</p>

      <table border="1">
        <caption>Laporan Pendapatan dan Alokasi Biaya Infrastruktur (Q1 - Q4 2025)</caption>
        <thead>
          <tr>
            <th scope="col">Kuartal</th>
            <th scope="col">Pendapatan Bruto (Miliar IDR)</th>
            <th scope="col">Biaya Cloud (Miliar IDR)</th>
            <th scope="col">Laba Operasional (Miliar IDR)</th>
            <th scope="col">Status Audit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Q1 2025</th>
            <td>12.4</td>
            <td>3.1</td>
            <td>9.3</td>
            <td>Selesai</td>
          </tr>
          <tr>
            <th scope="row">Q2 2025</th>
            <td>14.8</td>
            <td>3.4</td>
            <td>11.4</td>
            <td>Selesai</td>
          </tr>
          <tr>
            <th scope="row">Q3 2025</th>
            <td>16.2</td>
            <td>3.8</td>
            <td>12.4</td>
            <td>Selesai</td>
          </tr>
          <tr>
            <th scope="row">Q4 2025</th>
            <td>19.5</td>
            <td>4.2</td>
            <td>15.3</td>
            <td>Dalam Proses</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total Akumulasi</th>
            <td>62.9</td>
            <td>14.5</td>
            <td>48.4</td>
            <td>Konsolidasi</td>
          </tr>
        </tfoot>
      </table>
    </article>
  </main>
</body>
</html>
```

---

## Konsep Kunci

### Etika Penggunaan Tabel
Tabel HTML diciptakan khusus untuk menyajikan **data relasional dua dimensi** (angka, metrik, daftar spesifikasi). Menggunakan tabel untuk mengatur tata letak halaman web adalah praktik usang yang merusak aksesibilitas bagi pengguna alat bantu pembaca layar.

### Anatomi Lengkap Tabel Semantik
- `<caption>`: Judul atau ringkasan penjelasan tabel yang pertama kali dibacakan oleh pembaca layar.
- `<thead>`: Membungkus baris-baris header kolom utama.
- `<tbody>`: Memuat kumpulan baris data sebenarnya.
- `<tfoot>`: Bagian penutup untuk data rangkuman, seperti baris total atau catatan agregat.

### Atribut Scope
Atribut `scope` pada elemen `<th>` sangat penting:
- `scope="col"`: Menyatakan bahwa sel ini adalah header untuk seluruh kolom di bawahnya.
- `scope="row"`: Menyatakan bahwa sel ini adalah header untuk seluruh sel di baris horizontal tersebut.
Dengan adanya `scope`, pembaca layar akan menyebutkan: *"Kuartal Q1 2025, Pendapatan Bruto: 12.4 Miliar IDR"* saat pengguna menjelajah sel demi sel.

---

---

## Penjelasan untuk Pemula

### Analogi: Spreadsheet Excel Resmi
Bayangkan tabel HTML persis seperti lembar kerja Microsoft Excel:
1. **`<caption>`** adalah nama lembar kerja di bagian atas: "Laporan Anggaran 2026".
2. **`<thead>`** adalah baris paling atas yang diwarnai biru gelap berisi nama kolom (No, Nama Barang, Harga).
3. **`scope="col"`** memberi tahu komputer: "Semua angka di kolom B adalah harga uang rupiah".
4. **`scope="row"`** memberi tahu komputer: "Baris ini semuanya berkaitan dengan transaksi Laptop Dell".
5. **`<tfoot>`** adalah baris paling bawah tempat rumus `=SUM()` menjumlahkan total belanja.

## Eksperimen

- Hapus elemen <caption> dan perhatikan bagaimana tabel kehilangan pengenal judul resminya.
- Tambahkan atribut colspan="2" pada salah satu sel <td> dan amati bagaimana sel di sebelahnya terdorong keluar dari batas tabel jika jumlah sel tidak disesuaikan.
- Uji membaca baris tfoot tanpa tbody, dan amati apakah browser tetap merender tfoot di posisi paling bawah tabel secara konsisten.
- Ubah elemen <th> menjadi <td> biasa di thead dan periksa bagaimana teks kehilangan ketebalan huruf bawaan dan nilai semantik headernya.

---

## Tantangan

Buat tabel jadwal penerbangan bandara internasional: sertakan `<caption>`, `<thead>` dengan `scope="col"`, minimal 4 baris jadwal di `<tbody>` dengan `scope="row"` untuk nomor penerbangan, kolom kota tujuan, maskapai, jam keberangkatan, dan status (Tepat Waktu / Terlambat).

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

Kamu telah menguasai perancangan tabel data relasional yang semantik dan ramah aksesibilitas. Minggu depan kita memasuki Level 2: formulir modern, validasi browser, dan kontrol interaktif.
