# Views & Templates — Etalase CI4

> **Kategori:** CodeIgniter | **Level:** Pemula | **Minggu 3:** Views & Templates

## Tujuan Pembelajaran

- `view('produk', $data)` kirim ke `app/Views/produk.php` dengan `<?= $nama ?>` dan layout

---

## Program

```php
// Controller
return view('produk', ["produk"=>$produk, "judul"=>"Katalog"]);

// View produk.php
<?= $this->extend('layout/main') ?>
<?= $this->section('content') ?>
<h1><?= $judul ?></h1>
<?php foreach($produk as $p): ?>
  <div><?= $p["nama"] ?> - Rp<?= $p["harga"] ?></div>
<?php endforeach; ?>
<?= $this->endSection() ?>
```

---

## Ringkasan

Minggu 3: **Etalase CI4** — view & layout.
