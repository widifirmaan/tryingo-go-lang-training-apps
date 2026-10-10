# Functions & Variable Scope

> **Kategori:** PHP | **Level:** Beginner | **Minggu 3:** Functions & Variable Scope

## Learning Objectives

- Create functions with function keyword, parameters, and return
- Default parameter values and named arguments (PHP 8+)
- Variable scope: global, static, and local
- Anonymous functions (closures) and arrow functions (fn)
- Recursive functions for self-referencing loops

---

## Program: Function Calculator

```php
<?php
function tambah($a, $b) {
    return $a + $b;
}

function bagi($a, $b) {
    if ($b == 0) {
        return "Error: tidak bisa dibagi nol";
    }
    return $a / $b;
}

function sapa($nama = "Tamu", $salam = "Halo") {
    return "$salam, $nama!";
}

function &getReference() {
    static $value = 10;
    return $value;
}

echo "Tambah: " . tambah(10, 5) . "<br>";
echo "Bagi: " . bagi(10, 3) . "<br>";
echo "Bagi nol: " . bagi(5, 0) . "<br>";
echo sapa("Budi") . "<br>";
echo sapa("Siti", "Selamat pagi") . "<br>";

$hitung = 0;
function counter() {
    global $hitung;
    $hitung++;
    return $hitung;
}
counter(); counter(); counter();
echo "Counter: $hitung<br>";

$faktorial = function($n) {
    if ($n <= 1) return 1;
    return $n * ($faktorial($n - 1));
};
echo "Faktorial 5: " . $faktorial(5) . "<br>";

$angka = [3, 1, 4, 1, 5];
$doubled = array_map(fn($n) => $n * 2, $angka);
echo "Doubled: " . implode(", ", $doubled) . "<br>";
>
```

---

## Key Concepts

### Function Declaration
`function name($param) { return $value; }`. Default: `$name = "Guest"`.

### Scope
Local inside functions, `global` keyword for access, `static` to persist.

### Closures & Arrows
Anonymous: `$f = function() {}`. Arrow: `fn($x) => $x * 2`.

### Recursion
Function calls itself. Base case to stop.

---

## Experiments

- Create function with type declaration: function add(int $a, int $b): int
- Try variadic function: function sum(...$numbers)
- Create closure with use() to capture outer variable
- Implement Fibonacci with recursion
- Use array_filter with arrow function

---

## Challenge

Build a math library: power, factorial, prime check, and FizzBuzz functions. Use recursion and type hints.

---

## Summary

Week 3 of 12: **Functions & Variable Scope** (Level: Beginner). Code modularity begins. Next week: **Arrays & Manipulation**.
