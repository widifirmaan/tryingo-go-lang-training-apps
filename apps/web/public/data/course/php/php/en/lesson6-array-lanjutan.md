# Advanced Arrays & Callbacks

> PHP | Lesson 6

## Learning Objectives

- Master array functions: sort, array_map, array_filter, array_reduce\n- Understand callbacks and arrow functions as function arguments\n- Access associative arrays with array_keys and array_values\n- Sort multidimensional arrays with usort and the spaceship operator

---

## Program: Advanced Arrays & Callbacks

```php
<?php

$angka = [3, 1, 4, 1, 5, 9, 2, 6];

sort($angka);
echo "Urut: " . implode(", ", $angka) . "\n";

$ganda = array_map(fn($x) => $x * 2, $angka);
echo "Ganda: " . implode(", ", $ganda) . "\n";

$genap = array_filter($angka, fn($x) => $x % 2 === 0);
echo "Genap: " . implode(", ", $genap) . "\n";

$total = array_reduce($angka, fn($carry, $x) => $carry + $x, 0);
echo "Total: $total\n";

$assoc = ["nama" => "Budi", "umur" => 25, "kota" => "Jakarta"];
$keys = array_keys($assoc);
$values = array_values($assoc);

$nested = [
    ["nama" => "Alice", "skor" => 90],
    ["nama" => "Budi", "skor" => 85],
];
usort($nested, fn($a, $b) => $b["skor"] <=> $a["skor"]);

```

---

## Explanation

## array_map: Transform Every Element
array_map(fn($x) => $x * 2, $arr) — applies a function to every element, returns a new array. A callback = a function passed as an argument to another function. Arrow function (fn) is a concise single-expression callback.
## array_filter: Filter Elements
array_filter($arr, fn($x) => $x > 5) — keeps elements where the callback returns true. Without a second callback, removes "falsy" elements (0, "", null, false).
## array_reduce: Reduce to One Value
array_reduce($arr, fn($carry, $x) => $carry + $x, 0) — combines all elements into one value. $carry = the accumulation from the previous iteration. Useful for totals, string concatenation, etc.
## Sorting & the Spaceship
sort($arr) — sort ascending (modifies original). usort($arr, fn($a, $b) => $b["score"] <=> $a["score"]) — sort associative array with callback. The <=> (spaceship) operator returns -1, 0, or 1 for comparison.

---

## Experiments

1. **## array_map: Transform Every Element
array_map(fn($x) => $x * 2, $arr) — applies a function to every element, returns a new array. A callback = a function passed as an argument to another function. Arrow function (fn) is a concise single-expression callback.
## array_filter: Filter Elements
array_filter($arr, fn($x) => $x > 5) — keeps elements where the callback returns true. Without a second callback, removes "falsy" elements (0, "", null, false).
## array_reduce: Reduce to One Value
array_reduce($arr, fn($carry, $x) => $carry + $x, 0) — combines all elements into one value. $carry = the accumulation from the previous iteration. Useful for totals, string concatenation, etc.
## Sorting & the Spaceship
sort($arr) — sort ascending (modifies original). usort($arr, fn($a, $b) => $b["score"] <=> $a["score"]) — sort associative array with callback. The <=> (spaceship) operator returns -1, 0, or 1 for comparison.**

---

## Challenge

Expand arrays: (1) create a $transaksi array with 5 items (name, amount) then use array_filter to filter those over 100000, (2) use array_reduce to calculate the total of all amounts, (3) create a $siswa array with scores and sort descending using usort, (4) use array_map with fn to uppercase all names.

---

## Summary

array_map = transform. array_filter = filter. array_reduce = reduce. usort = sort. Next: OOP.
