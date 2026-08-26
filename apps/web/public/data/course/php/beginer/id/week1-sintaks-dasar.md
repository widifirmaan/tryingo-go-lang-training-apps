# Sintaks Dasar PHP — Buku Kas Warung yang Jalan di Server

> **Kategori:** PHP | **Level:** Pemula | **Minggu 1:** Sintaks Dasar

## Tujuan Pembelajaran

- Instal PHP `php -v`, `php -S localhost:8000`, file `index.php` diawali `<?php`
- Variabel `$nama = "Budi"` (wajib `$`), tipe `string/int/float/bool`, `echo` cetak
- Gabung `"."` titik, interpolasi `"Halo $nama"` dan `"Halo {$nama}"`
- `var_dump` cek tipe

---

## Kenapa Ini Penting Buat Kamu?

PHP = bahasa warung online paling banyak (WordPress, toko). Jalan di server, bukan browser — `<?php echo "Halo"; ?>` jadi HTML. Hari ini bikin struk `<?php $total = 62000*2; echo "Rp $total"; ?>`.

---

## Program: Struk PHP Pertama

Simpan `struk.php`

```php
<?php
$namaWarung = "Warung Bu Siti";
$pelanggan = "Budi";
$berasKg = 2;
$hargaPerKg = 12500;
$total = $berasKg * $hargaPerKg;

echo "Warung: $namaWarung <br>";
echo "Pelanggan: $pelanggan <br>";
echo "Total: Rp " . number_format($total, 0, ',', '.') . "<br>";

echo "<br>=== Cek Tipe ===<br>";
var_dump($namaWarung); // string
var_dump($berasKg);    // int
var_dump($total);      // int

$pesan = "Halo $pelanggan, totalmu Rp " . number_format($total, 0, ',', '.');
echo "<br>$pesan<br>";

$pelanggan = "Siti";
$total += 5000;
echo "Setelah ganti: $pelanggan, Total baru: Rp " . number_format($total, 0, ',', '.');
?>
```

**Jalankan:**
- Tanpa server: `php struk.php` di Terminal
- Dengan server: `php -S localhost:8000` → buka `http://localhost:8000/struk.php`

---

## Konsep Kunci

### `<?php` + `$` Wajib
Tiap file PHP diawali `<?php`, tiap variabel `$nama`. Lupa `$` → error.

### `echo` + `.` Gabung
`echo "Halo $nama"` interpolasi, `"Halo " . $nama` titik. `number_format(62000)` → `62.000`.

### `var_dump` Cek
`var_dump($total)` tampil `int(124000)`.

---

## Penjelasan untuk Pemula

### Analogi: Buku Kas Server
- **PHP = buku kas di gudang (server)**, `echo` kirim hasil ke etalase (browser).
- **`$` = label harga**: tiap kotak harus `$`.

---

## Tantangan

**Ongkir PHP:** `$berat=2.5; $jarak=8; $ongkir = $berat*5000 + $jarak*2000; echo "Rp " . number_format($ongkir);` + `var_dump($ongkir)`.

---

## Ringkasan

Minggu 1: **Sintaks PHP** — `$` dan `echo`. Minggu depan: **Operator & Kontrol**.
