# Fungsi & Parameter

> PHP | Pelajaran 5

## Tujuan Pembelajaran

- Membuat fungsi dengan parameter dan nilai kembalian (return)\n- Memahami parameter default dan parameter opsional\n- Menggunakan arrow functions (fn) untuk fungsi singkat\n- Mengenal match expression sebagai pengganti switch

---

## Program: Fungsi & Parameter

```php
<?php

function salam($nama) {
    return "Halo, " . $nama . "!";
}

echo salam("Budi");

function hitung($a, $b, $operasi = "tambah") {
    return match($operasi) {
        "tambah" => $a + $b,
        "kurang" => $a - $b,
        "kali" => $a * $b,
        default => 0,
    };
}

echo hitung(10, 5) . "\n";
echo hitung(10, 5, "kurang") . "\n";

$fn = fn($x) => $x * 2;
echo $fn(7);

```

---

## Penjelasan

## Fungsi: Kode yang Dapat Digunakan Kembali
function nama($param1, $param2 = default) { return ...; } — mendefinisikan fungsi. return mengembalikan nilai ke pemanggil. Fungsi dipanggil dengan nama($argumen). Parameter default: hitung($a, $b, "tambah") — "tambah" otomatis jika tidak diberikan.
## return vs echo
return mengembalikan nilai ke kode pemanggil (bisa disimpan di variabel). echo mencetak langsung ke output. Gunakan return untuk fungsi yang menghitung, echo untuk mencetak. return menghentikan eksekusi fungsi seketika.
## Arrow Functions (fn)
$fn = fn($x) => $x * 2; — fungsi satu baris tanpa kata kunci function. Cocok untuk callback pendek (array_map, array_filter). $x => $x * 2 — parameter tunggal tanpa kurung.
## match Expression
match ($ekspresi) { "k1" => hasil1, "k2" => hasil2, default => hasilDefault } — mirip switch tapi lebih ketat (tidak perlu break, pencocokan ketat ===). match mengembalikan nilai (bukan statement).

---

## Eksperimen

1. **## Fungsi: Kode yang Dapat Digunakan Kembali
function nama($param1, $param2 = default) { return ...; } — mendefinisikan fungsi. return mengembalikan nilai ke pemanggil. Fungsi dipanggil dengan nama($argumen). Parameter default: hitung($a, $b, "tambah") — "tambah" otomatis jika tidak diberikan.
## return vs echo
return mengembalikan nilai ke kode pemanggil (bisa disimpan di variabel). echo mencetak langsung ke output. Gunakan return untuk fungsi yang menghitung, echo untuk mencetak. return menghentikan eksekusi fungsi seketika.
## Arrow Functions (fn)
$fn = fn($x) => $x * 2; — fungsi satu baris tanpa kata kunci function. Cocok untuk callback pendek (array_map, array_filter). $x => $x * 2 — parameter tunggal tanpa kurung.
## match Expression
match ($ekspresi) { "k1" => hasil1, "k2" => hasil2, default => hasilDefault } — mirip switch tapi lebih ketat (tidak perlu break, pencocokan ketat ===). match mengembalikan nilai (bukan statement).**

---

## Tantangan

Latih fungsi: (1) buat fungsi hitungLuasPersegiPanjang($panjang, $lebar) yang mengembalikan luas, (2) buat fungsi faktorial($n) rekursif dan panggil untuk 5, (3) gunakan array_map dengan arrow function untuk menggandakan semua elemen array [1,2,3,4,5], (4) buat fungsi formatRupiah($angka) yang mengembalikan string "Rp 1.000.000" menggunakan number_format.

---

## Ringkasan

function = kode dapat dipakai ulang. return = kembalikan nilai. match = switch modern. fn = arrow function. Lanjut: array lanjutan.
