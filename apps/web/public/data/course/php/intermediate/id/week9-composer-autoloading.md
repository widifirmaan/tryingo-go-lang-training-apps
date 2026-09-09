# Composer & Autoloading — Gudang Alat PHP Beneran

> **Kategori:** PHP | **Level:** Pemula | **Minggu 9:** Composer & Autoloading
> **Prasyarat:** Minggu 8 — **PDO Database**.

## Tujuan Pembelajaran

- `composer init` + `composer require monolog/monolog` pinjam beneran (sumber: getcomposer.org)
- `vendor/autoload.php` 1 baris muat semua, PSR-4 `App\` → `src/` (sumber: php-fig.org/psr-4)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa composer, pinjam library = download zip + `require` 20 file manual (lupa 1 = error). Dengan composer, 1 perintah + 1 `require autoload.php` — 100 class otomatis. Laravel/CodeIgniter jalan di atas ini.

---

## Program: Gudang Composer Beneran

```bash
composer --version  # 2.x?
mkdir warung-app && cd warung-app
composer init --name="warung/app" --no-interaction
composer require monolog/monolog
ls vendor/  # gudang fisik!
```

```json
// composer.json — tambah autoload sendiri
{
  "autoload": { "psr-4": { "App\\": "src/" } }
}
```

```bash
composer dump-autoload
```

```php
// src/Kasir.php
<?php
namespace App;
class Kasir {
  public function total(array $items): int {
    $s = 0;
    foreach ($items as $i) $s += $i["harga"] * $i["qty"];
    return $s;
  }
}
```

```php
// app.php — 1 baris muat SEMUA (pinjaman + sendiri)
<?php
require __DIR__ . "/vendor/autoload.php";

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use App\Kasir;

$log = new Logger("warung");
$log->pushHandler(new StreamHandler("warung.log"));
$log->info("Buka toko");

$kasir = new Kasir();
echo "Total: " . $kasir->total([["harga"=>62000,"qty"=>1]]) . "\n";
```

---

## Konsep Kunci

### `composer require` = Pinjam + Catat
Unduh ke `vendor/` + catat di `composer.json` + kunci versi `composer.lock`.

### `vendor/autoload.php` = Pintu Ajaib
1 `require` muat semua class (pinjaman + `App\` sendiri).

### PSR-4 `App\` → `src/` = Aturan Alamat
`App\Kasir` → `src/Kasir.php` otomatis.

### `namespace` = Nama Marga (dipakai di atas, kini dijelaskan!)
Tanpa marga, 2 `Kasir` (tokomu + library) tabrakan fatal. Dengan `namespace App;`, punyamu `App\Kasir`, punya orang `Monolog\Kasir` — damai.

```php
<?php
namespace App; // marga file ini (WAJIB baris pertama setelah <?php!)
class Kasir { /* ... */ }

// File lain:
require "vendor/autoload.php";
use App\Kasir; // panggil marga (tanpa ini: tulis \App\Kasir tiap kali!)
$k = new Kasir();
```
- Aturan: 1 file 1 marga, nama marga = nama folder (`App\Struk` → `src/Struk.php`).

---

## Penjelasan untuk Pemula

### Analogi: Gudang + Peta
- **Composer = mandor gudang**: `require` = "ambilkan Monolog".
- **autoload.php = peta**: semua class ketemu tanpa `require` manual.

### Langkah 0 — Siapkan Device
- `composer --version` 2.x (getcomposer.org) + folder `warung-app`.

### Cara Komputer Membaca
1. `new Kasir()` → autoloader cari `App\Kasir` → `src/Kasir.php` → muat.
2. `composer install` di laptop lain → baca `composer.lock` → versi SAMA persis.

### 3 Istilah Wajib
1. **Composer/vendor**: mandor/gudang
2. **autoload/PSR-4**: peta/aturan

---

## Eksperimen

- **Hijau:** Hapus `require autoload.php` → `Class not found`? Pasang.
- **Kuning:** `composer show monolog/monolog` → versi?
- **Merah:** Edit `src/Kasir.php` tambah method → langsung bisa (tanpa dump)? Ya, PSR-4 dinamis!

---

## Tantangan

**Gudang Sendiri:** `composer init` + `require nesbot/carbon` (tanggal) → `Carbon::now()->addDays(7)` jatuh tempo + class `App\Struk` sendiri → `app.php` gabung.

---

## Glosarium Mini

- **Composer/autoload/PSR-4**: mandor/peta/aturan

---

## Ringkasan

Minggu 9 dari 12: **Gudang Alat Beneran** (Level: Menengah). Tanpa simulasi. Minggu depan: **Testing**.
