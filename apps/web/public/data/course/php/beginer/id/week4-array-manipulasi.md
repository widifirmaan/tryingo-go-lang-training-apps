# Array & Manipulasi

> **Kategori:** PHP | **Level:** Pemula | **Minggu 4:** Array & Manipulasi

## Tujuan Pembelajaran

- Indexed array: array dengan index numerik
- Associative array: array dengan key string
- Array manipulation: sort, array_filter, array_map, array_reduce
- Multi-dimensional array untuk data kompleks
- Loop array dengan foreach dan iterasi nested

---

## Program: Manajemen Data

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

## Konsep Kunci

### Indexed & Associative
`["a", "b"]` index numerik. `["key" => "val"]` key string.

### Fungsi Array
`sort()` urutkan, `array_filter()` filter, `array_map()` transformasi, `array_reduce()` gabung.

### Multi-dimensional
Array di dalam array: `[[1,2], [3,4]]` untuk matrix atau data tabel.

### Foreach
`foreach ($arr as $key => $value)` — cara utama iterasi array di PHP.

---

## Eksperimen

- Buat array_merge untuk gabungkan 2 array
- Coba array_unique untuk hapus duplikat
- Gunakan array_slice untuk ambil sebagian
- Implementasikan nested loop untuk matrix multiplication
- Buat fungsi flatten untuk nested array

---

## Tantangan

Buat sistem inventory: tambah/hapus produk (associative array), urutkan berdasarkan harga, filter berdasarkan kategori.

---

## Ringkasan

Minggu 4 dari 12: **Array & Manipulasi** (Level: Pemula). Struktur data utama PHP. Minggu depan: **Object-Oriented Programming**.
