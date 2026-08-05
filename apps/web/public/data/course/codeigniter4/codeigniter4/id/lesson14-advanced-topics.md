# Advanced Topics: Events, CLI & Generators

> CodeIgniter 4 | Pelajaran 14

## Tujuan Pembelajaran

- Memahami Events system untuk decoupled code\n- Membuat custom CLI command dengan php spark hello\n- Menggunakan log_message() untuk logging\n- Memahami CI4 Generators untuk scaffold code

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

## Penjelasan

## Events System
Events::postBlogCreated() — trigger custom event after blog post created. Other parts of app can listen to this event without modifying Blog controller. Decouples code: controller doesn't need to know what happens after post creation.
## CLI Commands
php spark hello — menjalankan custom command. BaseCommand::run() — method yang dieksekusi. CLI::write() — output ke terminal dengan warna. CLI::prompt() — meminta input dari user.
## Generators
php spark make:controller Nama — generate controller. php spark make:model Nama — generate model. php spark make:migration Nama — generate migration. php spark make:seeder Nama — generate seeder. php spark make:filter Nama — generate filter.

---

## Eksperimen

1. **## Events System
Events::postBlogCreated() — trigger custom event after blog post created. Other parts of app can listen to this event without modifying Blog controller. Decouples code: controller doesn't need to know what happens after post creation.
## CLI Commands
php spark hello — menjalankan custom command. BaseCommand::run() — method yang dieksekusi. CLI::write() — output ke terminal dengan warna. CLI::prompt() — meminta input dari user.
## Generators
php spark make:controller Nama — generate controller. php spark make:model Nama — generate model. php spark make:migration Nama — generate migration. php spark make:seeder Nama — generate seeder. php spark make:filter Nama — generate filter.**

---

## Tantangan

Jelajahi advanced topics: (1) buat event listener yang mengirim email notification saat post dibuat, (2) buat CLI command yang meng-export semua post ke JSON file, (3) buat custom generator yang menghasilkan CRUD scaffold lengkap, (4) buat event yang mencatat setiap request ke log file custom.

---

## Ringkasan

Events = decoupled hooks. CLI = custom commands. Generators = scaffold code. log_message() = logging. Lanjut: testing.
