# Models & Query Builder

> CodeIgniter 4 | Lesson 6

## Learning Objectives

- Create model extending CodeIgniter\Model\n- Use $this->findAll(), $this->first(), $this->where()\n- Chainable Query Builder: orderBy(), limit(), offset(), like()\n- Use $allowedFields for mass assignment protection

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

## Explanation

## Model Conventions
class PostModel extends Model — model name must be PostModel (singular, PascalCase). protected $table = 'posts' — table name (plural, snake_case). protected $primaryKey = 'id' — primary key column. protected $allowedFields = [...] — columns insertable/updatable via save().
## Query Builder Chaining
$this->orderBy('id', 'DESC')->limit(10)->offset(0)->findAll() — chainable methods. $this->where('slug', $slug)->first() — fetch 1 row. $this->like('title', $keyword)->orLike('body', $keyword)->findAll() — LIKE query with OR.
## Mass Assignment
$allowedFields only these columns can be saved via $model->save($data) or $model->insert($data). Columns outside $allowedFields (like id, created_at) auto-ignored — prevents mass assignment vulnerability.

---

## Experiments

1. **## Model Conventions
class PostModel extends Model — model name must be PostModel (singular, PascalCase). protected $table = 'posts' — table name (plural, snake_case). protected $primaryKey = 'id' — primary key column. protected $allowedFields = [...] — columns insertable/updatable via save().
## Query Builder Chaining
$this->orderBy('id', 'DESC')->limit(10)->offset(0)->findAll() — chainable methods. $this->where('slug', $slug)->first() — fetch 1 row. $this->like('title', $keyword)->orLike('body', $keyword)->findAll() — LIKE query with OR.
## Mass Assignment
$allowedFields only these columns can be saved via $model->save($data) or $model->insert($data). Columns outside $allowedFields (like id, created_at) auto-ignored — prevents mass assignment vulnerability.**

---

## Challenge

Expand model: (1) add getPostsByCategory(int $categoryId) method in PostModel, (2) add countPosts(): int method returning total posts, (3) create pagination with $model->paginate(5) and $pager->links(), (4) add getRecentPosts(int $limit) method returning latest posts.

---

## Summary

Model = data access. Query Builder = chainable SQL. allowedFields = mass assignment protection. paginate() = pagination. Next: form handling.
