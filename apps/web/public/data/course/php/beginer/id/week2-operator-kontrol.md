# Operator & Control Flow

> **Kategori:** PHP | **Level:** Pemula | **Minggu 2:** Operator & Control Flow

## Tujuan Pembelajaran

- Operator aritmatika: +, -, *, /, %, ** (power)
- Operator perbandingan: ==, ===, !=, !==, <, >, <=, >=
- Operator logika: &&, ||, !, and, or, xor
- Control flow: if, elseif, else untuk percabangan
- Loop: for, while, do-while, dan switch case

---

## Program: Sistem Grade

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

## Konsep Kunci

### Operator Aritmatika
`+` tambah, `-` kurang, `*` kali, `/` bagi, `%` modulo, `**` power (PHP 5.6+).

### Perbandingan & Logika
`==` equals, `===` identical (tipe sama), `&&` AND, `||` OR, `!` NOT.

### Control Flow
`if/elseif/else` untuk percabangan. Ternary: `? :` untuk kondisi pendek.

### Loop
`for` untuk iterasi terhitung, `while` untuk kondisi, `switch` untuk multiple branch.

---

## Eksperimen

- Ubah nilai dan lihat grade berubah
- Buat nested if untuk validasi multi-kondisi
- Coba for loop dengan break dan continue
- Ganti switch dengan if/else — mana lebih readable?
- Gunakan null coalescing operator ?? untuk default value

---

## Tantangan

Buat kalkulator sederhana dengan switch case: tambah, kurang, kali, bagi. Validasi pembagian dengan nol.

---

## Ringkasan

Minggu 2 dari 12: **Operator & Control Flow** (Level: Pemula). Logika program dibangun di sini. Minggu depan: **Fungsi & Lingkup Variabel**.
