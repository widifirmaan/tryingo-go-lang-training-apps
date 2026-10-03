# Modern Laravel 11: Streamlined Structure, Artisan & Blade Components

> **Kategori:** Laravel Framework | **Level:** Beginner | **Minggu 1:** Modern Laravel 11: Streamlined Structure, Artisan & Blade Components

## Learning Objectives

- Understand Laravel 11 streamlined directory layout (retirement of `Kernel.php` into `bootstrap/app.php`).
- Master Artisan CLI automating scaffolding for controllers, models, and migrations.
- Construct modular UI component architectures using Blade Components (`<x-product-card />`) and `@props()`.
- Configure named routes and dynamic URL generator helpers.

---

## Program: Marketplace Storefront Catalog with Blade Components & Dynamic Routing

```php
<?php
// routes/web.php (Laravel 11: Konfigurasi Ramping Tanpa Kernel.php)
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $featuredProducts = [
        ['id' => 1, 'slug' => 'vps-cloud-pro', 'name' => 'High-Speed Cloud VPS 8GB', 'price' => 350000, 'vendor' => 'IndoCloud'],
        ['id' => 2, 'slug' => 'mechanical-kb',  'name' => 'Custom Mechanical Keyboard', 'price' => 1250000, 'vendor' => 'KeyCraft Store'],
        ['id' => 3, 'slug' => '4k-monitor-pro', 'name' => 'UltraSharp 27" 4K Monitor',  'price' => 6400000, 'vendor' => 'Digital Tech'],
    ];

    return view('marketplace.catalog', compact('featuredProducts'));
})->name('catalog.home');

// resources/views/components/product-card.blade.php (Blade Component System)
$bladeComponentSample = <<<'BLADE'
@props(['product'])

<div class="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white">
    <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
            {{ $product['vendor'] }}
        </span>
        <span class="font-bold text-slate-900 text-lg">
            Rp {{ number_format($product['price'], 0, ',', '.') }}
        </span>
    </div>
    <h3 class="font-bold text-slate-800 text-base mb-4">{{ $product['name'] }}</h3>
    <a href="/products/{{ $product['slug'] }}" 
       class="block text-center w-full py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800">
        Beli Sekarang
    </a>
</div>
BLADE;

echo "=== LARAVEL 11 STREAMLINED ROUTING & BLADE COMPONENTS INITIALIZED ===\n";
```

---

## Key Concepts

Laravel stands as the world's premier PHP framework, celebrated for developer ergonomics, rapid feature velocity, and unmatched ecosystem cohesion.

### Laravel 11 Architectural Streamlining
Laravel 11 radically declutters the root codebase:
- Retires legacy `app/Http/Middleware/` boilerplate and `Kernel.php`.
- Centralizes routing pipelines, global middleware, and exception handling declaratively inside `bootstrap/app.php`.
- Prunes root `config/` directories, lazy-loading framework defaults under the hood.

### The Blade Component Engine
Modern Blade transcends legacy `@include` snippets. Utilizing **Blade Components**, developers compose declarative tags: `<x-product-card :product="$item" />`. Attributes bind explicitly via `@props(['product'])`, facilitating component-driven design systems across marketplace storefronts.


---

---

## Beginner Friendly Explanation

Imagine opening a toy store. Laravel 11 represents a minimalist showroom layout with pre-assembled display units and concealed wiring (streamlined architecture). Blade Components act like modular glass display cases duplicated across ten showroom corners without carving raw timber each time.

## Experiments

- Execute `php artisan make:component ProductCard` and inspect the generated component view.
- Register a new route in `routes/web.php` binding dynamic `{slug}` route parameters.
- Deploy `route("catalog.home")` within Blade views to synthesize secure absolute anchors.

---

## Challenge

Build a master `<x-layout.marketplace>` Blade Component encapsulating dynamic cart counters and main `{{ $slot }}` injections.

---

## Summary

You have mastered Laravel 11 streamlined architecture, Artisan, and Blade Components. Next week we explore Eloquent ORM and multi-table relational persistence.
