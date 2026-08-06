# Composer & Autoloading

> **Kategori:** PHP | **Level:** Intermediate | **Minggu 9:** Composer & Autoloading

## Learning Objectives

- Composer: dependency manager for PHP
- composer.json: project configuration and dependencies
- Autoloading: PSR-4 standard and spl_autoload_register
- Namespaces: organize classes with use and as
- Composer commands: init, install, require, dump-autoload

---

## Program: Dependency Manager

```php
<?php
echo "=== Composer Autoload Simulation ===<br><br>";

spl_autoload_register(function ($class) {
    $prefix = "App\\";
    $baseDir = __DIR__ . "/src/";

    if (strpos($class, $prefix) === 0) {
        $relative = str_replace("\\", "/", substr($class, strlen($prefix)));
        $file = $baseDir . $relative . ".php";
        echo "Loading: $class -> $file<br>";
    }
});

echo "Autoload registered for App\\ namespace<br><br>";

echo "=== Namespace Simulation ===<br>";

namespace App\Models {
    class User {
        public string $name;
        public function __construct(string $name) {
            $this->name = $name;
        }
        public function greet(): string {
            return "Hello, {$this->name}!";
        }
    }
}

namespace App\Services {
    class UserService {
        private array $users = [];
        public function add(string $name): void {
            $this->users[] = $name;
        }
        public function list(): array {
            return $this->users;
        }
    }
}

namespace {
    $service = new \App\Services\UserService();
    $service->add("Budi");
    $service->add("Siti");
    $service->add("Andi");

    echo "Users: " . implode(", ", $service->list()) . "<br>";

    $user = new \App\Models\User("Budi");
    echo $user->greet() . "<br>";

    echo "<br>=== Composer Commands ===<br>";
    echo "composer init — buat composer.json<br>";
    echo "composer install — install dependencies<br>";
    echo "composer dump-autoload — regenerate autoload<br>";
}
>
```

---

## Key Concepts

### Composer
PHP dependency manager. `composer.json` defines deps. `vendor/` for installed packages.

### PSR-4 Autoloading
Namespace maps to folder: `App\` => `src/`. `composer dump-autoload` regenerates.

### Namespaces
`namespace App\Models` declaration. `use App\Models\User` import. `as` for alias.

### Commands
`composer init` for config, `composer require pkg` to add dependency.

---

## Experiments

- Create 3 files with different namespaces and autoload
- Try use and as for namespace alias
- Create composer.json with PSR-4 autoload
- Install package via composer (simulation)
- Create interface and implementation in different namespaces

---

## Challenge

Build a small app with MVC structure: namespace App\Controllers, App\Models, App\Views. Use autoloading.

---

## Summary

Week 9 of 12: **Composer & Autoloading** (Level: Intermediate). Modern PHP development. Next week: **Testing with PHPUnit**.
