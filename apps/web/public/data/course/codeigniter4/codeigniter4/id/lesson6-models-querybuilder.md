# Models & Query Builder

> CodeIgniter 4 | Pelajaran 6

## Tujuan Pembelajaran

- Membuat model yang extends CodeIgniter\Model\n- Menggunakan $this->findAll(), $this->first(), $this->where()\n- Chainable Query Builder: orderBy(), limit(), offset(), like()\n- Menggunakan $allowedFields untuk mass assignment protection

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Models;

use CodeIgniter\Model;

class PostModel extends Model
{
    protected $table = 'posts';
    protected $primaryKey = 'id';
    protected $allowedFields = ['title', 'slug', 'body'];
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function getPosts(int $limit = 10, int $offset = 0): array
    {
        return $this->orderBy('id', 'DESC')
            ->limit($limit)
            ->offset($offset)
            ->findAll();
    }

    public function getPostBySlug(string $slug): ?array
    {
        return $this->where('slug', $slug)->first();
    }

    public function searchPosts(string $keyword): array
    {
        return $this->like('title', $keyword)
            ->orLike('body', $keyword)
            ->findAll();
    }
}

```

---

## Penjelasan

## Model Conventions
class PostModel extends Model — nama model harus PostModel (singular, PascalCase). protected $table = 'posts' — nama tabel (plural, snake_case). protected $primaryKey = 'id' — primary key column. protected $allowedFields = [...] — kolom yang bisa di-insert/update via save().
## Query Builder Chaining
$this->orderBy('id', 'DESC')->limit(10)->offset(0)->findAll() — chainable methods. $this->where('slug', $slug)->first() — ambil 1 baris. $this->like('title', $keyword)->orLike('body', $keyword)->findAll() — LIKE query dengan OR.
## Mass Assignment
$allowedFields hanya kolom ini yang bisa di-save via $model->save($data) atau $model->insert($data). Kolom di luar $allowedFields (seperti id, created_at) otomatis di-ignore — mencegah mass assignment vulnerability.

---

## Eksperimen

1. **## Model Conventions
class PostModel extends Model — nama model harus PostModel (singular, PascalCase). protected $table = 'posts' — nama tabel (plural, snake_case). protected $primaryKey = 'id' — primary key column. protected $allowedFields = [...] — kolom yang bisa di-insert/update via save().
## Query Builder Chaining
$this->orderBy('id', 'DESC')->limit(10)->offset(0)->findAll() — chainable methods. $this->where('slug', $slug)->first() — ambil 1 baris. $this->like('title', $keyword)->orLike('body', $keyword)->findAll() — LIKE query dengan OR.
## Mass Assignment
$allowedFields hanya kolom ini yang bisa di-save via $model->save($data) atau $model->insert($data). Kolom di luar $allowedFields (seperti id, created_at) otomatis di-ignore — mencegah mass assignment vulnerability.**

---

## Tantangan

Kembangkan model: (1) tambah method getPostsByCategory(int $categoryId) di PostModel, (2) tambah method countPosts(): int yang mengembalikan total post, (3) buat pagination dengan $model->paginate(5) dan $pager->links(), (4) tambah method getRecentPosts(int $limit) yang mengembalikan post terbaru.

---

## Ringkasan

Model = akses data. Query Builder = chainable SQL. allowedFields = mass assignment protection. paginate() = pagination. Lanjut: form handling.
