# Sintaks Dasar & Variabel

> **Kategori:** PHP | **Level:** Pemula | **Minggu 1:** Sintaks Dasar & Variabel

## Tujuan Pembelajaran

- Memahami peran PHP sebagai bahasa server-side (PHP Official Docs)
- Menulis tag PHP: <?php ... ?> dan echo untuk output
- Mendeklarasikan variabel dengan $ dan tipe dinamis
- Mengenal tipe dasar: string, int, float, bool, array, NULL
- String interpolation dan concatenation dengan .

---

## Program: Halo, PHP!

```php
<?php
echo "Selamat datang di PHP!<br>";
echo "PHP adalah bahasa server-side populer.<br>";

$nama = "Budi";
$umur = 25;
$tinggi = 175.5;
$aktif = true;

echo "Nama: $nama<br>";
echo "Umur: $umur<br>";
echo "Tinggi: $tinggi<br>";
echo "Aktif: " . ($aktif ? "Ya" : "Tidak") . "<br>";
echo "Tipe: " . gettype($nama) . ", " . gettype($umur) . "<br>";
>
```

---

## Konsep Kunci

### Peran PHP
PHP adalah bahasa scripting server-side yang dirancang untuk web development. Berbeda dengan JS yang jalan di browser, PHP dieksekusi di server — menghasilkan HTML yang dikirim ke klien.

### Sintaks Dasar
Setiap kode PHP dibungkus `<?php ... ?>`. `echo` untuk output. Variabel diawali `$` dengan tipe dinamis.

### Tipe Data
String, Integer, Float, Boolean, Array, NULL. `gettype()` untuk cek tipe.

### String
Double-quote interpolasi: `"Halo $nama"`. Single-quote literal. Concatenate dengan `.`

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Buat operasi aritmatika: +, -, *, /, %
- Coba perbedaan single-quote vs double-quote
- Gunakan gettype() untuk cek berbagai tipe
- Buat konversi tipe: (int), (string), (bool)

---

## Tantangan

Buat program profil siswa: nama, umur, nilai (array), dan status kelulusan. Tampilkan dengan format rapi menggunakan echo.

---

## Ringkasan

Minggu 1 dari 12: **Sintaks Dasar & Variabel** (Level: Pemula). Fondasi PHP dimulai di sini. Minggu depan: **Operator & Control Flow**.
