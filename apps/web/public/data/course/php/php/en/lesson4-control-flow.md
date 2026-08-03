# Control Flow: if, Loops, Match

> PHP | Lesson 4

## Learning Objectives

- Use if/elseif/else for decision-making\n- Master for and foreach loops\n- Use switch for multiple conditions\n- Understand the ternary operator for concise conditions

---

## Program: Control Flow: if, Loops, Match

```php
<?php

$nilai = 85;

if ($nilai >= 90) {
    echo "A";
} elseif ($nilai >= 80) {
    echo "B";
} elseif ($nilai >= 70) {
    echo "C";
} else {
    echo "D";
}

for ($i = 1; $i <= 5; $i++) {
    echo "Perulangan ke-$i\n";
}

$hari = 3;
switch ($hari) {
    case 1: echo "Senin"; break;
    case 2: echo "Selasa"; break;
    default: echo "Hari lain";
}

$status = $nilai >= 70 ? "Lulus" : "Tidak Lulus";
echo $status;

```

---

## Explanation

## if/elseif/else: Conditional Branching
if ($condition) { ... } runs the block if true. elseif adds branches. else for everything else. Conditions produce booleans: comparisons (>=, ===, !=), functions (empty, isset), expressions.
## for & foreach: Loops
for ($i = 1; $i <= 5; $i++) — repeat with a counter. foreach ($arr as $val) — repeat for each element. foreach ($arr as $k => $v) — with keys. break exits the loop; continue skips to the next iteration.
## switch: Multiple Branches
switch ($val) { case 1: ... break; ... default: ... } — cleaner than stacked if/elseif. break is required in each case (or use return). default for unmatched cases.
## Ternary & Null Coalescing
$status = $nilai >= 70 ? "Lulus" : "Tidak Lulus" — one-line if/else. $nama = $_GET['nama'] ?? 'Guest' — null coalescing: use the right side if the left is null/undefined. The ?? operator is very useful for GET/POST input.

---

## Experiments

1. **## if/elseif/else: Conditional Branching
if ($condition) { ... } runs the block if true. elseif adds branches. else for everything else. Conditions produce booleans: comparisons (>=, ===, !=), functions (empty, isset), expressions.
## for & foreach: Loops
for ($i = 1; $i <= 5; $i++) — repeat with a counter. foreach ($arr as $val) — repeat for each element. foreach ($arr as $k => $v) — with keys. break exits the loop; continue skips to the next iteration.
## switch: Multiple Branches
switch ($val) { case 1: ... break; ... default: ... } — cleaner than stacked if/elseif. break is required in each case (or use return). default for unmatched cases.
## Ternary & Null Coalescing
$status = $nilai >= 70 ? "Lulus" : "Tidak Lulus" — one-line if/else. $nama = $_GET['nama'] ?? 'Guest' — null coalescing: use the right side if the left is null/undefined. The ?? operator is very useful for GET/POST input.**

---

## Challenge

Advanced control flow: (1) create a for loop that prints a 1-10 multiplication table, (2) create $nilaiSiswa = [75, 82, 90, 60, 88] and use foreach + if to group into 2 arrays: $lulus and $tidakLulus, (3) create a switch for weekdays (1-5 = "Weekday", 6-7 = "Weekend") and print different messages, (4) use nested ternary for grade: >=90 "A", >=80 "B", >=70 "C", else "D".

---

## Summary

if = decisions. for/foreach = loops. switch = multiple branches. Ternary = concise. Next: functions.
