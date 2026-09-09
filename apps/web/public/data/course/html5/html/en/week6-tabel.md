# Tables — Neat Shop Price List

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 6:** Tabel
> **Prerequisites:** Week 5 — **Lists**.

## Learning Objectives

- Build tables with `<table>` + `<caption>` (title) + `<thead>` (head) + `<tbody>` (body) + `<tr>` (row) + `<th scope="col">` (header) + `<td>` (data) — source: MDN HTML table basics
- `border-collapse` so borders don't double, `scope="col/row"` for screen readers, `colspan/rowspan` to merge cells (source: MDN table accessibility)

---

## Why This Matters (Non-IT)

A shop price list `Rice | 62,000 | 10` with `<p>` gets messy when prices are long. With `<table>`, columns align, screen reader reads "Rice, price 62,000" — no confusion. `caption` helps blind users know what the table is.

---

## Program: Shop Price List (MDN Style)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Price List</title>
  <style>
    table { border-collapse: collapse; width: 100%; max-width: 500px; }
    th, td { border: 1px solid #999; padding: 8px 12px; text-align: left; }
    th { background: #EFECE6; }
  </style>
</head>
<body>
  <table>
    <caption>Siti's Shop Price List — August 25, 2026</caption>
    <thead>
      <tr>
        <th scope="col">Product</th>
        <th scope="col">Price</th>
        <th scope="col">Stock</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Rice 5kg</th>
        <td>Rp 62,000</td>
        <td>10</td>
      </tr>
      <tr>
        <th scope="row">Spinach</th>
        <td>Rp 5,000</td>
        <td>20</td>
      </tr>
      <tr>
        <td colspan="2" style="text-align: right; font-weight: bold;">Total Stock</td>
        <td>30</td>
      </tr>
    </tbody>
  </table>
</body>
</html>
```

**Mandatory:** `caption` under `<table>`, `th scope="col"` for top headers, `th scope="row"` for left headers, `colspan="2"` merges 2 columns for total.

---

## Key Concepts

### `<table>` + `<caption>` + `<thead>/<tbody>` + `<tr>` + `<th>` + `<td>`
- `table` container, `caption` title (helps screen reader), `thead` head, `tbody` body, `tr` row, `th` header, `td` data.

### `scope="col"` vs `scope="row"`
`scope="col"` header for column (Product), `scope="row"` for row (Rice 5kg). Screen reader reads "Rice 5kg, price 62,000".

### `colspan`/`rowspan` + `border-collapse`
`colspan="2"` merges 2 columns (Total Stock), `border-collapse: collapse` single borders (MDN).

---

## Beginner Friendly Explanation

### Analogy: Shop Table with Labels

- **`<table>` = shop table**: `thead` table head (column labels), `tbody` table body (product rows).
- **`<th scope="col">` = column label**: "Product", "Price" on top.
- **`<caption>` = table title sign**: "Price List" above table — blind users hear it first before reading content.
- **`colspan` = joined table**: "Total Stock" merges 2 columns.

### Step 0 — Prepare Device (Same as W1)

VS Code + browser, create `table.html`, open in browser → `Ctrl+O`.

### How the Computer Reads It

1. `<table>` → creates container.
2. `<thead><tr><th scope="col">Product</th>...</tr></thead>` → 1 header row.
3. `<tbody><tr><th scope="row">Rice</th><td>Rp 62,000</td>...</tr>` → data row, `scope="row"` links "Rice" with its price for screen reader.

### 3 Must-Know Terms

1. **th/td**: header/data
2. **thead/tbody**: head/body
3. **caption/scope**: title/label for accessibility

---

## Experiments

- **Green:** Change `Rice 5kg` to `Sugar 1kg` + price `15000` → new row?
- **Yellow:** Remove `scope="col"` → screen reader still reads but doesn't know column headers (MDN).
- **Red:** Remove `border-collapse` → double thick borders.

---

## Challenge

**Complete Shop Table:** `caption` "Stock August 25", `thead` 3 columns `Product/Price/Stock`, `tbody` 5 products + `th scope="row"` each, `tfoot` or `colspan="2"` total row, correct `scope`, open in browser + check with `WAVE` extension.

---

## Mini Glossary

- **table/caption/thead/tbody/tr/th/td**: table/title/head/body/row/header/data
- **scope/colspan**: label/merge

---

## Summary

Week 6 of 14: **Tables** (Level: Complete). Can make aligned accessible price lists. Next: **Forms & Input** — delivery orders.
