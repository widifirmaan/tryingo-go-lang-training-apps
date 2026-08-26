# Setup CI4 — Warung Ringan

> **Kategori:** CodeIgniter | **Level:** Pemula | **Minggu 1:** Setup CI4

## Tujuan Pembelajaran

- `composer create-project codeigniter4/appstarter warung-ci`, `php spark serve` di `8080`
- CI4 = **warung ringan** tanpa banyak aturan — cepat untuk UMKM, `app/Controllers` pelayan, `app/Views` etalase

---

## Program

```bash
composer create-project codeigniter4/appstarter warung-ci
cd warung-ci
php spark serve
# Buka http://localhost:8080
```

Buat `app/Controllers/Produk.php`:
```php
<?php
namespace App\Controllers;
class Produk extends BaseController {
  public function index(){
    $data = [["nama"=>"Beras","harga"=>62000],["nama"=>"Bayam","harga"=>5000]];
    return view('produk', ["produk"=>$data]);
  }
}
```
`app/Views/produk.php`: `<ul><?php foreach($produk as $p): ?><li><?= $p["nama"] ?> - <?= $p["harga"] ?></li><?php endforeach; ?></ul>`

Route `app/Config/Routes.php`: `$routes->get('/produk', 'Produk::index');`

Buka `http://localhost:8080/produk`.

---

## Ringkasan

Minggu 1: **Warung Ringan CI4** — cepat, tanpa SOP berat.
