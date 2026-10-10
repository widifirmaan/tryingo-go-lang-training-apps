# REST API Development

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 11:** REST API Development

## Tujuan Pembelajaran

- API routes: routes/api.php dan apiResource
- API Resources: transform model ke JSON response
- Sanctum: token-based authentication untuk API
- HTTP status codes: 200, 201, 204, 404, 422
- Rate limiting: throttle middleware

---

## Program: API Endpoints

```php
<?php
echo "=== Laravel REST API ===<br><br>";

echo "=== API Routes ===<br>";
echo "// routes/api.php<br>";
echo "Route::apiResource('posts', PostController::class);<br>";
echo "Route::apiResource('comments', CommentController::class);<br>";
echo "Route::middleware('auth:sanctum')->group(function () {<br>";
echo "    Route::post('/posts', [PostController::class, 'store']);<br>";
echo "});<br><br>";

echo "=== API Resource ===<br>";
echo "class PostResource extends JsonResource {<br>";
echo "    public function toArray(Request $request): array {<br>";
echo "        return [<br>";
echo "            'id' => $this->id,<br>";
echo "            'title' => $this->title,<br>";
echo "            'author' => new UserResource($this->user),<br>";
echo "            'created_at' => $this->created_at->toISOString(),<br>";
echo "        ];<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== API Response ===<br>";
echo "return PostResource::collection(Post::all());<br>";
echo "return new PostResource($post);<br>";
echo "return response()->json(['error' => 'Not found'], 404);<br><br>";

echo "=== Sanctum Auth ===<br>";
echo "composer require laravel/sanctum<br>";
echo "php artisan sanctum:install<br>";
echo "$token = $user->createToken('api-token')->plainTextToken;<br>";
echo "Authorization: Bearer {token}<br><br>";

echo "=== API Simulation ===<br>";
$endpoints = [
    "GET /api/posts" => ["status" => 200, "data" => "List of posts"],
    "GET /api/posts/1" => ["status" => 200, "data" => "Post #1"],
    "POST /api/posts" => ["status" => 201, "data" => "Created"],
    "PUT /api/posts/1" => ["status" => 200, "data" => "Updated"],
    "DELETE /api/posts/1" => ["status" => 204, "data" => "Deleted"],
];

foreach ($endpoints as $endpoint => $resp) {
    echo "$endpoint → {$resp['status']}: {$resp['data']}<br>";
}

echo "<br>=== Rate Limiting ===<br>";
echo "Route::middleware('throttle:60,1')->group(...);<br>";
echo "60 requests per minute<br>";
>
```

---

## Konsep Kunci

### API Routes
`routes/api.php` — auto prefix `/api`. `apiResource()` generate 5 routes.

### API Resources
`JsonResource` transform model ke JSON. `collection()` untuk list.

### Sanctum
Token-based auth. `createToken()` generate token. Middleware `auth:sanctum`.

### Status Codes
200 OK, 201 Created, 204 No Content, 404 Not Found, 422 Validation Error.

### Rate Limiting
`throttle:60,1` — 60 requests per minute.

---

## Eksperimen

- Buat API Resource dengan conditional fields
- Implementasikan API versioning
- Coba API dengan Sanctum auth
- Buat API documentation dengan Scribe
- Implementasikan cursor pagination

---

## Tantangan

Buat REST API lengkap untuk blog: CRUD posts, comments, auth dengan Sanctum, API Resources, rate limiting.

---

## Ringkasan

Minggu 11 dari 12: **REST API Development** (Level: Lanjutan). API-first development. Minggu depan: **Capstone Project**!
