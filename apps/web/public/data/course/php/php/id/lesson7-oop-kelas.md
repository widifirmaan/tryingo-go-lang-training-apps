# OOP: Kelas & Objek

> PHP | Pelajaran 7

## Tujuan Pembelajaran

- Membuat kelas dengan properti dan method\n- Memahami constructor (__construct) dan $this\n- Menggunakan visibility (public, protected, private)\n- Melempar exception saat kondisi tidak valid

---

## Program: OOP: Kelas & Objek

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

## Penjelasan

## Kelas & Objek
class Produk { ... } — mendefinisikan blueprint. new Produk(...) — membuat instance (objek). $this merujuk ke instance saat ini. Properti = data, method = perilaku.
## Constructor & $this
__construct() dipanggil otomatis saat new. $this = objek yang sedang aktif. Gunakan $this->nama untuk mengakses properti instance dalam method.
## Visibility
public = bisa diakses dari mana saja. protected = hanya dalam kelas dan turunannya. private = hanya dalam kelas itu sendiri. Default adalah public. Enkapsulasi = sembunyikan detail internal, ekspos antarmuka publik.
## Exception
throw new Exception("Pesan") — menghentikan eksekusi normal dan berpindah ke blok catch terdekat. Berguna untuk validasi (stok tidak cukup, input tidak valid).

---

## Eksperimen

1. **## Kelas & Objek
class Produk { ... } — mendefinisikan blueprint. new Produk(...) — membuat instance (objek). $this merujuk ke instance saat ini. Properti = data, method = perilaku.
## Constructor & $this
__construct() dipanggil otomatis saat new. $this = objek yang sedang aktif. Gunakan $this->nama untuk mengakses properti instance dalam method.
## Visibility
public = bisa diakses dari mana saja. protected = hanya dalam kelas dan turunannya. private = hanya dalam kelas itu sendiri. Default adalah public. Enkapsulasi = sembunyikan detail internal, ekspos antarmuka publik.
## Exception
throw new Exception("Pesan") — menghentikan eksekusi normal dan berpindah ke blok catch terdekat. Berguna untuk validasi (stok tidak cukup, input tidak valid).**

---

## Tantangan

Kembangkan OOP: (1) tambah properti readonly $id (auto-increment static) ke kelas Produk, (2) buat kelas kedua Toko yang menyimpan array Produk dan punya method tambahProduk() serta daftarProduk(), (3) ubah visibility $stok dari public menjadi private dan tambah getter getStok(), (4) buat custom exception class StokHabisException yang extends Exception dan tangkap di method terjual().

---

## Ringkasan

class = blueprint. new = instance. $this = instance saat ini. throw = exception. Lanjut: pewarisan.
