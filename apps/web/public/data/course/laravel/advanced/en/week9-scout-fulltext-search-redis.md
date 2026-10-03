# High-Speed Search: Laravel Scout, Meilisearch & Horizon Queue Monitoring

> **Kategori:** Laravel Framework | **Level:** Advanced | **Minggu 9:** High-Speed Search: Laravel Scout, Meilisearch & Horizon Queue Monitoring

## Learning Objectives

- Integrate Laravel Scout for high-throughput full-text search backed by Meilisearch or Algolia.
- Configure the `Searchable` trait and customize index projections via `toSearchableArray()`.
- Implement typo-tolerant fuzzy search queries and faceted attribute filters.
- Deploy Laravel Horizon monitoring Redis queue throughput, job latencies, and worker health visually.

---

## Program: Typo-Tolerant Marketplace Product Search Engine with Laravel Scout

```php
<?php
// app/Models/Product.php (Menggunakan Laravel Scout)
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Product extends Model {
    use Searchable; // Mengaktifkan sinkronisasi otomatis ke search engine

    // Menentukan array atribut yang diindeks untuk pencarian teks penuh
    public function toSearchableArray(): array {
        return [
            'id'          => (int) $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'price'       => (float) $this->price,
            'vendor_name' => $this->store?->store_name,
            'in_stock'    => $this->stock > 0,
        ];
    }
}

// Controller Handler Pencarian Instan
class ProductSearchController {
    public function search(string $keyword) {
        // Melakukan pencarian full-text dengan toleransi salah ketik (typo-tolerance)
        // melalui Meilisearch / Algolia engine
        $results = Product::search($keyword)
            ->where('in_stock', true)
            ->paginate(20);

        return response()->json([
            'query' => $keyword,
            'total_hits' => $results->total(),
            'hits' => $results->items()
        ]);
    }
}

// Konfigurasi Laravel Horizon (Dashboard Pemantau Antrean Redis Real-Time)
// config/horizon.php:
// 'environments' => [
//     'production' => [
//         'supervisor-1' => [
//             'connection' => 'redis',
//             'queue' => ['high', 'default', 'low'],
//             'balance' => 'auto',
//             'maxProcesses' => 16,
//             'tries' => 3,
//         ],
//     ],
// ]

echo "=== LARAVEL SCOUT FULL-TEXT SEARCH & HORIZON MONITOR TERKONFIGURASI ===\n";
```

---

## Key Concepts

When a multi-vendor catalog scales past 500,000 SKUs, issuing database `WHERE title LIKE '%keyword%'` queries causes catastrophic full table scans, locking database pools and failing on typographical errors.

### Laravel Scout & The Meilisearch Engine
**Laravel Scout** injects declarative full-text indexing directly into Eloquent. Decorating models with the `Searchable` trait automatically queues synchronization pipelines to search engines like **Meilisearch** upon entity mutations. Meilisearch delivers sub-10ms search responses equipped with native typo-tolerance.

### Enterprise Observability via Laravel Horizon
When servicing millions of queued jobs daily, visibility is paramount. **Laravel Horizon** delivers a real-time web console monitoring throughput rates, job latencies, and failure logs, while automatically scaling worker processes during flash-sale traffic surges.


---

---

## Beginner Friendly Explanation

Imagine searching for a contact in a 1,000-page paper phone directory. An SQL LIKE query reads line-by-line from page 1 to page 1,000 (exhausting and sluggish). Laravel Scout and Meilisearch function like smartphone contact search: in 0.01 seconds the contact appears, even if you misspell a vowel.

## Experiments

- Execute `php artisan scout:import "App\Models\Product"` to bulk-index existing models into the search cluster.
- Access the Laravel Horizon dashboard at `/horizon` inspecting active worker telemetry.
- Test a search query with intentional typos (e.g., "mchanicil kybord") and verify accurate hits.

---

## Challenge

Configure faceted filter attributes in Meilisearch allowing buyers to filter search hits across price ranges and merchant review ratings simultaneously.

---

## Summary

You have mastered Laravel Scout search and Horizon queue observability. Next week is our Final Capstone: Full-Scale Multi-Vendor Marketplace Platform!
