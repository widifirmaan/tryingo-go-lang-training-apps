# Tabel — Daftar Harga Warung yang Rapi

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 6:** Tabel

## Tujuan Pembelajaran

- Membuat tabel dengan `<table>` + `<caption>` (judul) + `<thead>` (kepala) + `<tbody>` (badan) + `<tr>` (baris) + `<th scope="col">` (header) + `<td>` (data) — sumber: MDN HTML table basics
- `border-collapse` agar garis tidak ganda, `scope="col/row"` untuk screen reader, `colspan/rowspan` untuk gabung sel (sumber: MDN table accessibility)

---

## Kenapa Ini Penting Buat Kamu?

Daftar harga warung `Beras | 62.000 | 10` jika pakai `<p>` berantakan saat harga panjang. Dengan `<table>`, kolom rata, screen reader baca "Beras, harga 62.000" — tidak bingung. `caption` bantu tunanetra tahu ini tabel apa.

---

## Program: Daftar Harga Warung (MDN Style)

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Daftar Harga</title>
  <style>
    table { border-collapse: collapse; width: 100%; max-width: 500px; }
    th, td { border: 1px solid #999; padding: 8px 12px; text-align: left; }
    th { background: #EFECE6; }
  </style>
</head>
<body>
  <table>
    <caption>Daftar Harga Warung Bu Siti — 25 Agustus 2026</caption>
    <thead>
      <tr>
        <th scope="col">Produk</th>
        <th scope="col">Harga</th>
        <th scope="col">Stok</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Beras 5kg</th>
        <td>Rp 62.000</td>
        <td>10</td>
      </tr>
      <tr>
        <th scope="row">Bayam</th>
        <td>Rp 5.000</td>
        <td>20</td>
      </tr>
      <tr>
        <td colspan="2" style="text-align: right; font-weight: bold;">Total Stok</td>
        <td>30</td>
      </tr>
    </tbody>
  </table>
</body>
</html>
```

**Wajib:** `caption` di bawah `<table>`, `th scope="col"` untuk header atas, `th scope="row"` untuk header kiri, `colspan="2"` gabung 2 kolom untuk total.

---

## Konsep Kunci

### `<table>` + `<caption>` + `<thead>/<tbody>` + `<tr>` + `<th>` + `<td>`
- `table` wadah, `caption` judul (bantu screen reader), `thead` kepala, `tbody` badan, `tr` baris, `th` header, `td` data.

### `scope="col"` vs `scope="row"`
`scope="col"` header untuk kolom (Produk), `scope="row"` untuk baris (Beras 5kg). Screen reader baca "Beras 5kg, harga 62.000".

### `colspan`/`rowspan` + `border-collapse`
`colspan="2"` gabung 2 kolom (Total Stok), `border-collapse: collapse` garis tidak ganda (MDN).

---

## Penjelasan untuk Pemula

### Analogi: Meja Warung dengan Label

- **`<table>` = meja warung**: `thead` kepala meja (label kolom), `tbody` badan meja (baris produk).
- **`<th scope="col">` = label kolom**: "Produk", "Harga" di atas.
- **`<caption>` = papan judul meja**: "Daftar Harga Warung" di atas meja — tunanetra dengar dulu sebelum baca isi.
- **`colspan` = meja gabung**: "Total Stok" gabung 2 kolom.

### Langkah 0 — Device (Sama W1)

VS Code + browser, buat `tabel.html`, buka di browser → `Ctrl+O`.

### Cara Komputer Membaca

1. `<table>` → buat wadah.
2. `<thead><tr><th scope="col">Produk</th>...</tr></thead>` → 1 baris header.
3. `<tbody><tr><th scope="row">Beras</th><td>Rp 62.000</td>...</tr>` → baris data, `scope="row"` hubungkan "Beras" dengan harganya untuk screen reader.

### 3 Istilah Wajib

1. **th/td**: header/data
2. **thead/tbody**: kepala/badan
3. **caption/scope**: judul/label untuk aksesibilitas

---

## Eksperimen

- **Hijau:** Ganti `Beras 5kg` jadi `Gula 1kg` + harga `15000` → baris baru?
- **Kuning:** Hapus `scope="col"` → screen reader masih baca tapi tidak tahu header kolom (MDN).
- **Merah:** Hapus `border-collapse` → garis ganda tebal.

---

## Tantangan

**Tabel Warung Lengkap:** `caption` "Stok 25 Agustus", `thead` 3 kolom `Produk/Harga/Stok`, `tbody` 5 produk + `th scope="row"` tiap produk, `tfoot` atau baris `colspan="2"` total, `scope` benar, buka di browser + cek `WAVE` extension.

---

## Glosarium Mini

- **table/caption/thead/tbody/tr/th/td**: meja/judul/kepala/badan/baris/header/data
- **scope/colspan**: label/gabung

---

## Ringkasan

Minggu 6 dari 14: **Tabel** (Level: Lengkap). Bisa daftar harga rata dan aksesibel. Minggu depan: **Form & Input** — pesan antar.
