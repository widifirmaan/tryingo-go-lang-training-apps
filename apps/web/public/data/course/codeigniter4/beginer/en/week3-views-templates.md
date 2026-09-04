# Views & Templates — Etalase CI4 dengan Layout

> **Kategori:** CodeIgniter | **Level:** Pemula | **Minggu 3:** Views & Templates

## Tujuan Pembelajaran

- `view('produk', $data)` kirim ke `app/Views/produk.php` dengan `<?= esc($nama) ?>` aman XSS (sumber: user_guide)
- `layout` dengan `$this->extend('layout/main')` + `$this->section('content')` + `$this->endSection()` — warisan etalase

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `view()`, HTML campur di controller berantakan. Dengan `view('produk', ["produk"=>$data])`, controller hanya kirim data, view hanya tampil — rapi seperti dapur & etalase terpisah.

---

## Program: Etalase Warisi Layout

```php
// Controller: app/Controllers/Produk.php
public function index(){
  $data["produk"] = [["nama"=>"Beras","harga"=>62000],["nama"=>"Bayam","harga"=>5000]];
  $data["judul"] = "Katalog Warung";
  return view('produk', $data);
}

// Layout: app/Views/layout/main.php
<!DOCTYPE html><html><head><title><?= esc($judul ?? "Warung") ?></title></head>
<body><header>Warung Bu Siti</header><main><?= $this->renderSection('content') ?></main></body></html>

// View: app/Views/produk.php
<?= $this->extend('layout/main') ?>
<?= $this->section('content') ?>
<h1><?= esc($judul) ?></h1>
<ul>
<?php foreach($produk as $p): ?>
  <li><?= esc($p["nama"]) ?> - Rp<?= esc($p["harga"]) ?></li>
<?php endforeach; ?>
</ul>
<?= $this->endSection() ?>
```

**Aman:** `esc()` cegah XSS `<script>` → `&lt;script&gt;`.

---

## Konsep Kunci

### `view('produk', $data)` = Kirim ke Etalase
Controller kirim `$data`, view pakai `<?= $nama ?>`.

### `extend/section` = Warisan Etalase
`layout/main` bingkai, `produk` isi `content` — tidak tulis header/footer 10x.

### `esc()` = Satpam
`esc($nama)` ubah `<` jadi `&lt;` — aman.

---

## Penjelasan untuk Pemula

### Analogi: Etalase & Gudang
- **Controller = gudang**: siapkan `produk`.
- **View = etalase**: pajang `produk`.
- **Layout = bingkai toko**: header/footer sekali, isi ganti.

### Langkah 0 — Device

Sama W1: `php spark serve` di `8080`, tidak perlu XAMPP.

---

## Eksperimen

- **Hijau:** Hapus `esc()` → coba `nama = "<b>Beras</b>"` → jadi tebal (XSS)? Pasang `esc()` → aman `&lt;b&gt;`.
- **Kuning:** `<?= $this->extend('layout/main') ?>` tanpa `endSection` → error.
- **Merah:** `view('produk')` tanpa `$data` → `$produk` undefined.

---

## Tantangan

**Warung Layout:** Buat `layout/main` + `produk` + `kontak` (2 view warisi sama) + `esc` semua output, `php spark serve` screenshot.

---

## Glosarium Mini

- **view/esc**: kirim & amankan
- **extend/section**: warisan

---

## Ringkasan

Minggu 3 dari 5: **Etalase Warisi** (Level: Pemula). Dapur & etalase terpisah. Minggu depan: **Models & Database** — rak.
