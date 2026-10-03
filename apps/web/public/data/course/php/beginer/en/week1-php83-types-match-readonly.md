# Modern PHP 8.3+: Strict Types, Readonly Classes & Constructor Promotion

> **Kategori:** Modern PHP 8.3+ | **Level:** Beginner | **Minggu 1:** Modern PHP 8.3+: Strict Types, Readonly Classes & Constructor Promotion

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

## Summary

You have mastered modern PHP 8.3+ syntax, strict typing, readonly classes, and match expressions. Next week we explore Enums, Attributes, and the Reflection API.
