# Modern PHP 8.3+: Strict Types, Readonly Classes & Constructor Promotion

> **Kategori:** Modern PHP 8.3+ | **Level:** Beginner | **Minggu 1:** Modern PHP 8.3+: Strict Types, Readonly Classes & Constructor Promotion
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Enable `declare(strict_types=1)` eliminating dangerous implicit type juggling.
- Utilize Constructor Property Promotion slashing dozens of repetitive property assignments.
- Deploy `readonly class` structures for immutable financial domain modeling.
- Master type-strict `match` expressions superseding legacy switch-case blocks.

---

## Program: Financial Invoice Domain Model with Readonly Classes & Match Expressions

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

## Key Concepts

Forget legacy PHP 5/7 eras characterized by untyped spaghetti scripts. **Modern PHP 8.3+** operates as a robust, strictly typed object-oriented backend language backed by Just-In-Time (JIT) compilation and modern syntax ergonomics.

### Strict Typing Declaration
By default, PHP permits implicit type juggling. Adding `declare(strict_types=1);` on line one instructs the runtime to enforce rigid type boundaries, throwing fatal `TypeError` exceptions if parameters violate declared contracts.

### Constructor Property Promotion
Legacy PHP required declaring private properties, constructor arguments, and redundant assignment lines (`$this->prop = $prop`). **Constructor Property Promotion** allows developers to declare visibility modifiers (`public string $sku`) directly within constructor arguments, synthesizing fields automatically.

### Readonly Classes & The Match Expression
Introduced in PHP 8.2, declaring a `readonly class` locks all properties into immutable states following construction. Paired with strict `match` expressions (utilizing strict `===` identity evaluation), business logic remains concise, declarative, and bug-free.


---

---

## Beginner Friendly Explanation

Imagine completing a bank deposit slip. Legacy PHP behaved like a careless clerk accepting smudged pencil marks or ambiguous numbers. Modern PHP 8.3 acts like a precision digital scanner (strict types): if an amount violates formatting rules, the machine beeps immediately and prompts for a corrected document.

## Experiments

- Pass a string `"100"` into a float constructor argument and observe the `TypeError` raised by strict typing.
- Attempt reassigning `$invoice->invoiceNumber = "NEW"` and observe the readonly violation error.
- Introduce `PaymentStatus::REFUNDED` and verify `match` throws an `UnhandledMatchError` if unhandled.

---

## Challenge

Build an immutable `Money(int $amountInCents, string $currency)` Value Object with an `add(Money $other)` method throwing exceptions upon mismatched currencies.

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
```text
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
```text
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
```text
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
```text
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

You have mastered modern PHP 8.3+ syntax, strict typing, readonly classes, and match expressions. Next week we explore Enums, Attributes, and the Reflection API.
