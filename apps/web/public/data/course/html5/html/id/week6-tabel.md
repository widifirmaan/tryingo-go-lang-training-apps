# Tabel

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 6:** Tabel

## Tujuan Pembelajaran

- Struktur tabel: table, thead, tbody, tfoot
- Baris dan sel: tr, th, td
- Caption untuk judul tabel
- rowspan dan colspan untuk merge sel
- Scope atribut untuk aksesibilitas th

---

## Program: Jadwal Kuliah

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Jadwal Kuliah</title>
</head>
<body>
    <h1>Jadwal Kuliah Semester Ganjil</h1>

    <table>
        <caption>Jadwal Kuliah Kelas A - 2026</caption>
        <thead>
            <tr>
                <th>Hari</th>
                <th>Waktu</th>
                <th>Mata Kuliah</th>
                <th>Ruang</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Senin</td>
                <td>08:00 - 10:00</td>
                <td>Algoritma</td>
                <td>R.301</td>
            </tr>
            <tr>
                <td>Selasa</td>
                <td>10:00 - 12:00</td>
                <td>Basis Data</td>
                <td>Lab.2</td>
            </tr>
            <tr>
                <td>Rabu</td>
                <td>08:00 - 10:00</td>
                <td>Web Programming</td>
                <td>Lab.1</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4">Total: 3 mata kuliah</td>
            </tr>
        </tfoot>
    </table>

    <h2>Tabel dengan rowspan & colspan</h2>
    <table>
        <thead>
            <tr>
                <th rowspan="2">Nama</th>
                <th colspan="2">Nilai</th>
            </tr>
            <tr>
                <th>Teori</th>
                <th>Praktek</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Budi</td>
                <td>85</td>
                <td>90</td>
            </tr>
            <tr>
                <td>Siti</td>
                <td>92</td>
                <td>88</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
```

---

## Konsep Kunci

### Struktur Tabel
`<table>` container, `<thead>` header, `<tbody>` data, `<tfoot>` footer.

### Sel & Baris
`<tr>` baris, `<th>` header cell, `<td>` data cell.

### Merge Sel
`rowspan="2"` gabung 2 baris, `colspan="2"` gabung 2 kolom.

### Aksesibilitas
`<th scope="col">` atau `scope="row"` untuk screen reader.

---

## Eksperimen

- Buat tabel dengan 5 kolom dan 10 baris
- Coba rowspan untuk merge baris
- Buat tabel dengan caption dan tfoot
- Eksperimen scope="row" dan scope="col"
- Buat tabel kompleks dengan nested header

---

## Tantangan

Buat halaman dashboard sederhana: tabel data mahasiswa dengan sorting indicator, caption, dan footer.

---

## Ringkasan

Minggu 6 dari 14: **Tabel** (Level: HTML5 Lengkap). Data terstruktur. Minggu depan: **Form & Input**.
