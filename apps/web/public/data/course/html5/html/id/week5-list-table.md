# List & Table

> HTML5 | Modul 5

## Tujuan Pembelajaran

- Membuat unordered list, ordered list, dan description list
- Menstruktur data tabular dengan table, tr, th, td
- Menggabungkan sel dengan colspan dan rowspan
- Menambahkan caption, thead, tbody, tfoot pada tabel
- Menerapkan aksesibilitas pada tabel dengan scope

---

## Program: Jadwal Kelas

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jadwal Kelas</title>
  <style>
    table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
    th, td { border: 1px solid #444; padding: 8px 12px; text-align: left; }
    th { background: #e8e8e8; font-weight: bold; }
    caption { font-weight: bold; margin-bottom: .5rem; }
  </style>
</head>
<body>
  <h1>Data Kelas Pemrograman</h1>

  <h2>Daftar Siswa</h2>
  <ol>
    <li>Budi Santoso</li>
    <li>Siti Rahmawati</li>
    <li>Alex Wijaya</li>
  </ol>

  <h2>Mata Kuliah (unordered)</h2>
  <ul>
    <li>HTML5</li>
    <li>CSS3</li>
    <li>JavaScript</li>
  </ul>

  <h2>Istilah (description list)</h2>
  <dl>
    <dt>Frontend</dt>
    <dd>Bagian website yang dilihat pengguna</dd>
    <dt>Backend</dt>
    <dd>Bagian server yang memproses data</dd>
  </dl>

  <h2>Jadwal Pelajaran</h2>
  <table>
    <caption>Jadwal Kelas Frontend - Semester 1</caption>
    <thead>
      <tr>
        <th scope="col">Hari</th>
        <th scope="col">08:00-09:30</th>
        <th scope="col">10:00-11:30</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Senin</th>
        <td>HTML5</td>
        <td>CSS3</td>
      </tr>
      <tr>
        <th scope="row">Rabu</th>
        <td>JavaScript</td>
        <td>Praktik</td>
      </tr>
      <tr>
        <th scope="row">Jumat</th>
        <td colspan="2">Proyek Mandiri (gabungan)</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row">Total Jam</th>
        <td>6 jam/minggu</td>
        <td>6 jam/minggu</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>
```

---

## Penjelasan

Berikut penjelasan detail materi:

### Unordered List
`<ul>` — bullet list. `<li>` — list item. Cocok untuk navigasi, daftar fitur.

### Ordered List
`<ol>` — numbered list. Atribut: `type` (1, A, a, I, i), `start`, `reversed`.

### Description List
`<dl>` — daftar istilah. `<dt>` — istilah. `<dd>` — deskripsi. Cocok untuk glosarium, metadata.

### Table
`<table>` — wadah. `<tr>` — baris. `<th>` — header. `<td>` — data. `<colspan>` — gabung kolom. `<rowspan>` — gabung baris. `<caption>` — judul tabel. `<thead>`, `<tbody>`, `<tfoot>` — grouping.

### Aksesibilitas Tabel
`scope="col"` — header kolom. `scope="row"` — header baris. Penting untuk screen reader.

---

## Eksperimen

Buat ordered list dengan type="A" (huruf kapital),Tambah tabel dengan colspan untuk menggabung 3 kolom,Gunakan rowspan untuk menggabung baris pada tabel,Tambah thead, tbody, tfoot pada tabel

---

## Tantangan

Buat halaman "Rencana Belajar" yang berisi: jadwal belajar mingguan dalam tabel (senin-jumat, jam, mata pelajaran), daftar prioritas belajar (ordered list dengan type A), glosarium istilah programming (description list), dan daftar buku referensi (unordered list).

---

## Ringkasan

List dan table adalah cara fundamental untuk mengorganisir informasi. Dari navigasi hingga data tabular, struktur ini membuat konten lebih mudah dibaca dan dipahami. Modul selanjutnya: **Form & Input** — cara mengumpulkan data dari pengguna.
