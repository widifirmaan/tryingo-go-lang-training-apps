# Testing — Test Laravel Shop

> **Kategori:** Laravel | **Level:** Advanced | **Minggu 9:** Testing

## Learning Objectives

- `php artisan test` — `it("creates product", fn()=> $this->post('/products', ["name"=>"Rice"])->assertStatus(302))`

---

## Why This Matters (Non-IT)

Without tests, route edits → 404s found by customers. With `php artisan test` + `assertDatabaseHas`, edit → red → fix.

---

## Program

```php
// tests/Feature/ProductTest.php
public function test_create(){
  $res = $this->post('/products', ["name"=>"Rice","price"=>62000]);
  $res->assertRedirect('/products');
  $this->assertDatabaseHas('products', ["name"=>"Rice"]);
}
```

`php artisan test` → PASS.


---

## Beginner Friendly Explanation

### Analogy: Laravel Shop Taste
- **`$this->post()` = mock customer**: orders for real through doors, `assertRedirect` + `assertDatabaseHas` taste receipts + ledgers.
- **No tests = opening without tasting**: the first customer finds the spoiled dish. `php artisan test` = tastes ALL menus in 1 command!

### Step 0 — Prepare Device
- Same as Laravel W1: `php artisan serve` on `8000` (+ this week's package).

### How the Computer Reads It
- `$this->post(...)->assertRedirect()`; `assertDatabaseHas()` checks the real DB.

### 3 Must-Know Terms
- 1. **test/assertDatabaseHas**: taste/check-DB

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 9: **Test Laravel** — `php artisan test`. Next: **Queues**.
