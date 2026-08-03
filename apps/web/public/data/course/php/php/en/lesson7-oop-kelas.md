# OOP: Classes & Objects

> PHP | Lesson 7

## Learning Objectives

- Create classes with properties and methods\n- Understand the constructor (__construct) and $this\n- Use visibility (public, protected, private)\n- Throw exceptions when conditions are invalid

---

## Program: OOP: Classes & Objects

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
        return $this->nama . " - Rp " . number_format($this->harga, 0, ",", ".");
    }

    public function terjual(int $jumlah): void {
        if ($jumlah > $this->stok) {
            throw new Exception("Stok tidak cukup");
        }
        $this->stok -= $jumlah;
    }
}

$p = new Produk("Kopi Gayo", 25000, 12);
echo $p->info() . "\n";
$p->terjual(3);
echo "Sisa stok: " . $p->stok . "\n";

```

---

## Explanation

## Classes & Objects
class Produk { ... } — defines a blueprint. new Produk(...) — creates an instance (object). $this refers to the current instance. Properties = data, methods = behavior.
## Constructor & $this
__construct() is called automatically on new. $this = the currently active object. Use $this->name to access instance properties inside methods.
## Visibility
public = accessible from anywhere. protected = within the class and its children. private = within the class itself. Default is public. Encapsulation = hide internal details, expose a public interface.
## Exception
throw new Exception("message") — stops normal execution and jumps to the nearest catch block. Useful for validation (insufficient stock, invalid input).

---

## Experiments

1. **## Classes & Objects
class Produk { ... } — defines a blueprint. new Produk(...) — creates an instance (object). $this refers to the current instance. Properties = data, methods = behavior.
## Constructor & $this
__construct() is called automatically on new. $this = the currently active object. Use $this->name to access instance properties inside methods.
## Visibility
public = accessible from anywhere. protected = within the class and its children. private = within the class itself. Default is public. Encapsulation = hide internal details, expose a public interface.
## Exception
throw new Exception("message") — stops normal execution and jumps to the nearest catch block. Useful for validation (insufficient stock, invalid input).**

---

## Challenge

Expand OOP: (1) add a readonly $id property (auto-increment static) to the Produk class, (2) create a second class Toko that holds an array of Produk and has tambahProduk() and daftarProduk() methods, (3) change $stok visibility from public to private and add a getStok() getter, (4) create a custom StokHabisException class extending Exception and catch it in the terjual() method.

---

## Summary

class = blueprint. new = instance. $this = current instance. throw = exception. Next: inheritance.
