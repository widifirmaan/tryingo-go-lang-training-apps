# List & Daftar

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 5:** List & Daftar

## Tujuan Pembelajaran

- Ordered list: ol untuk daftar berurutan
- Unordered list: ul untuk daftar tidak berurutan
- Description list: dl, dt, dd untuk pasangan istilah-deskripsi
- Nested list: list di dalam list untuk hierarki
- Styling list dengan CSS list-style-type

---

## Program: Daftar Belanja

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar Belanja</title>
</head>
<body>
    <h1>Daftar Belanja Mingguan</h1>

    <h2>Yang Harus Dibeli (Ordered)</h2>
    <ol>
        <li>Susu segar 1 liter</li>
        <li>Roti tawar</li>
        <li>Telur 1 lusin</li>
        <li>Buah-buahan</li>
    </ol>

    <h2>Kategori Belanja (Unordered)</h2>
    <ul>
        <li>Sayuran
            <ul>
                <li>Bayam</li>
                <li>Brokoli</li>
                <li>Wortel</li>
            </ul>
        </li>
        <li>Protein
            <ul>
                <li>Ayam</li>
                <li>Ikan</li>
                <li>Tahu & Tempe</li>
            </ul>
        </li>
        <li>Bumbu Dapur</li>
    </ul>

    <h2>Deskripsi Produk (Description List)</h2>
    <dl>
        <dt>Susu</dt>
        <dd>Minuman dari sapi, kaya kalsium dan protein</dd>
        <dt>Roti</dt>
        <dd>Makanan dari tepung terigu yang dipanggang</dd>
        <dt>Telur</dt>
        <dd>Sumber protein hewani yang murah dan bergizi</dd>
    </dl>
</body>
</html>
```

---

## Konsep Kunci

### Ordered List
`<ol><li>...</li></ol>` — daftar bernomor otomatis.

### Unordered List
`<ul><li>...</li></ul>` — daftar dengan bullet.

### Description List
`<dl><dt>istilah</dt><dd>deskripsi</dd></dl>` — pasangan istilah.

### Nested List
List di dalam list untuk sub-item. Bisa ol di dalam ul atau sebaliknya.

---

## Penjelasan untuk Pemula

Daftar di HTML seperti catatan belanja: ada yang bernomor, ada yang berpoin.

- `<ol>` = ordered list = **bernomor otomatis** (1, 2, 3). Cocok untuk urutan langkah.
- `<ul>` = unordered list = **berpoin**. Cocok untuk daftar tanpa urutan penting.
- Setiap butir dibungkus `<li>` (list item).
- `<dl>` = description list — pasangan `<dt>` (istilah) dan `<dd>` (penjelasannya).
- Bisa **bersarang**: `<ul>` di dalam `<ul>` untuk sub-daftar.

**Coba:** Di program "Daftar Belanja", ganti `<ol>` jadi `<ul>`, jalankan, dan lihat nomornya berubah menjadi poin.

---

## Eksperimen

- Buat nested list 3 level dalam
- Coba description list untuk FAQ
- Buat ordered list dengan start="5"
- Eksperimen reversed pada ol
- Buat navigasi sidebar dengan nested ul

---

## Tantangan

Buat halaman resep makanan: bahan (ul), langkah (ol), dan nutrisi (dl).

---

## Ringkasan

Minggu 5 dari 14: **List & Daftar** (Level: HTML5 Lengkap). Struktur data sederhana. Minggu depan: **Tabel**.
