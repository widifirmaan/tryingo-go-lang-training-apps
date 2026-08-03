# Strings & Arrays

> PHP | Lesson 3

## Learning Objectives

- Master string functions: strlen, strtoupper, substr, strpos\n- Create and access indexed & associative arrays\n- Add elements with [] and iterate with foreach\n- Understand string interpolation vs concatenation (.)

---

## Program: Strings & Arrays

```php
<?php

$nama = "Tryngo";
$pesan = "Halo, $nama!";
$panjang = strlen($nama);
$upper = strtoupper($nama);

$buah = ["apel", "jeruk", "mangga"];
$buah[] = "pisang";

foreach ($buah as $b) {
    echo $b . "\n";
}

$data = ["nama" => "Budi", "umur" => 25];
echo $data["nama"];

```

---

## Explanation

## String Functions
strlen($s) = string length. strtoupper/strtolower = upper/lower case. substr($s, 0, 5) = first 5 chars. strpos($s, "Tryngo") = substring position (or false).
## Arrays: Ordered Lists
$arr = ["a", "b", "c"] — indexed array (keys 0, 1, 2). $arr[] = "d" — append. count($arr) = element count. foreach ($arr as $val) — loop without keys. foreach ($arr as $k => $v) — loop with keys.
## Associative Arrays
$data = ["nama" => "Budi", "umur" => 25] — string keys, not numbers. Access: $data["nama"]. Great for storing records as plain PHP arrays.
## Interpolation vs Concatenation
"Halo, $nama!" — PHP replaces $nama inside double-quoted strings. 'Halo, $nama!' — inside single-quoted strings, $nama is NOT replaced (literal). For object properties: "Nama: " . $user->nama (concatenation) or "Nama: {$user->nama}" (curly-brace interpolation).

---

## Experiments

1. **## String Functions
strlen($s) = string length. strtoupper/strtolower = upper/lower case. substr($s, 0, 5) = first 5 chars. strpos($s, "Tryngo") = substring position (or false).
## Arrays: Ordered Lists
$arr = ["a", "b", "c"] — indexed array (keys 0, 1, 2). $arr[] = "d" — append. count($arr) = element count. foreach ($arr as $val) — loop without keys. foreach ($arr as $k => $v) — loop with keys.
## Associative Arrays
$data = ["nama" => "Budi", "umur" => 25] — string keys, not numbers. Access: $data["nama"]. Great for storing records as plain PHP arrays.
## Interpolation vs Concatenation
"Halo, $nama!" — PHP replaces $nama inside double-quoted strings. 'Halo, $nama!' — inside single-quoted strings, $nama is NOT replaced (literal). For object properties: "Nama: " . $user->nama (concatenation) or "Nama: {$user->nama}" (curly-brace interpolation).**

---

## Challenge

Expand strings & arrays: (1) create a $siswa array with 3 names, then print "Welcome, [name]!" for each student using foreach, (2) create $kalimat = "Belajar PHP itu menyenangkan" and use strpos to find the position of "menyenangkan", (3) create an associative $mobil array with keys "merk", "tahun", "warna" then print all values, (4) convert all letters in $kalimat to uppercase with strtoupper and print.

---

## Summary

Strings = text manipulation functions. Arrays = ordered & associative lists. foreach = iteration. Next: control flow.
