# Models & Database — Real CI4 Racks

> **Kategori:** CodeIgniter | **Level:** Beginner | **Minggu 4:** Models & Database
> **Prerequisites:** Week 3 — **Views & Templates**.

## Learning Objectives

- `php spark make:model ProductModel` + `protected $table` + `$allowedFields` anti mass-assignment (source: codeigniter.com/user_guide/models/model)
- `findAll()`, `find($id)`, `where()->findAll()`, `save()`, `delete()` (source: user_guide/models/model)

---

## Why This Matters (Non-IT)

Without Models, every controller hand-writes raw SQL 10x (1 typo = errors in 10 places). With `ProductModel`, 1 rack serves 10 controllers. `$allowedFields` stops hackers filling `is_admin` via forms (like Laravel's `$fillable`).

---

## Program: Real CI4 Product Rack

```bash
php spark make:model ProductModel
```

```php
// app/Models/ProductModel.php — rack
namespace App\Models;
use CodeIgniter\Model;

class ProductModel extends Model {
  protected $table = 'products';
  protected $primaryKey = 'id';
  protected $allowedFields = ['name', 'price', 'stock']; // ONLY these pass save()!
  protected $returnType = 'array';
}
```

```php
// Controller — use the rack
$model = new \App\Models\ProductModel();

// Read
$data["all"] = $model->findAll();
$data["one"] = $model->find(1);
$data["cheap"] = $model->where('price <', 20000)->findAll();
$data["search"] = $model->like('name', 'rice')->findAll();

// Write (only allowedFields pass!)
$model->save(["name" => "Coffee", "price" => 12000, "is_admin" => 1]); // is_admin REJECTED!

// Delete
$model->delete(99);

return view('products', $data);
```

Set DB in `app/Config/Database.php` (`database` = `shop`) + ensure table exists (W5 migration).

---

## Key Concepts

### `Model` + `$table` = Ready Rack
`extends Model` + `$table = 'products'` → `findAll/save` just work.

### `$allowedFields` = Guest List
Outside the list, `save()` silently drops (safe!).

### `where/like/find` = Finders
`where('price <', 20000)->findAll()`, `like('name','rice')`, `find(1)`.

---

## Beginner Friendly Explanation

### Analogy: Rack with Guard
- **Model = rack + guard**: take/store via guard.
- **$allowedFields = guest list**: off-list, rejected.

### Step 0 — Prepare Device
- Same as W1 + `products` table present (W5 or manual SQL).

### How the Computer Reads It
1. `$model->where(...)->findAll()` → builds `SELECT ... WHERE ...` → runs → array.
2. `save(["is_admin"=>1])` → filters allowedFields → drops `is_admin`.

### 3 Must-Know Terms
1. **Model/allowedFields**: rack/guest-list
2. **findAll/save**: take/store

---

## Experiments

- **Green:** `find(1)` → 1 item? `findAll()` → all?
- **Yellow:** `save` with `is_admin` → column missing (rejected)?
- **Red:** Misspelled `$table` → `Table not found` error? Fix it.

---

### Bonus: Query Builder + Pagination (core user_guide/dbmgmt!)

Models are nice, but sometimes flexible SQL needed (manual JOINs, aggregates). Query Builder = write chains, CI4 translates + secures:

```php
$db = \Config\Database::connect();
$cheap = $db->table('products')
  ->select('name, price')
  ->where('price <', 20000)
  ->orderBy('price', 'ASC')
  ->get()->getResultArray(); // always neat array!

// Pagination 5 per page (1 line + view links!)
$model = new \App\Models\ProductModel();
$data['products'] = $model->paginate(5);
$data['pager'] = $model->pager;
// in view: <?= $pager->links() ?> → « 1 2 3 »
```
- `where('price <', 20000)` auto-escapes (anti SQL-injection!). `paginate(5)` reads `?page=` itself.

---

## Challenge

**Complete Rack:** `ProductModel` + `findAll` + `where stock>5` + `like` search + `save` 2 + `delete` 1 + display in view.

---

## Mini Glossary

- **Model/allowedFields/findAll**: rack/valid/take

---

## Summary

Week 4 of 5: **Real Racks** (Level: Beginner). No raw SQL. Next: **Migrations** — blueprints.
