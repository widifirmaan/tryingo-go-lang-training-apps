# File I/O & JSON

> PHP | Pelajaran 10

## Tujuan Pembelajaran

- Membaca dan menulis file dengan file_get_contents / file_put_contents\n- Mengenkode dan mendecode JSON (json_encode / json_decode)\n- Membaca file per baris dengan file()\n- Menambahkan ke file secara append dengan FILE_APPEND

---

## Program: File I/O & JSON

```php
<?php

$data = ["nama" => "Tryngo", "kota" => "Jakarta", "tags" => ["php", "web", "backend"]];

$json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
echo "JSON:\n" . $json . "\n\n";

file_put_contents("data.json", $json);

$isi = file_get_contents("data.json");
$decode = json_decode($isi, true);

echo "Dibaca dari file: " . $decode["nama"] . "\n";

$lines = file("data.json");
echo "Baris: " . count($lines) . "\n";

file_put_contents("log.txt", "[" . date("Y-m-d H:i:s") . "] Data diakses\n", FILE_APPEND);

```

---

## Penjelasan

## file_get_contents / file_put_contents
file_get_contents($path) = baca seluruh file menjadi string. file_put_contents($path, $data) = tulis string ke file (overwrite). Opsi: FILE_APPEND untuk tambah, LOCK_EX untuk exclusive lock.
## json_encode / json_decode
json_encode($data) = array/object ke JSON string. JSON_PRETTY_PRINT = format rapi. JSON_UNESCAPED_SLASHES = jangan escape /. json_decode($json, true) = JSON ke array asosiatif (tanpa true = jadi object stdClass).
## file() & fwrite
file($path) = baca per baris (array). fopen/fwrite/fclose = kontrol lebih halus (tulis per baris, baca per chunk). Selalu tutup file dengan fclose atau gunakan file_put_contents untuk operasi sederhana.
## Keamanan File
Jangan percaya nama file dari input user (path traversal: ../../etc/passwd). Gunakan basename() untuk sanitasi. Untuk produksi: batasi direktori dan gunakan is_writable() untuk cek.

---

## Eksperimen

1. **## file_get_contents / file_put_contents
file_get_contents($path) = baca seluruh file menjadi string. file_put_contents($path, $data) = tulis string ke file (overwrite). Opsi: FILE_APPEND untuk tambah, LOCK_EX untuk exclusive lock.
## json_encode / json_decode
json_encode($data) = array/object ke JSON string. JSON_PRETTY_PRINT = format rapi. JSON_UNESCAPED_SLASHES = jangan escape /. json_decode($json, true) = JSON ke array asosiatif (tanpa true = jadi object stdClass).
## file() & fwrite
file($path) = baca per baris (array). fopen/fwrite/fclose = kontrol lebih halus (tulis per baris, baca per chunk). Selalu tutup file dengan fclose atau gunakan file_put_contents untuk operasi sederhana.
## Keamanan File
Jangan percaya nama file dari input user (path traversal: ../../etc/passwd). Gunakan basename() untuk sanitasi. Untuk produksi: batasi direktori dan gunakan is_writable() untuk cek.**

---

## Tantangan

Kembangkan file I/O: (1) buat program sederhana: baca data.json, tambah item baru (nama, harga), tulis ulang ke data.json, (2) buat CSV exporter: array of data ke file .csv dengan fputcsv, (3) buat log viewer baca log.txt dan tampilkan per baris di HTML dengan nl2br, (4) tambah validasi: cek apakah data.json ada sebelum dibaca (file_exists) dan tampilkan pesan error jika tidak.

---

## Ringkasan

file_get_contents = baca. file_put_contents = tulis. json_encode/decode = pertukaran data. Lanjut: PDO database.
