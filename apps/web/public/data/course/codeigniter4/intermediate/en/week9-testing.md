# Testing — Real CI4 Shop Taste-Test

> **Kategori:** CodeIgniter | **Level:** Intermediate | **Minggu 9:** Testing dengan PHPUnit

## Learning Objectives

- `phpunit.xml` + `CIUnitTestCase` + `FeatureTestTrait` `$this->get('/products')` for real (source: codeigniter.com/user_guide/testing)
- `seeInDatabase()` / `dontSeeInDatabase()` check DB + `RefreshDatabase` reset

---

## Why This Matters (Non-IT)

`echo` simulation catches no bugs (not machine-checked). Real tests: change a route → red → fix. `RefreshDatabase` starts every test clean (no pollution).

---

## Program: Real CI4 Taste-Test

```bash
composer require --dev phpunit/phpunit
```

```php
// tests/ProductsTest.php — real!
namespace Tests;
use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\FeatureTestTrait;
use CodeIgniter\Test\DatabaseTestTrait;

class ProductsTest extends CIUnitTestCase {
  use FeatureTestTrait;
  use DatabaseTestTrait;
  protected $refresh = true; // reset DB every test!
  protected $seed = 'Tests\Support\Database\Seeds\FillProducts';

  public function testList200() {
    $res = $this->get('/products');
    $res->assertStatus(200);
  }

  public function testAddEntersDB() {
    $this->post('/products/save', ["name" => "Coffee", "price" => 12000]);
    $this->seeInDatabase('products', ["name" => "Coffee"]);
  }

  public function testDeleteGone() {
    $this->call('delete', '/products/1');
    $this->dontSeeInDatabase('products', ["id" => 1]);
  }
}
```

```bash
php spark test
# OK (3 tests) — GREEN for real
```

---

## Key Concepts

### `FeatureTestTrait` = Mock Customer
`$this->get/post/call` pretends browser + `assertStatus(200)`.

### `DatabaseTestTrait` + `refresh` = Clean DB per Test
Auto migrate + reseed. `seeInDatabase` verifies presence.

---

## Beginner Friendly Explanation

### Analogy: Mystery Shopper + Clean Kitchen
- **Feature test = mystery shopper**: visits, orders, scores.
- **refresh = clean mop**: every guest a fresh table.

### Step 0 — Prepare Device
- `composer require --dev phpunit/phpunit` + `phpunit.xml` (already in appstarter).

### How the Computer Reads It
1. `php spark test` → finds `*Test.php` → `refresh`es DB → runs → reports.

### 3 Must-Know Terms
1. **Feature/seeInDatabase**: mock/check-DB
2. **refresh/seed**: clean/fill

---

## Experiments

- **Green:** Deliberate `assertStatus(201)` for GET → red? Fix to 200.
- **Yellow:** Without `refresh` → test data piles up? Attach it.
- **Red:** File `Try.php` (no Test) → not run? Rename to `TryTest.php`.

---

## Challenge

**Tested Shop:** 3 tests (GET 200 + add-enters-DB + delete-gone) GREEN + 2-product seeder.

---

## Mini Glossary

- **FeatureTestTrait/seeInDatabase**: mock/check

---

## Summary

Week 9 of 10: **Real Tasting** (Level: Intermediate). No simulation. Next: **Capstone**.
