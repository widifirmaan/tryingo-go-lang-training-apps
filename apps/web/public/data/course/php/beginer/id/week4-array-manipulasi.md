# Array & Manipulasi — Rak dan Kartu Warung PHP

> **Kategori:** PHP | **Level:** Pemula | **Minggu 4:** Array & Manipulasi
> **Prasyarat:** Minggu 3 — **Fungsi & Scope**.

## Tujuan Pembelajaran

- Rak urut `["apel","mangga"]` + tambah `$buah[] = "jeruk"`, hitung `count()`, gabung `implode()` (sumber: php.net/language.types.array)
- Kartu label `["nama"=>"Budi"]` akses `$siswa["nama"]`, tambah `$siswa["alamat"] = "Jakarta"`
- Olah rak: `sort()`, `array_filter()`, `array_map()`, `array_sum()`, `max()`/`min()`

---

## Kenapa Ini Penting Buat Kamu?

Warung tidak hanya 1 beras — ada 30 produk dan 100 pelanggan. Tanpa array, tulis `$produk1, $produk2...` 30x. Dengan rak (indexed) dan kartu (associative), **1 variabel untuk semua** + saring "hanya murah" 1 baris.

---

## Program: Rak & Kartu Warung

```php
<?php
// Rak urut (indexed)
$buah = ["apel", "mangga", "pisang"];
$buah[] = "jeruk"; // tambah belakang
echo "Buah: " . implode(", ", $buah) . "\n";
echo "Jumlah: " . count($buah) . "\n";

// Olah angka
$nilai = [85, 92, 78, 90, 88];
echo "Max: " . max($nilai) . ", Rata: " . (array_sum($nilai) / count($nilai)) . "\n";
sort($nilai);
echo "Urut: " . implode(", ", $nilai) . "\n";

// Kartu label (associative)
$pelanggan = ["nama" => "Budi", "umur" => 25, "kota" => "Jakarta"];
echo "Nama: " . $pelanggan["nama"] . "\n";
$pelanggan["hp"] = "08123456789"; // tambah field
unset($pelanggan["umur"]); // hapus field

// Saring & ubah (seperti map/filter JS)
$harga = [10000, 15000, 20000, 25000];
$murah = array_filter($harga, fn($h) => $h < 20000);
$naik = array_map(fn($h) => $h * 1.1, $harga);
echo "Murah: " . implode(", ", $murah) . "\n";
echo "Naik 10%: " . implode(", ", $naik) . "\n";

// Rak 2D: daftar belanja
$keranjang = [
  ["nama" => "Beras", "harga" => 62000],
  ["nama" => "Bayam", "harga" => 5000],
];
foreach ($keranjang as $item) {
  echo $item["nama"] . " Rp " . $item["harga"] . "\n";
}
?>
```

---

## Konsep Kunci

### Indexed vs Associative
- `["apel","mangga"]` urutan 0,1,2. `$buah[] = "jeruk"` tambah belakang.
- `["nama"=>"Budi"]` label. `$p["nama"]` ambil, `unset($p["umur"])` hapus.

### Fungsi Olah Rak
`count()`, `implode(", ",$arr)`, `sort()`, `array_sum()`, `max()`, `array_filter()`, `array_map()`.

---

## Penjelasan untuk Pemula

### Analogi: Rak Buah & Kartu Anggota
- **Indexed = rak berbaris**: nomor 0,1,2. `implode` = rangkai jadi 1 kalimat.
- **Associative = kartu anggota**: label `nama`, bukan nomor.
- **`array_filter` = saringan**: hanya murah lolos.

### Langkah 0 — Siapkan Device
- Sama W1: `php rak.php`.

### Cara Komputer Membaca
1. `$buah[] = "jeruk"` → tambah di belakang, index 3.
2. `array_filter($harga, fn($h) => $h < 20000)` → cek tiap `h`, kumpulkan yang lolos.

### 3 Istilah Wajib
1. **Indexed/associative**: rak/kartu
2. **implode/count**: rangkai/hitung
3. **filter/map**: saring/ubah

---

## Eksperimen

- **Hijau:** `$sayur = ["bayam","kangkung"]; $sayur[] = "sawi"; count($sayur)` → 3?
- **Kuning:** `array_filter($harga, fn($h) => $h >= 20000)` → mahal?
- **Merah:** `$pelanggan["umur"]` setelah `unset` → warning `Undefined array key`? Cek `isset($pelanggan["umur"])` dulu.

---

## Tantangan

**Inventaris Warung:** `$produk = [["nama"=>"Beras","harga"=>62000,"kategori"=>"Sembako"], ... 5 item]` → `array_filter` hanya Sembako → `array_map` ambil `nama` → `implode` cetak → `array_sum(array_column($produk,"harga"))` total.

---

## Glosarium Mini

- **Array indexed/associative**: daftar/kartu
- **implode/explode**: gabung/pecah
- **filter/map**: saring/ubah

---

## Ringkasan

Minggu 4 dari 6: **Array PHP** (Level: Pemula). Bisa rak & kartu + olah. Minggu depan: **OOP** — cetak biru.
