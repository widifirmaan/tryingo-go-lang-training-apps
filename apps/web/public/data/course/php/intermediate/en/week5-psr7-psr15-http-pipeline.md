# HTTP Pipeline Architecture: PSR-7 & PSR-15 Middleware Standards

> **Kategori:** Modern PHP 8.3+ | **Level:** Intermediate | **Minggu 5:** HTTP Pipeline Architecture: PSR-7 & PSR-15 Middleware Standards
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand distributed HTTP message abstractions: PSR-7 HTTP Messages.
- Master chained server middleware architecture: PSR-15 Server Middleware.
- Understand immutability principles in PSR-7 (`$response->withHeader()` returns a fresh clone).
- Construct an HTTP Dispatcher Pipeline orchestrating layered onion middleware execution.

---

## Program: Custom PSR-15 HTTP Middleware Pipeline (Auth, Timing & Security Headers)

```php
<?php
declare(strict_types=1);

// Abstraksi Sederhana Berdasarkan Standar Resmi PSR-7 & PSR-15
interface ResponseInterface {
    public function getStatusCode(): int;
    public function getHeader(string $name): ?string;
    public function withHeader(string $name, string $value): self;
    public function getBody(): string;
}

interface ServerRequestInterface {
    public function getMethod(): string;
    public function getUri(): string;
    public function getHeader(string $name): ?string;
}

interface RequestHandlerInterface {
    public function handle(ServerRequestInterface $request): ResponseInterface;
}

interface MiddlewareInterface {
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface;
}

// Implementasi Respons HTTP PSR-7 Minimal
class SimpleResponse implements ResponseInterface {
    public function __construct(
        private int $status = 200,
        private string $body = '',
        private array $headers = []
    ) {}

    public function getStatusCode(): int { return $this->status; }
    public function getHeader(string $name): ?string { return $this->headers[$name] ?? null; }
    public function withHeader(string $name, string $value): self {
        $clone = clone $this;
        $clone->headers[$name] = $value;
        return $clone;
    }
    public function getBody(): string { return $this->body; }
}

// 1. PSR-15 Middleware: Mengukur Waktu Eksekusi Request
class TimingMiddleware implements MiddlewareInterface {
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface {
        $startTime = microtime(true);
        
        // Teruskan ke middleware berikutnya dalam pipeline
        $response = $handler->handle($request);
        
        $durationMs = (microtime(true) - $startTime) * 1000;
        return $response->withHeader('X-Execution-Time-Ms', sprintf('%.2f', $durationMs));
    }
}

// 2. PSR-15 Middleware: Menambahkan Security Headers
class SecurityHeadersMiddleware implements MiddlewareInterface {
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface {
        $response = $handler->handle($request);
        return $response
            ->withHeader('X-Content-Type-Options', 'nosniff')
            ->withHeader('X-Frame-Options', 'DENY');
    }
}

// 3. Dispatcher Pipeline PSR-15
class MiddlewarePipeline implements RequestHandlerInterface {
    /** @param MiddlewareInterface[] $middlewares */
    public function __construct(
        private array $middlewares,
        private RequestHandlerInterface $fallbackHandler
    ) {}

    public function handle(ServerRequestInterface $request): ResponseInterface {
        if (empty($this->middlewares)) {
            return $this->fallbackHandler->handle($request);
        }

        $middleware = array_shift($this->middlewares);
        return $middleware->process($request, $this);
    }
}

echo "=== ARSITEKTUR PIPELINE HTTP PSR-15 TERKONFIGURASI LENGKAP ===\n";
```

---

## Key Concepts

Contemporary backend architectures avoid binding directly to legacy global PHP superglobals (`$_GET`, `$_POST`, `header()`). The **PSR-7** and **PSR-15** standards establish universal HTTP abstractions shared interoperably across all modern PHP frameworks.

### Immutability in PSR-7
PSR-7 message instances are strictly **Immutable**. Methods such as `$response->withHeader()` never mutate active memory references in place; they yield fresh clones. This prevents accidental state mutation bugs as payloads traverse middleware stacks.

### The PSR-15 Onion Pipeline Pattern
PSR-15 middleware wraps application handlers like layers of an onion:
1. Inbound requests traverse outer middleware (e.g., `TimingMiddleware`), recording start times.
2. Control delegates inward via `$handler->handle($request)`.
3. Once the core domain handler constructs a response, execution winds back outward through the same middleware, appending execution metadata headers before final dispatch.


---

---

## Beginner Friendly Explanation

Imagine sending a critical contract via courier. Before sealing the envelope, an assistant verifies all signature lines (Middleware 1). The courier clerk then places the document into a weatherproof security pouch (Middleware 2). Each handler wraps an additional protective layer around the immutable contract.

## Experiments

- Add an `AuthenticationMiddleware` checking `Authorization: Bearer SECRET`, returning a 401 response on mismatch.
- Reorder middleware elements and observe how execution sequence alters response transformations.
- Verify `$response1 !== $response1->withHeader(...)` confirming strict immutable cloning.

---

## Challenge

Build a CorsMiddleware intercepting preflight `OPTIONS` requests automatically and appending `Access-Control-Allow-Origin: *` headers.

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

You have mastered PSR-7 HTTP Messages and PSR-15 Middleware Pipelines. Next week we build a Dependency Injection Container with Reflection.
