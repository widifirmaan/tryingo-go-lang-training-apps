# Controllers & Routing — Pintu Warung CI4 Resmi

> **Kategori:** CodeIgniter | **Level:** Pemula | **Minggu 2:** Controllers & Routing

## Tujuan Pembelajaran

- Pahami `app/Config/Routes.php` dengan `$routes->get('produk', 'Produk::index')` (sumber: routing.html)
- Bedakan `get()` vs `add()` — pakai `get()` untuk GET, `post()` untuk POST (aman, bukan `add()` legacy)
- `(:segment)` untuk `produk/(:segment)` → `Produk::detail/$1`, dan `(:num)` untuk angka
- `php spark routes` cek peta

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `Routes.php` yang benar, `http://localhost:8080/produk` error 404. Dengan `$routes->get('produk', 'Produk::index')`, 1 baris jadi pintu. `add()` legacy CI3 tidak aman — pakai `get()`/`post()`.

---

## Program: Pintu Produk Resmi

```php
// app/Config/Routes.php — resmi (userguide)
use CodeIgniter\Router\RouteCollection;
/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');
$routes->get('produk', 'Produk::index');          // GET /produk → Produk::index
$routes->get('produk/(:segment)', 'Produk::detail/$1'); // /produk/beras → detail("beras")
$routes->post('produk', 'Produk::simpan');       // POST untuk form
$routes->get('produk/(:num)/edit', 'Produk::edit/$1'); // (:num) hanya angka

// app/Controllers/Produk.php
namespace App\Controllers;
class Produk extends BaseController {
  public function index(){
    $data["produk"] = [["nama"=>"Beras","harga"=>62000],["nama"=>"Bayam","harga"=>5000]];
    return view('produk', $data);
  }
  public function detail($slug){
    return "Detail: " . esc($slug);
  }
  public function simpan(){
    $nama = $this->request->getPost('nama');
    return "Simpan $nama";
  }
}
```

**Cek peta:**
```bash
php spark routes
# GET  produk → Produk::index
# GET  produk/(:segment) → Produk::detail/$1
```

---

## Konsep Kunci

### `$routes->get()` vs `add()`
`get('produk', 'Produk::index')` hanya GET. `add()` terima semua verb (tidak aman) — jangan pakai kecuali legacy.

### Placeholder `(:segment)` vs `(:num)`
`(:segment)` untuk teks `beras`, `(:num)` untuk `123`.

### `php spark routes`
Lihat semua pintu yang terdaftar.

---

## Penjelasan untuk Pemula

### Analogi: Pintu Warung dengan Label
- **`Routes.php` = papan pintu**: `get('produk', 'Produk::index')` label "Pintu Produk → Pelayan Produk, meja index".
- **`(:segment)` = pintu geser**: `produk/beras` dan `produk/bayam` 1 pintu geser, `detail($slug)` baca label `beras`.

### Langkah 0 — Device

Sudah siap dari W1: `php -v`, `composer`, `php spark serve` di `8080`. Tidak perlu XAMPP untuk dev.

### Cara Komputer Membaca

1. Browser `GET /produk` → `Routes.php` cari `get('produk', ...)` → `Produk::index()` → `view('produk')`.
2. Browser `GET /produk/beras` → cocok `produk/(:segment)` → `detail("beras")`.

### 3 Istilah Wajib

1. **Routes.php**: papan pintu
2. **get/post**: pintu GET/POST
3. **(:segment)**: variabel URL

---

## Eksperimen

- **Hijau:** Tambah `$routes->get('kontak', 'Kontak::index')` → `http://localhost:8080/kontak`?
- **Kuning:** Ganti `(:segment)` jadi `(:num)` lalu buka `/produk/beras` → 404? Ganti balik.
- **Merah:** Pakai `$routes->add('produk', ...)` lalu POST → bisa GET juga (tidak aman). Ganti ke `get`.

---

## Tantangan

**Warung 3 Pintu:** `get('')` Beranda, `get('produk')` index, `get('produk/(:num)')` detail angka, `post('produk')` simpan. `php spark routes` screenshot.

---

## Glosarium Mini

- **Routes.php/$routes**: papan & koleksi
- **get/post**: pintu HTTP
- **(:segment)/(:num)**: placeholder

---

## Ringkasan

Minggu 2 dari 5: **Pintu CI4 Resmi** (Level: Pemula). Peta `get` aman terpasang. Minggu depan: **Views & Templates** — etalase `view()`.
