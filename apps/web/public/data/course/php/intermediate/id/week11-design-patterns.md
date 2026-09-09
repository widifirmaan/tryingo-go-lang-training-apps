# Design Patterns — Pola Warung Rapi PHP

> **Kategori:** PHP | **Level:** Menengah | **Minggu 11:** Design Patterns
> **Prasyarat:** Minggu 10 — **Testing PHPUnit**.

## Tujuan Pembelajaran

- `Singleton` 1 kasir (`private __construct` + `getInstance()`), `Factory` pabrik `buat()` (sumber: refactoring.guru/design-patterns/php)
- `Strategy` ganti cara bayar tanpa `if` 20x

---

## Kenapa Ini Penting Buat Kamu?

Bayar tunai/transfer/QRIS dengan `if` 20x → tambah QRIS ubah 20 tempat. Dengan `Strategy`, tambah 1 class. `Singleton` cegah 2 koneksi DB berebut.

---

## Program: Pola Bayar Warung

```php
<?php
// Strategy: 1 pintu, banyak cara
interface Bayar {
  public function bayar(int $total): string;
}
class Tunai implements Bayar {
  public function bayar(int $total): string { return "Tunai Rp$total"; }
}
class Transfer implements Bayar {
  public function bayar(int $total): string { return "Transfer Rp$total"; }
}

class Kasir {
  public function __construct(private Bayar $cara) {}
  public function checkout(int $total): string { return $this->cara->bayar($total); }
}

echo (new Kasir(new Tunai()))->checkout(62000) . "\n";
echo (new Kasir(new Transfer()))->checkout(62000) . "\n";

// Singleton: 1 kasir utama
class KasirUtama {
  private static ?KasirUtama $satu = null;
  private function __construct() {}
  public static function ambil(): KasirUtama {
    return self::$satu ??= new KasirUtama();
  }
}
var_dump(KasirUtama::ambil() === KasirUtama::ambil()); // true, sama!
```

---

## Konsep Kunci

### `Strategy` = Colokan Ganti
`Kasir(Bayar $cara)` terima colokan apa saja yang pas (`Tunai`/`Transfer`).

### `Singleton` = 1 Saja
`private __construct` + `static ambil()` — `new` dari luar ditolak.

### `Factory` = Pabrik (Bonus)
`function buat($tipe)` return objek sesuai tipe — 1 pintu buat.

---

## Penjelasan untuk Pemula

### Analogi: Colokan & Kasir Utama
- **Strategy = colokan listrik**: colok Tunai/Transfer, kasir sama.
- **Singleton = kasir utama**: cuma 1 di toko.

### Langkah 0 — Siapkan Device
- `php pola.php` (tanpa DB).

### Cara Komputer Membaca
1. `new Kasir(new Tunai())` → simpan cara.
2. `checkout(62000)` → panggil `cara->bayar()` (polimorfisme).

### 3 Istilah Wajib
1. **Strategy/Singleton**: colokan/1-saja
2. **Interface**: kontrak colokan

---

## Eksperimen

- **Hijau:** Tambah `class Qris implements Bayar` → `new Kasir(new Qris())` tanpa ubah `Kasir`?
- **Kuning:** `new KasirUtama()` langsung → error `private`?
- **Merah:** 20 `if` vs 1 Strategy — tambah cara ke-21, mana ubah 1 tempat?

---

## Tantangan

**Warung Pola Lengkap:** `Bayar` + `Tunai/Transfer/Qris` + `Kasir` + `phpunit` test 3 cara + `Singleton` log transaksi.

---

## Glosarium Mini

- **Strategy/Singleton/Factory**: colokan/1/pabrik

---

## Ringkasan

Minggu 11 dari 12: **Pola Rapi** (Level: Menengah). Tambah tanpa ubah lama. Minggu depan: **Capstone**.
