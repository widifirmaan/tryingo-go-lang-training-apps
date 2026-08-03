# String & Array

> PHP | Pelajaran 3

## Tujuan Pembelajaran

- Menguasai fungsi string: strlen, strtoupper, substr, strpos\n- Membuat dan mengakses array indexed & associative\n- Menambahkan elemen array dengan [] dan foreach untuk iterasi\n- Memahami perbedaan string interpolation dengan concatenation (.)

---

## Program: String & Array

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

## Penjelasan

## String Functions
strlen($s) = panjang string. strtoupper/strtolower = ubah huruf besar/kecil. substr($s, 0, 5) = potong 5 karakter pertama. strpos($s, "Tryngo") = posisi substring (atau false jika tidak ditemukan).
## Array: Daftar Terurut
$arr = ["a", "b", "c"] — array indexed (kunci 0, 1, 2). $arr[] = "d" — tambah elemen di akhir. count($arr) = jumlah elemen. foreach ($arr as $val) — loop tanpa kunci. foreach ($arr as $k => $v) — loop dengan kunci.
## Array Asosiatif
$data = ["nama" => "Budi", "umur" => 25] — kunci string, bukan angka. Akses: $data["nama"]. Cocok untuk menyimpan record sebagai array PHP biasa.
## Interpolasi vs Concatenation
"Halo, $nama!" — PHP mengganti $nama di dalam double-quoted string. 'Halo, $nama!' — di single-quoted string, $nama TIDAK diganti (literal). Untuk objek/properti: "Nama: " . $user->nama (concatenation) atau "Nama: {$user->nama}" (interpolasi kurung kurawal).

---

## Eksperimen

1. **## String Functions
strlen($s) = panjang string. strtoupper/strtolower = ubah huruf besar/kecil. substr($s, 0, 5) = potong 5 karakter pertama. strpos($s, "Tryngo") = posisi substring (atau false jika tidak ditemukan).
## Array: Daftar Terurut
$arr = ["a", "b", "c"] — array indexed (kunci 0, 1, 2). $arr[] = "d" — tambah elemen di akhir. count($arr) = jumlah elemen. foreach ($arr as $val) — loop tanpa kunci. foreach ($arr as $k => $v) — loop dengan kunci.
## Array Asosiatif
$data = ["nama" => "Budi", "umur" => 25] — kunci string, bukan angka. Akses: $data["nama"]. Cocok untuk menyimpan record sebagai array PHP biasa.
## Interpolasi vs Concatenation
"Halo, $nama!" — PHP mengganti $nama di dalam double-quoted string. 'Halo, $nama!' — di single-quoted string, $nama TIDAK diganti (literal). Untuk objek/properti: "Nama: " . $user->nama (concatenation) atau "Nama: {$user->nama}" (interpolasi kurung kurawal).**

---

## Tantangan

Kembangkan string & array: (1) buat array $siswa dengan 3 nama, lalu cetak "Selamat datang, [nama]!" untuk setiap siswa menggunakan foreach, (2) buat string $kalimat = "Belajar PHP itu menyenangkan" dan gunakan strpos untuk mencari posisi kata "menyenangkan", (3) buat array asosiatif $mobil dengan kunci "merk", "tahun", "warna" lalu cetak semua nilainya, (4) ubah semua huruf di $kalimat menjadi uppercase dengan strtoupper dan cetak.

---

## Ringkasan

String = fungsi manipulasi teks. Array = daftar terurut & asosiatif. foreach = iterasi. Lanjut: control flow.
