# Functions & Parameters

> PHP | Lesson 5

## Learning Objectives

- Create functions with parameters and return values\n- Understand default parameters and optional arguments\n- Use arrow functions (fn) for concise single-expression functions\n- Use the match expression as a switch replacement

---

## Program: Functions & Parameters

```php
<?php

function salam($nama) {
    return "Halo, " . $nama . "!";
}

echo salam("Budi");

function hitung($a, $b, $operasi = "tambah") {
    return match($operasi) {
        "tambah" => $a + $b,
        "kurang" => $a - $b,
        "kali" => $a * $b,
        default => 0,
    };
}

echo hitung(10, 5) . "\n";
echo hitung(10, 5, "kurang") . "\n";

$fn = fn($x) => $x * 2;
echo $fn(7);

```

---

## Explanation

## Functions: Reusable Code
function name($param1, $param2 = default) { return ...; } — defines a function. return sends a value back to the caller. Functions are called with name($arguments). Default parameters: hitung($a, $b, "tambah") — "tambah" is automatic if not given.
## return vs echo
return sends a value back to the calling code (can be stored in a variable). echo prints directly to output. Use return for computing functions, echo for printing. return stops function execution immediately.
## Arrow Functions (fn)
$fn = fn($x) => $x * 2; — a one-line function without the function keyword. Great for short callbacks (array_map, array_filter). $x => $x * 2 — single parameter without parentheses.
## match Expression
match ($expression) { "k1" => result1, "k2" => result2, default => defaultResult } — like switch but stricter (no break needed, strict === matching). match returns a value (not a statement).

---

## Experiments

1. **## Functions: Reusable Code
function name($param1, $param2 = default) { return ...; } — defines a function. return sends a value back to the caller. Functions are called with name($arguments). Default parameters: hitung($a, $b, "tambah") — "tambah" is automatic if not given.
## return vs echo
return sends a value back to the calling code (can be stored in a variable). echo prints directly to output. Use return for computing functions, echo for printing. return stops function execution immediately.
## Arrow Functions (fn)
$fn = fn($x) => $x * 2; — a one-line function without the function keyword. Great for short callbacks (array_map, array_filter). $x => $x * 2 — single parameter without parentheses.
## match Expression
match ($expression) { "k1" => result1, "k2" => result2, default => defaultResult } — like switch but stricter (no break needed, strict === matching). match returns a value (not a statement).**

---

## Challenge

Practice functions: (1) create hitungLuasPersegiPanjang($length, $width) that returns the area, (2) create a recursive faktorial($n) function and call it for 5, (3) use array_map with an arrow function to double all elements of [1,2,3,4,5], (4) create formatRupiah($amount) that returns "Rp 1.000.000" using number_format.

---

## Summary

function = reusable code. return = send back a value. match = modern switch. fn = arrow function. Next: advanced arrays.
