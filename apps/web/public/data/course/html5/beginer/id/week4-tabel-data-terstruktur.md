# Tabel dan Proyek Pertama

> **Kategori:** HTML5 | **Level:** Dasar HTML | **Minggu 4:** Tabel dan Proyek Pertama
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami aturan baku penggunaan <table> khusus untuk data tabular (bukan untuk layout halaman)
- Menyediakan judul dan keterangan ringkasan tabel menggunakan tag <caption>
- Menyusun struktur tabel: <thead> (kepala), <tbody> (isi data), dan <tfoot> (catatan/total)
- Menghubungkan sel header <th> dengan data sel <td> menggunakan atribut scope="col" dan scope="row"
- Menggabungkan sel baris dan kolom dengan atribut colspan dan rowspan
- Menyelesaikan proyek website 2 halaman (index.html dan layanan.html) secara utuh

---

## 1. Aturan Baku Penggunaan Tabel HTML

Elemen `<table>` adalah tag HTML yang khusus digunakan untuk menampilkan **data tabular**—yaitu data yang tersusun dalam bentuk baris dan kolom (seperti spreadsheet, daftar harga, jadwal, atau laporan statistik).

> ⚠️ **Aturan Penting:** Jangan pernah menggunakan `<table>` untuk mengatur tata letak (*layout*) halaman website (seperti header di atas, konten di kiri, footer di bawah). Penggunaan tabel untuk layout adalah praktik lama tahun 1990-an yang merusak aksesibilitas pembaca layar dan responsivitas seluler. Gunakan CSS untuk layout, dan gunakan `<table>` murni untuk data.

---

## 2. Anatomi Tag Penyusun Tabel

Tabel HTML tersusun dari beberapa tag terstruktur:

- **`<table>`**: Elemen pembungkus seluruh tabel.
- **`<caption>`**: Judul atau keterangan tabel (diletakkan tepat setelah tag pembuka `<table>`).
- **`<thead>`**: Bagian kepala tabel yang memuat baris judul kolom.
- **`<tbody>`**: Bagian badan tabel yang memuat baris-baris data utama.
- **`<tfoot>`**: Bagian kaki tabel untuk baris total, ringkasan, atau catatan kaki.
- **`<tr>` (*Table Row*):** Satu baris horizontal di dalam tabel.
- **`<th>` (*Table Header*):** Sel judul baris atau kolom (teks tebal dan di tengah). Wajib menyertakan atribut `scope="col"` untuk judul kolom atau `scope="row"` untuk judul baris.
- **`<td>` (*Table Data*):** Sel data standar di dalam tabel.

---

## 3. Menggabungkan Sel: Colspan dan Rowspan

Kadang sebuah sel data harus membentang melewati beberapa kolom atau baris:
- **`colspan="2"`**: Menggabungkan 2 kolom ke arah samping (horizontal).
- **`rowspan="2"`**: Menggabungkan 2 baris ke arah bawah (vertikal).

```html
<tr>
  <td colspan="3">Catatan: Sel ini membentang di 3 kolom sekaligus.</td>
</tr>
```

---

## 4. Finalisasi Proyek Level 1
Di akhir Minggu 4 ini, proyek website Anda telah memiliki:
1. **`index.html`**: Halaman beranda dengan header, navigasi, seksi profil, gambar `<figure>`, dan list keahlian.
2. **`layanan.html`**: Halaman daftar layanan yang memuat deskripsi layanan dan **Tabel Paket Harga**.
Kedua halaman saling terhubung dengan navigasi link `<a href="...">` yang rapi.

---

## Program: Tabel Perbandingan Paket Layanan Semantik

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Paket Layanan — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; background: #ffffff; }
    caption { font-weight: bold; margin-bottom: 8px; text-align: left; font-size: 15px; }
    th, td { border: 1px solid #cbd5e1; padding: 10px 12px; text-align: left; font-size: 14px; }
    thead th { background: #0f172a; color: #f8fafc; font-weight: 600; }
    tbody tr:nth-child(even) { background: #f8fafc; }
    tfoot td { background: #f1f5f9; font-size: 13px; color: #64748b; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
    </nav>
    <h1>Daftar Paket Layanan Website</h1>
  </header>

  <main>
    <section>
      <h2>Pilihan Paket Pembuatan Website</h2>
      <p>Berikut adalah perbandingan paket layanan yang tersedia:</p>

      <table>
        <caption>Tabel 1: Rincian Paket Layanan dan Waktu Pengerjaan</caption>
        <thead>
          <tr>
            <th scope="col">Nama Paket</th>
            <th scope="col">Jumlah Halaman</th>
            <th scope="col">Waktu Pengerjaan</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Paket Dasar</th>
            <td>1 - 3 Halaman</td>
            <td>3 Hari Kerja</td>
            <td>Tersedia</td>
          </tr>
          <tr>
            <th scope="row">Paket Bisnis</th>
            <td>4 - 8 Halaman</td>
            <td>7 Hari Kerja</td>
            <td>Tersedia</td>
          </tr>
          <tr>
            <th scope="row">Paket Kustom</th>
            <td>&gt; 8 Halaman</td>
            <td>14 Hari Kerja</td>
            <td>Antrean</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">* Seluruh paket mencakup kode HTML standar valid dan responsif.</td>
          </tr>
        </tfoot>
      </table>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Proyek Dasar Selesai (Berkas: <code>layanan.html</code>).</p>
  </footer>
</body>
</html>
```

---

## Bedah Detail Kode Program

- Line 26: Elemen `<table>` membungkus seluruh struktur tabel data.
- Line 27: `<caption>` memberikan judul keterangan tabel yang terbaca oleh screen reader.
- Line 28-36: `<thead>` dan `<th scope="col">` mendefinisikan baris judul untuk setiap kolom.
- Line 37-56: `<tbody>` dan `<th scope="row">` mendefinisikan baris data utama dengan sel header baris.
- Line 57-61: `<tfoot>` dan atribut `colspan="4"` menggabungkan 4 kolom untuk catatan kaki tabel.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 4 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menggunakan `<table>` untuk mengatur tata letak keseluruhan halaman website.
- Lupa memberikan tag `<caption>` pada tabel data.
- Menulis sel data `<td>` di luar baris `<tr>`.

---

## Ringkasan

- Modul Minggu 4 (Tabel dan Proyek Pertama) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
