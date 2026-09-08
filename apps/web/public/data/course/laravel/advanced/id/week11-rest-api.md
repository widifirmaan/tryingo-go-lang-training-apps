# REST API — Warung Online Laravel

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 11:** REST API

## Tujuan Pembelajaran

- `php artisan make:controller Api/ProdukController --api` + `Route::apiResource` jadi JSON

---

## Kenapa Ini Penting Buat Kamu?

HP butuh JSON + Sanctum token (bukan session cookie). Dengan `apiResource` + `Sanctum`, 1 baris 5 pintu + token aman.

---

## Program

```php
// routes/api.php
Route::apiResource('produk', App\Http\Controllers\Api\ProdukController::class);

// Controller
public function index(){ return Produk::all(); }
public function store(Request $req){ return Produk::create($req->validated()); }
```

`curl http://localhost:8000/api/produk` → JSON.

```bash
# Token Sanctum (wajib agar HP login! riset: laravel.com/docs sanctum)
php artisan install:api   # bikin routes/api.php + tabel personal_access_tokens
php artisan migrate
```

```php
// app/Models/User.php — WAJIB trait ini (paling sering lupa!)
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable {
  use HasApiTokens; // tanpa ini createToken() error!
}

// routes/api.php — 1 pintu login + grup ber-token
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

Route::post('/login', function (Request $req) {
  $user = User::where('email', $req->email)->first();
  if (!$user || !Hash::check($req->password, $user->password)) {
    return response()->json(['pesan' => 'Salah'], 401);
  }
  return ['token' => $user->createToken('hp')->plainTextToken]; // 1|xxx...
});

Route::middleware('auth:sanctum')->group(function () {
  Route::apiResource('produk', App\Http\Controllers\Api\ProdukController::class);
});
```

Test: `curl -X POST -d '{"email":"admin@warung.com","password":"123"}' localhost:8000/api/login` → token → `curl -H "Authorization: Bearer TOKEN" localhost:8000/api/produk`.


---

## Penjelasan untuk Pemula

### Analogi: Drive-Thru Token Laravel
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `Route::apiResource()` 5 pintu; `Sanctum::actingAs` di test; token per HP.

### 3 Istilah Wajib
- 1. **apiResource/Sanctum**: 5-pintu/token

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 11: **API Laravel** — `apiResource`.
