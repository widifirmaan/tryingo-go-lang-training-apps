# Design Patterns

> **Kategori:** PHP | **Level:** Menengah | **Minggu 11:** Design Patterns

## Tujuan Pembelajaran

- Strategy Pattern: interface + multiple implementations
- Singleton Pattern: single instance dengan static property
- Dependency Injection: inject dependency via constructor
- Factory Pattern: object creation terpusat
- Observer Pattern: event-driven architecture

---

## Program: Pattern Implementation

```php
<?php
echo "=== Design Patterns in PHP ===<br><br>";

interface PaymentMethod {
    public function pay(float $amount): string;
}

class CreditCard implements PaymentMethod {
    public function pay(float $amount): string {
        return "Paid Rp" . number_format($amount, 0) . " via Credit Card";
    }
}

class PayPal implements PaymentMethod {
    public function pay(float $amount): string {
        return "Paid Rp" . number_format($amount, 0) . " via PayPal";
    }
}

class PaymentProcessor {
    public function process(PaymentMethod $method, float $amount): string {
        return $method->pay($amount);
    }
}

$processor = new PaymentProcessor();
echo $processor->process(new CreditCard(), 500000) . "<br>";
echo $processor->process(new PayPal(), 300000) . "<br>";

class Database {
    private static ?Database $instance = null;
    private function __construct() {}
    public static function getInstance(): Database {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }
    public function query(string $sql): string {
        return "Executing: $sql";
    }
}

$db1 = Database::getInstance();
$db2 = Database::getInstance();
echo "<br>Singleton same? " . ($db1 === $db2 ? "Yes" : "No") . "<br>";
echo $db1->query("SELECT * FROM users") . "<br>";

interface Logger {
    public function log(string $msg): void;
}

class FileLogger implements Logger {
    public function log(string $msg): void {
        echo "File: [$msg]<br>";
    }
}

class App {
    private Logger $logger;
    public function __construct(Logger $logger) {
        $this->logger = $logger;
    }
    public function run(): void {
        $this->logger->log("App started");
        $this->logger->log("Processing...");
        $this->logger->log("App finished");
    }
}

$app = new App(new FileLogger());
$app->run();
>
```

---

## Konsep Kunci

### Strategy Pattern
Interface + multiple class implement. Client pilih strategy saat runtime.

### Singleton
Private constructor, `getInstance()` static. Pastikan satu instance global.

### Dependency Injection
Inject dependency lewat constructor, bukan buat di dalam class.

### Factory Pattern
Satu class/fungsi untuk buat object kompleks. Client tidak perlu tahu detail.

### Observer
Subject maintain list notifier. Event terjadi → semua observer notified.

---

## Eksperimen

- Buat Factory Pattern untuk PaymentMethod
- Implementasikan Observer dengan SplSubject/SplObserver
- Coba Decorator Pattern untuk Logger
- Buat Repository Pattern untuk database access
- Implementasikan Chain of Responsibility

---

## Tantangan

Buat aplikasi e-commerce kecil dengan: Strategy (payment methods), Singleton (database), Factory (product creation), DI (service container).

---

## Ringkasan

Minggu 11 dari 12: **Design Patterns** (Level: Menengah). Arsitektur kode profesional. Minggu depan: **Capstone Project**!
