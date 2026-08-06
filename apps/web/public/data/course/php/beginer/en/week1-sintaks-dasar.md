# Basic Syntax & Variables

> **Kategori:** PHP | **Level:** Beginner | **Minggu 1:** Basic Syntax & Variables

## Learning Objectives

- Understand PHP as a server-side language (PHP Official Docs)
- Write PHP tags: <?php ... ?> and echo for output
- Declare variables with $ and dynamic typing
- Learn basic types: string, int, float, bool, array, NULL
- String interpolation and concatenation with .

---

## Program: Hello, PHP!

```php
<?php
echo "Selamat datang di PHP!<br>";
echo "PHP adalah bahasa server-side populer.<br>";

$nama = "Budi";
$umur = 25;
$tinggi = 175.5;
$aktif = true;

echo "Nama: $nama<br>";
echo "Umur: $umur<br>";
echo "Tinggi: $tinggi<br>";
echo "Aktif: " . ($aktif ? "Ya" : "Tidak") . "<br>";
echo "Tipe: " . gettype($nama) . ", " . gettype($umur) . "<br>";
>
```

---

## Key Concepts

### PHP's Role
PHP is a server-side scripting language. Executed on the server — produces HTML sent to client.

### Basic Syntax
`<?php ... ?>` tags. `echo` for output. Variables start with `$`.

### Data Types
String, Integer, Float, Boolean, Array, NULL.

### Strings
Double-quote interpolation, single-quote literal, concatenation with `.`.

---

## Experiments

- Change variable values and observe
- Create arithmetic operations: +, -, *, /, %
- Try single-quote vs double-quote difference
- Use gettype() to check various types
- Create type casting: (int), (string), (bool)

---

## Challenge

Build a student profile program: name, age, grades (array), and graduation status. Display with formatted echo.

---

## Summary

Week 1 of 12: **Basic Syntax & Variables** (Level: Beginner). PHP foundation starts here. Next week: **Operators & Control Flow**.
