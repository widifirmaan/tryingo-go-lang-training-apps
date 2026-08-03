# OOP: Inheritance & Interfaces

> PHP | Lesson 8

## Learning Objectives

- Understand abstract classes and abstract methods\n- Use extends for inheritance and static:: for late static binding\n- Implement interfaces (implements) on classes\n- Combine abstract classes and interfaces in a single class

---

## Program: OOP: Inheritance & Interfaces

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

## Explanation

## Abstract Class
abstract class Bentuk { abstract public function luas(): float; } — cannot be instantiated directly (new Bentuk() fails). Child classes MUST implement all abstract methods.
## extends & static::
class Lingkaran extends Bentuk — inherits all non-private methods and properties. static::class returns the child class name (not parent). This is late static binding — important for the info() method that works for all descendants.
## Interface
interface Drawable { public function draw(): string; } — a contract without implementation. class Segitiga implements Drawable — must implement draw(). A class can implement multiple interfaces (multiple contracts).
## Combination
class Segitiga extends Bentuk implements Drawable — inherits from Bentuk AND implements Drawable. PHP allows only single inheritance (extends) but multi-interface (implements).

---

## Experiments

1. **## Abstract Class
abstract class Bentuk { abstract public function luas(): float; } — cannot be instantiated directly (new Bentuk() fails). Child classes MUST implement all abstract methods.
## extends & static::
class Lingkaran extends Bentuk — inherits all non-private methods and properties. static::class returns the child class name (not parent). This is late static binding — important for the info() method that works for all descendants.
## Interface
interface Drawable { public function draw(): string; } — a contract without implementation. class Segitiga implements Drawable — must implement draw(). A class can implement multiple interfaces (multiple contracts).
## Combination
class Segitiga extends Bentuk implements Drawable — inherits from Bentuk AND implements Drawable. PHP allows only single inheritance (extends) but multi-interface (implements).**

---

## Challenge

Deepen OOP: (1) create a Logger trait with a log($message) method and use it in both Bentuk classes, (2) create a Printable interface with a print() method and implement it in Segitiga, (3) create a LingkaranFinal class (final — cannot be extended) and observe the error when trying to extend it, (4) create a static Utilitas class with a static hitungLuasLingkaran($r) method — call without an instance.

---

## Summary

abstract = blueprint without instances. extends = inheritance. interface = contract. trait = code reuse. Next: exceptions.
