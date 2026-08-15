# Tables

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 6:** Tables

## Learning Objectives

- Table structure: table, thead, tbody, tfoot
- Rows and cells: tr, th, td
- Caption for table title
- rowspan and colspan for cell merging
- Scope attribute for th accessibility

---

## Program: Class Schedule

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

## Key Concepts

### Table Structure
`<table>` container, `<thead>` header, `<tbody>` data, `<tfoot>` footer.

### Cells & Rows
`<tr>` row, `<th>` header cell, `<td>` data cell.

### Cell Merging
`rowspan="2"` merge 2 rows, `colspan="2"` merge 2 columns.

### Accessibility
`<th scope="col">` or `scope="row"` for screen readers.

---

## Beginner Friendly Explanation

A table is data arranged in **rows and columns**, like a school class schedule.

- `<table>` = the table container. `<tr>` = one **row**. Inside a row there is `<th>` (column header, shown bold) or `<td>` (data cell).
- `<thead>` = the header rows section, `<tbody>` = the data section, `<tfoot>` = the summary row at the bottom.
- `<caption>` = the table title.
- `colspan="2"` = merge 2 columns, `rowspan="2"` = merge 2 rows — for cells that stretch wide or tall.

**Try:** In the "Class Schedule" program, add one `<tr>` row with a subject of your own, then run it and watch the table stay tidy.

---

## Experiments

- Create table with 5 columns and 10 rows
- Try rowspan for row merging
- Create table with caption and tfoot
- Experiment scope="row" and scope="col"
- Create complex table with nested headers

---

## Challenge

Build a simple dashboard page: student data table with sorting indicator, caption, and footer.

---

## Summary

Week 6 of 14: **Tables** (Level: Complete HTML5). Structured data. Next week: **Forms & Inputs**.
