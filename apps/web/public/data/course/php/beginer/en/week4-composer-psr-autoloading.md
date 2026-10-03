# Modern Tooling: Composer, PSR-4 Autoloading & The PSR Ecosystem

> **Kategori:** Modern PHP 8.3+ | **Level:** Beginner | **Minggu 4:** Modern Tooling: Composer, PSR-4 Autoloading & The PSR Ecosystem
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Composer as the official dependency management tool in the PHP ecosystem.
- Master PSR-4 autoloading specifications (mapping namespace `App\` to `src/`).
- Explore the PHP-FIG consortium and core PSR standards: PSR-1, PSR-3, PSR-4, PSR-7, and PSR-12.
- Eliminate brittle manual `require_once` statements via `vendor/autoload.php`.

---

## Program: Standardized Project Setup with Composer, PSR-4 & PSR-3 Logger

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

## Key Concepts

Prior to the arrival of **Composer** and **PHP-FIG (PHP Framework Interop Group)**, PHP frameworks isolated themselves in proprietary silos. Developers spent hours authoring brittle pyramids of manual `require_once 'lib/class.php'` statements.

### PHP-FIG and the PSR Standards
PHP-FIG represents a collaborative body composed of leading framework authors (Symfony, Laravel, Laminas, Slim) unifying language interfaces via **PSRs (PHP Standard Recommendations)**:
- **PSR-4**: Autoloading standard mapping namespaces to physical filesystem paths.
- **PSR-3**: Standardized logging abstraction (`LoggerInterface`).
- **PSR-7 & PSR-15**: HTTP message standards and server middleware pipelines.
- **PSR-12**: Clean, universal coding style conventions.

### The Power of PSR-4 Autoloading
Declaring `"App\": "src/"` within `composer.json` instructs Composer to compile the optimized `vendor/autoload.php` registry. Requiring this single file at entry bootstrap allows PHP to resolve any instantiated class (`new App\Services\OrderService()`) by dynamically loading `src/Services/OrderService.php` on demand.


---

---

## Beginner Friendly Explanation

Imagine a chaotic library without an index catalog. Staff would walk along every aisle searching randomly for books (manual `require_once`). Composer and PSR-4 act as a Dewey Decimal digital indexing system: clerks locate the exact aisle and shelf coordinates of any volume in half a second.

## Experiments

- Execute `composer dump-autoload -o` to compile an optimized authoritative classmap for production.
- Create an `App\Models\Customer` class in `src/Models/Customer.php` and instantiate it with zero manual imports.
- Run `phpcs --standard=PSR12 src/` to audit code compliance against PSR-12 style rules.

---

## Challenge

Author a custom Composer package declaring a logger decorator that forwards critical error logs to a Slack or Discord webhook.

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

You have mastered Composer, PSR-4 autoloading, and the PHP-FIG ecosystem. Level 1 complete! Level 2 guides us in building a PSR-15 Microframework and DI Container from scratch.
