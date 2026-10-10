# Sintaks Dasar & Variabel

> **Kategori:** PHP | **Level:** Pemula | **Minggu 1:** Sintaks Dasar & Variabel

## Tujuan Pembelajaran

- Memahami peran PHP sebagai bahasa server-side (PHP Official Docs)
- Menulis tag PHP: <?php ... ?> dan echo untuk output
- Mendeklarasikan variabel dengan $ dan tipe dinamis
- Mengenal tipe dasar: string, int, float, bool, array, NULL
- String interpolation dan concatenation dengan .

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **PHP Intelephense** (`bmewburn.vscode-intelephense-client`): LSP PHP tercepat: code completion, signature help, find references

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension bmewburn.vscode-intelephense-client
```

---

### 2. Instalasi Runtime & Dependency (PHP 8.3+ & Composer)
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install PHP.PHP.8.3 && winget install Composer.Composer
```

**macOS (Terminal / Homebrew):**
```bash
brew install php composer
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install -y php8.3-cli php8.3-mbstring php8.3-xml composer
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
php -v && composer -v
```

Output yang diharapkan:
```output
PHP 8.3.x
Composer version 2.x
```

> 💡 **Tips Prasyarat:** Composer adalah manajer paket resmi untuk ekosistem PHP modern.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-php-app && cd my-php-app
composer init --no-interaction
touch index.php
```
- **Keterangan:** Menyiapkan composer.json untuk autoloading PSR-4 dan dependensi.
- **Pindah ke direktori project:**
```bash
cd my-php-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
php -S localhost:8000
```
Akses di browser atau terminal: `http://localhost:8000`

> ℹ️ Built-in web server PHP aktif di port 8000.

**File Titik Masuk Utama (`index.php`):**
```php
<?php
declare(strict_types=1);

header('Content-Type: application/json');

$data = [
    'status' => 'success',
    'language' => 'PHP ' . PHP_VERSION,
    'message' => 'Halo dari server PHP 8 modern!',
    'timestamp' => date('c')
];

echo json_encode($data, JSON_PRETTY_PRINT);
```
Skrip PHP modern dengan declare(strict_types=1).

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-php-app/
├── public/
│   └── index.php        # Entrypoint web
├── src/                 # Class PSR-4 aplikasi
├── vendor/              # Dependensi Composer (autoloader)
└── composer.json        # Manifest project
```
Struktur project PHP modern dengan standar PSR-4.

---

### 6. Tips & Best Practice untuk Pemula
- Selalu aktifkan `declare(strict_types=1);` di baris pertama file PHP untuk pengetikan parameter yang ketat.
- Jalankan `php -S localhost:8000 -t public` untuk mengarahkan root direktori server ke folder public.

---

## Program: Halo, PHP!

```php
<?php
echo "Selamat datang di PHP!<br>";
echo "PHP adalah bahasa server-side populer.<br>";

$nama = "Budi";
$umur = 25;
$tinggi = 175.5;
$aktif = true;

echo "Nama: $nama<br>";
echo "Umur: $umur<br>";
echo "Tinggi: $tinggi<br>";
echo "Aktif: " . ($aktif ? "Ya" : "Tidak") . "<br>";
echo "Tipe: " . gettype($nama) . ", " . gettype($umur) . "<br>";
>
```

---

## Konsep Kunci

### Peran PHP
PHP adalah bahasa scripting server-side yang dirancang untuk web development. Berbeda dengan JS yang jalan di browser, PHP dieksekusi di server — menghasilkan HTML yang dikirim ke klien.

### Sintaks Dasar
Setiap kode PHP dibungkus `<?php ... ?>`. `echo` untuk output. Variabel diawali `$` dengan tipe dinamis.

### Tipe Data
String, Integer, Float, Boolean, Array, NULL. `gettype()` untuk cek tipe.

### String
Double-quote interpolasi: `"Halo $nama"`. Single-quote literal. Concatenate dengan `.`

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Buat operasi aritmatika: +, -, *, /, %
- Coba perbedaan single-quote vs double-quote
- Gunakan gettype() untuk cek berbagai tipe
- Buat konversi tipe: (int), (string), (bool)

---

## Tantangan

Buat program profil siswa: nama, umur, nilai (array), dan status kelulusan. Tampilkan dengan format rapi menggunakan echo.

---

## Ringkasan

Minggu 1 dari 12: **Sintaks Dasar & Variabel** (Level: Pemula). Fondasi PHP dimulai di sini. Minggu depan: **Operator & Control Flow**.
