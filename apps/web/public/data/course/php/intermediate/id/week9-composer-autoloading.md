# Composer & Autoloading

> **Kategori:** PHP | **Level:** Menengah | **Minggu 9:** Composer & Autoloading

## Tujuan Pembelajaran

- Composer: dependency manager untuk PHP
- composer.json: konfigurasi project dan dependencies
- Autoloading: PSR-4 standard dan spl_autoload_register
- Namespace: organisasi class dengan use dan as
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

## Konsep Kunci

### Composer
Dependency manager PHP. `composer.json` define dependencies. `vendor/` untuk installed packages.

### PSR-4 Autoloading
Namespace map ke folder: `App\` => `src/`. `composer dump-autoload` regenerate.

### Namespace
`namespace App\Models` deklarasi. `use App\Models\User` import. `as` untuk alias.

### Commands
`composer init` buat config, `composer require pkg` tambah dependency.

---

## Eksperimen

- Buat 3 file dengan namespace berbeda dan autoload
- Coba use dan as untuk alias namespace
- Buat composer.json dengan PSR-4 autoload
- Install package via composer (simulasi)
- Buat interface dan implement di namespace berbeda

---

## Tantangan

Buat aplikasi kecil dengan struktur MVC: namespace App\Controllers, App\Models, App\Views. Gunakan autoloading.

---

## Ringkasan

Minggu 9 dari 12: **Composer & Autoloading** (Level: Menengah). Modern PHP development. Minggu depan: **Testing dengan PHPUnit**.
