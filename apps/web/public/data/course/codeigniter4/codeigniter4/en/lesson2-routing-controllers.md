# Routing & Controllers

> CodeIgniter 4 | Lesson 2

## Learning Objectives

- Understand routing: URL mapped to controller and method\n- Create controller with index, view, create, store methods\n- Use $this->request->getPost() to receive form data\n- Use redirect()->to() for redirection

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Controllers;

class Blog extends BaseController
{
    public function index(): string
    {
        return view('blog/index');
    }

    public function view(string $slug = null): string
    {
        if ($slug === null) {
            return redirect()->to('/blog');
        }

        return view('blog/view', ['slug' => $slug]);
    }

    public function create(): string
    {
        return view('blog/create');
    }

    public function store(): string
    {
        $title = $this->request->getPost('title');
        return "Post dibuat: " . esc($title);
    }
}

```

---

## Explanation

## Routing Patterns
$routes->get('blog', 'Blog::index') — GET /blog -> Blog::index. $routes->get('blog/(:any)', 'Blog::view/$1') — parameter captured and passed to method. $routes->post('blog/store', 'Blog::store') — POST request.
## Controller Methods
public function index(): string — default method. return view('view_name') — render view. return redirect()->to('/url') — redirect. $this->request->getPost('field') — get POST data.
## View with Data
view('blog/view', ['slug' => $slug]) — pass data to view. In view: <?= esc($slug) ?> — escaped output for security (anti XSS).

---

## Experiments

1. **## Routing Patterns
$routes->get('blog', 'Blog::index') — GET /blog -> Blog::index. $routes->get('blog/(:any)', 'Blog::view/$1') — parameter captured and passed to method. $routes->post('blog/store', 'Blog::store') — POST request.
## Controller Methods
public function index(): string — default method. return view('view_name') — render view. return redirect()->to('/url') — redirect. $this->request->getPost('field') — get POST data.
## View with Data
view('blog/view', ['slug' => $slug]) — pass data to view. In view: <?= esc($slug) ?> — escaped output for security (anti XSS).**

---

## Challenge

Expand routing: (1) add edit($slug) method in Blog controller, (2) add PUT route for update, (3) add delete($slug) method with DELETE route, (4) create /blog/about page showing blog info.

---

## Summary

Route = URL to controller. Controller = logic. View = HTML. $routes->get/post = HTTP methods. Next: views & layouts.
