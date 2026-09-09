# Eloquent ORM — Automatic Laravel Racks

> **Kategori:** Laravel | **Level:** Beginner | **Minggu 4:** Eloquent ORM
> **Prerequisites:** Week 3 — **Blade Templates**.

## Learning Objectives

- `php artisan make:model Product -m` builds model + migration, `php artisan migrate` builds racks (source: laravel.com/docs/eloquent)
- `Product::create()`, `all()`, `find()`, `where()->get()` fill & fetch
- `$fillable` anti-sneaky mass-assignment

---

## Why This Matters (Non-IT)

Without Eloquent, hand-write `INSERT INTO products ...` SQL + manual connections. With `Product::create(["name"=>"Rice"])` 1 line — plus automatic `created_at`. `$fillable` stops hackers filling `is_admin=1` via forms.

---

## Program: Shop Eloquent Rack

```bash
php artisan make:model Product -m
php artisan migrate
```

```php
// database/migrations/xxxx_create_products_table.php (check, already made)
Schema::create('products', function (Blueprint $table) {
  $table->id();
  $table->string('name');
  $table->integer('price');
  $table->integer('stock')->default(0);
  $table->timestamps();
});

// app/Models/Product.php
class Product extends Model {
  protected $fillable = ['name', 'price', 'stock']; // only these mass-assignable
}

// Controller
use App\Models\Product;

public function index() {
  return view('products', ["products" => Product::orderBy('price')->get()]);
}
public function save(Request $req) {
  Product::create($req->only(['name', 'price', 'stock']));
  return redirect('/products');
}

// Quick try with Tinker
// php artisan tinker → Product::create(["name"=>"Rice","price"=>62000]) → Product::all()
```

---

## Key Concepts

### `make:model -m` + `migrate` = Model + Rack
`-m` creates the migration, `migrate` builds the `products` table (auto plural).

### `create/all/find/where` = Warehouse Workers
`Product::create([...])`, `Product::all()`, `Product::find(1)`, `Product::where('stock','>',5)->get()`.

### `$fillable` = Allowed List
Only `$fillable` fields accept `create($req->all())` — mass-assignment security.

---

## Beginner Friendly Explanation

### Analogy: Automatic Warehouse Worker
- **Model = foreman**: `Product::create()` orders the foreman, foreman writes SQL.
- **$fillable = valid shopping list**: off-list, rejected.

### Step 0 — Prepare Device
- Same as W1 + DB `.env` (`DB_DATABASE=shop`) → `php artisan migrate`.

### How the Computer Reads It
1. `Product::create(["name"=>"Rice"])` → checks `$fillable` → `INSERT INTO products ...` → automatic `created_at`.
2. `Product::where('stock','>',5)->get()` → `SELECT * FROM products WHERE stock > 5`.

### 3 Must-Know Terms
1. **Model/migration**: foreman/blueprint
2. **fillable**: valid list
3. **tinker**: quick try

---

## Experiments

- **Green:** `Product::create(["name"=>"Coffee","price"=>12000])` in tinker → `all()` shows 3?
- **Yellow:** `Product::where('price','>',20000)->get()` → pricey only?
- **Red:** Remove `$fillable` then `create` → `MassAssignmentException` error? Reattach.

---

## Challenge

**Complete Shop Rack:** `make:model Product -m` + `migrate` → tinker fills 5 products → `index()` `orderBy('price')` → `save()` validate + `create`. **Beginner Laravel DONE!**

---

## Mini Glossary

- **Model/migrate/fillable**: foreman/build/valid
- **tinker**: quick try

---

## Summary

Week 4 of 4: **Automatic Racks** (Level: Beginner). **Beginner Laravel DONE!** Next: **Auth** (Intermediate).
