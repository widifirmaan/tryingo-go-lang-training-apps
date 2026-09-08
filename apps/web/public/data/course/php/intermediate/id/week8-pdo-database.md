# PDO Database — Supir Gudang PHP Beneran

> **Kategori:** PHP | **Level:** Menengah | **Minggu 8:** PDO & Database

## Tujuan Pembelajaran

- `new PDO("mysql:host=...;dbname=warung", "root", "")` sambung + `ERRMODE_EXCEPTION` (sumber: php.net/pdo)
- `query()` untuk tetap, `prepare()` + `execute()` untuk ada input user, `fetchAll()` ambil

---

## Kenapa Ini Penting Buat Kamu?

Simulasi array hilang saat restart. PDO + MySQL beneran = data awet + bisa jutaan baris. 1 supir PDO untuk MySQL/Postgres/SQLite (ganti DSN saja).

---

## Program: Gudang PDO Beneran

```php
<?php
try {
  $pdo = new PDO(
    "mysql:host=localhost;dbname=warung;charset=utf8mb4",
    "root", "",
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION] // error jadi exception!
  );
} catch (PDOException $e) {
  die("Gagal sambung: " . $e->getMessage());
}

// Tetap (tanpa input user): query langsung
foreach ($pdo->query("SELECT nama, harga FROM produk WHERE stok > 5") as $row) {
  echo $row["nama"] . " Rp" . $row["harga"] . "\n";
}

// Ada input user: WAJIB prepare!
$cari = $_GET["cari"] ?? "";
$stmt = $pdo->prepare("SELECT * FROM produk WHERE nama LIKE ?");
$stmt->execute(["%$cari%"]);
$hasil = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo "Ketemu: " . count($hasil) . "\n";

// Tulis
$ins = $pdo->prepare("INSERT INTO produk (nama, harga, stok) VALUES (?, ?, ?)");
$ins->execute(["Kopi", 12000, 7]);
echo "ID baru: " . $pdo->lastInsertId() . "\n";
?>
```

---

## Konsep Kunci

### `new PDO(dsn, user, pass)` = Sambung Gudang
`mysql:host=...;dbname=...` alamat. `ERRMODE_EXCEPTION` agar error meledak (jangan diam!).

### `query()` vs `prepare()` = Tetap vs Ada-Tamu
Tetap → `query`. Ada input user → `prepare` + `?`.

### `fetchAll()` / `lastInsertId()` = Ambil Semua / ID Baru

### `try/catch` = Jaring (dipakai di atas — kini dijelaskan!)
```php
try {
  $pdo = new PDO(/* ... */); // coba sambung
} catch (PDOException $e) {  // gagal? tangkap!
  die("Gagal sambung: " . $e->getMessage());
} finally {
  // selalu jalan (tutup log, dsb)
}
// throw new Exception("Stok minus") = bunyikan alarm sendiri!

---

## Penjelasan untuk Pemula

### Analogi: Supir Gudang
- **PDO = supir**: 1 supir bisa ke gudang MySQL/Postgres (ganti alamat).
- **prepare = surat jalan resmi**: barang (data) diperiksa, tidak selundupan.

### Langkah 0 — Siapkan Device
- MySQL jalan + DB `warung` + tabel `produk` (W1 MySQL) + `php -m | grep -i pdo` ada `pdo_mysql`.

### Cara Komputer Membaca
1. `new PDO(...)` → konek TCP ke MySQL.
2. `prepare` → MySQL compile → `execute` kirim data terpisah.

### 3 Istilah Wajib
1. **DSN/PDO**: alamat/supir
2. **prepare/fetchAll**: aman/ambil

---

## Eksperimen

- **Hijau:** Salah password → `PDOException` pesan jelas?
- **Kuning:** `query("SELECT ... $cari ...")` tempel langsung + `cari = '" OR 1=1'` → bocor? Ganti prepare.
- **Merah:** Lupa `ERRMODE_EXCEPTION` → gagal diam (false)? Pasang.

---

## Tantangan

**Gudang PDO Lengkap:** `list.php` (`query` + `cari` prepare) + `tambah.php` (`prepare` INSERT) + `hapus.php` (`prepare` DELETE) + coba SQL-injection gagal.

---

## Glosarium Mini

- **PDO/DSN/prepare**: supir/alamat/aman

---

## Ringkasan

Minggu 8 dari 12: **Supir Gudang Beneran** (Level: Menengah). Data awet jutaan baris. Minggu depan: **Composer** — gudang alat.
