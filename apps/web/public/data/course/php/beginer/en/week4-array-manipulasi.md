# Arrays & Manipulation

> **Kategori:** PHP | **Level:** Beginner | **Minggu 4:** Arrays & Manipulation

## Learning Objectives

- Indexed arrays: numerically indexed arrays
- Associative arrays: string-keyed arrays
- Array manipulation: sort, array_filter, array_map, array_reduce
- Multi-dimensional arrays for complex data
- Array loops with foreach and nested iteration

---

## Program: Data Manager

```php
<?php
$buah = ["apel", "mangga", "pisang"];
$buah[] = "jeruk";
echo "Buah: " . implode(", ", $buah) . "<br>";
echo "Jumlah: " . count($buah) . "<br>";

$nilai = [85, 92, 78, 90, 88];
echo "Max: " . max($nilai) . ", Min: " . min($nilai) . "<br>";
echo "Sum: " . array_sum($nilai) . ", Avg: " . (array_sum($nilai) / count($nilai)) . "<br>";

sort($nilai);
echo "Sorted: " . implode(", ", $nilai) . "<br>";

$siswa = [
    "nama" => "Budi",
    "umur" => 25,
    "nilai" => [90, 85, 88],
];
echo "Nama: " . $siswa["nama"] . "<br>";
$siswa["alamat"] = "Jakarta";

foreach ($siswa as $key => $value) {
    if (is_array($value)) {
        echo "$key: " . implode(", ", $value) . "<br>";
    } else {
        echo "$key: $value<br>";
    }
}

$matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
echo "<br>Matrix:<br>";
foreach ($matrix as $row) {
    echo implode(" ", $row) . "<br>";
}

$genap = array_filter($nilai, fn($n) => $n % 2 == 0);
echo "<br>Genap: " . implode(", ", $genap) . "<br>";

$doubled = array_map(fn($n) => $n * 2, $nilai);
echo "Doubled: " . implode(", ", $doubled) . "<br>";
>
```

---

## Key Concepts

### Indexed & Associative
`["a", "b"]` numeric. `["key" => "val"]` string keys.

### Array Functions
`sort()`, `array_filter()`, `array_map()`, `array_reduce()`.

### Multi-dimensional
Arrays within arrays for matrices/tables.

### Foreach
`foreach ($arr as $key => $value)` — primary array iteration.

---

## Experiments

- Create array_merge to combine 2 arrays
- Try array_unique to remove duplicates
- Use array_slice to extract partial array
- Implement nested loop for matrix multiplication
- Create flatten function for nested arrays

---

## Challenge

Build an inventory system: add/remove products (associative array), sort by price, filter by category.

---

## Summary

Week 4 of 12: **Arrays & Manipulation** (Level: Beginner). PHP's primary data structure. Next week: **Object-Oriented Programming**.
