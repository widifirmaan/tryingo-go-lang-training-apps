# Eloquent ORM: Schema Migrations, Model Relationships & Database Factories

> **Kategori:** Laravel Framework | **Level:** Beginner | **Minggu 2:** Eloquent ORM: Schema Migrations, Model Relationships & Database Factories
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Eloquent ORM: the web industry's most expressive Active Record persistence layer.
- Declare relational graphs: `hasMany`, `belongsTo`, `belongsToMany`, and `hasManyThrough`.
- Deploy Laravel 11's modern `casts()` method for type-safe attribute hydration.
- Author Database Seeders and Factories populating thousands of realistic test records.

---

## Program: Multi-Vendor Store, Product & Category Relationships with Eloquent ORM

```php
<?php
// app/Models/Store.php & app/Models/Product.php (Eloquent ORM)
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Store extends Model {
    use HasFactory;

    protected $fillable = ['user_id', 'store_name', 'slug', 'is_verified'];

    // Relasi Satu Toko Memiliki Banyak Produk (One-to-Many)
    public function products(): HasMany {
        return $this->hasMany(Product::class);
    }
}

class Product extends Model {
    use HasFactory;

    protected $fillable = ['store_id', 'category_id', 'title', 'slug', 'price', 'stock'];

    // Casts atribut otomatis di Laravel 11 (method casts() menggantikan properti $casts)
    protected function casts(): array {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function store(): BelongsTo {
        return $this->belongsTo(Store::class);
    }
}

// Simulasi Kueri Eloquent Berperforma Tinggi
// $verifiedStoreProducts = Store::where('is_verified', true)
//     ->with(['products' => fn($q) => $q->where('stock', '>', 0)])
//     ->get();

echo "=== MODEL ELOQUENT LARAVEL 11 DENGAN METHOD CASTS() TERKONFIGURASI ===\n";
```

---

## Key Concepts

Eloquent ORM represents the engine powering Laravel. Unlike Data Mappers (Doctrine/Hibernate) divorcing models from persistence mechanics, Eloquent embraces the **Active Record** paradigm: model instances directly embody table rows equipped with database persistence and relational accessors.

### The Modern casts() Method in Laravel 11
Prior to Laravel 11, attribute casting was designated via the `$casts = [...]` property. Laravel 11 migrates this to a dedicated `protected function casts(): array` method. This unlocks dynamic callable expressions, native PHP 8 backed enums, and clean static type assertions.

### Eradicating N+1 Bottlenecks with Eager Loading (with)
Iterating through 50 stores invoking `$store->products` incurs 51 database roundtrips under naive Lazy Loading. Prepending `Store::with('products')->get()` triggers **Eager Loading**: Eloquent resolves related products via two batched SQL queries, slashing database latency by 95%.


---

---

## Beginner Friendly Explanation

Think of a department store merchandise catalog. Without Eloquent (raw SQL), you write manual warehouse grid coordinates for every stock check. With Eloquent, you invoke intuitive expressions: `$store->products`. Eloquent navigates the stockroom shelves and retrieves the items automatically.

## Experiments

- Run `php artisan make:model Category -mfs` to scaffold a Model, Migration, Factory, and Seeder simultaneously.
- Enable `Model::preventLazyLoading(!app()->isProduction())` in `AppServiceProvider` auditing N+1 queries during local dev.
- Author a Factory populating 50 randomized dummy products via integrated Faker libraries.

---

## Challenge

Build a `hasManyThrough` relationship: bind `Vendor` to `Order` through intermediary `Product` entities allowing vendors direct order auditing.

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

### 1. Mass Assignment Exception
- **Symptom / Issue:** Model throws error preventing mass creation when columns are unprotected.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Define safe assignable attributes inside `protected $fillable = [...]` on the model.

### 2. Overstuffed Controllers (Fat Controllers)
- **Symptom / Issue:** Controllers become untestable and violate single-responsibility guidelines.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Extract domain logic into Action classes, Form Requests, and Service layers.

### 3. Skipping Production Cache Optimization
- **Symptom / Issue:** Repeated file system lookups drag down production response latency.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Run `php artisan config:cache`, `route:cache`, and `view:cache` in production deployments.

---

## Summary

You have mastered Eloquent ORM, relationships, Laravel 11 casts(), and eager loading. Next week we explore Form Requests and input validation.
