# OOP: Pewarisan & Interface

> PHP | Pelajaran 8

## Tujuan Pembelajaran

- Memahami abstract class dan method abstract\n- Menggunakan extends untuk pewarisan dan static:: untuk late static binding\n- Mengimplementasikan interface (implements) pada kelas\n- Menggabungkan abstract class dan interface dalam satu kelas

---

## Program: OOP: Pewarisan & Interface

```php
<?php

abstract class Bentuk {
    abstract public function luas(): float;
    abstract public function keliling(): float;

    public function info(): string {
        return static::class . ": luas=" . $this->luas() . ", keliling=" . $this->keliling();
    }
}

class Lingkaran extends Bentuk {
    public function __construct(public float $jariJari) {}

    public function luas(): float {
        return M_PI * $this->jariJari ** 2;
    }

    public function keliling(): float {
        return 2 * M_PI * $this->jariJari;
    }
}

class PersegiPanjang extends Bentuk {
    public function __construct(public float $panjang, public float $lebar) {}

    public function luas(): float {
        return $this->panjang * $this->lebar;
    }

    public function keliling(): float {
        return 2 * ($this->panjang + $this->lebar);
    }
}

$bentuk = [new Lingkaran(5), new PersegiPanjang(4, 6)];
foreach ($bentuk as $b) {
    echo $b->info() . "\n";
}

interface Drawable {
    public function draw(): string;
}

class Segitiga extends Bentuk implements Drawable {
    public function __construct(public float $alas, public float $tinggi) {}

    public function luas(): float {
        return 0.5 * $this->alas * $this->tinggi;
    }

    public function keliling(): float {
        return $this->alas + $this->tinggi + sqrt($this->alas ** 2 + $this->tinggi ** 2);
    }

    public function draw(): string {
        return "Segitiga (alas={$this->alas}, tinggi={$this->tinggi})";
    }
}

```

---

## Penjelasan

## Abstract Class
abstract class Bentuk { abstract public function luas(): float; } — tidak bisa dibuat instance langsung (new Bentuk() gagal). Anak class HARUS mengimplementasikan semua method abstract.
## extends & static::
class Lingkaran extends Bentuk — mewarisi semua method dan properti non-private. static::class mengembalikan nama class anak (bukan parent). Ini late static binding — penting untuk method info() yang bekerja untuk semua turunan.
## Interface
interface Drawable { public function draw(): string; } — kontrak tanpa implementasi. class Segitiga implements Drawable — wajib implementasi draw(). Sebuah class bisa implements banyak interface (kontrak ganda).
## Kombinasi
class Segitiga extends Bentuk implements Drawable — mewarisi dari Bentuk DAN mengimplementasikan Drawable. PHP hanya mengizinkan single inheritance (extends) tapi multi-interface (implements).

---

## Eksperimen

1. **## Abstract Class
abstract class Bentuk { abstract public function luas(): float; } — tidak bisa dibuat instance langsung (new Bentuk() gagal). Anak class HARUS mengimplementasikan semua method abstract.
## extends & static::
class Lingkaran extends Bentuk — mewarisi semua method dan properti non-private. static::class mengembalikan nama class anak (bukan parent). Ini late static binding — penting untuk method info() yang bekerja untuk semua turunan.
## Interface
interface Drawable { public function draw(): string; } — kontrak tanpa implementasi. class Segitiga implements Drawable — wajib implementasi draw(). Sebuah class bisa implements banyak interface (kontrak ganda).
## Kombinasi
class Segitiga extends Bentuk implements Drawable — mewarisi dari Bentuk DAN mengimplementasikan Drawable. PHP hanya mengizinkan single inheritance (extends) tapi multi-interface (implements).**

---

## Tantangan

Perdalam OOP: (1) buat trait Logger dengan method log($pesan) dan gunakan di kedua kelas Bentuk, (2) buat interface Printable dengan method print() dan implementasikan di Segitiga, (3) buat class LingkaranFinal (final class — tidak bisa di-extends) dan amati error saat mencoba extends, (4) buat class static Utilitas dengan method static hitungLuasLingkaran($r) — panggil tanpa instance.

---

## Ringkasan

abstract = blueprint tanpa instance. extends = pewarisan. interface = kontrak. trait = reuse kode. Lanjut: exception.
