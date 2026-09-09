# Testing PHPUnit — Cicip Warung Beneran

> **Kategori:** PHP | **Level:** Menengah | **Minggu 10:** Testing dengan PHPUnit
> **Prasyarat:** Minggu 9 — **Composer & Autoloading**.

## Tujuan Pembelajaran

- `composer require --dev phpunit/phpunit` + `./vendor/bin/phpunit` jalan beneran (sumber: phpunit.de)
- `TestCase` + `assertEquals` + `expectException` (bukan simulasi `echo`!)

---

## Kenapa Ini Penting Buat Kamu?

Simulasi `echo` tidak menangkap bug (selalu "lulus" karena tidak dicek mesin). PHPUnit beneran: ubah rumus → merah → perbaiki. Tanpa ini, "testing" hanya pajangan.

---

## Program: Cicip Beneran PHPUnit

```bash
composer require --dev phpunit/phpunit
```

```php
// src/Kasir.php (dari W9)
<?php
namespace App;
class Kasir {
  public function total(array $items): int {
    $s = 0;
    foreach ($items as $i) $s += $i["harga"] * $i["qty"];
    return $s;
  }
  public function bagi(float $a, float $b): float {
    if ($b == 0) throw new \InvalidArgumentException("Tidak bisa bagi 0");
    return $a / $b;
  }
}
```

```php
// tests/KasirTest.php — NAMA *Test.php!
<?php
use PHPUnit\Framework\TestCase;
use App\Kasir;

class KasirTest extends TestCase {
  public function testTotal(): void {
    $k = new Kasir();
    $this->assertEquals(72000, $k->total([["harga"=>62000,"qty"=>1],["harga"=>5000,"qty"=>2]]));
  }

  public function testBagiNol(): void {
    $this->expectException(\InvalidArgumentException::class);
    (new Kasir())->bagi(10, 0);
  }
}
```

```bash
./vendor/bin/phpunit tests
# OK (2 tests, 3 assertions) — HIJAU beneran
```

---

## Konsep Kunci

### `TestCase` + `assertEquals` = Cicip Mesin
`assertEquals(72000, hasil)` — beda → merah + baris salah.

### `expectException` = Harapkan Meledak
Uji `bagi(10,0)` HARUS meledak `InvalidArgumentException`.

---

## Penjelasan untuk Pemula

### Analogi: Cicip Dapur
- **Test = cicip**: masak → cicip mesin → pas? Saji.

### Langkah 0 — Siapkan Device
- `composer require --dev phpunit/phpunit` + folder `tests/`.

### Cara Komputer Membaca
1. `./vendor/bin/phpunit tests` → cari `*Test.php` → jalankan `test*` → lapor hijau/merah.

### 3 Istilah Wajib
1. **TestCase/assert**: dapur-uji/cicip

---

## Eksperimen

- **Hijau:** Ubah `total` jadi `-` → merah? Betulkan.
- **Kuning:** Hapus `expectException` → test `bagi(10,0)` error (bukan lulus)?
- **Merah:** File `KasirCoba.php` (tanpa Test) → tidak jalan? Ganti `KasirTest.php`.

---

## Tantangan

**Warung Teruji:** `Kasir::diskon($total, $persen)` + 3 test (normal/0%/100%) → `./vendor/bin/phpunit` HIJAU 5/5.
- **Sambungan (Minggu 9 — Composer & Autoloading):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **PHPUnit/TestCase/assert**: dapur-uji/cicip

---

## Ringkasan

Minggu 10 dari 12: **Cicip Beneran** (Level: Menengah). Tanpa simulasi. Minggu depan: **Patterns**.
