# Migrations & Seeds — Cetak Biru dan Isi Awal CI4

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 5:** Migrations & Seeds
> **Prasyarat:** Minggu 4 — **Models & Database**.

## Tujuan Pembelajaran

- `php spark make:migration BuatProduk` + `up()` (`forge->addField/addKey/createTable`) + `down()` (`dropTable`) (sumber: codeigniter.com/user_guide/dbmgmt/migration)
- `php spark migrate` bangun, `migrate:rollback` batal, `migrate:status` cek
- `php spark make:seeder` + `db->table()->insertBatch()` isi awal + `php spark db:seed`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa migration, tambah kolom = edit DB manual tiap laptop/server (lupa 1 = error). Dengan migration, `migrate` di mana saja hasilnya sama. Seeds isi produk contoh otomatis — tidak input manual 20x tiap install baru.

---

## Program: Cetak Biru + Isi CI4 Beneran

```bash
php spark make:migration BuatProduk
php spark make:seeder IsiProduk
```

```php
// app/Database/Migrations/2026-08-25-BuatProduk.php
namespace App\Database\Migrations;
use CodeIgniter\Database\Migration;

class BuatProduk extends Migration {
  public function up() {
    $this->forge->addField([
      'id' => ['type' => 'INT', 'constraint' => 11, 'auto_increment' => true],
      'nama' => ['type' => 'VARCHAR', 'constraint' => 100],
      'harga' => ['type' => 'INT'],
      'stok' => ['type' => 'INT', 'default' => 0],
    ]);
    $this->forge->addKey('id', true);
    $this->forge->createTable('produk');
  }
  public function down() {
    $this->forge->dropTable('produk');
  }
}
```

```php
// app/Database/Seeds/IsiProduk.php
namespace App\Database\Seeds;
use CodeIgniter\Database\Seeder;

class IsiProduk extends Seeder {
  public function run() {
    $this->db->table('produk')->insertBatch([
      ["nama" => "Beras", "harga" => 62000, "stok" => 10],
      ["nama" => "Bayam", "harga" => 5000, "stok" => 20],
    ]);
  }
}
```

```bash
php spark migrate
php spark migrate:status
php spark db:seed IsiProduk
php spark migrate:rollback  # batalkan terakhir
```

---

## Konsep Kunci

### `up()` / `down()` = Bangun/Bongkar
`up` jalankan `migrate`, `down` jalankan `rollback`.

### `forge` = Tukang Bangunan
`addField`, `addKey('id', true)` PK, `createTable`, `dropTable`.

### Seeder = Pengisi Awal
`insertBatch([...])` banyak sekaligus. `db:seed Nama`.

---

## Penjelasan untuk Pemula

### Analogi: Cetak Biru + Stok Awal
- **Migration = gambar renovasi**, **seeder = isi rak pertama** (20 produk contoh).

### Langkah 0 — Siapkan Device
- Sama W1 + DB di `.env` benar + `php spark migrate:status` cek.

### Cara Komputer Membaca
1. `migrate` → baca file `up()` belum jalan → `createTable`.
2. `db:seed` → `run()` → `insertBatch`.

### 3 Istilah Wajib
1. **Migration/up/down**: biru/bangun/bongkar
2. **Seeder/insertBatch**: pengisi/borong

---

## Eksperimen

- **Hijau:** `migrate:status` → semua `up`?
- **Kuning:** `rollback` → tabel hilang? `migrate` lagi.
- **Merah:** Jalankan `migrate` 2x → "Nothing to migrate" (tidak ganda)?

---

## Tantangan

**Gudang Lengkap:** Migration `BuatPelanggan` + seeder 3 pelanggan + `migrate` + `seed` + cek di `phpMyAdmin`/SQLite. **Selesai Beginner CI4!**
- **Sambungan (Minggu 4 — Models & Database):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Migration/Seeder/forge**: biru/isi/tukang

---

## Ringkasan

Minggu 5 dari 5: **Cetak Biru & Isi** (Level: Pemula). **Selesai Beginner CI4!** Lanjut: **Validation** (Menengah).
