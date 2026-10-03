# Enterprise RESTful APIs: Eloquent API Resources & Laravel Sanctum

> **Kategori:** Laravel Framework | **Level:** Intermediate | **Minggu 5:** Enterprise RESTful APIs: Eloquent API Resources & Laravel Sanctum

## Learning Objectives

- Understand Eloquent API Resources as transformation layers separating database models from JSON contracts.
- Prevent sensitive data leaks (password hashes, secret keys) through explicit attribute projection.
- Deploy `$this->whenLoaded("relation")` avoiding N+1 regressions in API responses.
- Secure mobile and SPA endpoints using lightweight Laravel Sanctum bearer tokens.

---

## Program: Sanctum-Authenticated Product Catalog API with Eloquent API Resources

```php
<?php
// app/Http/Resources/ProductResource.php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource {
    // Transformasi Model Eloquent menjadi JSON Terstandarisasi
    public function toArray(Request $request): array {
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'slug'         => $this->slug,
            'price_idr'    => (float) $this->price,
            'formatted'    => 'Rp ' . number_format((float) $this->price, 0, ',', '.'),
            'stock'        => (int) $this->stock,
            'is_in_stock'  => $this->stock > 0,
            
            // Relasi hanya dimuat jika sudah di-eager load (mencegah N+1 di API)
            'store'        => new StoreResource($this->whenLoaded('store')),
            
            'links'        => [
                'self' => url("/api/v1/products/{$this->slug}"),
            ]
        ];
    }
}

// routes/api.php dengan Proteksi Sanctum & Rate Limiting
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'throttle:api'])->prefix('v1')->group(function () {
    Route::get('/user/profile', function (Request $request) {
        return response()->json($request->user());
    });

    // Endpoint Katalog Produk Publik (Cached & Throttled)
    Route::get('/products', function () {
        // $products = Product::with('store')->where('stock', '>', 0)->paginate(15);
        // return ProductResource::collection($products);
        return response()->json(['status' => 'OK', 'message' => 'API Resources Active']);
    });
});

echo "=== ELOQUENT API RESOURCES & SANCTUM MIDDLEWARE TERKONFIGURASI ===\n";
```

---

## Key Concepts

Returning raw Eloquent models directly from controllers (`return Product::all();`) exposes severe security risks: adding sensitive columns to tables inadvertently leaks internal attributes into public JSON responses.

### The Role of Eloquent API Resources
**API Resources** serve as the definitive contract transformation barrier:
- Formats financial values into localized currency presentations.
- Decouples client-facing JSON keys from internal database schema names.
- Leverages conditional relation inclusion: `$this->whenLoaded('store')` embeds related entities only if the controller eager-loaded them (`with('store')`), shielding APIs from hidden N+1 regressions.

### Lightweight Security with Laravel Sanctum
**Laravel Sanctum** provides featherweight token authentication tailored for Single Page Applications (Next.js/Vue) and mobile clients. Sanctum provisions cryptographically signed Personal Access Tokens with granular abilities, avoiding the heavy overhead of full OAuth2 servers.


---

---

## Beginner Friendly Explanation

Think of a luxury jewelry boutique. In the private vault (the Database), records track wholesale acquisition invoices and distributor contracts. The front showroom display (API Resource) presents only the polished gold necklace and the retail price tag to visitors, guarding internal wholesale ledger sheets.

## Experiments

- Synthesize a Sanctum token via `$user->createToken("mobile-app", ["products:read"])->plainTextToken`.
- Submit requests with `Authorization: Bearer <token>` via cURL observing seamless token authorization.
- Deploy `ProductResource::collection($products)` to serialize paginated collections automatically.

---

## Challenge

Configure Sanctum Token Abilities: issue a courier token restricted to `orders:update-status`, rejecting unauthorized catalog mutations.

---

## Summary

You have mastered Eloquent API Resources and Laravel Sanctum token authentication. Next week we explore Events, Listeners, and Background Queues.
