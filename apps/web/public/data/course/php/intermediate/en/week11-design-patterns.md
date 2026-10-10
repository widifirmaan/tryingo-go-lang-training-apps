# Design Patterns

> **Kategori:** PHP | **Level:** Intermediate | **Minggu 11:** Design Patterns

## Learning Objectives

- Strategy Pattern: interface + multiple implementations
- Singleton Pattern: single instance with static property
- Dependency Injection: inject dependency via constructor
- Factory Pattern: centralized object creation
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

## Key Concepts

### Strategy Pattern
Interface + multiple implementations. Client picks strategy at runtime.

### Singleton
Private constructor, static `getInstance()`. Ensures single global instance.

### Dependency Injection
Inject dependencies via constructor, don't create inside class.

### Factory Pattern
Single class/function to create complex objects.

### Observer
Subject maintains notifier list. Event fires → all observers notified.

---

## Experiments

- Create Factory Pattern for PaymentMethod
- Implement Observer with SplSubject/SplObserver
- Try Decorator Pattern for Logger
- Create Repository Pattern for database access
- Implement Chain of Responsibility

---

## Challenge

Build a small e-commerce app with: Strategy (payment methods), Singleton (database), Factory (product creation), DI (service container).

---

## Summary

Week 11 of 12: **Design Patterns** (Level: Intermediate). Professional code architecture. Next week: **Capstone Project**!
