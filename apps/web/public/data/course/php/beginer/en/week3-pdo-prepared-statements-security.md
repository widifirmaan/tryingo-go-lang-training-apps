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

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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
