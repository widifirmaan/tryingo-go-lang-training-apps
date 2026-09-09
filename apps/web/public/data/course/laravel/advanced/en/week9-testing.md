# Testing — Test Laravel Shop

> **Kategori:** Laravel | **Level:** Advanced | **Minggu 9:** Testing
> **Prerequisites:** Week 8 — **File Storage**.

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

## Experiments

- **Green:** Open `/products` → what shows? Try another ID → what differs?
- **Yellow:** Change the case of `res` → still runs or error?
- **Red:** Mistype 1 letter in `res` → what error message? Fix it.

## Challenge

**Testing in Your Shop:** use `/products`, `test_create` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `/products`, `test_create`; predict the output BEFORE running, then compare.
- **Red:** Combine with **File Storage** (Week 8): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 9: **Test Laravel** — `php artisan test`. Next: **Queues**.
