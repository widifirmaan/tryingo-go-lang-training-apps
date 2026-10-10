# Tables and First Project

> **Category:** HTML5 | **Level:** HTML Basics | **Week 4:** Tables and First Project
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand that <table> is strictly reserved for tabular data (never for page layout)
- Provide accessible table titles and context using the <caption> element
- Structure table sections: <thead> (header), <tbody> (data body), and <tfoot> (footer)
- Associate <th> header cells with <td> data cells using scope="col" and scope="row"
- Merge cells horizontally and vertically with colspan and rowspan attributes
- Complete the full 2-page project (index.html and layanan.html) from scratch

---

## 1. Rules for Using HTML Tables

The `<table>` element is designed strictly for presenting **tabular data**—information organized into rows and columns (such as pricing matrices, schedules, financial audits, or timetables).

> ⚠️ **Key Rule:** Never use `<table>` to construct web page layouts (such as placing navbars, sidebars, or headers inside table cells). Table-based layouts are obsolete 1990s patterns that severely degrade mobile responsiveness and screen reader accessibility. Use CSS for layout, and reserve `<table>` purely for data.

---

## 2. Table Syntax Anatomy

An accessible HTML table contains structured sub-elements:

- **`<table>`**: Wrapper encapsulating the table.
- **`<caption>`**: Table title placed immediately after `<table>`.
- **`<thead>`**: Table header containing column title rows.
- **`<tbody>`**: Table body containing core data rows.
- **`<tfoot>`**: Table footer containing summaries, totals, or notes.
- **`<tr>` (*Table Row*):** A horizontal row.
- **`<th>` (*Table Header*):** Header cell with `scope="col"` or `scope="row"`.
- **`<td>` (*Table Data*):** Standard data cell.

---

## 3. Merging Cells: Colspan and Rowspan

When cells span multiple columns or rows:
- **`colspan="2"`**: Merges 2 adjacent columns horizontally.
- **`rowspan="2"`**: Merges 2 adjacent rows vertically.

```html
<tr>
  <td colspan="3">Note: This cell spans across 3 columns.</td>
</tr>
```

---

## 4. Completing the Level 1 Project
By Week 4, your starter website project contains:
1. **`index.html`**: Home page with semantic layout, `<figure>` image, and list.
2. **`layanan.html`**: Services page with detailed offerings and a structured **Pricing Table**.
Both files are seamlessly connected using clean relative `<a href="...">` navigation.

---

## Program: Semantic Services and Pricing Comparison Table

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

## Detailed Code Breakdown

- Line 26: `<table>` encapsulates the entire data grid.
- Line 27: `<caption>` provides an accessible title for screen readers and search engines.
- Line 28-36: `<thead>` and `<th scope="col">` declare header cells for each column.
- Line 37-56: `<tbody>` and `<th scope="row">` map out data records with accessible row headers.
- Line 57-61: `<tfoot>` with `colspan="4"` merges all 4 columns into a single footer cell.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 4 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Using `<table>` for layout positioning rather than tabular data.
- Omitting `<caption>` from data tables.
- Placing data cells `<td>` outside of a row `<tr>`.

---

## Summary

- Week 4 (Tables and First Project) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
