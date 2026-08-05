# Database Setup & Migrations

> CodeIgniter 4 | Lesson 5

## Learning Objectives

- Understand database migrations: version control for schema\n- Create migration with $this->forge->addField()\n- Add primary key, unique key, and foreign key\n- Use SQLite3 for development (no database server needed)

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePosts extends Migration
{
    public function up(): void
    {
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 5, 'unsigned' => true, 'auto_increment' => true],
            'title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255],
            'body' => ['type' => 'TEXT', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->createTable('posts');
    }

    public function down(): void
    {
        $this->forge->dropTable('posts');
    }
}

```

---

## Explanation

## Migration Workflow
php spark migrate — run all pending migrations. php spark migrate rollback — undo last migration. Each migration file has up() (create) and down() (drop) methods. File names start with sequence number (001_, 002_).
## Forge Methods
$this->forge->addField([]) — define columns. $this->forge->addKey('id', true) — primary key. $this->forge->addUniqueKey('slug') — unique constraint. $this->forge->createTable('posts') — create table. $this->forge->addForeignKey() — foreign key constraint.
## SQLite3
DBDriver = 'SQLite3' — no database server needed. Database stored in writable/db.sqlite. Great for development and prototyping.

---

## Experiments

1. **## Migration Workflow
php spark migrate — run all pending migrations. php spark migrate rollback — undo last migration. Each migration file has up() (create) and down() (drop) methods. File names start with sequence number (001_, 002_).
## Forge Methods
$this->forge->addField([]) — define columns. $this->forge->addKey('id', true) — primary key. $this->forge->addUniqueKey('slug') — unique constraint. $this->forge->createTable('posts') — create table. $this->forge->addForeignKey() — foreign key constraint.
## SQLite3
DBDriver = 'SQLite3' — no database server needed. Database stored in writable/db.sqlite. Great for development and prototyping.**

---

## Challenge

Expand migrations: (1) create third migration for categories table with name and slug columns, (2) add posts.category_id -> categories.id foreign key, (3) run php spark migrate and verify tables created in SQLite, (4) try php spark migrate rollback and see tables dropped.

---

## Summary

Migration = schema version control. up() = create, down() = drop. Forge = schema builder. SQLite3 = dev DB. Next: models.
