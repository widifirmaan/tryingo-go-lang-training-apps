# Inversion of Control: DI Container (PSR-11) & Reflection Autowiring

> **Kategori:** Modern PHP 8.3+ | **Level:** Intermediate | **Minggu 6:** Inversion of Control: DI Container (PSR-11) & Reflection Autowiring
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master PSR-11 `ContainerInterface` specifications (`get` and `has`).
- Construct an autonomous Dependency Injection Container from scratch.
- Implement automated Reflection Autowiring utilizing `ReflectionClass` and `ReflectionParameter`.
- Manage Service Lifetimes: Singletons versus Transient instances.

---

## Program: Custom Dependency Injection Container with Automated Reflection Autowiring

```php
<?php
declare(strict_types=1);

// Standar Resmi PSR-11 ContainerInterface
interface ContainerInterface {
    public function get(string $id): mixed;
    public function has(string $id): bool;
}

class NotFoundException extends Exception {}
class ContainerException extends Exception {}

// Kontainer Dependency Injection Canggih dengan Autowiring
class SimpleContainer implements ContainerInterface {
    private array $services = [];
    private array $instances = [];

    public function set(string $id, callable|string $concrete): void {
        $this->services[$id] = $concrete;
    }

    public function get(string $id): mixed {
        // Singleton pattern: kembalikan instance yang sudah ada
        if (isset($this->instances[$id])) {
            return $this->instances[$id];
        }

        if (!$this->has($id)) {
            // Coba resolusi otomatis jika berupa nama class nyata (Autowiring)
            if (class_exists($id)) {
                $instance = $this->autowire($id);
                $this->instances[$id] = $instance;
                return $instance;
            }
            throw new NotFoundException("Service '{$id}' tidak ditemukan di container.");
        }

        $entry = $this->services[$id];
        $instance = is_callable($entry) ? $entry($this) : $this->autowire($entry);
        $this->instances[$id] = $instance;
        return $instance;
    }

    public function has(string $id): bool {
        return isset($this->services[$id]) || class_exists($id);
    }

    // Resolusi Otomatis Dependensi Berdasarkan Tipe Parameter Konstruktor (Reflection)
    private function autowire(string $className): object {
        $reflector = new ReflectionClass($className);

        if (!$reflector->isInstantiable()) {
            throw new ContainerException("Class {$className} tidak dapat diinstansiasi.");
        }

        $constructor = $reflector->getConstructor();
        if ($constructor === null) {
            return new $className();
        }

        $dependencies = [];
        foreach ($constructor->getParameters() as $param) {
            $type = $param->getType();

            if ($type instanceof ReflectionNamedType && !$type->isBuiltin()) {
                // Rekursif: minta container menyelesaikan sub-dependensi!
                $dependencies[] = $this->get($type->getName());
            } elseif ($param->isDefaultValueAvailable()) {
                $dependencies[] = $param->getDefaultValue();
            } else {
                throw new ContainerException("Gagal autowire parameter '{$param->getName()}' pada {$className}.");
            }
        }

        return $reflector->newInstanceArgs($dependencies);
    }
}

// Demonstrasi Uji Coba Autowiring
class MailerService {
    public function send(string $to, string $msg): void {
        echo "[MAIL SENT] Kirim email ke {$to}: {$msg}\n";
    }
}

class UserRegistrationService {
    // Autowiring akan otomatis mendeteksi kebutuhan MailerService!
    public function __construct(public MailerService $mailer) {}

    public function register(string $email): void {
        echo "[REGISTER] Mendaftarkan pengguna baru: {$email}\n";
        $this->mailer->send($email, "Selamat datang di Tryngo Modern PHP Platform!");
    }
}

$container = new SimpleContainer();
// Tanpa konfigurasi manual, container langsung menyelesaikan seluruh rantai dependensi!
/** @var UserRegistrationService $regService */
$regService = $container->get(UserRegistrationService::class);
$regService->register('developer@tryngo.io');
```

---

## Key Concepts

The hallmark capability of modern frameworks like Symfony and Laravel is automated dependency resolution (**Autowiring**): developers declare typehinted constructor parameters, and dependencies instantiate automatically without manual `new` expressions.

### PSR-11 ContainerInterface Standard
PSR-11 establishes two foundational primitives:
1. `get(string $id)`: Resolves and yields an instantiated dependency.
2. `has(string $id)`: Determines whether a service identifier or class is resolvable.

### Reflection-Driven Autowiring Mechanics
1. The container instantiates a `ReflectionClass($className)` inspecting the target constructor.
2. It loops through constructor parameters evaluating `$param->getType()`.
3. If an argument declares a class dependency (`MailerService`), the container recursively invokes `$this->get('MailerService')`.
4. Once all collaborator instances are resolved, the container issues `$reflector->newInstanceArgs($dependencies)`.


---

---

## Beginner Friendly Explanation

Imagine an automated robotics factory workbench. Rather than manually hunting for screws and gearboxes across the floor, an automated assembly arm (DI Container) inspects the robot blueprint (Reflection). Observing that the motor requires an electric battery (MailerService), the arm retrieves the battery from storage and clicks it into place automatically.

## Experiments

- Create an `AuditLogger` service injected into `MailerService` proving multi-tier recursive autowiring.
- Upgrade the container supporting interface bindings (`set(LoggerInterface::class, ConsoleLogger::class)`).
- Verify exception handling when a constructor parameter requires an unresolvable primitive string.

---

## Challenge

Implement Circular Dependency Detection: if Class A requires Class B, and Class B requires Class A, raise a `ContainerException("Circular dependency detected")`.

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

You have mastered PSR-11 Container and Reflection-based Autowiring. Next week we construct our Router Engine and MVC Architecture.
