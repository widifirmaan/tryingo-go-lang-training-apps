# Keamanan PHP — Satpam Warung Anti-Bajak

> **Kategori:** PHP | **Level:** Menengah | **Minggu 7:** Keamanan PHP
> **Prasyarat:** Minggu 6 — **Form Handling**.

## Tujuan Pembelajaran

- `htmlspecialchars()` anti-XSS, `PDO prepare` anti-SQL-injection, `password_hash()` brankas, `session_regenerate_id()` anti-bajak sesi (sumber: php.net/security)

---

## Kenapa Ini Penting Buat Kamu?

Warung tanpa satpam: hacker kirim `<script>` di nama → admin buka → password dicuri (XSS). Ketik `' OR 1=1` di login → masuk tanpa password (SQL injection). 2 fungsi cegah 90% serangan.

---

## Program: Satpam Warung PHP

```php
<?php
// 1. XSS: cuci output
$nama = '<script>alert("bajak")</script>Budi';
echo htmlspecialchars($nama, ENT_QUOTES, 'UTF-8'); // tampil mentah, tidak jalan!

// 2. SQL injection: JANGAN tempel string!
// $sql = "SELECT * FROM user WHERE nama = '$nama'"; // BAHAYA!
$pdo = new PDO("mysql:host=localhost;dbname=warung", "root", "");
$stmt = $pdo->prepare("SELECT * FROM user WHERE nama = ?"); // ? = lubang aman
$stmt->execute([$nama]); // kirim terpisah, tidak bisa suntik

// 3. Password: JANGAN md5/sha1!
$hash = password_hash("rahasia123", PASSWORD_DEFAULT); // $2y$... acak
var_dump(password_verify("rahasia123", $hash)); // true
var_dump(password_verify("salah", $hash));      // false

// 4. Sesi: ganti kunci setelah login
session_start();
$_SESSION["user"] = "Budi";
session_regenerate_id(true); // kunci baru, kunci lama hangus
?>
```

---

## Konsep Kunci

### `htmlspecialchars` = Cuci Output
Ubah `<` jadi `&lt;` — script tidak jalan. Pakai di SEMUA `echo` data user.

### `prepare` + `?` = Lubang Aman
Query + data dikirim terpisah — suntikan jadi teks biasa.

### `password_hash`/`verify` = Brankas
`PASSWORD_DEFAULT` (bcrypt) acak tiap hash. Verifikasi pakai `verify`, bukan `==`.

---

## Penjelasan untuk Pemula

### Analogi: Satpam 3 Lapis
- **htmlspecialchars = cuci tangan**: bersihkan sebelum saji.
- **prepare = loket kaca**: uang lewat lubang kecil, perampok tidak masuk.
- **hash = brankas**: password jadi acak.

### Langkah 0 — Siapkan Device
- Sama W1 + MySQL jalan untuk PDO test.

### Cara Komputer Membaca
1. `prepare("... ? ...")` → MySQL compile pola.
2. `execute([$nama])` → kirim data terpisah → tidak bisa ubah pola.

### 3 Istilah Wajib
1. **XSS/SQLi**: suntik-script/suntik-SQL
2. **prepare/hash**: lubang/brankas

---

## Eksperimen

- **Hijau:** `htmlspecialchars('<b>x</b>')` → `&lt;b&gt;`?
- **Kuning:** Login `' OR '1'='1` via prepare → gagal (aman)?
- **Merah:** `md5("123")` selalu `202cb9...` (sama → brute force mudah)? `password_hash` 2x beda?

---

## Tantangan

**Warung Bersatpam:** Form login (`htmlspecialchars` tampil + `prepare` cek + `password_verify` + `session_regenerate_id`) → coba bajak diri sendiri 3 cara, semua gagal.
- **Sambungan (Minggu 6 — Form Handling):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **XSS/SQLi/CSRF**: suntik script/SQL/palsu-request
- **prepare/hash/session**: lubang/brankas/kunci

---

## Ringkasan

Minggu 7 dari 12: **Satpam Anti-Bajak** (Level: Menengah). 90% serangan tertahan. Minggu depan: **PDO** — supir database.
