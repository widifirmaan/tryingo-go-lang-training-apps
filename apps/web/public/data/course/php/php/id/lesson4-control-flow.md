# Control Flow: if, Loop, Match

> PHP | Pelajaran 4

## Tujuan Pembelajaran

- Menggunakan if/elseif/else untuk pengambilan keputusan\n- Menguasai perulangan for dan foreach\n- Menggunakan switch untuk beberapa kondisi\n- Memahami ternary operator untuk kondisi singkat

---

## Program: Control Flow: if, Loop, Match

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

## Penjelasan

## if/elseif/else: Cabang Kondisi
if ($kondisi) { ... } menjalankan blok jika benar. elseif menambah cabang. else untuk semua kasus lain. Kondisi menghasilkan boolean: perbandingan (>=, ===, !=), fungsi (empty, isset), ekspresi.
## for & foreach: Perulangan
for ($i = 1; $i <= 5; $i++) — ulangi dengan counter. foreach ($arr as $val) — ulangi setiap elemen array. foreach ($arr as $k => $v) — dengan kunci. break keluar dari loop; continue lanjut ke iterasi berikutnya.
## switch: Banyak Cabang
switch ($nilai) { case 1: ... break; ... default: ... } — lebih rapi dari if/elseif bertumpuk. break wajib di setiap case (atau gunakan return). default untuk kasus tak cocok.
## Ternary & Null Coalescing
$status = $nilai >= 70 ? "Lulus" : "Tidak Lulus" — if/else satu baris. $nama = $_GET['nama'] ?? 'Tamu' — null coalescing: gunakan kanan jika kiri null/undefined. Operator ?? sangat berguna untuk input GET/POST.

---

## Eksperimen

1. **## if/elseif/else: Cabang Kondisi
if ($kondisi) { ... } menjalankan blok jika benar. elseif menambah cabang. else untuk semua kasus lain. Kondisi menghasilkan boolean: perbandingan (>=, ===, !=), fungsi (empty, isset), ekspresi.
## for & foreach: Perulangan
for ($i = 1; $i <= 5; $i++) — ulangi dengan counter. foreach ($arr as $val) — ulangi setiap elemen array. foreach ($arr as $k => $v) — dengan kunci. break keluar dari loop; continue lanjut ke iterasi berikutnya.
## switch: Banyak Cabang
switch ($nilai) { case 1: ... break; ... default: ... } — lebih rapi dari if/elseif bertumpuk. break wajib di setiap case (atau gunakan return). default untuk kasus tak cocok.
## Ternary & Null Coalescing
$status = $nilai >= 70 ? "Lulus" : "Tidak Lulus" — if/else satu baris. $nama = $_GET['nama'] ?? 'Tamu' — null coalescing: gunakan kanan jika kiri null/undefined. Operator ?? sangat berguna untuk input GET/POST.**

---

## Tantangan

Kontrol alur lanjutan: (1) buat perulangan for yang mencetak tabel perkalian 1-10, (2) buat array $nilaiSiswa = [75, 82, 90, 60, 88] dan gunakan foreach + if untuk mengelompokkan jadi 2 array: $lulus dan $tidakLulus, (3) buat switch untuk hari kerja (1-5 = "Hari Kerja", 6-7 = "Weekend") dan cetak pesan berbeda, (4) gunakan ternary nested untuk grade: >=90 "A", >=80 "B", >=70 "C", lainnya "D".

---

## Ringkasan

if = keputusan. for/foreach = perulangan. switch = banyak cabang. Ternary = singkat. Lanjut: fungsi.
