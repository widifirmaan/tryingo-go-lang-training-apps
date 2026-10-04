# Secure Persistence: PDO, Prepared Statements & ACID Transactions

> **Kategori:** Modern PHP 8.3+ | **Level:** Beginner | **Minggu 3:** Secure Persistence: PDO, Prepared Statements & ACID Transactions
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand SQL Injection hazards and why query string concatenation is strictly prohibited.
- Configure PDO with mandatory security flags (`ATTR_EMULATE_PREPARES => false`, `ERRMODE_EXCEPTION`).
- Deploy Prepared Statements with named (`:userId`) and positional (`?`) bound parameters.
- Govern atomic ACID database transactions with `beginTransaction`, `commit`, and `rollBack`.

---

## Program: SQL-Injection-Free Digital Wallet Payment Gateway with PDO

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

## Key Concepts

The myth that PHP is inherently insecure stems from ancient PHP 4/5 codebases concatenating query strings (`mysql_query("SELECT * FROM users WHERE id = " . $_GET['id'])`), exposing fatal SQL Injection vulnerabilities.

### The Modern Standard: PDO (PHP Data Objects)
PDO provides PHP's unified database abstraction layer supporting PostgreSQL, MySQL, SQLite, and Oracle through identical, type-safe APIs.

### Prepared Statements: Separating SQL Logic from Data
Prepared Statements execute in two deterministic phases:
1. **Prepare**: The database engine parses and compiles the SQL execution plan.
2. **Execute**: Dynamic user parameters transmit across binary protocols as isolated data literals.
Even if attackers submit payloads containing `' OR 1=1; DROP TABLE users; --`, the database engine evaluates the string purely as a scalar literal, rendering SQL Injection impossible.

### ACID Transaction Integrity
In wallet transfers, funds must never deduct from Alice if crediting Bob's balance encounters a network fault. Enclosing mutations within `beginTransaction()`, `commit()`, and `rollBack()` blocks guarantees total transaction consistency.


---

---

## Beginner Friendly Explanation

Imagine ordering at a pneumatic bank drive-thru. Speaking through an unshielded microphone (legacy string concatenation) allows bystanders to shout conflicting commands. Prepared Statements behave like a sealed pneumatic capsule: your deposit slip travels inside an airtight container directly into the teller vault without tampering.

## Experiments

- Attempt a transfer exceeding balances (e.g., Rp 1,000,000) and verify `rollBack()` halts mutations.
- Submit an injection payload `" OR "1"="1` into `fromUser` and verify PDO treats it as a literal string.
- Deploy `$stmt->fetchColumn()` for efficient scalar aggregation queries (`COUNT(*)`).

---

## Challenge

Build a `UserRepository(PDO $pdo)` repository class implementing `findPaginated(int $page, int $perPage): array` with bound `LIMIT :limit OFFSET :offset` statements.

---

## Visual Mental Model & Architecture Flow

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

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `declare(strict_types=1);`
- **Core Functionality:** Penegakan tipe data ketat PHP 8+.
- **Parameters / Attributes:** `Mandatory on line 1 berkas PHP`.
- **System Behavior & Return:** Mencegah type coercion tak terduga dan memastikan kompilasi menolak ketidaksesuaian tipe..
- **Practical Code Example:**
```php
<?php
declare(strict_types=1);
function add(int $a, int $b): int {
    return $a + $b;
}
echo add(5, 10);
```
- **Expected Execution Output:**
```output
15
```

### 2. `readonly class UserDto { public function __construct(...) }`
- **Core Functionality:** Constructor Promotion & Readonly Class.
- **Parameters / Attributes:** `public readonly properties`.
- **System Behavior & Return:** Menyederhanakan pembuatan class immutable transfer data tanpa boilerplate penulisan getter..
- **Practical Code Example:**
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
- **Expected Execution Output:**
```output
Objek data transfer immutable tercipta bersih
```

### 3. `match($status) { 'paid' => 200, default => 400 }`
- **Core Functionality:** Ekspresi pencocokan nilai PHP 8 (Match Expression).
- **Parameters / Attributes:** `Target value, Arms pattern`.
- **System Behavior & Return:** Alternatif modern untuk switch-case dengan perbandingan identik (`===`) dan nilai kembalian instan..
- **Practical Code Example:**
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
- **Expected Execution Output:**
```output
200
```

### 4. `PDO::prepare('SELECT * FROM tbl WHERE id = ?')`
- **Core Functionality:** Prepared statements pencegah SQL Injection.
- **Parameters / Attributes:** `SQL query berparameter, Execute bindings`.
- **System Behavior & Return:** Memisahkan instruksi SQL dari data pengguna untuk menjamin keamanan database mutlak..
- **Practical Code Example:**
```php
<?php
$stmt = $pdo->prepare('SELECT name FROM users WHERE id = :id');
$stmt->execute(['id' => 1]);
$user = $stmt->fetch();
```
- **Expected Execution Output:**
```output
Query aman bebas dari celah serangan injeksi
```

---

## Common Pitfalls & Debugging Tips

### 1. SQL Injection via String Concatenation
- **Symptom / Issue:** Attackers can manipulate SQL statements and compromise data.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always use PDO or MySQLi parameterized prepared statements.

### 2. Omitting Strict Types
- **Symptom / Issue:** PHP weak coercion masks subtle mathematical and comparison defects.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Include `declare(strict_types=1);` at the top of every modern PHP file.

### 3. Unescaped Output Rendering (XSS)
- **Symptom / Issue:** Malicious user input runs arbitrary scripts in visitors' browsers.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Wrap dynamic output using `htmlspecialchars($str, ENT_QUOTES, 'UTF-8')`.

---

## Summary

You have mastered PDO, injection-proof Prepared Statements, and atomic transactions. Next week we cover Composer, Autoloading, and PSR standards.
