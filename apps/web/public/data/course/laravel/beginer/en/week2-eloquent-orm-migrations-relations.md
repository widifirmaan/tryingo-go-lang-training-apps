# Eloquent ORM: Schema Migrations, Model Relationships & Database Factories

> **Kategori:** Laravel Framework | **Level:** Beginner | **Minggu 2:** Eloquent ORM: Schema Migrations, Model Relationships & Database Factories

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

## Summary

You have mastered Eloquent ORM, relationships, Laravel 11 casts(), and eager loading. Next week we explore Form Requests and input validation.
