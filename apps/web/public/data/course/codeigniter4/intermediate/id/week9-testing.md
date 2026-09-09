# Testing — Cicip Warung CI4 Beneran

> **Kategori:** CodeIgniter | **Level:** Menengah | **Minggu 9:** Testing dengan PHPUnit
> **Prasyarat:** Minggu 8 — **REST API**.

## Tujuan Pembelajaran

- `phpunit.xml` + `CIUnitTestCase` + `FeatureTestTrait` `$this->get('/produk')` beneran (sumber: codeigniter.com/user_guide/testing)
- `seeInDatabase()` / `dontSeeInDatabase()` cek DB + `RefreshDatabase` reset

---

## Kenapa Ini Penting Buat Kamu?

Simulasi `echo` tidak menangkap bug (tidak dicek mesin). Test beneran: ubah route → merah → perbaiki. `RefreshDatabase` tiap test mulai bersih (tidak cemari).

---

## Program: Cicip Beneran CI4

```bash
composer require --dev phpunit/phpunit
```

```php
// tests/ProdukTest.php — beneran!
namespace Tests;
use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\FeatureTestTrait;
use CodeIgniter\Test\DatabaseTestTrait;

class ProdukTest extends CIUnitTestCase {
  use FeatureTestTrait;
  use DatabaseTestTrait;
  protected $refresh = true; // reset DB tiap test!
  protected $seed = 'Tests\Support\Database\Seeds\IsiProduk';

  public function testDaftar200() {
    $res = $this->get('/produk');
    $res->assertStatus(200);
  }

  public function testTambahMasukDB() {
    $this->post('/produk/simpan', ["nama" => "Kopi", "harga" => 12000]);
    $this->seeInDatabase('produk', ["nama" => "Kopi"]);
  }

  public function testHapusHilang() {
    $this->call('delete', '/produk/1');
    $this->dontSeeInDatabase('produk', ["id" => 1]);
  }
}
```

```bash
php spark test
# OK (3 tests) — HIJAU beneran
```

---

## Konsep Kunci

### `FeatureTestTrait` = Pelanggan Bohongan
`$this->get/post/call` pura-pura browser + `assertStatus(200)`.

### `DatabaseTestTrait` + `refresh` = DB Bersih Tiap Test
Migrasi + seeder ulang otomatis. `seeInDatabase` cek ada.

---

## Penjelasan untuk Pemula

### Analogi: Mystery Shopper + Dapur Bersih
- **Feature test = mystery shopper**: datang, pesan, nilai.
- **refresh = pel bersih**: tiap tamu meja baru.

### Langkah 0 — Siapkan Device
- `composer require --dev phpunit/phpunit` + `phpunit.xml` (sudah di appstarter).

### Cara Komputer Membaca
1. `php spark test` → cari `*Test.php` → `refresh` DB → jalankan → lapor.

### 3 Istilah Wajib
1. **Feature/seeInDatabase**: bohongan/cek-DB
2. **refresh/seed**: bersih/isi

---

## Eksperimen

- **Hijau:** Sengaja `assertStatus(201)` untuk GET → merah? Betulkan 200.
- **Kuning:** Tanpa `refresh` → data test menumpuk? Pasang.
- **Merah:** File `Coba.php` (tanpa Test) → tidak jalan? Ganti `CobaTest.php`.

---

## Tantangan

**Warung Teruji:** 3 test (GET 200 + tambah-masuk-DB + hapus-hilang) HIJAU + seeder 2 produk.
- **Sambungan (Minggu 8 — REST API):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **FeatureTestTrait/seeInDatabase**: bohongan/cek

---

## Ringkasan

Minggu 9 dari 10: **Cicip Beneran** (Level: Menengah). Tanpa simulasi. Minggu depan: **Capstone**.
