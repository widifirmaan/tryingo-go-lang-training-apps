# REST API — Real Online CI4 Shop

> **Kategori:** CodeIgniter | **Level:** Intermediate | **Minggu 8:** REST API Development
> **Prerequisites:** Week 7 — **Authentication**.

## Learning Objectives

- `ResourceController` + `$routes->resource('api/products')` 5 automatic doors (source: codeigniter.com/user_guide/incoming/rest_api)
- `respond()`/`respondCreated()`/`failNotFound()` JSON + `$this->request->getJSON()` opens envelopes

---

## Why This Matters (Non-IT)

Phones need JSON, not HTML. Without an API, phones can't fetch stock. `resource()` 1 line = 5 doors (GET/POST/PUT/DELETE) — no 5 hand-written routes.

---

## Program: Real Shop API

```php
// Routes.php — 1 line 5 doors!
$routes->resource('api/products', ['controller' => 'Api\Products']);
// GET api/products, GET api/products/1, POST, PUT api/products/1, DELETE api/products/1
```

```php
// Controllers/Api/Products.php — real (not echo!)
namespace App\Controllers\Api;
use CodeIgniter\RESTful\ResourceController;

class Products extends ResourceController {
  protected $modelName = 'App\Models\ProductModel';
  protected $format = 'json';

  public function index() {
    return $this->respond($this->model->findAll());
  }

  public function show($id = null) {
    $p = $this->model->find($id);
    return $p ? $this->respond($p) : $this->failNotFound("Missing $id");
  }

  public function create() {
    $data = $this->request->getJSON(true); // JSON envelope → array
    $id = $this->model->insert($data);
    return $this->respondCreated(["id" => $id] + $data);
  }

  public function delete($id = null) {
    $this->model->delete($id);
    return $this->respondDeleted(["id" => $id]);
  }
}
```

Test: `curl localhost:8080/api/products` → JSON. `curl -X POST -H "Content-Type: application/json" -d '{"name":"Sugar","price":15000}' ...` → `201`.

---

## Key Concepts

### `$routes->resource()` = 5 Doors at Once
`index/show/create/update/delete` automatic.

### `respond()`/`failNotFound()` = Neat JSON Replies
`respond($data)` 200, `respondCreated` 201, `failNotFound` 404 JSON (not HTML!).

### `getJSON(true)` = Open Envelope
JSON body → PHP array.

---

## Beginner Friendly Explanation

### Analogy: JSON Drive-Thru
- **resource() = 5 drive-thru windows** at once.
- **respond = JSON receipt**, not a page.

### Step 0 — Prepare Device
- Same as W1 + `curl` or Postman.

### How the Computer Reads It
1. `POST /api/products` JSON → `create()` → `getJSON` → `insert` → `201`.
2. `GET /api/products/99` → missing → `404` JSON.

### 3 Must-Know Terms
1. **resource/respond**: 5-doors/JSON-reply
2. **getJSON**: open-envelope

---

## Experiments

- **Green:** `GET /api/products/1` → JSON 1 item?
- **Yellow:** `GET /api/products/99` → 404 JSON (not HTML)?
- **Red:** POST without `Content-Type: application/json` → `getJSON` null? Add header.

---

## Challenge

**Complete Online Shop:** `resource` + real CRUD + `curl` 5 passing commands (GET list/1/99, POST, DELETE).
- **Link-up (Week 7 — Authentication):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **resource/respond/fail**: 5-doors/reply/JSON-fail

---

## Summary

Week 8 of 10: **JSON Drive-Thru** (Level: Intermediate). Phones can shop. Next: **Testing**.
