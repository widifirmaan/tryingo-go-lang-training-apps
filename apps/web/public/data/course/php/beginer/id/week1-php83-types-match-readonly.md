# Modern PHP 8.3+: Strict Types, Readonly Classes & Constructor Promotion

> **Kategori:** Modern PHP 8.3+ | **Level:** Pemula | **Minggu 1:** Modern PHP 8.3+: Strict Types, Readonly Classes & Constructor Promotion
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengaktifkan `declare(strict_types=1)` untuk eliminasi implicit type coercion yang berbahaya.
- Menggunakan Constructor Property Promotion untuk memangkas puluhan baris boilerplate class.
- Menerapkan `readonly class` untuk pemodelan data domain finansial yang immutable.
- Menguasai `match` expressions sebagai pengganti switch-case yang type-safe dan mengembalikan nilai langsung.

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

## Program: Domain Model Faktur Finansial dengan Readonly Classes & Match Expressions

```php
<?php
declare(strict_types=1);

enum PaymentStatus: string {
    case PENDING = 'PENDING';
    case SETTLED = 'SETTLED';
    case EXPIRED = 'EXPIRED';
    case FAILED  = 'FAILED';
}

// PHP 8.2+: Readonly Class (Seluruh properti otomatis readonly & imutable)
readonly class InvoiceItem {
    // PHP 8.0+: Constructor Property Promotion
    public function __construct(
        public string $sku,
        public string $description,
        public int $quantity,
        public float $unitPrice
    ) {}

    public function getTotal(): float {
        return $this->quantity * $this->unitPrice;
    }
}

readonly class FinancialInvoice {
    /** @param InvoiceItem[] $items */
    public function __construct(
        public string $invoiceNumber,
        public string $customerEmail,
        public PaymentStatus $status,
        public array $items,
        public DateTimeImmutable $issuedAt = new DateTimeImmutable()
    ) {}

    public function calculateGrandTotal(): float {
        return array_reduce(
            $this->items,
            fn(float $acc, InvoiceItem $item) => $acc + $item->getTotal(),
            0.0
        );
    }
}

// PHP 8.0+: Match Expression (Lebih cepat, aman, dan type-strict dibanding switch-case)
function evaluateInvoiceAction(PaymentStatus $status): string {
    return match ($status) {
        PaymentStatus::PENDING => 'Menunggu pembayaran dari nasabah via VA / QRIS.',
        PaymentStatus::SETTLED => 'Pembayaran lunas terverifikasi. Terbitkan kwitansi resmi!',
        PaymentStatus::EXPIRED => 'Batas waktu pembayaran habis. Batalkan reservasi barang.',
        PaymentStatus::FAILED  => 'Pembayaran ditolak oleh bank penerbit kartu kredit.',
    };
}

// Eksekusi Demonstrasi
$items = [
    new InvoiceItem('SKU-HOSTING-PRO', 'Cloud VPS SSD 4 Core 8GB RAM', 1, 450_000.0),
    new InvoiceItem('SKU-DOMAIN-COM', 'Pendaftaran Domain .com 1 Tahun', 1, 140_000.0),
];

$invoice = new FinancialInvoice('INV-2026-0042', 'billing@tryngo.io', PaymentStatus::SETTLED, $items);

echo "=== FAKTUR FINANSIAL MODERN PHP 8.3 ===\n";
echo "Nomor: {$invoice->invoiceNumber} ({$invoice->customerEmail})\n";
echo "Total: Rp " . number_format($invoice->calculateGrandTotal(), 2, ',', '.') . "\n";
echo "Status: {$invoice->status->value} -> " . evaluateInvoiceAction($invoice->status) . "\n";
```

---

## Konsep Kunci

Lupakan PHP 5 atau PHP 7 era lawas yang lambat dan penuh kode kotor. **PHP 8.3+** adalah bahasa backend modern yang sepenuhnya berorientasi objek, memiliki performa kompilasi JIT (Just-In-Time), dan sistem tipe data statis yang sangat ketat.

### Deklarasi Strict Types
Secara default, PHP mencoba mengubah tipe data secara otomatis (type juggling). Dengan menambahkan `declare(strict_types=1);` di baris pertama setiap file, PHP melempar `TypeError` fatal saat kompilasi jika Anda mengirimkan integer ke fungsi yang mengharapkan string.

### Constructor Property Promotion
Sebelum PHP 8, Anda harus mendefinisikan properti, mendeklarasikan argumen konstruktor, dan menulis `this->prop = prop` sebanyak 3 kali. Dengan **Constructor Property Promotion**, Anda cukup menuliskan visibility modifier (`public string $sku`) langsung di parameter konstruktor; PHP secara otomatis membuat properti dan mengisinya.

### Readonly Classes dan Match Expression
Diperkenalkan di PHP 8.2, `readonly class` menjamin seluruh properti kelas tidak dapat dimodifikasi setelah proses instansiasi selesai. Dikombinasikan dengan **Match Expression** (yang mengevaluasi perbandingan identik `===`), kode bisnis menjadi sangat ringkas, deklaratif, dan bebas dari bug logika percabangan.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda mengisi slip setoran di bank. PHP lama seperti teller ceroboh yang membiarkan Anda menulis angka nominal dengan kata-kata tidak jelas atau coretan pulpen. Modern PHP 8.3 seperti teller bermesin pemindai digital (strict types): jika ada satu angka yang salah letak atau tidak sesuai format resmi, mesin langsung membunyikan alarm dan meminta slip baru.

## Eksperimen

- Coba kirimkan string "100" ke parameter float pada constructor dan amati `TypeError` yang dilempar oleh strict types.
- Coba ubah properti `$invoice->invoiceNumber = "BARU"` dan perhatikan error modifikasi readonly property.
- Tambahkan nilai enum baru `PaymentStatus::REFUNDED` dan perhatikan bagaimana `match` melempar `UnhandledMatchError` jika belum ditangani.

---

## Tantangan

Buat Value Object immutable `Money(int $amountInCents, string $currency)` dengan method `add(Money $other)` yang melempar exception jika mata uang yang dijumlahkan tidak sama.

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

Kamu telah menguasai sintaks modern PHP 8.3+, strict typing, readonly classes, dan match expressions. Minggu depan kita mempelajari Enums, Attributes, dan Reflection API.
