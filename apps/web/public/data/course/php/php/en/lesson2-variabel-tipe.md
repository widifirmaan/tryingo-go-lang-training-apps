# Variables, Types & Type Casting

> PHP | Lesson 2

## Learning Objectives

- Create variables with $ and understand naming rules\n- Learn data types: string, integer, float, boolean\n- Use var_dump() to debug variable types\n- Understand type juggling and explicit type casting

---

## Program: Variables, Types & Type Casting

```php
<?php

$nama = "Tryngo";
$umur = 25;
$harga = 19999.50;
$aktif = true;

var_dump($nama);
var_dump($umur);
var_dump($harga);
var_dump($aktif);

```

---

## Explanation

## Variables: Store Data
PHP variables start with $ (e.g., $nama). Variable names start with a letter or _, followed by letters/numbers/_. PHP does not declare variable types — the type is determined automatically from the assigned value (type juggling).
## Primitive Types
string = text ("Hello"), integer = whole number (25), float = decimal number (19999.50), boolean = true/false.
## var_dump(): Debug Types
var_dump($variable) prints both the type AND value of a variable. Useful for ensuring data has the expected type.
## Type Casting
(int) "25" → integer 25. (string) 25 → "25". (bool) 0 → false, (bool) "hello" → true. Explicit casts safely change types.

---

## Experiments

1. **## Variables: Store Data
PHP variables start with $ (e.g., $nama). Variable names start with a letter or _, followed by letters/numbers/_. PHP does not declare variable types — the type is determined automatically from the assigned value (type juggling).
## Primitive Types
string = text ("Hello"), integer = whole number (25), float = decimal number (19999.50), boolean = true/false.
## var_dump(): Debug Types
var_dump($variable) prints both the type AND value of a variable. Useful for ensuring data has the expected type.
## Type Casting
(int) "25" → integer 25. (string) 25 → "25". (bool) 0 → false, (bool) "hello" → true. Explicit casts safely change types.**

---

## Challenge

Practice variables: (1) create 3 variables: $nama (string), $nilai (integer), $lulus (boolean), then print with echo "Name: $nama, Score: $nilai, Pass: " . ($lulus ? "Yes" : "No"), (2) convert $nilai from string "90" to integer with (int), (3) try adding string "5" + integer 3 and observe the result with var_dump, (4) create $harga = 50000 and print with number_format($harga, 0, ",", ".") for Rupiah formatting.

---

## Summary

Variables = store data. var_dump = debug types. Type casting = change types. Next: strings & arrays.
