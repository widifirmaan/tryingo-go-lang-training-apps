# Fungsi & Scope — Resep Warung PHP Pakai Ulang

> **Kategori:** PHP | **Level:** Pemula | **Minggu 3:** Fungsi & Scope
> **Prasyarat:** Minggu 2 — **Operator & Kontrol**.

## Tujuan Pembelajaran

- `function sapa($nama){ return "Halo $nama"; }` tulis sekali, panggil 100x (sumber: php.net/functions)
- `return` kembalikan hasil, default `$nama = "Tamu"`, borong `...$angka` + `array_sum`
- Scope: variabel di dalam fungsi tidak terlihat di luar (kecuali `global`, hindari)

---

## Kenapa Ini Penting Buat Kamu?

Rumus "total + diskon + ongkir" dipakai 30x sehari. Tanpa fungsi, tulis 30x dan 1 typo merusak semua. Dengan `hitungTotal($keranjang, 10)` tulis sekali — ubah rumus cukup 1 tempat.

---

## Program: Dapur Fungsi Warung

```php
<?php
function sapa($nama = "Tamu") {
  return "Halo, $nama! Selamat belanja";
}
echo sapa("Budi") . "\n";
echo sapa() . "\n"; // pakai default "Tamu"

function total(...$angka) {
  return array_sum($angka); // borong jadi array
}
echo "Total: " . total(1, 2, 3, 4, 5) . "\n";

function hitungTotal($belanja, $diskon = 0) {
  $total = 0;
  foreach ($belanja as $item) {
    $total += $item["harga"] * $item["qty"];
  }
  return $total * (1 - $diskon / 100);
}

$keranjang = [
  ["harga" => 62000, "qty" => 1],
  ["harga" => 5000, "qty" => 2],
];
echo "Tanpa diskon: Rp " . number_format(hitungTotal($keranjang), 0, ',', '.') . "\n";
echo "Diskon 10%: Rp " . number_format(hitungTotal($keranjang, 10), 0, ',', '.') . "\n";

// Scope: $total di dalam fungsi beda dengan di luar
$totalLuar = 999;
echo "Luar tetap: $totalLuar\n";
?>
```

---

## Konsep Kunci

### `function` + `return` = Resep + Hidangan
`function hitungTotal($belanja)` terima bahan, `return` antar hidangan. Tanpa `return` → `null`.

### Default & `...` (Variadic)
- `($nama = "Tamu")` jika tidak dikirim pakai cadangan.
- `(...$angka)` tampung semua jadi array.

### Scope = Dinding Dapur
`$total` di dalam `hitungTotal` tidak sama dengan `$totalLuar` — dinding dapur. Jangan `global` kecuali terpaksa.

---

## Penjelasan untuk Pemula

### Analogi: Resep Dapur
- **Fungsi = resep**: tulis "soto: ayam + bumbu → rebus" sekali, masak 100 mangkok `soto($ayam)`.
- **Parameter = bahan**, **return = hidangan**, **default = bumbu cadangan**.

### Langkah 0 — Siapkan Device
- Sama W1: `php -v`, file `dapur.php`, `php dapur.php`.

### Cara Komputer Membaca
1. `hitungTotal($keranjang, 10)` → masuk fungsi, `$belanja` = keranjang, `$diskon` = 10.
2. Loop jumlahkan → `72000 * 0.9 = 64800` → `return` → cetak.

### 3 Istilah Wajib
1. **Fungsi**: resep pakai ulang
2. **Return**: hasil kembalikan
3. **Scope**: wilayah variabel

---

## Eksperimen

- **Hijau:** `sapa("Siti")` → apa? `total(10, 20)` → 30?
- **Kuning:** `hitungTotal($keranjang, 20)` diskon 20% → berapa?
- **Merah:** Lupa `return` di `sapa` → cetak kosong (`null`). Tambah `return`.

---

## Tantangan

**Struk Lengkap:** Buat `subtotal($keranjang)`, `ongkir($berat, $jarak)`, `cetakStruk($keranjang, $berat, $jarak)` yang gabung ketiganya + `sapa($nama)` → return string struk. Panggil 2 keranjang beda.

---

## Glosarium Mini

- **function/return**: resep/hasil
- **default/...**: cadangan/borong
- **scope**: dinding dapur

---

## Ringkasan

Minggu 3 dari 6: **Fungsi PHP** (Level: Pemula). Punya resep pakai ulang. Minggu depan: **Array** — rak dinamis.
