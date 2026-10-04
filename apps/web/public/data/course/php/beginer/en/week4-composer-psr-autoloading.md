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

You have mastered Composer, PSR-4 autoloading, and the PHP-FIG ecosystem. Level 1 complete! Level 2 guides us in building a PSR-15 Microframework and DI Container from scratch.
