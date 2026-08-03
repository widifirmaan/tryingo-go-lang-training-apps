# Composer & Autoloading

> PHP | Lesson 13

## Learning Objectives

- Understand PSR-4 autoloading and directory structure\n- Use namespaces and use statements\n- Create classes that Composer autoloads automatically\n- Distinguish autoloading (runtime) from manual require

---

## Program: Composer & Autoloading

```php
<?php

require_once __DIR__ . "/vendor/autoload.php";

use App\Models\Task;
use App\Services\Logger;

$task = new Task("Belajar Composer", "Pelajari autoloading PSR-4");
$task->complete();

Logger::info("Task diselesaikan: " . $task->getJudul());

```

---

## Explanation

## PSR-4: The Autoloading Standard
The namespace App\Models maps to the src/Models/ directory. Composer uses the rule: replace \ with /, append .php. So App\Models\Task → src/Models/Task.php. Without autoloading: manual require for every file — not scalable.
## composer.json Autoload
"autoload": { "psr-4": { "App\": "src/" } } — defines the namespace-to-directory mapping. After editing composer.json, run composer dump-autoload to update the mapping.
## Namespace & Use
namespace App\Models; — declare the namespace at the top of the file. use App\Models\Task; — import the class so it can be used without the full prefix. Without use: new \App\Models\Task(...) — fully qualified name.
## Static Method
Logger::info() — call a static method without creating an instance. Great for utility classes (Logger, Validator, Helper). No $this needed because there is no instance state.

---

## Experiments

1. **## PSR-4: The Autoloading Standard
The namespace App\Models maps to the src/Models/ directory. Composer uses the rule: replace \ with /, append .php. So App\Models\Task → src/Models/Task.php. Without autoloading: manual require for every file — not scalable.
## composer.json Autoload
"autoload": { "psr-4": { "App\": "src/" } } — defines the namespace-to-directory mapping. After editing composer.json, run composer dump-autoload to update the mapping.
## Namespace & Use
namespace App\Models; — declare the namespace at the top of the file. use App\Models\Task; — import the class so it can be used without the full prefix. Without use: new \App\Models\Task(...) — fully qualified name.
## Static Method
Logger::info() — call a static method without creating an instance. Great for utility classes (Logger, Validator, Helper). No $this needed because there is no instance state.**

---

## Challenge

Expand Composer: (1) add the fakerphp/faker dependency in composer.json and use it in a seeder to create 10 dummy tasks, (2) create a custom CLI script in composer.json (scripts.post-install-cmd) that runs migrations automatically, (3) create an App\Services\Database class using the singleton pattern (private static $instance), (4) write a README about the difference between autoload (runtime) and compile (opcache).

---

## Summary

Composer = autoload dependencies. PSR-4 = namespace to directory. use = import class. static = without instance. Next: PHP 8.
