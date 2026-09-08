# Migrations & Seeds — CI4 Blueprints and Starter Stock

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 5:** Migrations & Seeds

## Learning Objectives

- `php spark make:migration CreateProducts` + `up()` (`forge->addField/addKey/createTable`) + `down()` (`dropTable`) (source: codeigniter.com/user_guide/dbmgmt/migration)
- `php spark migrate` builds, `migrate:rollback` cancels, `migrate:status` checks
- `php spark make:seeder` + `db->table()->insertBatch()` starter stock + `php spark db:seed`

---

## Why This Matters (Non-IT)

Without migrations, adding columns = hand-editing DBs on every laptop/server (forget 1 = error). With migrations, `migrate` anywhere gives identical results. Seeds auto-fill sample products — no 20x manual input per fresh install.

---

## Program: Real CI4 Blueprint + Stock

```bash
php spark make:migration CreateProducts
php spark make:seeder FillProducts
```

```php
// app/Database/Migrations/2026-08-25-CreateProducts.php
namespace App\Database\Migrations;
use CodeIgniter\Database\Migration;

class CreateProducts extends Migration {
  public function up() {
    $this->forge->addField([
      'id' => ['type' => 'INT', 'constraint' => 11, 'auto_increment' => true],
      'name' => ['type' => 'VARCHAR', 'constraint' => 100],
      'price' => ['type' => 'INT'],
      'stock' => ['type' => 'INT', 'default' => 0],
    ]);
    $this->forge->addKey('id', true);
    $this->forge->createTable('products');
  }
  public function down() {
    $this->forge->dropTable('products');
  }
}
```

```php
// app/Database/Seeds/FillProducts.php
namespace App\Database\Seeds;
use CodeIgniter\Database\Seeder;

class FillProducts extends Seeder {
  public function run() {
    $this->db->table('products')->insertBatch([
      ["name" => "Rice", "price" => 62000, "stock" => 10],
      ["name" => "Spinach", "price" => 5000, "stock" => 20],
    ]);
  }
}
```

```bash
php spark migrate
php spark migrate:status
php spark db:seed FillProducts
php spark migrate:rollback  # cancel last
```

---

## Key Concepts

### `up()` / `down()` = Build/Demolish
`up` runs on `migrate`, `down` on `rollback`.

### `forge` = Builder
`addField`, `addKey('id', true)` PK, `createTable`, `dropTable`.

### Seeder = Starter Stock
`insertBatch([...])` many at once. `db:seed Name`.

---

## Beginner Friendly Explanation

### Analogy: Blueprints + Starter Stock
- **Migration = renovation drawing**, **seeder = first rack fill** (20 sample products).

### Step 0 — Prepare Device
- Same as W1 + correct DB in `.env` + `php spark migrate:status` check.

### How the Computer Reads It
1. `migrate` → reads un-run file `up()`s → `createTable`.
2. `db:seed` → `run()` → `insertBatch`.

### 3 Must-Know Terms
1. **Migration/up/down**: blueprint/build/demolish
2. **Seeder/insertBatch**: filler/bulk

---

## Experiments

- **Green:** `migrate:status` → all `up`?
- **Yellow:** `rollback` → table gone? `migrate` again.
- **Red:** Run `migrate` 2x → "Nothing to migrate" (no duplicates)?

---

## Challenge

**Complete Warehouse:** `CreateCustomers` migration + 3-customer seeder + `migrate` + `seed` + check in `phpMyAdmin`/SQLite. **Beginner CI4 DONE!**

---

## Mini Glossary

- **Migration/Seeder/forge**: blueprint/fill/builder

---

## Summary

Week 5 of 5: **Blueprints & Stock** (Level: Beginner). **Beginner CI4 DONE!** Next: **Validation** (Intermediate).
