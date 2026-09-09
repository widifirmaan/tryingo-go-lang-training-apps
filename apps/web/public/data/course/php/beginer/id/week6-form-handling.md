# Form Handling — Terima Pesanan Warung PHP

> **Kategori:** PHP | **Level:** Pemula | **Minggu 6:** Form Handling & Validasi
> **Prasyarat:** Minggu 5 — **OOP Dasar**.

## Tujuan Pembelajaran

- `$_POST["nama"]` terima kiriman form, `htmlspecialchars(trim())` bersihkan, `empty()`/`filter_var($email, FILTER_VALIDATE_EMAIL)` validasi (sumber: php.net/reserved.variables + filter)
- `password_hash()` untuk password, jangan simpan mentah

---

## Kenapa Ini Penting Buat Kamu?

Tanpa validasi, pelanggan kirim nama kosong → pesanan gagal. Tanpa `htmlspecialchars`, hacker kirim `<script>` → web warung dibajak (XSS). `filter_var` email cegah typo `budi@gmaill`.

---

## Program: Form Pesan Aman

`pesan.php` (1 file: form + proses):

```php
<?php
$errors = [];
$nama = $wa = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $nama = htmlspecialchars(trim($_POST["nama"] ?? ""), ENT_QUOTES, 'UTF-8');
  $wa = trim($_POST["wa"] ?? "");

  if (empty($nama)) $errors[] = "Nama wajib diisi";
  elseif (strlen($nama) < 3) $errors[] = "Nama minimal 3 huruf";

  if (empty($wa)) $errors[] = "WA wajib diisi";
  elseif (!preg_match('/^[0-9]{10,13}$/', $wa)) $errors[] = "WA harus 10-13 digit";
}
?>
<form method="post">
  Nama: <input name="nama" value="<?= $nama ?>"><br>
  WA: <input name="wa" value="<?= $wa ?>"><br>
  <button>Pesan</button>
</form>
<?php if ($_SERVER["REQUEST_METHOD"] === "POST"): ?>
  <?php if (empty($errors)): ?>
    <p>Pesanan <?= $nama ?> (<?= $wa ?>) diterima!</p>
  <?php else: ?>
    <ul><?php foreach ($errors as $e) echo "<li>$e</li>"; ?></ul>
  <?php endif; ?>
<?php endif; ?>
```

Jalankan `php -S localhost:8000` → buka `http://localhost:8000/pesan.php` → coba kirim kosong.

---

## Konsep Kunci

### `$_POST`/`$_GET` = Amplop Kiriman
`method="post"` → `$_POST["nama"]`. `$_POST["x"] ?? ""` aman jika tidak ada.

### `htmlspecialchars(trim())` = Cuci Tangan
`trim` buang spasi, `htmlspecialchars` ubah `<` jadi `&lt;` — anti XSS.

### Upload Foto (`$_FILES`) — Bukti Transfer!
```html
<!-- WAJIB enctype! tanpa ini file tak kekirim -->
<form method="post" enctype="multipart/form-data">
  <input type="file" name="bukti" accept="image/*">
  <button>Kirim</button>
</form>
```
```php
<?php
if (isset($_FILES["bukti"]) && $_FILES["bukti"]["error"] === UPLOAD_ERR_OK) {
  $asal = $_FILES["bukti"]["tmp_name"]; // file di gudang sementara
  $tujuan = "uploads/" . basename($_FILES["bukti"]["name"]);
  move_uploaded_file($asal, $tujuan); // PINDAH (bukan copy!) → aman
  echo "Tersimpan: $tujuan";
}
// Cek: ["error"] (0 = OK), ["size"] batas 2MB, ["type"] image/jpeg
?>
```

### `filter_var` + `preg_match` = Satpam
`filter_var($email, FILTER_VALIDATE_EMAIL)` cek email, `preg_match('/^[0-9]{10,13}$/', $wa)` cek WA digit.

---

## Penjelasan untuk Pemula

### Analogi: Kasir Terima Pesanan
- **Form = kertas pesanan**, **$_POST = amplop ke dapur**, **validasi = kasir cek** ("nama kosong? tolak").
- **htmlspecialchars = cuci tangan**: bersihkan sebelum masak.

### Langkah 0 — Siapkan Device
- `php -S localhost:8000` → `http://localhost:8000/pesan.php`.

### Cara Komputer Membaca
1. Browser kirim `nama=Budi&wa=0812` → PHP isi `$_POST`.
2. `trim` + `htmlspecialchars` → cek `empty` → jika lolos tampil "diterima".

### 3 Istilah Wajib
1. **$_POST/$_GET**: amplop kirim
2. **Sanitasi/validasi**: cuci/cek
3. **XSS**: suntik script (musuh)

---

## Eksperimen

- **Hijau:** Kirim nama "Bo" → error "minimal 3 huruf"?
- **Kuning:** Isi WA "abc" → error digit?
- **Merah:** Isi nama `<b>Budi</b>` → tampil `&lt;b&gt;` mentah (aman, tidak tebal)?

---

## Tantangan

**Form Warung Lengkap:** Tambah `email` (`filter_var`), `jumlah` number (`>= 1`), tampil struk `nama x jumlah = total` jika lolos, error list jika tidak. **Selesai Beginner PHP!**

---

## Glosarium Mini

- **$_POST/$_GET**: kiriman
- **htmlspecialchars/trim**: cuci
- **filter_var/preg_match**: satpam pola

---

## Ringkasan

Minggu 6 dari 6: **Form Aman** (Level: Pemula). Bisa terima & validasi pesanan. **Selesai Beginner PHP!** Lanjut: **Laravel** — PHP siap jual.
