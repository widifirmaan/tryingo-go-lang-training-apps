# Object-Oriented Programming

> **Kategori:** PHP | **Level:** Beginner | **Minggu 5:** Object-Oriented Programming

## Learning Objectives

- Create classes with properties and methods
- Constructor: __construct for object initialization
- Visibility: public, protected, private
- Inheritance: extends for class inheritance
- Method overriding and parent:: for parent access

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

## Key Concepts

### Class & Object
`class` blueprint, `new ClassName()` creates object. Access with `->`.

### Constructor
`__construct()` called on `new`. Property type declarations (PHP 7.4+).

### Visibility
`public` (anywhere), `protected` (class + children), `private` (class only).

### Inheritance
`extends` to inherit. `parent::method()` for parent access. Override to customize.

---

## Experiments

- Create trait class for reusable methods
- Try abstract class with abstract method
- Create interface and implement in class
- Add static property and method
- Use __toString for string representation

---

## Challenge

Build a library system: class Book, Member, Loan. Use inheritance, encapsulation, and method chaining.

---

## Summary

Week 5 of 12: **Object-Oriented Programming** (Level: Beginner). Modern PHP paradigm. Next week: **Form Handling & Validation**.
