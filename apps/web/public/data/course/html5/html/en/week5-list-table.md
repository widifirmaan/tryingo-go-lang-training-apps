# Lists & Tables

> HTML5 | Module 5

## Learning Objectives

- Create unordered lists, ordered lists, and description lists
- Structure tabular data with table, tr, th, td
- Merge cells with colspan and rowspan
- Add caption, thead, tbody, tfoot to tables
- Apply table accessibility with scope

---

## Program: Class Schedule

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

## Explanation

Here is a detailed explanation of the material:

### Unordered List
`<ul>` — bullet list. `<li>` — list item. Good for navigation, feature lists.

### Ordered List
`<ol>` — numbered list. Attributes: `type` (1, A, a, I, i), `start`, `reversed`.

### Description List
`<dl>` — definition list. `<dt>` — term. `<dd>` — description. Good for glossaries, metadata.

### Table
`<table>` — container. `<tr>` — row. `<th>` — header. `<td>` — data. `<colspan>` — merge columns. `<rowspan>` — merge rows. `<caption>` — table title. `<thead>`, `<tbody>`, `<tfoot>` — grouping.

### Table Accessibility
`scope="col"` — column header. `scope="row"` — row header. Important for screen readers.

---

## Experiments

Create an ordered list with type="A" (capital letters),Add a table with colspan merging 3 columns,Use rowspan to merge rows in a table,Add thead, tbody, tfoot to a table

---

## Challenge

Create a "Study Plan" page containing: weekly study schedule in a table (Monday-Friday, hours, subjects), prioritized learning list (ordered list with type A), programming glossary (description list), and reference book list (unordered list).

---

## Summary

Lists and tables are fundamental ways to organize information. From navigation to tabular data, these structures make content easier to read and understand. Next module: **Forms & Input** — how to collect data from users.
