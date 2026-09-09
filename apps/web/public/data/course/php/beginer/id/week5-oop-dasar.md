# OOP Dasar — Cetak Biru Kartu Warung PHP

> **Kategori:** PHP | **Level:** Pemula | **Minggu 5:** OOP Dasar
> **Prasyarat:** Minggu 4 — **Array & Manipulasi**.

## Tujuan Pembelajaran

- `class Produk { ... }` cetak biru, `new Produk(...)` cetak kartu, `__construct` isi awal (sumber: php.net/oop)
- `$this->nama` = "kartu ini", `public` boleh diakses, `extends` warisan + `parent::__construct`

---

## Kenapa Ini Penting Buat Kamu?

50 produk tanpa cetak biru → tulis `nama, harga, stok` 50x, 1 typo harga salah. Dengan `class` tulis sekali, cetak 50 kartu — ubah rumus diskon 1 tempat.

---

## Program: Kartu Produk OOP

```php
<?php
class Produk {
  public string $nama;
  public float $harga;
  public int $stok;

  public function __construct(string $nama, float $harga, int $stok = 0) {
    $this->nama = $nama;   // $this = kartu ini
    $this->harga = $harga;
    $this->stok = $stok;
  }

  public function info(): string {
    return "{$this->nama}: Rp" . number_format($this->harga, 0, ',', '.') . " (stok {$this->stok})";
  }

  public function diskon(float $persen): void {
    $this->harga -= $this->harga * ($persen / 100);
  }
}

class Elektronik extends Produk { // warisi semua Produk
  public int $garansi;
  public function __construct(string $nama, float $harga, int $stok, int $garansi) {
    parent::__construct($nama, $harga, $stok);
    $this->garansi = $garansi;
  }
}

$beras = new Produk("Beras 5kg", 62000, 10);
echo $beras->info() . "\n";
$beras->diskon(10);
echo "Setelah diskon: " . $beras->info() . "\n";

$laptop = new Elektronik("Laptop", 15000000, 5, 3);
echo $laptop->info() . " [Garansi {$laptop->garansi} thn]\n";
?>
```

---

## Konsep Kunci

### `class` + `new` + `__construct`
`class` cetak biru, `new Produk(...)` kartu jadi, `__construct` isi awal otomatis.

### `$this` = Kartu Ini
`$this->nama` = nama kartu ini (bukan `$nama` biasa).

### `extends` + `parent::`
`Elektronik extends Produk` warisi semua + tambah `garansi`.

---

## Penjelasan untuk Pemula

### Analogi: Cetak Biru Kartu
- **class = cetak biru**, **new = cetak kartu**, **$this = "saya"** (kartu ini).
- **extends = fotokopi + tambah**: `Elektronik` fotokopi `Produk` + `garansi`.

### Langkah 0 — Siapkan Device
- Sama W1: `php kartu.php`.

### Cara Komputer Membaca
1. `new Produk("Beras", 62000, 10)` → buat kartu → panggil `__construct` → isi 3 field.
2. `$beras->diskon(10)` → ubah `harga` kartu itu jadi 55800.

### 3 Istilah Wajib
1. **Class/object**: biru/kartu
2. **$this**: kartu ini
3. **extends**: warisan

---

## Eksperimen

- **Hijau:** `new Produk("Gula", 15000)` → `info()`?
- **Kuning:** `$beras->diskon(20)` → harga?
- **Merah:** Lupa `$this->` tulis `$nama = ...` di method → buat variabel lokal, kartu tidak berubah!

---

## Tantangan

**Toko OOP:** `class Keranjang { public array $items = []; public function tambah($p){ $this->items[] = $p; } public function total(){ $s=0; foreach($this->items as $i) $s += $i->harga*$i->qty; return $s; } }` → isi 3 `Produk` → `total()`.
- **Sambungan (Minggu 4 — Array & Manipulasi):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **class/new/$this**: biru/kartu/saya
- **extends/parent**: warisan/induk

---

## Ringkasan

Minggu 5 dari 6: **OOP PHP** (Level: Pemula). Punya cetak biru kartu. Minggu depan: **Form** — terima pesanan.
