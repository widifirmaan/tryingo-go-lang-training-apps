# Final Project: CI4 Blog

> CodeIgniter 4 | Lesson 16

## Learning Objectives

- Assemble all CI4 concepts into one complete Blog project\n- Apply MVC with routing, controller, model, and view\n- Use database migrations and models for data persistence\n- Secure the app with CSRF, XSS, and authentication

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Controllers;

use App\Models\PostModel;

class Blog extends BaseController
{
    public function index(): string
    {
        $model = new PostModel();
        $data['posts'] = $model->getPosts();
        $data['flash'] = session()->getFlashdata('message');
        return view('blog/index', $data);
    }

    public function view(string $slug = null): string
    {
        if ($slug === null) {
            return redirect()->to('/blog');
        }
        $model = new PostModel();
        $data['post'] = $model->getPostBySlug($slug);
        if (!$data['post']) {
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
        }
        return view('blog/view', $data);
    }

    public function create(): string
    {
        if (!session()->get('user_id')) {
            return redirect()->to('/login');
        }
        return view('blog/create');
    }

    public function store(): string
    {
        $model = new PostModel();

        if (!$this->validate([
            'title' => 'required|min_length[3]|max_length[255]',
            'slug' => 'required|alpha_dash|is_unique[posts.slug]',
            'body' => 'required',
        ])) {
            return view('blog/create', ['validation' => $this->validator]);
        }

        $model->save([
            'title' => $this->request->getPost('title'),
            'slug' => $this->request->getPost('slug'),
            'body' => $this->request->getPost('body'),
        ]);

        session()->setFlashdata('message', 'Post berhasil disimpan!');
        return redirect()->to('/blog');
    }

    public function destroy(int $id): string
    {
        if (!session()->get('user_id')) {
            return redirect()->to('/login');
        }
        $model = new PostModel();
        $model->delete($id);
        session()->setFlashdata('message', 'Post berhasil dihapus!');
        return redirect()->to('/blog');
    }
}

```

---

## Explanation

## Final Project: Bringing It All Together
16 CI4 lessons summarized here: routing & controllers (Lesson 2), views & layouts (Lesson 3), static assets & Spark CLI (Lesson 4), database & migrations (Lesson 5), models & query builder (Lesson 6), form validation (Lesson 7), sessions & flash data (Lesson 8), security CSRF/XSS/filters (Lesson 9), authentication (Lesson 10), REST API (Lesson 11), file upload & pagination (Lesson 12), caching (Lesson 13), events & CLI (Lesson 14), testing (Lesson 15).
## Blog Architecture
Route -> Controller -> Model -> View. Every request goes through front controller (public/index.php), routed to controller, controller interacts with model for data, and renders view for HTML output.
## From CI4 to Production
For deployment: use php spark serve for production (or Nginx/Apache with rewrite rules). Enable production mode in app/Config/Boot/production.php. Use Redis for production cache. Setup MySQL/PostgreSQL database replacing SQLite3.

---

## Experiments

1. **## Final Project: Bringing It All Together
16 CI4 lessons summarized here: routing & controllers (Lesson 2), views & layouts (Lesson 3), static assets & Spark CLI (Lesson 4), database & migrations (Lesson 5), models & query builder (Lesson 6), form validation (Lesson 7), sessions & flash data (Lesson 8), security CSRF/XSS/filters (Lesson 9), authentication (Lesson 10), REST API (Lesson 11), file upload & pagination (Lesson 12), caching (Lesson 13), events & CLI (Lesson 14), testing (Lesson 15).
## Blog Architecture
Route -> Controller -> Model -> View. Every request goes through front controller (public/index.php), routed to controller, controller interacts with model for data, and renders view for HTML output.
## From CI4 to Production
For deployment: use php spark serve for production (or Nginx/Apache with rewrite rules). Enable production mode in app/Config/Boot/production.php. Use Redis for production cache. Setup MySQL/PostgreSQL database replacing SQLite3.**

---

## Challenge

Level up the final project: (1) add comment feature with Comment model and comments table, (2) add post categories with many-to-many relationship, (3) implement full-text search using LIKE or database full-text index, (4) add admin dashboard with posts and users statistics.

---

## Summary

Blog = MVC + DB + Security + API + Testing. All CI4 concepts in one project. You are ready to build real CI4 apps!
