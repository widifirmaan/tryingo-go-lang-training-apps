# Advanced OOP: Backed Enums, PHP 8 Attributes & Reflection

> **Kategori:** Modern PHP 8.3+ | **Level:** Beginner | **Minggu 2:** Advanced OOP: Backed Enums, PHP 8 Attributes & Reflection

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

## Summary

You have mastered PHP 8 Attributes, Backed Enums, and the Reflection API. Next week we explore secure database connectivity with PDO.
