# Variabel, Tipe Data & Type Casting

> PHP | Pelajaran 2

## Tujuan Pembelajaran

- Membuat variabel dengan $ dan memahami aturan penamaan\n- Mengenal tipe data: string, integer, float, boolean\n- Menggunakan var_dump() untuk debug tipe variabel\n- Memahami type juggling dan type casting eksplisit

---

## Program: Variabel, Tipe Data & Type Casting

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

## Penjelasan

## Variabel: Simpan Data
Variabel PHP diawali $ (contoh: $nama). Nama variabel dimulai huruf atau _, diikuti huruf/angka/_. PHP tidak mendeklarasikan tipe variabel — tipe ditentukan otomatis berdasarkan nilai yang diberikan (type juggling).
## Tipe Data Primitif
string = teks ("Hello"), integer = bilangan bulat (25), float = bilangan desimal (19999.50), boolean = true/false.
## var_dump(): Debug Tipe
var_dump($variabel) mencetak tipe DAN nilai variabel. Berguna untuk memastikan data bertipe sesuai harapan.
## Type Casting
(int) "25" → integer 25. (string) 25 → "25". (bool) 0 → false, (bool) "hello" → true. Cast eksplisit mengubah tipe dengan aman.

---

## Eksperimen

1. **## Variabel: Simpan Data
Variabel PHP diawali $ (contoh: $nama). Nama variabel dimulai huruf atau _, diikuti huruf/angka/_. PHP tidak mendeklarasikan tipe variabel — tipe ditentukan otomatis berdasarkan nilai yang diberikan (type juggling).
## Tipe Data Primitif
string = teks ("Hello"), integer = bilangan bulat (25), float = bilangan desimal (19999.50), boolean = true/false.
## var_dump(): Debug Tipe
var_dump($variabel) mencetak tipe DAN nilai variabel. Berguna untuk memastikan data bertipe sesuai harapan.
## Type Casting
(int) "25" → integer 25. (string) 25 → "25". (bool) 0 → false, (bool) "hello" → true. Cast eksplisit mengubah tipe dengan aman.**

---

## Tantangan

Latih variabel: (1) buat 3 variabel: $nama (string), $nilai (integer), $lulus (boolean), lalu cetak dengan echo "Nama: $nama, Nilai: $nilai, Lulus: " . ($lulus ? "Ya" : "Tidak"), (2) ubah $nilai dari string "90" ke integer dengan (int), (3) coba jumlahkan string "5" + integer 3 dan amati hasilnya dengan var_dump, (4) buat variabel $harga = 50000 lalu cetak dengan number_format($harga, 0, ",", ".") untuk format Rupiah.

---

## Ringkasan

Variabel = simpan data. var_dump = debug tipe. Type casting = ubah tipe. Lanjut: string & array.
