# MVC Architecture: High-Performance Router Engine & Controller Dispatcher

> **Kategori:** Modern PHP 8.3+ | **Level:** Intermediate | **Minggu 7:** MVC Architecture: High-Performance Router Engine & Controller Dispatcher
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Build dynamic routing engines powered by regex named capture groups (`(?P<id>[^/]+)`).
- Sanitize URL paths isolating query parameters via `parse_url`.
- Integrate Route Matchers with Controller Dispatchers and DI Containers.
- Implement clean, modular Model-View-Controller (MVC) separation.

---

## Program: Dynamic Regex Router & Controller Dispatcher with URL Parameter Support

```php
<?php
declare(strict_types=1);

// 1. Router Engine Berbasis Regular Expressions
class Router {
    private array $routes = [];

    public function addRoute(string $method, string $pattern, string $controllerAction): void {
        // Konversi pattern seperti '/products/{id}' menjadi regex '#^/products/(?P<id>[^/]+)$#'
        $regex = preg_replace('#\{([a-zA-Z0-9_]+)\}#', '(?P<$1>[^/]+)', $pattern);
        $regex = '#^' . $regex . '$#';

        $this->routes[] = [
            'method' => strtoupper($method),
            'regex'  => $regex,
            'action' => $controllerAction,
        ];
    }

    public function match(string $requestMethod, string $requestUri): ?array {
        $requestMethod = strtoupper($requestMethod);
        $path = parse_url($requestUri, PHP_URL_PATH) ?? '/';

        foreach ($this->routes as $route) {
            if ($route['method'] !== $requestMethod) {
                continue;
            }

            if (preg_match($route['regex'], $path, $matches)) {
                // Saring hanya parameter bernama (named capture groups)
                $params = array_filter($matches, fn($key) => !is_int($key), ARRAY_FILTER_USE_KEY);
                return [
                    'action' => $route['action'],
                    'params' => $params,
                ];
            }
        }

        return null;
    }
}

// 2. Controller Target
class ProductApiController {
    public function getDetails(string $id): array {
        return [
            'status' => 'OK',
            'productId' => $id,
            'name' => 'High-Performance Cloud Router',
            'stock' => 45
        ];
    }
}

// 3. Dispatcher Controller Terintegrasi dengan DI Container
class RouteDispatcher {
    public function __construct(private readonly SimpleContainer $container) {}

    public function dispatch(array $matchResult): void {
        [$controllerClass, $methodName] = explode('@', $matchResult['action']);

        // Selesaikan controller dari DI Container
        $controllerInstance = $this->container->get($controllerClass);
        $params = $matchResult['params'];

        // Eksekusi method controller dengan parameter dinamis
        $response = $controllerInstance->$methodName(...$params);

        header('Content-Type: application/json');
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
}

// Eksekusi Demonstrasi
$router = new Router();
$router->addRoute('GET', '/api/v1/products/{id}', ProductApiController::class . '@getDetails');

$match = $router->match('GET', '/api/v1/products/PROD-9981');
echo "=== HASIL ROUTE MATCHING DENGAN REGEX NAMED GROUPS ===\n";
print_r($match);
```

---

## Key Concepts

The operational heartbeat of any web framework (Laravel, Symfony, Express) is the **Router**: a component inspecting HTTP verbs and incoming URL paths to dispatch execution to designated controllers.

### Dynamic Regex Routing Mechanics
Declaring a dynamic parameter like `/products/{id}` precludes strict string comparison (`===`), as `{id}` varies dynamically.
The router compiles placeholder parameters into named regex capture groups:
`#^/products/(?P<id>[^/]+)$#`
When clients request `/products/PROD-9981`, `preg_match` binds the matched segment into an associative array `['id' => 'PROD-9981']`.

### Dispatcher & DI Container Convergence
The Dispatcher parses controller action signatures (`ProductApiController@getDetails`). Rather than invoking `new ProductApiController()`, it resolves the controller from the **DI Container**. Collaborator dependencies instantiate automatically, invoking the method cleanly via argument unpacking `...$params`.


---

---

## Beginner Friendly Explanation

Imagine a metropolitan central railway junction. The Router behaves like an automated track switch. When an express train marked route #9981 arrives, the switch aligns rails seamlessly to guide the locomotive directly into terminal Platform 3 (Controller Action) without collision.

## Experiments

- Add a route with dual parameters `/categories/{cat}/products/{id}` and verify variable extraction.
- Send a `POST` request against a `GET` definition verifying the matcher yields `null` (404/405).
- Construct a fallback 404 handler returning a `{ "error": "NOT_FOUND" }` JSON response.

---

## Challenge

Optimize route matching using a prefix Trie structure to sustain sub-millisecond dispatch times across 1,000+ registered routes.

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

You have mastered dynamic regex routing and controller dispatching. Next week is our Final Capstone: Complete Production-Ready PSR-15 Microframework!
