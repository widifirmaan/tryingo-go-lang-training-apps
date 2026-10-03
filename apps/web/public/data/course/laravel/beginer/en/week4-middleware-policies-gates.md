# Authorization & Security: Middleware Pipeline, Gates & Eloquent Policies

> **Kategori:** Laravel Framework | **Level:** Beginner | **Minggu 4:** Authorization & Security: Middleware Pipeline, Gates & Eloquent Policies

## Learning Objectives

- Understand Authentication ("Who are you?") versus Authorization ("What permissions do you hold?").
- Deploy Eloquent Policies centralizing domain model authorization invariants.
- Enforce declarative controller authorization using `$this->authorize("update", $product)`.
- Conditionally toggle UI controls within Blade templates utilizing `@can` and `@cannot`.

---

## Program: Store Ownership Authorization System with Eloquent Policies & Middleware

```php
<?php
// app/Policies/ProductPolicy.php
namespace App\Policies;

use App\Models\User;
use App\Models\Product;

class ProductPolicy {
    // Administrator sistem memiliki akses penuh tanpa batas (Super Admin Bypass)
    public function before(User $user, string $ability): ?bool {
        if ($user->is_super_admin) {
            return true;
        }
        return null; // Lanjutkan evaluasi method policy spesifik
    }

    // Hanya pemilik toko yang bersangkutan yang boleh mengedit produk miliknya
    public function update(User $user, Product $product): bool {
        return $user->id === $product->store->user_id;
    }

    // Hanya pemilik toko yang boleh menghapus produk
    public function delete(User $user, Product $product): bool {
        return $user->id === $product->store->user_id;
    }
}

// Controller yang Dilindungi oleh Policy
class ProductController {
    public function edit(Product $product) {
        // Otomatis memicu ProductPolicy::update, melempar 403 Forbidden jika bukan pemilik!
        // $this->authorize('update', $product);

        return view('merchant.products.edit', compact('product'));
    }
}

// Penggunaan Otorisasi di Template Blade:
$bladeAuthSnippet = <<<'BLADE'
@can('update', $product)
    <a href="/products/{{ $product->id }}/edit" class="btn btn-warning">Edit Produk</a>
@endcan

@can('delete', $product)
    <form action="/products/{{ $product->id }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit" class="btn btn-danger">Hapus</button>
    </form>
@endcan
BLADE;

echo "=== ELOQUENT POLICY & BLADE @CAN DIRECTIVE TERDEFINISI ===\n";
```

---

## Key Concepts

A prevalent vulnerability in commercial web platforms is **IDOR (Insecure Direct Object Reference)**: Merchant A mutates `/products/42/edit` to `/products/43/edit`, unlawfully altering Merchant B's inventory pricing due to missing backend ownership audits.

### The Remedy: Eloquent Policies
Laravel eradicates IDOR vulnerabilities through **Eloquent Policies**. Policies isolate authorization logic within dedicated classes matching domain models (`ProductPolicy`). In `update()`, we declare:
`return $user->id === $product->store->user_id;`

### Multi-Tiered Authorization Enforcement
A unified policy seamlessly governs multiple application boundaries:
1. In Controllers: `$this->authorize('update', $product);` (throwing HTTP 403 upon breach).
2. In Blade Views: `@can('update', $product)` (hiding action buttons from non-owners).
3. In Route Pipelines: `->can('update', 'product')`.


---

---

## Beginner Friendly Explanation

Think of station luggage lockers. Your boarding pass (Authentication) verifies you are a legitimate traveler. However, accessing locker #14 (Authorization Policy) requires holding the exact brass key cut for cylinder #14. You are barred from opening locker #15 belonging to another passenger, despite both holding valid station tickets.

## Experiments

- Simulate tampering with product IDs via cURL using another merchant token and verify the HTTP 403 Forbidden response.
- Utilize the `before()` policy hook to grant seamless administrative overrides to Super Admins.
- Deploy the `@cannot("delete", $product)` Blade helper displaying a "Locked" badge.

---

## Challenge

Build an `EnsureStoreIsActive` custom middleware auditing whether merchant stores are suspended, blocking access to merchant panels when inactive.

---

## Summary

You have mastered Eloquent Policies, IDOR mitigation, and Blade authorization. Level 1 complete! Level 2 covers API Resources, Sanctum, and Background Queues.
