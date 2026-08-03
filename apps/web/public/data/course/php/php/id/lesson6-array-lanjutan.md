# Array Lanjutan & Callback

> PHP | Pelajaran 6

## Tujuan Pembelajaran

- Menguasai fungsi array: sort, array_map, array_filter, array_reduce\n- Memahami callback dan arrow functions sebagai argumen fungsi\n- Mengakses array asosiatif dengan array_keys dan array_values\n- Mengurutkan array multidimensi dengan usort dan spaceship operator

---

## Program: Array Lanjutan & Callback

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

## Penjelasan

## array_map: Transform Setiap Elemen
array_map(fn($x) => $x * 2, $arr) — menerapkan fungsi ke setiap elemen, mengembalikan array baru. Callback = fungsi yang diberikan sebagai argumen ke fungsi lain. Arrow function (fn) adalah callback ringkas satu ekspresi.
## array_filter: Saring Elemen
array_filter($arr, fn($x) => $x > 5) — menyimpan elemen yang callback-nya mengembalikan true. Tanpa callback kedua, menghapus elemen "falsy" (0, "", null, false).
## array_reduce: Reduksi ke Satu Nilai
array_reduce($arr, fn($carry, $x) => $carry + $x, 0) — menggabungkan semua elemen menjadi satu nilai. $carry = akumulasi dari iterasi sebelumnya. Berguna untuk total, string penggabungan, dll.
## Sorting & Spaceship
sort($arr) — urutkan ascending (mengubah array asli). usort($arr, fn($a, $b) => $b["skor"] <=> $a["skor"]) — urutkan array asosiatif dengan callback. Operator <=> (spaceship) mengembalikan -1, 0, atau 1 untuk perbandingan.

---

## Eksperimen

1. **## array_map: Transform Setiap Elemen
array_map(fn($x) => $x * 2, $arr) — menerapkan fungsi ke setiap elemen, mengembalikan array baru. Callback = fungsi yang diberikan sebagai argumen ke fungsi lain. Arrow function (fn) adalah callback ringkas satu ekspresi.
## array_filter: Saring Elemen
array_filter($arr, fn($x) => $x > 5) — menyimpan elemen yang callback-nya mengembalikan true. Tanpa callback kedua, menghapus elemen "falsy" (0, "", null, false).
## array_reduce: Reduksi ke Satu Nilai
array_reduce($arr, fn($carry, $x) => $carry + $x, 0) — menggabungkan semua elemen menjadi satu nilai. $carry = akumulasi dari iterasi sebelumnya. Berguna untuk total, string penggabungan, dll.
## Sorting & Spaceship
sort($arr) — urutkan ascending (mengubah array asli). usort($arr, fn($a, $b) => $b["skor"] <=> $a["skor"]) — urutkan array asosiatif dengan callback. Operator <=> (spaceship) mengembalikan -1, 0, atau 1 untuk perbandingan.**

---

## Tantangan

Kembangkan array: (1) buat array $transaksi dengan 5 item (nama, jumlah) lalu gunakan array_filter untuk filter yang jumlahnya > 100000, (2) gunakan array_reduce untuk menghitung total semua jumlah, (3) buat array $siswa dengan nilai dan urutkan descending menggunakan usort, (4) gunakan array_map dengan fn untuk mengubah semua nama jadi uppercase.

---

## Ringkasan

array_map = transform. array_filter = saring. array_reduce = reduksi. usort = urutkan. Lanjut: OOP.
