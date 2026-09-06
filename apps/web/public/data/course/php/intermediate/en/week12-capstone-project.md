# Capstone: Warung PHP Lengkap — Toko Online Jadi

> **Kategori:** PHP | **Level:** Menengah | **Minggu 12:** Capstone: Aplikasi Blog

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

## Tantangan

**Grand Opening Warung PHP:** CRUD jalan + satpam (XSS/SQLi gagal) + PHPUnit 5 hijau + screenshot. **Selesai PHP 0→Ahli!** 🎉

---

## Glosarium Mini

- **Capstone**: gabung semua

---

## Ringkasan

Minggu 12 dari 12: **Grand Opening** (Level: Menengah). **Selesai PHP 0→Ahli dari nol!** 🎉
