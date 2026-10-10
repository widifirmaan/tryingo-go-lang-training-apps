# REST API Development

> **Kategori:** CodeIgniter 4 | **Level:** Menengah | **Minggu 8:** REST API Development

## Tujuan Pembelajaran

- Resource routes: $routes->resource() untuk CRUD API
- JSON response: setJSON, respond, respondCreated
- ResourceController: pre-built CRUD controller
- getJSON: parse request body JSON
- CORS: configure cross-origin resource sharing

---

## Program: API Endpoints

```php
<?php
echo "=== CI4 REST API ===<br><br>";

echo "=== API Routes ===<br>";
echo "$routes->resource('api/products');<br>";
echo "$routes->group('api', function($routes) {<br>";
echo "    $routes->get('products', 'Api\Product::index');<br>";
echo "    $routes->post('products', 'Api\Product::store');<br>";
echo "    $routes->put('products/(:num)', 'Api\Product::update/$1');<br>";
echo "    $routes->delete('products/(:num)', 'Api\Product::delete/$1');<br>";
echo "});<br><br>";

echo "=== JSON Response ===<br>";
echo "return $this->response->setJSON([<br>";
echo "    'status' => 'success',<br>";
echo "    'data' => $products,<br>";
echo "]);<br><br>";

echo "=== API Controller ===<br>";
echo "class Product extends ResourceController {<br>";
echo "    protected $model = ProductModel::class;<br>";
echo "    protected $format = 'json';<br><br>";
echo "    public function index() {<br>";
echo "        return $this->respond($this->model->findAll());<br>";
echo "    }<br><br>";
echo "    public function create() {<br>";
echo "        $data = $this->request->getJSON(true);<br>";
echo "        $this->model->insert($data);<br>";
echo "        return $this->respondCreated($data);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== API Simulation ===<br>";
$endpoints = [
    "GET /api/products" => ["status" => 200, "data" => "List products"],
    "GET /api/products/1" => ["status" => 200, "data" => "Product #1"],
    "POST /api/products" => ["status" => 201, "data" => "Created"],
    "PUT /api/products/1" => ["status" => 200, "data" => "Updated"],
    "DELETE /api/products/1" => ["status" => 200, "data" => "Deleted"],
];

foreach ($endpoints as $endpoint => $resp) {
    echo "$endpoint → {$resp['status']}: {$resp['data']}<br>";
}

echo "<br>=== CORS & Filters ===<br>";
echo "// app/Config/Cors.php<br>";
echo "public $allowedOrigins = ['http://localhost:3000'];<br>";
echo "public $allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];<br>";
echo "public $allowedHeaders = ['Content-Type', 'Authorization'];<br>";
>
```

---

## Konsep Kunci

### Resource Routes
`$routes->resource('products')` — generate 5 RESTful routes.

### JSON Response
`$this->respond($data)`, `$this->respondCreated($data)`, `setJSON()`.

### ResourceController
Pre-built CRUD: `index`, `show`, `create`, `store`, `edit`, `update`, `delete`.

### getJSON
`$this->request->getJSON(true)` — parse body JSON ke array.

### CORS
`app/Config/Cors.php` — configure allowed origins, methods, headers.

---

## Eksperimen

- Buat API resource controller untuk Post
- Implementasikan API dengan JWT auth
- Coba API versioning dengan route group
- Buat API pagination
- Implementasikan rate limiting

---

## Tantangan

Buat REST API lengkap untuk produk: CRUD endpoints, validation, JSON responses, CORS.

---

## Ringkasan

Minggu 8 dari 10: **REST API Development** (Level: Menengah). API-first development. Minggu depan: **Testing**.
