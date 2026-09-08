# Composer & Autoloading — Real PHP Tool Warehouse

> **Kategori:** PHP | **Level:** Beginner | **Minggu 9:** Composer & Autoloading

## Learning Objectives

- `composer init` + `composer require monolog/monolog` real borrowing (source: getcomposer.org)
- `vendor/autoload.php` 1 line loads all, PSR-4 `App\\` → `src/` (source: php-fig.org/psr-4)

---

## Why This Matters (Non-IT)

Without composer, borrowing libraries = zip download + 20 manual `require`s (forget 1 = error). With composer, 1 command + 1 `require autoload.php` — 100 classes automatic. Laravel/CodeIgniter run on top of this.

---

## Program: Real Composer Warehouse

```bash
composer --version  # 2.x?
mkdir shop-app && cd shop-app
composer init --name="shop/app" --no-interaction
composer require monolog/monolog
ls vendor/  # physical warehouse!
```

```json
// composer.json — add own autoload
{
  "autoload": { "psr-4": { "App\\": "src/" } }
}
```

```bash
composer dump-autoload
```

```php
// src/Cashier.php
<?php
namespace App;
class Cashier {
  public function total(array $items): int {
    $s = 0;
    foreach ($items as $i) $s += $i["price"] * $i["qty"];
    return $s;
  }
}
```

```php
// app.php — 1 line loads EVERYTHING (borrowed + own)
<?php
require __DIR__ . "/vendor/autoload.php";

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use App\Cashier;

$log = new Logger("shop");
$log->pushHandler(new StreamHandler("shop.log"));
$log->info("Open store");

$cashier = new Cashier();
echo "Total: " . $cashier->total([["price"=>62000,"qty"=>1]]) . "\n";
```

---

## Key Concepts

### `composer require` = Borrow + Record
Downloads to `vendor/` + records in `composer.json` + pins versions in `composer.lock`.

### `vendor/autoload.php` = Magic Door
1 `require` loads all classes (borrowed + own `App\\`).

### PSR-4 `App\\` → `src/` = Address Rule
`App\\Cashier` → `src/Cashier.php` automatically.

### `namespace` = Family Name (used above — explained now!)
Without surnames, 2 `Cashier`s (yours + library's) fatally collide. With `namespace App;`, yours is `App\\Cashier`, theirs `Monolog\\Cashier` — peace.

```php
<?php
namespace App; // this file's surname (MANDATORY first line after <?php!)
class Cashier { /* ... */ }

// Other file:
require "vendor/autoload.php";
use App\\Cashier; // call surname (without it: write \\App\\Cashier every time!)
$k = new Cashier();
```
- Rule: 1 file 1 surname, surname = folder name (`App\\Receipt` → `src/Receipt.php`).

---

## Beginner Friendly Explanation

### Analogy: Warehouse + Map
- **Composer = warehouse foreman**: `require` = "fetch me Monolog".
- **autoload.php = map**: every class found without manual `require`.

### Step 0 — Prepare Device
- `composer --version` 2.x (getcomposer.org) + `shop-app` folder.

### How the Computer Reads It
1. `new Cashier()` → autoloader looks up `App\\Cashier` → `src/Cashier.php` → loads.
2. `composer install` on another laptop → reads `composer.lock` → EXACT same versions.

### 3 Must-Know Terms
1. **Composer/vendor**: foreman/warehouse
2. **autoload/PSR-4**: map/rules

---

## Experiments

- **Green:** Delete `require autoload.php` → `Class not found`? Reattach.
- **Yellow:** `composer show monolog/monolog` → version?
- **Red:** Edit `src/Cashier.php` adding a method → instantly usable (no dump)? Yes, dynamic PSR-4!

---

## Challenge

**Own Warehouse:** `composer init` + `require nesbot/carbon` (dates) → `Carbon::now()->addDays(7)` due date + own `App\\Receipt` class → `app.php` combines.

---

## Mini Glossary

- **Composer/autoload/PSR-4**: foreman/map/rules

---

## Summary

Week 9 of 12: **Real Tool Warehouse** (Level: Intermediate). No simulation. Next: **Testing**.
