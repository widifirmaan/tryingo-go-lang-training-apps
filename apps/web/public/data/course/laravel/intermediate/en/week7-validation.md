# Validation — Advanced Laravel Guard

> **Kategori:** Laravel | **Level:** Intermediate | **Minggu 7:** Validasi

## Learning Objectives

- Separate guard `FormRequest`: `php artisan make:request StoreProductRequest` + `rules()` + `messages()`

---

## Why This Matters (Non-IT)

Without `FormRequest`, validation mixes into controllers 30 lines + duplicated per method. With 1 class, used 10x.

---

## Program

```bash
php artisan make:request StoreProductRequest
```

```php
// app/Http/Requests/StoreProductRequest.php
public function rules(){
  return [
    'name' => 'required|min:3',
    'price' => 'required|numeric|min:1',
    'stock' => 'required|integer|min:0'
  ];
}
public function messages(){
  return ['name.required' => 'Name required', 'price.min' => 'Price min 1'];
}

// Controller
public function store(StoreProductRequest $req){
  Product::create($req->validated());
  return redirect('/products');
}
```

View: `@error('name') <span>{{ $message }}</span> @enderror`.


---

## Beginner Friendly Explanation

### Analogy: Separate Laravel Guard
- See Program: run the commands, change 1 thing, see the difference.

### Step 0 — Prepare Device
- Same as Laravel W1: `php artisan serve` on `8000` (+ this week's package).

### How the Computer Reads It
- `php artisan make:request StoreRequest` → `rules()` → type-hint in controller → auto-checked.

### 3 Must-Know Terms
- 1. **FormRequest/rules**: guard/rules

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 7: **Guard Class** (Level: Intermediate). Validation out of controllers. Next: **Storage**.
