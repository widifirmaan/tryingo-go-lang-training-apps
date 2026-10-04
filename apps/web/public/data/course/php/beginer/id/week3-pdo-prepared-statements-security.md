# Persistensi Aman: PDO, Prepared Statements & Transaksi ACID

> **Kategori:** Modern PHP 8.3+ | **Level:** Pemula | **Minggu 3:** Persistensi Aman: PDO, Prepared Statements & Transaksi ACID
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami bahaya SQL Injection dan mengapa concatenation string pada kueri dilarang keras.
- Mengonfigurasi PDO dengan opsi keamanan wajib (`ATTR_EMULATE_PREPARES => false`, `ERRMODE_EXCEPTION`).
- Menggunakan Prepared Statements dengan named parameters (`:userId`) dan positional parameters (`?`).
- Mengelola transaksi database atomik ACID menggunakan `beginTransaction`, `commit`, dan `rollBack`.

---

## Program: Gateway Pembayaran Saldo Dompet Digital Bebas SQL Injection dengan PDO

```php
<?php
declare(strict_types=1);

// Konfigurasi Koneksi PDO Aman (PHP Data Objects)
class DatabaseConnection {
    public static function create(): PDO {
        // Menggunakan SQLite In-Memory untuk demonstrasi arsitektur (identik dengan PostgreSQL/MySQL)
        $pdo = new PDO('sqlite::memory:');

        // Pengaturan Wajib Keamanan Enterprise:
        // 1. Lempar PDOException saat terjadi kesalahan SQL (ERRMODE_EXCEPTION)
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // 2. Gunakan Prepared Statements asli (bukan emulasi string)
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        // 3. Kembalikan data sebagai array asosiatif secara default
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        return $pdo;
    }
}

$pdo = DatabaseConnection::create();

// Inisialisasi Skema Tabel
$pdo->exec('CREATE TABLE wallets (id INTEGER PRIMARY KEY, user_id TEXT UNIQUE, balance REAL)');
$pdo->exec("INSERT INTO wallets (user_id, balance) VALUES ('USER_ALICE', 500000.0), ('USER_BOB', 150000.0)");

// Layanan Transfer Saldo Atomik & Aman dari SQL Injection
class WalletTransferService {
    public function __construct(private readonly PDO $pdo) {}

    public function transfer(string $fromUser, string $toUser, float $amount): bool {
        if ($amount <= 0) {
            throw new InvalidArgumentException("Nominal transfer harus lebih besar dari 0.");
        }

        // Buka Transaksi Database ACID
        $this->pdo->beginTransaction();

        try {
            // Prepared Statements dengan Parameter Binding (:param)
            // Kunci baris untuk validasi saldo
            $stmt = $this->pdo->prepare('SELECT balance FROM wallets WHERE user_id = :userId');
            $stmt->execute(['userId' => $fromUser]);
            $wallet = $stmt->fetch();

            if (!$wallet || $wallet['balance'] < $amount) {
                throw new RuntimeException("Saldo pengirim {$fromUser} tidak mencukupi!");
            }

            // Deduksi saldo pengirim
            $deductStmt = $this->pdo->prepare('UPDATE wallets SET balance = balance - :amount WHERE user_id = :userId');
            $deductStmt->execute(['amount' => $amount, 'userId' => $fromUser]);

            // Tambahkan saldo penerima
            $creditStmt = $this->pdo->prepare('UPDATE wallets SET balance = balance + :amount WHERE user_id = :userId');
            $creditStmt->execute(['amount' => $amount, 'userId' => $toUser]);

            // Seluruh operasi berhasil -> COMMIT transaksi secara permanen
            $this->pdo->commit();
            echo "[SUCCESS] Transfer Rp " . number_format($amount, 0, ',', '.') . " dari {$fromUser} ke {$toUser} berhasil!\n";
            return true;

        } catch (Throwable $e) {
            // Terjadi kesalahan -> Batalkan seluruh perubahan (ROLLBACK)
            $this->pdo->rollBack();
            echo "[ROLLBACK TRIGGERED] Transaksi dibatalkan: " . $e->getMessage() . "\n";
            return false;
        }
    }
}

// Eksekusi Demonstrasi
$service = new WalletTransferService($pdo);
$service->transfer('USER_ALICE', 'USER_BOB', 200_000.0);
```

---

## Konsep Kunci

Mitos bahwa PHP "tidak aman" berasal dari kode era PHP 4/5 lama yang menggunakan fungsi purba `mysql_query("SELECT * FROM users WHERE id = " . $_GET['id'])`—penyebab utama serangan SQL Injection paling menghancurkan di internet.

### Standar Modern: PDO (PHP Data Objects)
PDO adalah layer abstraksi database resmi di PHP yang mendukung PostgreSQL, MySQL, SQLite, dan Oracle dengan antarmuka yang seragam.

### Prepared Statements: Pemisahan Kode SQL dan Data
Prepared Statements bekerja dalam dua tahap:
1. **Prepare**: Server database mengompilasi dan mengoptimasi struktur kueri SQL terlebih dahulu.
2. **Execute**: Data parameter pengguna dikirimkan secara terpisah sebagai byte data murni.
Bahkan jika seorang hacker memasukkan karakter `' OR 1=1; DROP TABLE users; --`, database memperlakukan seluruh string tersebut sebagai nilai data pencarian teks biasa, bukan sebagai perintah SQL.

### Integritas Transaksi ACID
Dalam transfer saldo, uang tidak boleh berkurang dari dompet Alice jika penambahan saldo ke dompet Bob gagal karena error server. Dengan membungkus eksekusi dalam blok `try { $pdo->beginTransaction(); ... $pdo->commit(); } catch { $pdo->rollBack(); }`, integritas finansial dijamin 100% konsisten.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda memesan makanan di loket drive-thru bank. Jika Anda menggunakan pengeras suara biasa (SQL concatenation lama), peretas bisa berteriak dari belakang mobil Anda untuk mengubah pesanan Anda. Prepared Statements seperti kapsul tabung vakum pneumatik: pesanan Anda dimasukkan ke dalam kapsul tersegel yang langsung meluncur ke tangan teller di brankas baja tanpa bisa disentuh orang luar.

## Eksperimen

- Uji coba transfer melebihi saldo (misal Rp 1.000.000) dan buktikan mekanisme `rollBack()` membatalkan transaksi.
- Coba masukkan input injection `" OR "1"="1` ke parameter `fromUser` dan amati bahwa PDO tetap memperlakukannya sebagai string literal yang aman.
- Gunakan method `$stmt->fetchColumn()` untuk kueri agregasi nilai tunggal (`COUNT(*)`).

---

## Tantangan

Bangun Repository Class `UserRepository(PDO $pdo)` yang mengimplementasikan method `findPaginated(int $page, int $perPage): array` dengan kueri prepared statement `LIMIT :limit OFFSET :offset`.

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

Kamu telah menguasai PDO, Prepared Statements anti SQL-Injection, dan transaksi atomik. Minggu depan kita mempelajari Composer, Autoloading, dan Standar PSR.
