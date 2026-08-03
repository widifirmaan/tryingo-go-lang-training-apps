# API Token dengan Sanctum

> Laravel | API & Realtime | Pelajaran 13

## Tujuan Pembelajaran

- Membuat token API dengan Sanctum (createToken, plainTextToken)
- Melindungi endpoint dengan middleware auth:sanctum
- Mengirim kredensial lewat header Authorization: Bearer
- Menghapus token (logout stateless) dan memahami siklus hidup token

---

## Program: API Token dengan Sanctum

```php
<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProdukController;
use Illuminate\Support\Facades\Route;

Route::post('/registrasi', [AuthController::class, 'registrasi']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/produk', [ProdukController::class, 'index']);
    Route::post('/produk', [ProdukController::class, 'store']);
});

```

---

## Penjelasan

## Token vs Session
Web biasa pakai cookie session: identitas disimpan server. API/SPA/mobile butuh cara stateless: klien menyimpan TOKEN dan mengirimnya di setiap request. Sanctum menambah 2 hal: tabel personal_access_tokens (migration otomatis) dan trait HasApiTokens di model User.
## createToken & plainTextToken
$user->createToken('aplikasi-web') membuat baris token (ada di database). plainTextToken = string acak yang DITAMPILKAN SEKALI SAJA ke klien - yang tersimpan di DB hanyalah hash-nya. Kalau hilang, token tidak bisa diambil lagi: buat baru. Nama token = untuk manusia (bisa dilihat user saat kelola perangkat).
## auth:sanctum: Pagar Token
Route::middleware('auth:sanctum') memvalidasi header Authorization: Bearer <token> di setiap request. Tidak ada session, tidak ada cookie - identitas ditentukan murni dari token. $request->user() tetap berfungsi, sekarang dari token.
## Siklus Hidup Token
currentAccessToken()->delete() = logout di satu perangkat tanpa mempengaruhi perangkat lain (bandingkan dengan session yang logout semua). User bisa punya banyak token sekaligus - $user->tokens untuk menampilkan daftarnya.

---

## Eksperimen

1. **Token vs Session**
2. **createToken & plainTextToken**
3. **auth:sanctum: Pagar Token**
4. **Siklus Hidup Token**

---

## Tantangan

Perkuat keamanan token: (1) beri abilities pada token: createToken('aplikasi', ['baca', 'tulis']) dan cek dengan $request->user()->tokenCan('tulis') di store produk (endpoint baca tanpa ability tulis harus 403), (2) tambah endpoint GET /api/token (daftar semua token user dengan last_used_at) dan DELETE /api/token/{id}, (3) atur masa berlaku: set 'expiration' => 60 di config/sanctum.php dan pindahkan masa aktif dari DB dengan php artisan sanctum:prune-expired, (4) tulis README tentang skenario token bocor: revoke dan buat ulang.

---

## Ringkasan

Token = identitas stateless. Bearer header = pengirimannya. Revoke = kontrol per perangkat. Lanjut: API resources.
