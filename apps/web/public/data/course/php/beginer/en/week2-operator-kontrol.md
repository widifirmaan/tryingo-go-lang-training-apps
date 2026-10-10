# Operators & Control Flow

> **Kategori:** PHP | **Level:** Beginner | **Minggu 2:** Operators & Control Flow

## Learning Objectives

- Arithmetic operators: +, -, *, /, %, ** (power)
- Comparison operators: ==, ===, !=, !==, <, >, <=, >=
- Logical operators: &&, ||, !, and, or, xor
- Control flow: if, elseif, else for branching
- Loops: for, while, do-while, and switch case

---

## Program: Grade System

```php
<?php
$nilai = 85;
$absen = 90;

echo "Nilai: $nilai, Absen: $absen<br>";

if ($nilai >= 90) {
    $grade = "A";
} elseif ($nilai >= 75) {
    $grade = "B";
} elseif ($nilai >= 60) {
    $grade = "C";
} else {
    $grade = "D";
}
echo "Grade: $grade<br>";

echo "<br>=== For Loop ===<br>";
for ($i = 1; $i <= 5; $i++) {
    echo "Iterasi $i<br>";
}

echo "<br>=== While Loop ===<br>";
$n = 1;
while ($n <= 3) {
    echo "While: $n<br>";
    $n++;
}

echo "<br>=== Switch ===<br>";
$hari = 3;
switch ($hari) {
    case 1: echo "Senin"; break;
    case 2: echo "Selasa"; break;
    case 3: echo "Rabu"; break;
    default: echo "Lainnya";
}
echo "<br>";

$hasil = ($nilai >= 60) ? "Lulus" : "Tidak Lulus";
echo "Status: $hasil<br>";

$nama = null;
$salam = $nama ?? "Tamu";
echo "Halo, $salam<br>";
>
```

---

## Key Concepts

### Arithmetic Operators
`+`, `-`, `*`, `/`, `%`, `**` power.

### Comparison & Logic
`==` equals, `===` identical, `&&` AND, `||` OR.

### Control Flow
`if/elseif/else` for branching. Ternary: `? :`.

### Loops
`for` counted, `while` conditional, `switch` for branches.

---

## Experiments

- Change values and observe grade changes
- Create nested if for multi-condition validation
- Try for loop with break and continue
- Replace switch with if/else — which is more readable?
- Use null coalescing operator ?? for default values

---

## Challenge

Build a simple calculator with switch case: add, subtract, multiply, divide. Validate division by zero.

---

## Summary

Week 2 of 12: **Operators & Control Flow** (Level: Beginner). Program logic is built here. Next week: **Functions & Variable Scope**.
