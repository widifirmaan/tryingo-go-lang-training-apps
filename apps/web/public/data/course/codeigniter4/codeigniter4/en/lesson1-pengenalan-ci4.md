# Introduction to CodeIgniter 4 & Installation

> CodeIgniter 4 | Lesson 1

## Learning Objectives

- Understand CI4: a modern PHP framework with MVC pattern\n- Learn CI4 directory structure (app/, public/, writable/, system/)\n- Understand the front controller role (public/index.php)\n- Distinguish CI4 from pure PHP: framework vs language

---

## Program: CodeIgniter 4

```php
<?php

// CodeIgniter 4 - Front Controller
// Ini adalah titik masuk utama aplikasi CI4.
// Semua request HTTP melewati file ini.

require_once __DIR__ . '/../system/bootstrap.php';

echo "Hello, CodeIgniter 4!";
echo "\nMVC = Model-View-Controller";
echo "\nRouting: URL -> Controller -> View";

```

---

## Explanation

## CI4 Directory Structure
app/ = application code (Controllers, Models, Views, Config). public/ = web root (index.php, assets). writable/ = cache, logs, session, uploads. system/ = framework core (don't modify). vendor/ = Composer dependencies.
## MVC in CI4
Request -> public/index.php -> Router -> Controller -> Model (database) -> View (HTML) -> Response. Each layer has its own responsibility.
## Running CI4
php -S 0.0.0.0:3000 -t public starts the dev server. Open http://localhost:3000 and see "Welcome to CodeIgniter 4!".

---

## Experiments

1. **## CI4 Directory Structure
app/ = application code (Controllers, Models, Views, Config). public/ = web root (index.php, assets). writable/ = cache, logs, session, uploads. system/ = framework core (don't modify). vendor/ = Composer dependencies.
## MVC in CI4
Request -> public/index.php -> Router -> Controller -> Model (database) -> View (HTML) -> Response. Each layer has its own responsibility.
## Running CI4
php -S 0.0.0.0:3000 -t public starts the dev server. Open http://localhost:3000 and see "Welcome to CodeIgniter 4!".**

---

## Challenge

Explore: (1) change "Welcome to CodeIgniter 4!" to your welcome message in welcome_message.php, (2) add an h2 with your name, (3) try accessing http://localhost:3000/ and see the change, (4) add an <a href="/about">About</a> link in the view.

---

## Summary

CI4 = PHP MVC framework. public/index.php = front controller. app/ = your code. Next: routing & controllers.
