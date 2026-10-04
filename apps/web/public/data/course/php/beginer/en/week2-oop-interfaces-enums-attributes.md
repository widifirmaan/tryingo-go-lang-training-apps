# Advanced OOP: Backed Enums, PHP 8 Attributes & Reflection

> **Kategori:** Modern PHP 8.3+ | **Level:** Beginner | **Minggu 2:** Advanced OOP: Backed Enums, PHP 8 Attributes & Reflection
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand native PHP 8 Attributes (superseding fragile DocBlock `@Route` comment parsing).
- Deploy `ReflectionClass` and `ReflectionMethod` reading runtime code metadata.
- Utilize Backed Enums with custom methods for expressive domain logic.
- Build an automated declarative routing collector styled after modern frameworks (Symfony/Laravel).

---

## Program: Declarative Metadata Router with PHP 8 Attributes & Reflection Engine

```php
<?php
declare(strict_types=1);

// 1. PHP 8 Attributes (Anotasi Native di Tingkat Bahasa)
#[Attribute(Attribute::TARGET_METHOD | Attribute::TARGET_CLASS)]
readonly class Route {
    public function __construct(
        public string $path,
        public string $method = 'GET'
    ) {}
}

// 2. Controller dengan Metadata Atribut
class CatalogApiController {
    #[Route(path: '/api/v1/products', method: 'GET')]
    public function listProducts(): array {
        return [
            ['id' => 1, 'name' => 'Mechanical Keyboard Pro', 'price' => 1_250_000],
            ['id' => 2, 'name' => 'Curved Gaming Monitor',   'price' => 4_500_000]
        ];
    }

    #[Route(path: '/api/v1/products', method: 'POST')]
    public function createProduct(): array {
        return ['status' => 'CREATED', 'productId' => 99];
    }
}

// 3. Engine Parser Route Berbasis Reflection API
class AttributeRouteCollector {
    public function extractRoutes(string $controllerClass): array {
        $reflectionClass = new ReflectionClass($controllerClass);
        $routes = [];

        foreach ($reflectionClass->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            // Ambil semua atribut #[Route] pada method
            $attributes = $method->getAttributes(Route::class);

            foreach ($attributes as $attribute) {
                /** @var Route $routeInstance */
                $routeInstance = $attribute->newInstance();
                $routes[] = [
                    'http_method' => $routeInstance->method,
                    'path'        => $routeInstance->path,
                    'action'      => $controllerClass . '@' . $method->getName(),
                ];
            }
        }

        return $routes;
    }
}

// Eksekusi
$collector = new AttributeRouteCollector();
$discoveredRoutes = $collector->extractRoutes(CatalogApiController::class);

echo "=== RUTE OTOMATIS DIEKSTRAK DENGAN REFLECTION & ATTRIBUTES ===\n";
foreach ($discoveredRoutes as $r) {
    echo sprintf("[% -4s] % -22s -> %s\n", $r['http_method'], $r['path'], $r['action']);
}
```

---

## Key Concepts

Prior to PHP 8, frameworks parsed DocBlock comment strings with complex regexes to infer routing and validation metadata—a fragile, slow practice lacking compiler validation.

### The PHP 8 Attributes Revolution
**Attributes** deliver first-class, structured language metadata declared atop classes, methods, or parameters via `#[Route('/path')]`. Evaluated directly by PHP's internal C-engine, attributes are blazingly fast and type-checked.

### Reflection API in Action
The **Reflection API** (`ReflectionClass`, `ReflectionMethod`, `ReflectionParameter`) enables programs to inspect their own architecture at runtime:
- Discovering public methods declared on a controller class.
- Instantiating attached attribute instances via `$method->getAttributes()`.
- Analyzing constructor argument typehints to power automated Dependency Injection wiring.


---

---

## Beginner Friendly Explanation

Imagine hospital room doorways. Rather than sticking paper Post-It notes on doors that easily peel off (legacy DocBlocks), the facility affixes permanent brass doorplates (PHP 8 Attributes: `#[DentalClinic]`). An automated guide bot (the Reflection API) scans the brass plates and escorts patients directly to their designated appointments.

## Experiments

- Add a `DELETE` method handler inside `CatalogApiController` and observe the updated routing table.
- Adjust attribute flags to `Attribute::TARGET_CLASS` establishing group URL prefixes.
- Utilize `ReflectionNamedType` to inspect declared method return types dynamically.

---

## Challenge

Build a `#[Validate(min: 5, max: 100)]` attribute and author a Reflection-driven validator verifying string length bounds dynamically.

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

You have mastered PHP 8 Attributes, Backed Enums, and the Reflection API. Next week we explore secure database connectivity with PDO.
