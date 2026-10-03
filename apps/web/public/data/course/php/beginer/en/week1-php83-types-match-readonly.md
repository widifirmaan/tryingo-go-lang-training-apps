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
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
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
