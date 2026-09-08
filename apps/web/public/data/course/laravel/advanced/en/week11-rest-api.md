# REST API — Online Laravel Shop

> **Kategori:** Laravel | **Level:** Advanced | **Minggu 11:** REST API

## Learning Objectives

- `php artisan make:controller Api/ProductController --api` + `Route::apiResource` becomes JSON

---

## Why This Matters (Non-IT)

Phones need JSON + Sanctum tokens (not session cookies). With `apiResource` + `Sanctum`, 1 line 5 doors + safe tokens.

---

## Program

```php
// routes/api.php
Route::apiResource('products', App\Http\Controllers\Api\ProductController::class);

// Controller
public function index(){ return Product::all(); }
public function store(Request $req){ return Product::create($req->validated()); }
```

`curl http://localhost:8000/api/products` → JSON.

```bash
# Sanctum tokens (mandatory for phone login! research: laravel.com/docs sanctum)
php artisan install:api   # creates routes/api.php + personal_access_tokens table
php artisan migrate
```

```php
// app/Models/User.php — MANDATORY trait (most-forgotten step!)
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable {
  use HasApiTokens; // without it createToken() errors!
}

// routes/api.php — 1 login door + token group
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

Route::post('/login', function (Request $req) {
  $user = User::where('email', $req->email)->first();
  if (!$user || !Hash::check($req->password, $user->password)) {
    return response()->json(['message' => 'Wrong'], 401);
  }
  return ['token' => $user->createToken('phone')->plainTextToken]; // 1|xxx...
});

Route::middleware('auth:sanctum')->group(function () {
  Route::apiResource('products', App\Http\Controllers\Api\ProductController::class);
});
```

Test: `curl -X POST -d '{"email":"admin@shop.com","password":"123"}' localhost:8000/api/login` → token → `curl -H "Authorization: Bearer TOKEN" localhost:8000/api/products`.


---

## Beginner Friendly Explanation

### Analogy: Laravel Token Drive-Thru
- **`apiResource` = 5 drive-thru windows in 1 line**: index/store/show/update/delete without 5 hand routes.
- **Sanctum = phone wristband**: `createToken()` issues wristbands, `auth:sanctum` checks every door. Leaked token? Delete 1 row, other phones keep running!

### Step 0 — Prepare Device
- Same as Laravel W1: `php artisan serve` on `8000` (+ this week's package).

### How the Computer Reads It
- `Route::apiResource()` 5 doors; `Sanctum::actingAs` in tests; token per phone.

### 3 Must-Know Terms
- 1. **apiResource/Sanctum**: 5-doors/token

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 11: **Laravel API** — `apiResource`. Next: **Capstone**.
