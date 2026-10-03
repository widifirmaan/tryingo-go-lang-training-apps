# Secure Validation: Form Requests, Session State & User Authentication

> **Kategori:** Laravel Framework | **Level:** Beginner | **Minggu 3:** Secure Validation: Form Requests, Session State & User Authentication
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Decouple validation rules from Controller handlers into dedicated `FormRequest` classes.
- Apply advanced validation constraints: `Rule::exists()`, uploaded image mime checks, and regex.
- Govern submission security via request authorization logic in `authorize()`.
- Deploy Session Flash Messages (`with("success", ...)`) for UI toast notifications.

---

## Program: Merchant Product Creation Form Request with Image Validation & Rules

```php
<?php
// app/Http/Requests/StoreProductRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest {
    // 1. Otorisasi Request (Hanya merchant terverifikasi yang boleh upload)
    public function authorize(): bool {
        return $this->user() !== null && $this->user()->is_merchant === true;
    }

    // 2. Aturan Validasi Deklaratif
    public function rules(): array {
        return [
            'title'       => ['required', 'string', 'min:5', 'max:150'],
            'sku'         => ['required', 'string', 'regex:/^[A-Z0-9-]+$/', 'unique:products,sku'],
            'price'       => ['required', 'numeric', 'min:1000', 'max:500000000'],
            'stock'       => ['required', 'integer', 'min:0', 'max:10000'],
            'image'       => ['nullable', 'image', 'mimes:jpeg,png,webp', 'max:2048'], // Maks 2MB
            'category_id' => ['required', 'integer', Rule::exists('categories', 'id')],
        ];
    }

    // Pesan Kesalahan Bahasa Indonesia Kustom
    public function messages(): array {
        return [
            'sku.unique' => 'SKU produk ini sudah terdaftar di toko lain!',
            'price.min'  => 'Harga produk minimal adalah Rp 1.000,00.',
            'image.max'  => 'Ukuran foto produk tidak boleh melebihi 2MB.',
        ];
    }
}

// Controller Handler Ramping (Otomatis Tervalidasi sebelum Method Dieksekusi)
class ProductManagementController {
    public function store(StoreProductRequest $request) {
        $validatedData = $request->validated();
        
        // Simpan produk ke database
        // $product = $request->user()->store->products()->create($validatedData);

        return redirect()->route('merchant.products.index')
            ->with('success', 'Produk berhasil dipublikasikan ke marketplace!');
    }
}

echo "=== FORM REQUEST TERISOLASI DENGAN VALIDASI ATRIBUT LENGKAP ===\n";
```

---

## Key Concepts

A pervasive flaw among junior developers is littering 50 lines of validation assertions directly inside controller actions, yielding bloated "Fat Controllers".

### The Architectural Role of Form Requests
`FormRequest` classes act as specialized gatekeepers executing before controller invocation:
1. **Automated Authorization**: The `authorize()` method evaluates caller privileges (e.g., verifying `is_merchant === true`). Yielding `false` immediately emits HTTP 403 Forbidden.
2. **Automated Validation & Redirection**: The `rules()` method inspects payloads. Upon failure:
   - For standard HTML requests, Laravel redirects back to the origin form, repopulating flashed input (`old()`) alongside error bags.
   - For JSON API requests, Laravel returns an HTTP 422 Unprocessable Content JSON response.
3. Controller actions interact strictly with sanitized, validated data via `$request->validated()`.


---

---

## Beginner Friendly Explanation

Imagine registering as a licensed vendor at a municipal market hall. The reception intake officer (FormRequest) audits your business permits and tax documents. If forms are missing or images smudged, the intake clerk immediately turns you back to correct them. You never step into the managing director's private office (the Controller) until documents are flawless.

## Experiments

- Submit a form with price Rp 500 and verify the custom message "Harga produk minimal adalah Rp 1.000,00." renders.
- Attempt uploading an executable (.exe) or PDF and observe rejection by the `image` validator.
- Render flash messages within Blade templates utilizing `@if (session("success"))`.

---

## Challenge

Build a `ValidIndonesianPhoneNumber` custom validation rule via `php artisan make:rule` validating cellular numbers conforming to Indonesian formats (`+62` or `08`).

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

You have mastered Form Requests, file validation, and session flash messages. Next week we cover Middleware, Policies, and Gates.
