# Tooling Modern: Composer, Autoloading PSR-4 & Ekosistem Standar PSR

> **Kategori:** Modern PHP 8.3+ | **Level:** Pemula | **Minggu 4:** Tooling Modern: Composer, Autoloading PSR-4 & Ekosistem Standar PSR
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran Composer sebagai package manager resmi ekosistem PHP.
- Menguasai standar autoloading PSR-4 (memetakan namespace `App\` ke folder `src/`).
- Mengenal konsorsium PHP-FIG dan standar-standar PSR esensial: PSR-1, PSR-3, PSR-4, PSR-7, dan PSR-12.
- Menghindari statement `require_once` manual yang berantakan menggunakan `vendor/autoload.php`.

---

## Program: Setup Proyek Terstandarisasi dengan Composer, PSR-4 & Logger PSR-3

```php
<?php
declare(strict_types=1);

// Simulasi Standar PSR-3 LoggerInterface (PHP-FIG)
// Standar industri yang digunakan oleh Monolog, Symfony, dan Laravel
interface LoggerInterface {
    public function emergency(string $message, array $context = []): void;
    public function alert(string $message, array $context = []): void;
    public function error(string $message, array $context = []): void;
    public function info(string $message, array $context = []): void;
    public function debug(string $message, array $context = []): void;
}

class StandardConsoleLogger implements LoggerInterface {
    public function info(string $message, array $context = []): void {
        $this->log('INFO', $message, $context);
    }

    public function error(string $message, array $context = []): void {
        $this->log('ERROR', $message, $context);
    }

    public function emergency(string $message, array $context = []): void { $this->log('EMERGENCY', $message, $context); }
    public function alert(string $message, array $context = []): void { $this->log('ALERT', $message, $context); }
    public function debug(string $message, array $context = []): void { $this->log('DEBUG', $message, $context); }

    private function log(string $level, string $message, array $context): void {
        $timestamp = (new DateTimeImmutable())->format('Y-m-d H:i:s');
        $contextJson = !empty($context) ? ' ' . json_encode($context) : '';
        echo "[{$timestamp}] [{$level}] {$message}{$contextJson}\n";
    }
}

// Konfigurasi composer.json standar industri:
$composerJsonSample = <<<JSON
{
    "name": "tryngo/ecommerce-core",
    "description": "Enterprise E-Commerce Microframework Core",
    "type": "project",
    "require": {
        "php": ">=8.3",
        "psr/log": "^3.0",
        "psr/http-message": "^2.0",
        "psr/http-server-middleware": "^1.0"
    },
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    }
}
JSON;

// Eksekusi Demonstrasi
$logger = new StandardConsoleLogger();
$logger->info("Composer autoloading berhasil diinisialisasi.", ["version" => "PHP 8.3", "standard" => "PSR-4"]);
$logger->error("Simulasi kegagalan koneksi pembayaran gateway.", ["provider" => "Midtrans", "code" => 503]);
```

---

## Konsep Kunci

Sebelum adanya **Composer** dan **PHP-FIG (PHP Framework Interop Group)**, setiap framework PHP memiliki cara instalasi pustaka sendiri yang tidak kompatibel satu sama lain. Setiap file harus dimuat secara manual menggunakan puluhan baris `require_once 'lib/class.php'`.

### Apa itu PHP-FIG dan PSR?
PHP-FIG adalah konsorsium para pembuat framework terkemuka (Symfony, Laravel, Laminas, Slim) yang menyepakati standar kode bersama yang disebut **PSR (PHP Standard Recommendations)**:
- **PSR-4**: Standar pemetaan nama kelas dan namespace ke struktur direktori fisik file.
- **PSR-3**: Antarmuka logging terstandarisasi (`LoggerInterface`).
- **PSR-7 & PSR-15**: Standar pesan HTTP Request/Response dan arsitektur Middleware.
- **PSR-12**: Panduan gaya penulisan kode (coding style guide) terstandarisasi.

### Keajaiban PSR-4 Autoloading
Dengan mendefinisikan `"App\": "src/"` di dalam file `composer.json`, Composer menghasilkan satu file sakti: `vendor/autoload.php`. Anda cukup memanggil `require __DIR__ . '/vendor/autoload.php';` sekali di file `index.php`. Setelah itu, setiap kali Anda memanggil `new App\Services\OrderService()`, PHP otomatis memuat file `src/Services/OrderService.php` dari disk secara instan!


---

---

## Penjelasan untuk Pemula

Bayangkan perpustakaan kota tanpa katalog. Petugas perpustakaan harus berjalan mengelilingi seluruh gedung mencari satu per satu buku setiap kali ada pembaca bertanya (require_once manual). Composer dan PSR-4 seperti sistem katalog digital barcode perpustakaan internasional: petugas langsung tahu persis nomor rak dan laci buku tersebut dalam 0,5 detik.

