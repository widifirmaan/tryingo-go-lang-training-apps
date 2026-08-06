# Object-Oriented Programming

> **Kategori:** PHP | **Level:** Pemula | **Minggu 5:** Object-Oriented Programming

## Tujuan Pembelajaran

- Membuat class dengan property dan method
- Constructor: __construct untuk inisialisasi object
- Visibility: public, protected, private
- Inheritance: extends untuk pewarisan class
- Method overriding dan parent:: untuk akses parent

---

## Program: Class & Object

```php
<?php
class Produk {
    public string $nama;
    public float $harga;
    public int $stok;

    public function __construct(string $nama, float $harga, int $stok = 0) {
        $this->nama = $nama;
        $this->harga = $harga;
        $this->stok = $stok;
    }

    public function info(): string {
        return "{$this->nama}: Rp" . number_format($this->harga, 0) . " (stok: {$this->stok})";
    }

    public function diskon(float $persen): void {
        $this->harga -= $this->harga * ($persen / 100);
    }
}

class Elektronik extends Produk {
    public int $garansi;

    public function __construct(string $nama, float $harga, int $stok, int $garansi) {
        parent::__construct($nama, $harga, $stok);
        $this->garansi = $garansi;
    }

    public function info(): string {
        return parent::info() . " [Garansi: {$this->garansi} tahun]";
    }
}

$produk = new Produk("Mouse", 250000, 10);
echo $produk->info() . "<br>";

$produk->diskon(10);
echo "Setelah diskon: " . $produk->info() . "<br>";

$laptop = new Elektronik("Laptop Pro", 20000000, 5, 3);
echo $laptop->info() . "<br>";

echo "Class: " . get_class($laptop) . "<br>";
echo "Instanceof: " . ($laptop instanceof Elektronik ? "Ya" : "Tidak") . "<br>";
>
```

---

## Konsep Kunci

### Class & Object
`class` blueprint, `new ClassName()` membuat object. Property dan method diakses dengan `->`.

### Constructor
`__construct()` dipanggil otomatis saat `new`. Type declaration di property (PHP 7.4+).

### Visibility
`public` (akses mana saja), `protected` (class + turunan), `private` (hanya class sendiri).

### Inheritance
`extends` untuk waris. `parent::method()` untuk akses method parent. Override untuk customize.

---

## Eksperimen

- Buat class trait untuk method reusable
- Coba abstract class dengan abstract method
- Buat interface dan implement di class
- Tambah static property dan method
- Gunakan __toString untuk string representation

---

## Tantangan

Buat sistem perpustakaan: class Buku, Anggota, Peminjaman. Gunakan inheritance, encapsulation, dan method chaining.

---

## Ringkasan

Minggu 5 dari 12: **Object-Oriented Programming** (Level: Pemula). Paradigma modern PHP. Minggu depan: **Form Handling & Validasi**.
