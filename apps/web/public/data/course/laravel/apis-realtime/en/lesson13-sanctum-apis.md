# Sanctum API Tokens

> Laravel | APIs & Real-time | Lesson 13

## Learning Objectives

- Create API tokens with Sanctum (createToken, plainTextToken)
- Protect endpoints with the auth:sanctum middleware
- Send credentials via the Authorization: Bearer header
- Revoke tokens (stateless logout) and understand token lifecycle

---

## Program: Sanctum API Tokens

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

## Explanation

## Token vs Session
Regular web uses session cookies: identity lives on the server. APIs/SPAs/mobile need a stateless approach: the client holds a TOKEN and sends it on every request. Sanctum adds two things: the personal_access_tokens table (automatic migration) and the HasApiTokens trait on the User model.
## createToken & plainTextToken
$user->createToken('aplikasi-web') creates a token row (in the database). plainTextToken = a random string shown ONCE to the client - the DB only stores its hash. If you lose it, you cannot retrieve it: create a new one. The token name is for humans (visible when users manage devices).
## auth:sanctum: The Token Gate
Route::middleware('auth:sanctum') validates the Authorization: Bearer <token> header on every request. No session, no cookie - identity is determined purely by the token. $request->user() still works, now from the token.
## Token Lifecycle
currentAccessToken()->delete() = logout on one device without affecting others (unlike a session which logs out everything). A user can hold many tokens at once - $user->tokens lists them.

---

## Experiments

1. **Token vs Session**
2. **createToken & plainTextToken**
3. **auth:sanctum: The Token Gate**
4. **Token Lifecycle**

---

## Challenge

Harden token security: (1) give tokens abilities: createToken('app', ['read', 'write']) and check with $request->user()->tokenCan('write') in the product store (read endpoints without the write ability must 403), (2) add GET /api/token (list all user tokens with last_used_at) and DELETE /api/token/{id}, (3) set expiry: put 'expiration' => 60 in config/sanctum.php and prune expired tokens from the DB with php artisan sanctum:prune-expired, (4) document in the README the leaked-token scenario: revoke and recreate.

---

## Summary

Tokens = stateless identity. Bearer header = the delivery. Revoke = per-device control. Next: API resources.
