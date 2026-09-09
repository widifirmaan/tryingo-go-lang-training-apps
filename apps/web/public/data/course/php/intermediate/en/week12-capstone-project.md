# Capstone: Complete PHP Shop — Finished Online Store

> **Kategori:** PHP | **Level:** Intermediate | **Minggu 12:** Capstone: Aplikasi Blog
> **Prerequisites:** Week 11 — **Design Patterns**.

## Learning Objectives

- Combine W1-W11: `OOP` cards + `PDO` warehouse + `Composer` tools + `PHPUnit` tests + `guard` into a store with product `CRUD` + `deploy`

---

## Why This Matters (Non-IT)

11 separate weeks — capstone proves the combination into a real product openable on phones + passing tests. Your "production-ready PHP" portfolio.

---

## Program: Capstone Shop Store (Structure)

```
shop/
  composer.json (autoload App\\ → src/)
  public/index.php (door: route ?page=)
  src/Product.php (OOP card)
  src/Cart.php (OOP + PDO save)
  tests/ShopTest.php (PHPUnit 5 tests)
```

```php
// public/index.php — door + guard + warehouse
<?php
require __DIR__ . "/../vendor/autoload.php";
$pdo = new PDO("mysql:host=localhost;dbname=shop;charset=utf8mb4", "root", "",
  [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

$page = $_GET["page"] ?? "list";
if ($page === "list") {
  $stmt = $pdo->query("SELECT * FROM products ORDER BY name");
  foreach ($stmt as $p) echo "<div>" . htmlspecialchars($p["name"]) . " Rp" . $p["price"] . "</div>";
} elseif ($page === "add" && $_SERVER["REQUEST_METHOD"] === "POST") {
  $name = trim($_POST["name"] ?? "");
  if ($name === "" || (int)$_POST["price"] <= 0) die("Bad data");
  $ins = $pdo->prepare("INSERT INTO products (name, price) VALUES (?, ?)");
  $ins->execute([$name, (int)$_POST["price"]]);
  header("Location: ?page=list");
}
?>
<form method="post" action="?page=add">
  <input name="name" required> <input name="price" type="number" min="1" required>
  <button>Add</button>
</form>
```

```bash
php -S localhost:8000 -t public
./vendor/bin/phpunit tests  # GREEN 5/5?
```

---

## Key Concepts

### Capstone = Combine 11 Weeks
OOP + PDO + Composer + tests + guard = 1 store.

---

## Beginner Friendly Explanation

### Analogy: Grand Opening
- **W1-W6 foundation** + **W7-W11 engine** = store. **W12 = open**.

### Step 0 — Prepare Device
- `php -S localhost:8000 -t public` + `./vendor/bin/phpunit`.

### How the Computer Reads It
1. `?page=list` → `query` → HTML list.
2. POST `?page=add` → validate → `prepare` INSERT → redirect.

### 3 Must-Know Terms
1. **Capstone/deploy**: combine/open

---

## Experiments

- **Green:** `?page=list` shows products?
- **Yellow:** POST empty name → "Bad data"?
- **Red:** Raw `$_POST` echoed → XSS? `htmlspecialchars` it.

---

## Challenge

**PHP Shop Grand Opening:** Working CRUD + guard (XSS/SQLi fail) + 5 green PHPUnit + screenshot. **PHP 0→Expert DONE!** 🎉

---

## Mini Glossary

- **Capstone**: combine all

---

## Summary

Week 12 of 12: **Grand Opening** (Level: Intermediate). **PHP 0→Expert from zero DONE!** 🎉
