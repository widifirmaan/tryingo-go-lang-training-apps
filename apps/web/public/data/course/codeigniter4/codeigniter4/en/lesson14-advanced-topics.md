# Advanced Topics: Events, CLI & Generators

> CodeIgniter 4 | Lesson 14

## Learning Objectives

- Understand Events system for decoupled code\n- Create custom CLI command with php spark hello\n- Use log_message() for logging\n- Understand CI4 Generators for scaffold code

---

## Program: CodeIgniter 4

```php
<?php

namespace Config;

use CodeIgniter\ConfigServices as BaseServices;

class Events extends BaseServices
{
    public static function postBlogCreated(array $data): void
    {
        log_message('info', 'Blog post created: ' . $data['title']);
    }
}

```

---

## Explanation

## Events System
Events::postBlogCreated() — trigger custom event after blog post created. Other parts of app can listen to this event without modifying Blog controller. Decouples code: controller doesn't need to know what happens after post creation.
## CLI Commands
php spark hello — run custom command. BaseCommand::run() — method executed. CLI::write() — output to terminal with color. CLI::prompt() — request input from user.
## Generators
php spark make:controller Name — generate controller. php spark make:model Name — generate model. php spark make:migration Name — generate migration. php spark make:seeder Name — generate seeder. php spark make:filter Name — generate filter.

---

## Experiments

1. **## Events System
Events::postBlogCreated() — trigger custom event after blog post created. Other parts of app can listen to this event without modifying Blog controller. Decouples code: controller doesn't need to know what happens after post creation.
## CLI Commands
php spark hello — run custom command. BaseCommand::run() — method executed. CLI::write() — output to terminal with color. CLI::prompt() — request input from user.
## Generators
php spark make:controller Name — generate controller. php spark make:model Name — generate model. php spark make:migration Name — generate migration. php spark make:seeder Name — generate seeder. php spark make:filter Name — generate filter.**

---

## Challenge

Explore advanced topics: (1) create event listener that sends email notification when post is created, (2) create CLI command that exports all posts to JSON file, (3) create custom generator that produces full CRUD scaffold, (4) create event that logs every request to custom log file.

---

## Summary

Events = decoupled hooks. CLI = custom commands. Generators = scaffold code. log_message() = logging. Next: testing.
