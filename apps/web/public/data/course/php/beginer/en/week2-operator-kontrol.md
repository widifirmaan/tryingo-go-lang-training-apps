# Operator & Kontrol — Cabang dan Timbangan

> **Kategori:** PHP | **Level:** Pemula | **Minggu 2:** Operator & Kontrol

## Tujuan Pembelajaran

- `+ - * / % **` hitung, `.` gabung, `==` vs `===` (PHP `==` longgar, `===` ketat)
- `if / elseif / else`, `switch`, `for`, `while`, `foreach` untuk array

---

## Program

```php
<?php
$nilai = 85;
if ($nilai >= 90) echo "A";
elseif ($nilai >= 80) echo "B";
else echo "C";

$hari = "Jumat";
switch ($hari) {
  case "Jumat": echo "Besok libur"; break;
  default: echo "Kerja";
}

for ($i=1; $i<=5; $i++) echo "$i ";
$buah = ["apel","mangga"];
foreach ($buah as $b) echo "$b ";
$keranjang = [["Beras",62000,true],["Gula",15000,false]];
$total=0; foreach($keranjang as $item) if($item[2]) $total+=$item[1];
echo "Total beli: $total";
?>
```

---

## Ringkasan

Minggu 2: **Kontrol PHP** — `if` dan `foreach` untuk keranjang.
