# Capstone: Warung PHP Lengkap — Toko Online Jadi

> **Kategori:** PHP | **Level:** Menengah | **Minggu 12:** Capstone: Aplikasi Blog
> **Prasyarat:** Minggu 11 — **Design Patterns**.

## Tujuan Pembelajaran

- Gabung W1-W11: `OOP` kartu + `PDO` gudang + `Composer` alat + `PHPUnit` uji + `satpam` jadi toko `produk` CRUD + `deploy`

---

## Kenapa Ini Penting Buat Kamu?

11 minggu terpisah — capstone buktikan gabung jadi produk nyata yang bisa dibuka HP + lulus uji. Ini portfolio "PHP production-ready".

---

## Program: Toko Warung Capstone (Struktur)

```
warung/
  composer.json (autoload App\ → src/)
  public/index.php (pintu: route ?halaman=)
  src/Produk.php (OOP kartu)
  src/Keranjang.php (OOP + PDO simpan)
  tests/WarungTest.php (PHPUnit 5 test)
```

```php
// public/index.php — pintu + satpam + gudang
<?php
require __DIR__ . "/../vendor/autoload.php";
$pdo = new PDO("mysql:host=localhost;dbname=warung;charset=utf8mb4", "root", "",
  [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

$halaman = $_GET["halaman"] ?? "daftar";
if ($halaman === "daftar") {
  $stmt = $pdo->query("SELECT * FROM produk ORDER BY nama");
  foreach ($stmt as $p) echo "<div>" . htmlspecialchars($p["nama"]) . " Rp" . $p["harga"] . "</div>";
} elseif ($halaman === "tambah" && $_SERVER["REQUEST_METHOD"] === "POST") {
  $nama = trim($_POST["nama"] ?? "");
  if ($nama === "" || (int)$_POST["harga"] <= 0) die("Data salah");
  $ins = $pdo->prepare("INSERT INTO produk (nama, harga) VALUES (?, ?)");
  $ins->execute([$nama, (int)$_POST["harga"]]);
  header("Location: ?halaman=daftar");
}
?>
<form method="post" action="?halaman=tambah">
  <input name="nama" required> <input name="harga" type="number" min="1" required>
  <button>Tambah</button>
</form>
```

```bash
php -S localhost:8000 -t public
./vendor/bin/phpunit tests  # HIJAU 5/5?
```

---

## Konsep Kunci

### Capstone = Gabung 11 Minggu
OOP + PDO + Composer + uji + satpam = 1 toko.

---

## Penjelasan untuk Pemula

### Analogi: Grand Opening
- **W1-W6 fondasi** + **W7-W11 mesin** = toko. **W12 = buka**.

### 3 Istilah Wajib
1. **Capstone/deploy**: gabung/buka

---

## Eksperimen

- **Hijau:** Jalankan apa adanya, lalu ubah nilai `pdo` → output ikut berubah?
- **Kuning:** Ubah huruf besar-kecil `pdo` dan `halaman` → masih jalan atau error?
- **Merah:** Salah ketik 1 huruf pada `pdo` → pesan error apa? Betulkan.

## Tantangan

**Grand Opening Warung PHP:** CRUD jalan + satpam (XSS/SQLi gagal) + PHPUnit 5 hijau + screenshot. **Selesai PHP 0→Ahli!** 🎉

---
- **Checklist integrasi:** **Sintaks Dasar PHP** (Minggu 1) + **Operator & Kontrol** (Minggu 2) + **Fungsi & Scope** (Minggu 3) + **Array & Manipulasi** (Minggu 4) + **OOP Dasar** (Minggu 5) + **Form Handling** (Minggu 6) + **Keamanan PHP** (Minggu 7) + **PDO Database** (Minggu 8) + **Composer & Autoloading** (Minggu 9) + **Testing PHPUnit** (Minggu 10) + **Design Patterns** (Minggu 11) → semua bagian di atas jalan bareng saat grand opening.
## Glosarium Mini

- **Capstone**: gabung semua

---

## Ringkasan

Minggu 12 dari 12: **Grand Opening** (Level: Menengah). **Selesai PHP 0→Ahli dari nol!** 🎉