## Eksperimen

- Jalankan perintah `composer dump-autoload -o` untuk mengoptimalkan tabel pemetaan kelas (Classmap) untuk server produksi.
- Buat kelas baru `App\Models\Customer` di dalam folder `src/Models/Customer.php` dan panggil langsung tanpa require manual.
- Gunakan tool linter `phpcs --standard=PSR12 src/` untuk memeriksa kepatuhan standar format penulisan kode.

---

## Tantangan

Konfigurasikan Composer package kustom yang mempublikasikan logger decorator yang secara otomatis mengirimkan log error kritis ke layanan webhook Slack atau Discord.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ SIKLUS HIDUP REQUEST PHP 8.3+ FPM                        │
│                                                          │
│ Nginx / Web Server ──(FastCGI)──► PHP-FPM Worker Pool    │
│                                         │                │
│                                         ▼                │
│                                    OPcache Engine        │
│                                    (Bytecode Preload)    │
│                                         │                │
│                                         ▼                │
│                                    Zend Engine Eksekusi  │
│                                    (Clean State per Req) │
│                                         │                │
│                                         ▼                │
│ HTTP Response Output ◄───────── Garbage Collection       │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `declare(strict_types=1);`
- **Fungsi Utama:** Penegakan tipe data ketat PHP 8+.
- **Parameter / Atribut:** `Wajib di baris 1 berkas PHP`.
- **Perilaku & Efek Sistem:** Mencegah type coercion tak terduga dan memastikan kompilasi menolak ketidaksesuaian tipe..
- **Contoh Penggunaan Praktis:**
```php
<?php
declare(strict_types=1);
function add(int $a, int $b): int {
    return $a + $b;
}
echo add(5, 10);
```
- **Hasil Output yang Diharapkan:**
```output
15
```

### 2. `readonly class UserDto { public function __construct(...) }`
- **Fungsi Utama:** Constructor Promotion & Readonly Class.
- **Parameter / Atribut:** `public readonly properties`.
- **Perilaku & Efek Sistem:** Menyederhanakan pembuatan class immutable transfer data tanpa boilerplate penulisan getter..
- **Contoh Penggunaan Praktis:**
```php
<?php
readonly class UserDto {
    public function __construct(
        public string $id,
        public string $email
    ) {}
}
$user = new UserDto('u1', 'alex@example.com');
```
- **Hasil Output yang Diharapkan:**
```output
Objek data transfer immutable tercipta bersih
```

### 3. `match($status) { 'paid' => 200, default => 400 }`
- **Fungsi Utama:** Ekspresi pencocokan nilai PHP 8 (Match Expression).
- **Parameter / Atribut:** `Target value, Arms pattern`.
- **Perilaku & Efek Sistem:** Alternatif modern untuk switch-case dengan perbandingan identik (`===`) dan nilai kembalian instan..
- **Contoh Penggunaan Praktis:**
```php
<?php
$statusCode = 'paid';
$code = match($statusCode) {
    'paid' => 200,
    'pending' => 202,
    default => 400
};
echo $code;
```
- **Hasil Output yang Diharapkan:**
```output
200
```

### 4. `PDO::prepare('SELECT * FROM tbl WHERE id = ?')`
- **Fungsi Utama:** Prepared statements pencegah SQL Injection.
- **Parameter / Atribut:** `SQL query berparameter, Execute bindings`.
- **Perilaku & Efek Sistem:** Memisahkan instruksi SQL dari data pengguna untuk menjamin keamanan database mutlak..
- **Contoh Penggunaan Praktis:**
```php
<?php
$stmt = $pdo->prepare('SELECT name FROM users WHERE id = :id');
$stmt->execute(['id' => 1]);
$user = $stmt->fetch();
```
- **Hasil Output yang Diharapkan:**
```output
Query aman bebas dari celah serangan injeksi
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. SQL Injection Akibat String Concatenation
- **Gejala / Masalah:** Peretas dapat memanipulasi query SQL dan mencuri seluruh isi database.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu gunakan Prepared Statements dengan PDO atau MySQLi parameterized query.

### 2. Mengabaikan Strict Types
- **Gejala / Masalah:** PHP melakukan konversi tipe data otomatis yang memicu bug logika angka/string.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tambahkan `declare(strict_types=1);` di baris pertama setiap berkas PHP modern.

### 3. Memasukkan Output Mentah ke HTML (XSS Vulnerability)
- **Gejala / Masalah:** Skrip berbahaya dieksekusi di browser pengunjung.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu bungkus variabel output dengan fungsi `htmlspecialchars($str, ENT_QUOTES, 'UTF-8')`.

---

## Ringkasan

Kamu telah menguasai Composer, PSR-4 autoloading, dan ekosistem PHP-FIG. Level 1 selesai! Di Level 2 kita membangun Microframework PSR-15 dan DI Container dari nol.
