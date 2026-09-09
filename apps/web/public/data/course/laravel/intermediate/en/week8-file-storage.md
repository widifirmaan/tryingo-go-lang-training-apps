# File Storage — Laravel Photo Warehouse

> **Kategori:** Laravel | **Level:** Intermediate | **Minggu 8:** File Storage
> **Prerequisites:** Week 7 — **Validation**.

## Learning Objectives

- `Storage::disk('public')->put()` stores product photos, `php artisan storage:link` opens to public

---

## Why This Matters (Non-IT)

Product photos without Storage = random paths + can't move to S3. With `store('products','public')` + `storage:link`, neat + 1-config cloud moves.

---

## Program

```php
// Controller
use Illuminate\Support\Facades\Storage;

public function save(Request $req){
  $path = $req->file('photo')->store('products', 'public');
  Product::create(["name"=>$req->name, "photo"=>$path]);
  return redirect('/products');
}

// View: <form enctype="multipart/form-data"><input type="file" name="photo">
```

```bash
php artisan storage:link
# Open http://localhost:8000/storage/products/xxx.jpg
```


---

## Beginner Friendly Explanation

### Analogy: Laravel Photo Warehouse
- **Uploads without Storage = photos piled on tables**: random paths + moving servers loses everything.
- **`store('products','public')` = labeled drawer** + `storage:link` = bridge to showcase (`/storage/...`). Moving to S3? Change 1 config, code stays!

### Step 0 — Prepare Device
- Same as Laravel W1: `php artisan serve` on `8000` (+ this week's package).

### How the Computer Reads It
- `$req->file('photo')->store('products','public')` stores; `Storage::url()` public link.

### 3 Must-Know Terms
- 1. **Storage/link**: warehouse/bridge

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 8: **Photo Warehouse** — Laravel Storage. Next: **Testing**.
