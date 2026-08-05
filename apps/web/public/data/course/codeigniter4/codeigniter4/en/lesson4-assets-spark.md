# Static Assets & Spark CLI

> CodeIgniter 4 | Lesson 4

## Learning Objectives

- Serve static assets (CSS, JS, images) from public/ directory\n- Use Spark CLI to run commands\n- Understand public/index.php as front controller\n- Configure baseURL in App.php

---

## Program: CodeIgniter 4

```php
<?php

// CodeIgniter 4 - Front Controller
// Serve static assets from public/css/, public/js/, public/images/

require_once __DIR__ . '/../system/bootstrap.php';

// CI4 handles static assets automatically when APPBASEPATH is set
// Static files in public/ are served directly by the web server

```

---

## Explanation

## Static Assets
Files in public/ (css/, js/, images/) accessed directly: http://localhost:3000/css/style.css. CI4 doesn't process static files — web server serves them directly.
## Spark CLI
php spark list — list all available commands. php spark serve — start dev server (alternative to php -S). php spark make:controller NameController — generate new controller. php spark make:model NameModel — generate new model.
## App Config
app/Config/App.php contains baseURL, indexPage, uriProtocol. baseURL must match your access URL.

---

## Experiments

1. **## Static Assets
Files in public/ (css/, js/, images/) accessed directly: http://localhost:3000/css/style.css. CI4 doesn't process static files — web server serves them directly.
## Spark CLI
php spark list — list all available commands. php spark serve — start dev server (alternative to php -S). php spark make:controller NameController — generate new controller. php spark make:model NameModel — generate new model.
## App Config
app/Config/App.php contains baseURL, indexPage, uriProtocol. baseURL must match your access URL.**

---

## Challenge

Explore Spark: (1) run php spark list and note 5 available commands, (2) create new controller with php spark make:controller About, (3) create new model with php spark make:model Post, (4) try php spark serve and compare with npm run dev.

---

## Summary

public/ = static assets. Spark CLI = generate code & run commands. App.php = main config. Next: database & migrations.
