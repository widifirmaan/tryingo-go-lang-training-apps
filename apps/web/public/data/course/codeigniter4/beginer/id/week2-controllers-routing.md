# Controllers & Routing — Pintu CI4

> **Kategori:** CodeIgniter | **Level:** Pemula | **Minggu 2:** Controllers & Routing

## Tujuan Pembelajaran

- `Routes.php` pintu, `Controller` pelayan, `$this->request->getVar('cari')` baca cari

---

## Program

```php
// Routes.php
$routes->get('/produk', 'Produk::index');
$routes->get('/produk/(:num)', 'Produk::detail/$1');

// Produk.php
public function detail($id){ return "Detail $id"; }
public function index(){
  $cari = $this->request->getVar('cari');
  // filter
}
```

---

## Ringkasan

Minggu 2: **Pintu CI4** — routing sederhana.
