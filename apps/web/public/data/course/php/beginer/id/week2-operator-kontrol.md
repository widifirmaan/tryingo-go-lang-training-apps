# Operator & Kontrol — Cabang dan Timbangan Warung PHP

> **Kategori:** PHP | **Level:** Pemula | **Minggu 2:** Operator & Kontrol
> **Prasyarat:** Minggu 1 — **Sintaks Dasar PHP**.

## Tujuan Pembelajaran

- Hitung `+ - * / % **` dan gabung teks `.` titik (sumber: php.net/manual/language.operators)
- Bedakan `==` longgar vs `===` ketat — `"62.000" == 62000` true tapi `===` false (sumber: php.net type-juggling)
- Cabang `if / elseif / else`, `switch` dengan `break`, ulang `for`, `while`, `foreach` untuk array (sumber: php.net control-structures)

---

## Kenapa Ini Penting Buat Kamu?

Kasir warung tiap transaksi putuskan: **jika total > 100rb → gratis ongkir, jika stok 0 → "Habis"**. Tanpa `if`, tulis manual tiap kasus. Tanpa `foreach`, hitung 30 barang satu per satu. `==` vs `===` salah paham → `"0" == false` true, diskon bocor!

---

## Program: Kasir Otomatis Warung

Simpan `kasir.php` → `php kasir.php` atau `php -S localhost:8000` → buka browser.

```php
<?php
$nilai = 85;
if ($nilai >= 90) echo "Grade A";
elseif ($nilai >= 80) echo "Grade B";
else echo "Grade C";
echo "\n";

// Hati-hati == vs === (PHP juggling!)
$harga = "62000";
if ($harga == 62000) echo "== cocok (longgar)\n";
if ($harga === 62000) echo "=== cocok\n"; else echo "=== TIDAK cocok (ketat: string vs int)\n";

$hari = "Jumat";
switch ($hari) {
  case "Jumat": echo "Besok libur!\n"; break;
  case "Senin": echo "Semangat!\n"; break;
  default: echo "Hari kerja\n";
}

echo "Hitung: ";
for ($i = 1; $i <= 5; $i++) echo "$i ";
echo "\n";

$buah = ["apel", "mangga", "pisang"];
foreach ($buah as $no => $b) echo "$no: $b\n";

// Nyata: total keranjang yang stok ada
$keranjang = [
  ["nama"=>"Beras", "harga"=>62000, "ada"=>true],
  ["nama"=>"Gula", "harga"=>15000, "ada"=>false],
  ["nama"=>"Minyak", "harga"=>34000, "ada"=>true],
];
$total = 0;
foreach ($keranjang as $item) {
  if (!$item["ada"]) continue;
  $total += $item["harga"];
}
echo "Total yang bisa dibeli: Rp " . number_format($total, 0, ',', '.') . "\n";
?>
```

---

## Konsep Kunci

### `.` Gabung Teks (Bukan `+`)
`"Halo " . $nama` — `+` di PHP untuk angka, jangan gabung teks pakai `+`.

### `==` vs `===` (Juggling)
- `==` longgar: `"62000" == 62000` → true (PHP ubah tipe otomatis).
- `===` ketat: tipe + nilai harus sama. **Untuk uang & password, selalu `===`.**

### `elseif` Satu Kata
PHP pakai `elseif` (atau `else if` juga bisa, tapi `elseif` idiomatik).

### `foreach` = Cek Rak
`foreach ($buah as $b)` langsung barang, `foreach ($buah as $i => $b)` dengan nomor.

---

## Penjelasan untuk Pemula

### Analogi: Timbangan & Satpam
- **`if` = satpam**: "Jika total ≥100rb, gratis ongkir."
- **`switch` = papan hari**: Senin A, Jumat B.
- **`foreach` = cek rak**: ambil tiap barang, timbang.

### Langkah 0 — Siapkan Device
- Sama W1: `php -v` 8.1+, file `kasir.php`, `php kasir.php`.

### Cara Komputer Membaca
1. `if ($nilai >= 90)` → 85>=90? tidak → `elseif (85>=80)` ya → cetak B → stop.
2. `foreach ($keranjang as $item)` → 3x loop, `continue` loncat yang `ada=false`.

### 3 Istilah Wajib
1. **Kondisi**: pertanyaan ya/tidak
2. **Loop**: ulang otomatis
3. **Juggling**: PHP ubah tipe diam-diam (waspada `==`)

---

## Eksperimen

- **Hijau:** `$nilai = 95` → grade? `$hari = "Senin"` → apa?
- **Kuning:** `"0" == false` → true? `"0" === false` → false? Coba!
- **Merah:** Hapus `break` di `switch` Jumat → bocor cetak 2 baris? Pasang lagi.

---

## Tantangan

**Diskon Otomatis:** `$total = 120000; if ($total >= 100000) $diskon = $total*0.1; elseif ($total >= 50000) $diskon = $total*0.05; else $diskon = 0;` → cetak `Diskon Rp ... Bayar Rp ...` dengan `number_format`. Tambah `foreach` 5 barang hitung total dulu.
- **Sambungan (Minggu 1 — Sintaks Dasar PHP):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **if/elseif/switch**: cabang
- **for/foreach/while**: ulang
- **==/===**: longgar/ketat

---

## Ringkasan

Minggu 2 dari 6: **Kontrol PHP** (Level: Pemula). Bisa cabang, ulang, dan waspada `==`. Minggu depan: **Fungsi** — resep pakai ulang.
