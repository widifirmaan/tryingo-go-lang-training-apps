# RESTful APIs

> CodeIgniter 4 | Pelajaran 11

## Tujuan Pembelajaran

- Membuat controller API yang mengembalikan JSON\n- Menggunakan $this->response->setJSON() untuk response JSON\n- Menggunakan $this->failNotFound() dan $this->fail() untuk error response\n- Menggunakan $this->request->getJSON() untuk menerima JSON body

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Controllers\Api;

use App\Models\PostModel;

class Posts extends BaseController
{
    public function index(): string
    {
        $model = new PostModel();
        return $this->response->setJSON($model->findAll());
    }

    public function show(int $id = null): string
    {
        if ($id === null) {
            return $this->failNotFound('Post ID required');
        }
        $model = new PostModel();
        $post = $model->find($id);
        if (!$post) {
            return $this->failNotFound('Post not found');
        }
        return $this->response->setJSON($post);
    }

    public function create(): string
    {
        $model = new PostModel();
        $data = $this->request->getJSON(true) ?? $this->request->getPost();

        if (!$model->insert($data)) {
            return $this->fail($model->errors(), 422);
        }

        return $this->response->setJSON(['id' => $model->getInsertID()])->setStatusCode(201);
    }

    public function update(int $id = null): string
    {
        if ($id === null) {
            return $this->failNotFound('Post ID required');
        }
        $model = new PostModel();
        $data = $this->request->getJSON(true) ?? $this->request->getPost();

        if (!$model->update($id, $data)) {
            return $this->fail($model->errors(), 422);
        }

        return $this->response->setJSON(['message' => 'Updated']);
    }

    public function delete(int $id = null): string
    {
        if ($id === null) {
            return $this->failNotFound('Post ID required');
        }
        $model = new PostModel();
        $model->delete($id);
        return $this->response->setJSON(['message' => 'Deleted']);
    }
}

```

---

## Penjelasan

## REST API Conventions
GET /api/posts — list all. GET /api/posts/:id — get one. POST /api/posts — create. PUT /api/posts/:id — update. DELETE /api/posts/:id — delete. HTTP status codes: 200 OK, 201 Created, 404 Not Found, 422 Unprocessable Entity.
## JSON Response
$this->response->setJSON($data) — set JSON body and Content-Type header. $this->response->setStatusCode(201) — set HTTP status code. $this->failNotFound('msg') — return 404 with message. $this->fail($errors, 422) — return 422 with validation errors.
## JSON Request
$this->request->getJSON(true) — parse JSON body as associative array. $this->request->getPost() — parse form data. Using ?? operator: getJSON(true) ?? getPost() — try JSON first, fallback to form data.

---

## Eksperimen

1. **## REST API Conventions
GET /api/posts — list all. GET /api/posts/:id — get one. POST /api/posts — create. PUT /api/posts/:id — update. DELETE /api/posts/:id — delete. HTTP status codes: 200 OK, 201 Created, 404 Not Found, 422 Unprocessable Entity.
## JSON Response
$this->response->setJSON($data) — set JSON body and Content-Type header. $this->response->setStatusCode(201) — set HTTP status code. $this->failNotFound('msg') — return 404 with message. $this->fail($errors, 422) — return 422 with validation errors.
## JSON Request
$this->request->getJSON(true) — parse JSON body as associative array. $this->request->getPost() — parse form data. Using ?? operator: getJSON(true) ?? getPost() — try JSON first, fallback to form data.**

---

## Tantangan

Tingkatkan API: (1) tambah pagination di GET /api/posts dengan query parameter ?page=1&per_page=10, (2) tambah search dengan ?q=keyword di index method, (3) tambah API authentication dengan Bearer token, (4) buat API versioning dengan /api/v1/posts dan /api/v2/posts.

---

## Ringkasan

API = JSON response. setJSON() = JSON body. failNotFound() = 404. getJSON() = parse JSON request. Lanjut: file upload.
